/**
 * User Management Utilities
 * 
 * Handles all user-related operations with proper tenant isolation
 */

import { setDocument, updateDocument, getDocument, queryDocuments } from "./firestore"
import { where } from "firebase/firestore"
import { writeLog } from "./logging"
import type { UserData } from "@/lib/schemas/user.schema"

/**
 * Create a new user document
 */
export async function createUserDocument(
  companyId: string,
  userId: string,
  data: Partial<UserData> & { email: string; role?: string }
): Promise<void> {
  try {
    await setDocument(`EMPRESAS/${companyId}/usuarios/${userId}`, {
      ...data,
      role: data.role || "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailVerified: false,
    })

    await writeLog({
      collection: "logs_usuario",
      action: "user_document_created",
      userId,
      metadata: { companyId },
    })
  } catch (error) {
    console.error("[v0] Error creating user document:", error)
    throw error
  }
}

/**
 * Update user data
 */
export async function updateUser(
  companyId: string,
  userId: string,
  data: Partial<UserData>
): Promise<void> {
  try {
    const oldData = await getDocument(`EMPRESAS/${companyId}/usuarios/${userId}`)

    await updateDocument(`EMPRESAS/${companyId}/usuarios/${userId}`, data)

    await writeLog({
      collection: "logs_usuario",
      action: "user_updated",
      userId,
      metadata: {
        companyId,
        oldValue: oldData,
        newValue: data,
      },
    })
  } catch (error) {
    console.error("[v0] Error updating user:", error)
    throw error
  }
}

/**
 * Get user data
 */
export async function getUser(
  companyId: string,
  userId: string
): Promise<UserData | null> {
  try {
    return (await getDocument(
      `EMPRESAS/${companyId}/usuarios/${userId}`
    )) as UserData | null
  } catch (error) {
    console.error("[v0] Error getting user:", error)
    throw error
  }
}

/**
 * Find company ID by user email
 */
export async function findCompanyByUserEmail(email: string): Promise<string | null> {
  try {
    // Search all companies for this user email
    const companies = await queryDocuments("EMPRESAS")

    for (const company of companies) {
      const users = await queryDocuments(
        `EMPRESAS/${company.id}/usuarios`,
        where("email", "==", email)
      )

      if (users.length > 0) {
        return company.id
      }
    }

    return null
  } catch (error) {
    console.error("[v0] Error finding company by user email:", error)
    return null
  }
}
