import { initializeApp, getApps, cert, getApp, App } from "firebase-admin/app"
import { getFirestore, Firestore } from "firebase-admin/firestore"

let adminApp: App | null = null
let adminDb: Firestore | null = null

/**
 * Initialize Firebase Admin SDK for server-side operations
 * This should ONLY be used in API routes and server components
 */
export function getAdminApp(): App {
  if (adminApp) {
    return adminApp
  }

  // Check if already initialized
  const apps = getApps()
  if (apps.length > 0) {
    adminApp = apps[0]
    return adminApp
  }

  // Initialize with service account or environment variables
  try {
    // For production: use service account key
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    } else {
      // For development: use default credentials or application default
      adminApp = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    }
  } catch (error) {
    console.error("[v0] Error initializing Firebase Admin:", error)
    throw new Error("Failed to initialize Firebase Admin SDK")
  }

  return adminApp
}

/**
 * Get Firestore Admin instance for server-side operations
 */
export function getAdminFirestore(): Firestore {
  if (adminDb) {
    return adminDb
  }

  const app = getAdminApp()
  adminDb = getFirestore(app)
  
  return adminDb
}

export { adminApp, adminDb }
