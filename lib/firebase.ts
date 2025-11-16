"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"

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
  dbClient = getFirestore(firebaseApp)

  if (dbClient) {
    enableIndexedDbPersistence(dbClient).catch((err) => {
      if (err.code === "failed-precondition") {
        console.warn("[v0] Multiple tabs open, persistence can only be enabled in one tab at a time.")
      } else if (err.code === "unimplemented") {
        console.warn("[v0] Browser doesn't support offline persistence")
      }
    })
  }
}

export { firebaseApp, authClient, dbClient }
