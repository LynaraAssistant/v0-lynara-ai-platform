/**
 * Company Management Utilities
 * 
 * Handles all company-related operations with multi-tenant isolation
 */

import { setDocument, updateDocument, getDocument } from "./db-operations"
import { writeLog } from "./logging"
import type { CompanyData } from "@/lib/schemas/company.schema"

/**
 * Create a new company document
 */
export async function createCompany(
  companyId: string,
  data: Partial<CompanyData>
): Promise<void> {
  try {
    await setDocument(`EMPRESAS/${companyId}`, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      plan: "free",
      status: "active",
    })

    await writeLog({
      collection: "logs_empresa",
      action: "company_created",
      userId: "system",
      metadata: { companyId },
    })
  } catch (error) {
    console.error("[v0] Error creating company:", error)
    throw error
  }
}

/**
 * Update company data
 */
export async function updateCompany(
  companyId: string,
  data: Partial<CompanyData>,
  userId: string
): Promise<void> {
  try {
    const oldData = await getDocument(`EMPRESAS/${companyId}`)

    await updateDocument(`EMPRESAS/${companyId}`, data)

    await writeLog({
      collection: "logs_empresa",
      action: "company_updated",
      userId,
      metadata: {
        companyId,
        oldValue: oldData,
        newValue: data,
      },
    })
  } catch (error) {
    console.error("[v0] Error updating company:", error)
    throw error
  }
}

/**
 * Get company data
 */
export async function getCompany(companyId: string): Promise<CompanyData | null> {
  try {
    return (await getDocument(`EMPRESAS/${companyId}`)) as CompanyData | null
  } catch (error) {
    console.error("[v0] Error getting company:", error)
    throw error
  }
}
