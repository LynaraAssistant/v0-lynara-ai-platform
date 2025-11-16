/**
 * Admin Panel Utilities
 * 
 * Comprehensive admin operations for managing the multi-tenant platform
 */

import { getAdminFirestore } from "@/lib/firebase-admin"
import { setDocument, updateDocument, getDocument, deleteDocument } from "./firestore"
import { writeLog } from "./logging"

/**
 * Get all companies in the platform
 */
export async function getAllCompanies(): Promise<any[]> {
  try {
    const db = getAdminFirestore()
    const companiesRef = db.collection("EMPRESAS")
    const snapshot = await companiesRef.orderBy("createdAt", "desc").get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("[v0] Error getting all companies:", error)
    throw new Error("Error al obtener las empresas")
  }
}

/**
 * Get all users across all companies
 */
export async function getAllUsers(): Promise<any[]> {
  try {
    const companies = await getAllCompanies()
    const allUsers: any[] = []
    const db = getAdminFirestore()

    for (const company of companies) {
      const usersRef = db.collection(`EMPRESAS/${company.id}/usuarios`)
      const snapshot = await usersRef.get()

      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        companyId: company.id,
        companyName: company.nombre_empresa || "Sin nombre",
        ...doc.data(),
      }))

      allUsers.push(...users)
    }

    return allUsers
  } catch (error) {
    console.error("[v0] Error getting all users:", error)
    throw new Error("Error al obtener los usuarios")
  }
}

/**
 * Update company plan and status
 */
export async function updateCompanyPlan(
  companyId: string,
  plan: string,
  status: string,
  adminUserId: string
): Promise<void> {
  try {
    const db = getAdminFirestore()
    await db.collection("EMPRESAS").doc(companyId).update({
      plan,
      status,
      updatedAt: new Date().toISOString(),
    })

    await writeLog({
      collection: "logs_empresa",
      action: "company_plan_updated",
      userId: adminUserId,
      metadata: {
        companyId,
        newPlan: plan,
        newStatus: status,
      },
    })
  } catch (error) {
    console.error("[v0] Error updating company plan:", error)
    throw error
  }
}

/**
 * Delete a company and all its data
 */
export async function deleteCompany(companyId: string, adminUserId: string): Promise<void> {
  try {
    const db = getAdminFirestore()
    
    // Delete all users
    const usersRef = db.collection(`EMPRESAS/${companyId}/usuarios`)
    const usersSnapshot = await usersRef.get()

    const batch = db.batch()
    usersSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })

    // Delete operational data
    try {
      const opDataRef = db.doc(`EMPRESAS/${companyId}/datos_operativos/estado_actual`)
      batch.delete(opDataRef)
    } catch (e) {
      // May not exist
    }

    // Delete company document
    const companyRef = db.collection("EMPRESAS").doc(companyId)
    batch.delete(companyRef)

    await batch.commit()

    await writeLog({
      collection: "logs_empresa",
      action: "company_deleted",
      userId: adminUserId,
      metadata: { companyId },
    })
  } catch (error) {
    console.error("[v0] Error deleting company:", error)
    throw new Error("Error al eliminar la empresa")
  }
}

/**
 * Update user role
 */
export async function updateUserRole(
  companyId: string,
  userId: string,
  role: string,
  adminUserId: string
): Promise<void> {
  try {
    const db = getAdminFirestore()
    await db.collection(`EMPRESAS/${companyId}/usuarios`).doc(userId).update({
      role,
      updatedAt: new Date().toISOString(),
    })

    await writeLog({
      collection: "logs_usuario",
      action: "user_role_updated",
      userId: adminUserId,
      metadata: {
        targetUserId: userId,
        companyId,
        newRole: role,
      },
    })
  } catch (error) {
    console.error("[v0] Error updating user role:", error)
    throw error
  }
}

/**
 * Delete a user
 */
export async function deleteUser(
  companyId: string,
  userId: string,
  adminUserId: string
): Promise<void> {
  try {
    const db = getAdminFirestore()
    await db.collection(`EMPRESAS/${companyId}/usuarios`).doc(userId).delete()

    await writeLog({
      collection: "logs_usuario",
      action: "user_deleted",
      userId: adminUserId,
      metadata: {
        deletedUserId: userId,
        companyId,
      },
    })
  } catch (error) {
    console.error("[v0] Error deleting user:", error)
    throw new Error("Error al eliminar el usuario")
  }
}

/**
 * Get platform statistics
 */
export async function getPlatformStats(): Promise<{
  totalCompanies: number
  totalUsers: number
  activeCompanies: number
  recentSignups: number
}> {
  try {
    const companies = await getAllCompanies()
    const users = await getAllUsers()

    const activeCompanies = companies.filter((c) => c.status === "active").length

    // Calculate recent signups (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentSignups = companies.filter((c) => {
      const createdAt = new Date(c.createdAt || 0)
      return createdAt > sevenDaysAgo
    }).length

    return {
      totalCompanies: companies.length,
      totalUsers: users.length,
      activeCompanies,
      recentSignups,
    }
  } catch (error) {
    console.error("[v0] Error getting platform stats:", error)
    return {
      totalCompanies: 0,
      totalUsers: 0,
      activeCompanies: 0,
      recentSignups: 0,
    }
  }
}
