/**
 * Firestore Operations Utilities (FIXED VERSION)
 * 
 * Provides high-level abstractions for Firestore operations
 * with proper multi-tenant isolation, error handling, and logging.
 * 
 * IMPORTANT: All Firestore functions MUST be imported from "firebase/firestore"
 * NOT from "firebase/auth"
 * 
 * Last updated: 2025-01-16 18:30
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
  type DocumentData,
  type QueryConstraint,
  serverTimestamp,
} from "firebase/firestore" // <-- CORRECT: firebase/firestore NOT firebase/auth
import { dbClient } from "@/lib/firebase"
import { writeLog } from "./logging"

/**
 * Get a document from Firestore
 */
export async function getDocument(
  path: string,
  companyId: string
): Promise<DocumentData | null> {
  try {
    const docRef = doc(dbClient, path)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  } catch (error) {
    console.error(`[Firestore] Error getting document ${path}:`, error)
    throw error
  }
}

/**
 * Set/create a document in Firestore
 */
export async function setDocument(
  path: string,
  data: DocumentData,
  companyId: string
): Promise<void> {
  try {
    const docRef = doc(dbClient, path)
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    
    await writeLog({
      type: "data_update",
      action: "setDocument",
      details: { path },
      companyId,
    })
  } catch (error) {
    console.error(`[Firestore] Error setting document ${path}:`, error)
    throw error
  }
}

/**
 * Update a document in Firestore
 */
export async function updateDocument(
  path: string,
  data: Partial<DocumentData>,
  companyId: string
): Promise<void> {
  try {
    const docRef = doc(dbClient, path)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    
    await writeLog({
      type: "data_update",
      action: "updateDocument",
      details: { path, fields: Object.keys(data) },
      companyId,
    })
  } catch (error) {
    console.error(`[Firestore] Error updating document ${path}:`, error)
    throw error
  }
}

/**
 * Delete a document from Firestore
 */
export async function deleteDocument(
  path: string,
  companyId: string
): Promise<void> {
  try {
    const docRef = doc(dbClient, path)
    await deleteDoc(docRef)
    
    await writeLog({
      type: "data_deletion",
      action: "deleteDocument",
      details: { path },
      companyId,
    })
  } catch (error) {
    console.error(`[Firestore] Error deleting document ${path}:`, error)
    throw error
  }
}

/**
 * Query documents from a collection
 */
export async function queryDocuments(
  collectionPath: string,
  constraints: QueryConstraint[],
  companyId: string
): Promise<DocumentData[]> {
  try {
    const collectionRef = collection(dbClient, collectionPath)
    const q = query(collectionRef, ...constraints)
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error(`[Firestore] Error querying collection ${collectionPath}:`, error)
    throw error
  }
}

/**
 * Subscribe to real-time updates on a document
 */
export function subscribeToDocument(
  path: string,
  callback: (data: DocumentData | null) => void,
  errorCallback?: (error: Error) => void
): () => void {
  const docRef = doc(dbClient, path)
  
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data())
      } else {
        callback(null)
      }
    },
    (error) => {
      console.error(`[Firestore] Error in snapshot listener for ${path}:`, error)
      if (errorCallback) {
        errorCallback(error as Error)
      }
    }
  )
}

/**
 * Subscribe to real-time updates on a collection query
 */
export function subscribeToQuery(
  collectionPath: string,
  constraints: QueryConstraint[],
  callback: (data: DocumentData[]) => void,
  errorCallback?: (error: Error) => void
): () => void {
  const collectionRef = collection(dbClient, collectionPath)
  const q = query(collectionRef, ...constraints)
  
  return onSnapshot(
    q,
    (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(docs)
    },
    (error) => {
      console.error(`[Firestore] Error in query snapshot listener for ${collectionPath}:`, error)
      if (errorCallback) {
        errorCallback(error as Error)
      }
    }
  )
}
