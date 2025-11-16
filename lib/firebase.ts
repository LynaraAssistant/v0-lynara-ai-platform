"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore"

const isClient = typeof window !== "undefined"

let firebaseApp = null
let authClient = null
let dbClient = null

if (isClient) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  authClient = getAuth(firebaseApp)
  
  // Use the new cache API instead of deprecated enableMultiTabIndexedDbPersistence
  try {
    dbClient = initializeFirestore(firebaseApp, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    })
  } catch (error) {
    // If Firestore is already initialized, get the existing instance
    dbClient = getFirestore(firebaseApp)
  }
}

export { firebaseApp, authClient, dbClient }
