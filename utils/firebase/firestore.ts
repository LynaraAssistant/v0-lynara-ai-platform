"use client"

/**
 * Firestore Module
 * 
 * Central Firestore exports for the entire application.
 * This file re-exports all Firestore functions and types needed across the codebase.
 * 
 * ✅ Uses Firebase Web SDK v9+ (modular)
 * ✅ Compatible with Next.js 14 + Turbopack + Vercel
 * ✅ Client-side only (NO Admin SDK)
 * ✅ SSR-safe initialization
 * 
 * Created: 2025-01-16
 * Purpose: Fix 22+ Vercel build errors related to Firestore imports
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
  type Firestore,
  type CollectionReference,
  type DocumentReference,
  type Query,
  type Unsubscribe,
} from "firebase/firestore"

import { dbClient } from "@/lib/firebase"

// ============================================================================
// FIRESTORE CLIENT EXPORT
// ============================================================================

/**
 * Firestore database instance
 * Use this for direct Firestore operations
 */
export const db = dbClient

// ============================================================================
// CORE FIRESTORE FUNCTIONS - Direct re-exports from firebase/firestore
// ============================================================================

export {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
}

// ============================================================================
// TYPESCRIPT TYPES - Re-exported for type safety
// ============================================================================

export type {
  DocumentData,
  QueryConstraint,
  Firestore,
  CollectionReference,
  DocumentReference,
  Query,
  Unsubscribe,
}

// ============================================================================
// HELPER FUNCTIONS - Wrapper utilities for common operations
// ============================================================================

/**
 * Creates or updates a document in Firestore
 * @param path - Full path to document (e.g., "companies/abc123")
 * @param data - Document data to set
 * @param merge - Whether to merge with existing data (default: true)
 */
export async function setDocument(
  path: string,
  data: DocumentData,
  merge: boolean = true
): Promise<void> {
  if (!dbClient) {
    throw new Error("[Firestore] Database client not initialized")
  }
  
  try {
    const docRef = doc(dbClient, path)
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge })
  } catch (error) {
    console.error("[Firestore] Error in setDocument:", error)
    throw error
  }
}

/**
 * Gets a document from Firestore
 * @param path - Full path to document
 * @returns Document data or null if not found
 */
export async function getDocument(path: string): Promise<DocumentData | null> {
  if (!dbClient) {
    throw new Error("[Firestore] Database client not initialized")
  }
  
  try {
    const docRef = doc(dbClient, path)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data() : null
  } catch (error) {
    console.error("[Firestore] Error in getDocument:", error)
    throw error
  }
}

/**
 * Updates a document in Firestore
 * @param path - Full path to document
 * @param data - Partial data to update
 */
export async function updateDocument(
  path: string,
  data: Partial<DocumentData>
): Promise<void> {
  if (!dbClient) {
    throw new Error("[Firestore] Database client not initialized")
  }
  
  try {
    const docRef = doc(dbClient, path)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("[Firestore] Error in updateDocument:", error)
    throw error
  }
}

/**
 * Deletes a document from Firestore
 * @param path - Full path to document
 */
export async function deleteDocument(path: string): Promise<void> {
  if (!dbClient) {
    throw new Error("[Firestore] Database client not initialized")
  }
  
  try {
    const docRef = doc(dbClient, path)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("[Firestore] Error in deleteDocument:", error)
    throw error
  }
}

/**
 * Queries documents from a collection
 * @param collectionPath - Path to collection
 * @param constraints - Query constraints (where, orderBy, limit, etc.)
 * @returns Array of documents with their IDs
 */
export async function queryDocuments(
  collectionPath: string,
  ...constraints: QueryConstraint[]
): Promise<DocumentData[]> {
  if (!dbClient) {
    throw new Error("[Firestore] Database client not initialized")
  }
  
  try {
    const collectionRef = collection(dbClient, collectionPath)
    const q = constraints.length > 0 
      ? query(collectionRef, ...constraints)
      : query(collectionRef)
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("[Firestore] Error in queryDocuments:", error)
    throw error
  }
}

/**
 * Listens to real-time updates on a document
 * @param path - Full path to document
 * @param callback - Function to call when document changes
 * @returns Unsubscribe function
 */
export function listenToDocument(
  path: string,
  callback: (data: DocumentData | null) => void
): Unsubscribe {
  if (!dbClient) {
    throw new Error("[Firestore] Database client not initialized")
  }
  
  const docRef = doc(dbClient, path)
  
  return onSnapshot(
    docRef,
    (snapshot) => {
      callback(snapshot.exists() ? snapshot.data() : null)
    },
    (error) => {
      console.error("[Firestore] Error in document listener:", error)
      callback(null)
    }
  )
}

/**
 * Listens to real-time updates on a collection query
 * @param collectionPath - Path to collection
 * @param constraints - Query constraints
 * @param callback - Function to call when query results change
 * @returns Unsubscribe function
 */
export function listenToQuery(
  collectionPath: string,
  constraints: QueryConstraint[],
  callback: (data: DocumentData[]) => void
): Unsubscribe {
  if (!dbClient) {
    throw new Error("[Firestore] Database client not initialized")
  }
  
  const collectionRef = collection(dbClient, collectionPath)
  const q = query(collectionRef, ...constraints)
  
  return onSnapshot(
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
}

// ============================================================================
// SSR-SAFE UTILITIES
// ============================================================================

/**
 * Checks if Firestore is available (client-side only)
 * Use this to prevent SSR errors
 */
export function isFirestoreAvailable(): boolean {
  return typeof window !== "undefined" && !!dbClient
}

/**
 * Safe wrapper for Firestore operations that might run on server
 * @param operation - Function that uses Firestore
 * @param fallback - Value to return if Firestore is not available
 */
export async function safeFirestoreOperation<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!isFirestoreAvailable()) {
    console.warn("[Firestore] Operation skipped - not available on server")
    return fallback
  }
  
  try {
    return await operation()
  } catch (error) {
    console.error("[Firestore] Operation failed:", error)
    return fallback
  }
}
