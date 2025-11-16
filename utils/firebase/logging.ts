/**
 * Logging System
 * 
 * Centralized logging for all user, company, and operational actions
 * Now tracks before/after values for audit trails
 */

import { setDocument } from "./firestore"
import { sanitizeInput } from "../security/sanitize"

interface LogEntry {
  companyId: string
  collection: "logs_usuario" | "logs_empresa" | "logs_operativos"
  action: string
  userId: string
  oldValue?: any
  newValue?: any
  metadata?: Record<string, any>
}

/**
 * Write a log entry to Firestore with full audit trail
 */
export async function writeLog(entry: LogEntry): Promise<void> {
  try {
    const logId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Sanitize metadata and values
    const sanitizedMetadata = entry.metadata
      ? Object.entries(entry.metadata).reduce((acc, [key, value]) => {
          acc[key] =
            typeof value === "string" ? sanitizeInput(value) : value
          return acc
        }, {} as Record<string, any>)
      : {}

    const sanitizedOldValue =
      typeof entry.oldValue === "string"
        ? sanitizeInput(entry.oldValue)
        : entry.oldValue

    const sanitizedNewValue =
      typeof entry.newValue === "string"
        ? sanitizeInput(entry.newValue)
        : entry.newValue

    // Write to company-scoped logs collection
    await setDocument(
      `EMPRESAS/${entry.companyId}/${entry.collection}/${logId}`,
      {
        action: entry.action,
        userId: entry.userId,
        timestamp: new Date().toISOString(),
        oldValue: sanitizedOldValue,
        newValue: sanitizedNewValue,
        ...sanitizedMetadata,
      }
    )
  } catch (error) {
    // Silently fail - logging should never break the app
    console.error("[v0] Error writing log:", error)
  }
}

/**
 * Write multiple logs in batch
 */
export async function writeBatchLogs(entries: LogEntry[]): Promise<void> {
  try {
    await Promise.all(entries.map((entry) => writeLog(entry)))
  } catch (error) {
    console.error("[v0] Error writing batch logs:", error)
  }
}

/**
 * Quick log helpers for common actions
 */
export async function logUserAction(
  companyId: string,
  userId: string,
  action: string,
  metadata?: Record<string, any>
): Promise<void> {
  return writeLog({
    companyId,
    collection: "logs_usuario",
    action,
    userId,
    metadata,
  })
}

export async function logCompanyAction(
  companyId: string,
  userId: string,
  action: string,
  oldValue?: any,
  newValue?: any,
  metadata?: Record<string, any>
): Promise<void> {
  return writeLog({
    companyId,
    collection: "logs_empresa",
    action,
    userId,
    oldValue,
    newValue,
    metadata,
  })
}

export async function logOperationalAction(
  companyId: string,
  userId: string,
  action: string,
  metadata?: Record<string, any>
): Promise<void> {
  return writeLog({
    companyId,
    collection: "logs_operativos",
    action,
    userId,
    metadata,
  })
}
