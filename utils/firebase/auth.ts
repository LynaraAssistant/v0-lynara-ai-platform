/**
 * Firebase Authentication Utilities
 * 
 * Centralizes all authentication operations with proper error handling,
 * logging, and security measures.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth"
import { authClient } from "@/lib/firebase"
import { writeLog } from "./logging"
import { sanitizeInput } from "../security/sanitize"

/**
 * Register a new user with email and password
 * Sends email verification automatically
 */
export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  try {
    // Sanitize inputs
    const cleanEmail = sanitizeInput(email).toLowerCase().trim()
    const cleanName = sanitizeInput(displayName).trim()

    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      authClient,
      cleanEmail,
      password
    )
    const user = userCredential.user

    // Update profile
    await updateProfile(user, {
      displayName: cleanName,
    })

    // Send verification email
    await sendEmailVerification(user)

    // Log registration
    await writeLog({
      collection: "logs_usuario",
      action: "user_registered",
      userId: user.uid,
      metadata: {
        email: cleanEmail,
        emailVerified: user.emailVerified,
      },
    })

    return user
  } catch (error: any) {
    console.error("[v0] Error registering user:", error)
    throw mapAuthError(error)
  }
}

/**
 * Sign in existing user
 */
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const cleanEmail = sanitizeInput(email).toLowerCase().trim()

    const userCredential = await signInWithEmailAndPassword(
      authClient,
      cleanEmail,
      password
    )
    const user = userCredential.user

    // Log login
    await writeLog({
      collection: "logs_usuario",
      action: "user_logged_in",
      userId: user.uid,
      metadata: {
        email: cleanEmail,
        emailVerified: user.emailVerified,
      },
    })

    return user
  } catch (error: any) {
    console.error("[v0] Error logging in:", error)
    throw mapAuthError(error)
  }
}

/**
 * Sign out current user
 */
export async function logoutUser(userId?: string): Promise<void> {
  try {
    if (userId) {
      await writeLog({
        collection: "logs_usuario",
        action: "user_logged_out",
        userId,
      })
    }

    await signOut(authClient)
  } catch (error: any) {
    console.error("[v0] Error logging out:", error)
    throw new Error("Error al cerrar sesión. Por favor, intenta de nuevo.")
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  try {
    const cleanEmail = sanitizeInput(email).toLowerCase().trim()

    await sendPasswordResetEmail(authClient, cleanEmail, {
      url: typeof window !== "undefined" ? window.location.origin + "/login" : "",
      handleCodeInApp: false,
    })

    // Log password reset request
    await writeLog({
      collection: "logs_usuario",
      action: "password_reset_requested",
      userId: "anonymous",
      metadata: { email: cleanEmail },
    })
  } catch (error: any) {
    console.error("[v0] Error sending password reset:", error)
    throw mapAuthError(error)
  }
}

/**
 * Resend email verification
 */
export async function resendVerificationEmail(user: User): Promise<void> {
  try {
    await sendEmailVerification(user)

    await writeLog({
      collection: "logs_usuario",
      action: "verification_email_resent",
      userId: user.uid,
    })
  } catch (error: any) {
    console.error("[v0] Error resending verification email:", error)
    throw new Error(
      "Error al enviar el correo de verificación. Por favor, intenta más tarde."
    )
  }
}

/**
 * Map Firebase auth errors to user-friendly Spanish messages
 */
function mapAuthError(error: any): Error {
  const errorCode = error?.code || ""

  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "Este correo electrónico ya está registrado",
    "auth/invalid-email": "Correo electrónico inválido",
    "auth/operation-not-allowed": "Operación no permitida",
    "auth/weak-password": "La contraseña es demasiado débil",
    "auth/user-disabled": "Esta cuenta ha sido deshabilitada",
    "auth/user-not-found": "Credenciales incorrectas",
    "auth/wrong-password": "Credenciales incorrectas",
    "auth/invalid-credential": "Credenciales incorrectas",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Por favor, intenta más tarde",
    "auth/network-request-failed": "Error de conexión. Verifica tu internet",
    "auth/popup-closed-by-user": "La ventana de autenticación fue cerrada",
    "auth/requires-recent-login":
      "Por seguridad, necesitas iniciar sesión de nuevo",
  }

  const message = errorMessages[errorCode] || "Error de autenticación. Intenta de nuevo."

  return new Error(message)
}
