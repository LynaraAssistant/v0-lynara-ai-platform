/**
 * Admin Panel Utilities - CLIENT SIDE ONLY
 * 
 * All operations use Firebase Client SDK with proper security rules
 */

import { dbClient } from "@/lib/firebase"
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  orderBy,
  where,
  Timestamp 
} from "firebase/firestore"
import { writeLog } from "./logging"

/**
 * Get all companies (admin only - protected by Firestore rules)
 */
export async function getAllCompanies(): Promise<any[]> {
  try {
    if (!dbClient) throw new Error("Firestore no inicializado")
    
    const companiesRef = collection(dbClient, "EMPRESAS")
    const q = query(companiesRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

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
 * Get all users across all companies (admin only)
 */
export async function getAllUsers(): Promise<any[]> {
  try {
    const companies = await getAllCompanies()
    const allUsers: any[] = []

    for (const company of companies) {
      const usersRef = collection(dbClient!, `EMPRESAS/${company.id}/usuarios`)
      const snapshot = await getDocs(usersRef)

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
 * Update company plan and status (admin only)
 */
export async function updateCompanyPlan(
  companyId: string,
  plan: string,
  status: string,
  adminUserId: string
): Promise<void> {
  try {
    if (!dbClient) throw new Error("Firestore no inicializado")
    
    const companyRef = doc(dbClient, "EMPRESAS", companyId)
    await updateDoc(companyRef, {
      plan,
      status,
      updatedAt: new Date().toISOString(),
    })

    await writeLog({
      companyId,
      collection: "logs_empresa",
      action: "company_plan_updated",
      userId: adminUserId,
      metadata: {
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
 * Delete a company and all its data (admin only)
 */
export async function deleteCompany(companyId: string, adminUserId: string): Promise<void> {
  try {
    if (!dbClient) throw new Error("Firestore no inicializado")
    
    const usersRef = collection(dbClient, `EMPRESAS/${companyId}/usuarios`)
    const usersSnapshot = await getDocs(usersRef)

    for (const userDoc of usersSnapshot.docs) {
      await deleteDoc(userDoc.ref)
    }

    const companyRef = doc(dbClient, "EMPRESAS", companyId)
    await deleteDoc(companyRef)

    await writeLog({
      companyId,
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
 * Update user role (admin only)
 */
export async function updateUserRole(
  companyId: string,
  userId: string,
  role: string,
  adminUserId: string
): Promise<void> {
  try {
    if (!dbClient) throw new Error("Firestore no inicializado")
    
    const userRef = doc(dbClient, `EMPRESAS/${companyId}/usuarios`, userId)
    await updateDoc(userRef, {
      role,
      updatedAt: new Date().toISOString(),
    })

    await writeLog({
      companyId,
      collection: "logs_usuario",
      action: "user_role_updated",
      userId: adminUserId,
      metadata: {
        targetUserId: userId,
        newRole: role,
      },
    })
  } catch (error) {
    console.error("[v0] Error updating user role:", error)
    throw error
  }
}

/**
 * Delete a user (admin only)
 */
export async function deleteUser(
  companyId: string,
  userId: string,
  adminUserId: string
): Promise<void> {
  try {
    if (!dbClient) throw new Error("Firestore no inicializado")
    
    const userRef = doc(dbClient, `EMPRESAS/${companyId}/usuarios`, userId)
    await deleteDoc(userRef)

    await writeLog({
      companyId,
      collection: "logs_usuario",
      action: "user_deleted",
      userId: adminUserId,
      metadata: {
        deletedUserId: userId,
      },
    })
  } catch (error) {
    console.error("[v0] Error deleting user:", error)
    throw new Error("Error al eliminar el usuario")
  }
}

/**
 * Get platform statistics (admin only)
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
