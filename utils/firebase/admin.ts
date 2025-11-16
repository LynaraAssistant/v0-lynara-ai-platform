/**
 * Admin Panel Utilities
 * 
 * Comprehensive admin operations for managing the multi-tenant platform
 */

import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  limit,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { dbClient } from "@/lib/firebase"
import { setDocument, updateDocument, getDocument, deleteDocument } from "./firestore"
import { writeLog } from "./logging"

/**
 * Get all companies in the platform
 */
export async function getAllCompanies(): Promise<any[]> {
  try {
    const companiesRef = collection(dbClient, "EMPRESAS")
    const q = query(companiesRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
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

    for (const company of companies) {
      const usersRef = collection(dbClient, `EMPRESAS/${company.id}/usuarios`)
      const querySnapshot = await getDocs(usersRef)

      const users = querySnapshot.docs.map((doc) => ({
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
    await updateDocument(`EMPRESAS/${companyId}`, {
      plan,
      status,
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
    // Delete all users
    const usersRef = collection(dbClient, `EMPRESAS/${companyId}/usuarios`)
    const usersSnapshot = await getDocs(usersRef)

    for (const userDoc of usersSnapshot.docs) {
      await deleteDoc(userDoc.ref)
    }

    // Delete operational data
    try {
      await deleteDocument(`EMPRESAS/${companyId}/datos_operativos/estado_actual`)
    } catch (e) {
      // May not exist
    }

    // Delete company document
    await deleteDocument(`EMPRESAS/${companyId}`)

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
    await updateDocument(`EMPRESAS/${companyId}/usuarios/${userId}`, {
      role,
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
    await deleteDocument(`EMPRESAS/${companyId}/usuarios/${userId}`)

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
