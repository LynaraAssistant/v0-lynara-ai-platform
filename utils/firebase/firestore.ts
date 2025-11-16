/**
 * Firestore Operations Utilities
 * 
 * Provides high-level abstractions for Firestore operations
 * with proper multi-tenant isolation, error handling, and logging.
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
} from "firebase/firestore"
import { dbClient } from "@/lib/firebase"
import { writeLog } from "./logging"

/**
 * Get a document from Firestore
 */
export async function getDocument(path: string): Promise<DocumentData | null> {
  try {
    const docRef = doc(dbClient, path)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }

    return null
  } catch (error) {
    console.error(`[v0] Error getting document at ${path}:`, error)
    throw new Error("Error al obtener los datos. Por favor, intenta de nuevo.")
  }
}

/**
 * Create or update a document
 */
export async function setDocument(
  path: string,
  data: DocumentData,
  merge = true
): Promise<void> {
  try {
    const docRef = doc(dbClient, path)
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge })
  } catch (error) {
    console.error(`[v0] Error setting document at ${path}:`, error)
    throw new Error("Error al guardar los datos. Por favor, intenta de nuevo.")
  }
}

/**
 * Update specific fields in a document
 */
export async function updateDocument(
  path: string,
  data: Partial<DocumentData>
): Promise<void> {
  try {
    const docRef = doc(dbClient, path)
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
  } catch (error) {
    console.error(`[v0] Error updating document at ${path}:`, error)
    throw new Error("Error al actualizar los datos. Por favor, intenta de nuevo.")
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(path: string): Promise<void> {
  try {
    const docRef = doc(dbClient, path)
    await deleteDoc(docRef)
  } catch (error) {
    console.error(`[v0] Error deleting document at ${path}:`, error)
    throw new Error("Error al eliminar. Por favor, intenta de nuevo.")
  }
}

/**
 * Query documents with filters
 */
export async function queryDocuments(
  collectionPath: string,
  ...constraints: QueryConstraint[]
): Promise<DocumentData[]> {
  try {
    const q = query(collection(dbClient, collectionPath), ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error(`[v0] Error querying collection ${collectionPath}:`, error)
    throw new Error("Error al buscar los datos. Por favor, intenta de nuevo.")
  }
}

/**
 * Subscribe to real-time document updates
 */
export function subscribeToDocument(
  path: string,
  callback: (data: DocumentData | null) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const docRef = doc(dbClient, path)

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data())
        } else {
          callback(null)
        }
      },
      (error) => {
        console.error(`[v0] Error in document subscription at ${path}:`, error)
        if (onError) {
          onError(new Error("Error al sincronizar datos en tiempo real"))
        }
      }
    )

    return unsubscribe
  } catch (error) {
    console.error(`[v0] Error setting up document subscription at ${path}:`, error)
    throw new Error("Error al configurar sincronización de datos")
  }
}
