/**
 * Logging System
 *
 * Centralized logging for all user, company, and operational actions.
 * Now tracks before/after values for audit trails.
 */

import { setDocument } from "./db-operations";
import { sanitizeInput } from "../security/sanitize";

interface LogEntry {
  companyId: string;
  collection: string; // <-- corregido, antes era muy estricto y rompía el build
  action: string;
  userId: string;
  oldValue?: any;
  newValue?: any;
  metadata?: Record<string, any>;
}

/**
 * Writes a log entry to Firestore with full audit trail
 */
export async function writeLog(entry: LogEntry): Promise<void> {
  try {
    const logId = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Sanitize metadata
    const sanitizedMetadata =
      entry.metadata && typeof entry.metadata === "object"
        ? Object.entries(entry.metadata).reduce((acc, [key, value]) => {
            acc[key] =
              typeof value === "string" ? sanitizeInput(value) : value;
            return acc;
          }, {} as Record<string, any>)
        : {};

    const sanitizedOldValue =
      typeof entry.oldValue === "string"
        ? sanitizeInput(entry.oldValue)
        : entry.oldValue;

    const sanitizedNewValue =
      typeof entry.newValue === "string"
        ? sanitizeInput(entry.newValue)
        : entry.newValue;

    // Write log into EMPRESAS/{id}/{collection}/{logId}
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
    );
  } catch (error) {
    // Logging should NEVER break production
    console.error("[v0] Error writing log:", error);
  }
}

/**
 * Write multiple logs in batch
 */
export async function writeBatchLogs(entries: LogEntry[]): Promise<void> {
  try {
    await Promise.all(entries.map((entry) => writeLog(entry)));
  } catch (error) {
    console.error("[v0] Error writing batch logs:", error);
  }
}

/**
 * Helpers
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
  });
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
  });
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
  });
}
