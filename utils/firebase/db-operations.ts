/**
 * Firestore Database Operations
 * 
 * Centralized Firestore operations with multi-tenant isolation.
 * All database operations go through this module.
 * 
 * Created: 2025-01-16 to fix import issues
 */

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore"

import { dbClient } from "@/lib/firebase"
import { writeLog } from "./logging"

/**
 * Creates or updates a document in Firestore
 */
export async function createDocument(
  collectionName: string,
  docId: string,
  data: DocumentData,
  companyId: string
): Promise<void> {
  try {
    const docRef = doc(dbClient, collectionName, docId)
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
      companyId,
    }, { merge: true })

    await writeLog("database_write", {
      collection: collectionName,
      docId,
      companyId,
    })
  } catch (error) {
    console.error("[Firestore] Error creating document:", error)
    throw error
  }
}

/**
 * Reads a document from Firestore
 */
export async function readDocument(
  collectionName: string,
  docId: string
): Promise<DocumentData | null> {
  try {
    const docRef = doc(dbClient, collectionName, docId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data() : null
  } catch (error) {
    console.error("[Firestore] Error reading document:", error)
    throw error
  }
}

/**
 * Updates a document in Firestore
 */
export async function updateDocument(
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>,
  companyId: string
): Promise<void> {
  try {
    const docRef = doc(dbClient, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })

    await writeLog("database_update", {
      collection: collectionName,
      docId,
      companyId,
    })
  } catch (error) {
    console.error("[Firestore] Error updating document:", error)
    throw error
  }
}

/**
 * Deletes a document from Firestore
 */
export async function removeDocument(
  collectionName: string,
  docId: string,
  companyId: string
): Promise<void> {
  try {
    const docRef = doc(dbClient, collectionName, docId)
    await deleteDoc(docRef)

    await writeLog("database_delete", {
      collection: collectionName,
      docId,
      companyId,
    })
  } catch (error) {
    console.error("[Firestore] Error deleting document:", error)
    throw error
  }
}

/**
 * Queries documents from a collection with filters
 */
export async function queryDocuments(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<DocumentData[]> {
  try {
    const collectionRef = collection(dbClient, collectionName)
    const q = query(collectionRef, ...constraints)
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("[Firestore] Error querying documents:", error)
    throw error
  }
}

/**
 * Listens to real-time updates on a document
 */
export function listenToDocument(
  collectionName: string,
  docId: string,
  callback: (data: DocumentData | null) => void
): () => void {
  const docRef = doc(dbClient, collectionName, docId)
  
  const unsubscribe = onSnapshot(
    docRef,
    (snapshot) => {
      callback(snapshot.exists() ? snapshot.data() : null)
    },
    (error) => {
      console.error("[Firestore] Error in document listener:", error)
      callback(null)
    }
  )

  return unsubscribe
}

/**
 * Listens to real-time updates on a collection query
 */
export function listenToQuery(
  collectionName: string,
  constraints: QueryConstraint[],
  callback: (data: DocumentData[]) => void
): () => void {
  const collectionRef = collection(dbClient, collectionName)
  const q = query(collectionRef, ...constraints)
  
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(data)
    },
    (error) => {
      console.error("[Firestore] Error in query listener:", error)
      callback([])
    }
  )

  return unsubscribe
}

// Legacy API: Set a document at a given path
// Uses path format: "collection/docId" or "collection/docId/subcollection/subDocId"
export async function setDocument(
  path: string,
  data: DocumentData
): Promise<void> {
  try {
    const docRef = doc(dbClient, path)
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true })
  } catch (error) {
    console.error("[Firestore] Error in setDocument:", error)
    throw error
  }
}

// Legacy API: Get a document from a given path
// Uses path format: "collection/docId" or "collection/docId/subcollection/subDocId"
export async function getDocument(path: string): Promise<DocumentData | null> {
  try {
    const docRef = doc(dbClient, path)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data() : null
  } catch (error) {
    console.error("[Firestore] Error in getDocument:", error)
    throw error
  }
}

// Re-export Firestore utilities
export { serverTimestamp, where, collection, query, getDocs, onSnapshot }
export type { DocumentData, QueryConstraint }
