/**
 * User Management Utilities
 *
 * Maneja todas las operaciones relacionadas con usuarios
 * con aislamiento correcto por empresa (multi-tenant).
 */

import {
  setDocument,
  getDocument,
  queryDocuments,
  where,
} from "./db-operations";
import { writeLog } from "./logging";
import type { UserData } from "@/lib/schemas/user.schema";

/**
 * Datos mínimos necesarios para crear un usuario.
 */
type CreateUserInput = Partial<UserData> & {
  email: string;
  role?: string;
};

/**
 * Crea un documento de usuario dentro de una empresa.
 *
 * Path: EMPRESAS/{companyId}/usuarios/{userId}
 */
export async function createUserDocument(
  companyId: string,
  userId: string,
  data: CreateUserInput
): Promise<void> {
  try {
    const now = new Date().toISOString();

    await setDocument(`EMPRESAS/${companyId}/usuarios/${userId}`, {
      ...data,
      role: data.role ?? "user",
      createdAt: now,
      updatedAt: now,
      emailVerified: false,
    });

    await writeLog({
      companyId,
      collection: "logs_usuario",
      action: "user_document_created",
      userId,
      metadata: {
        companyId,
        userId,
        email: data.email,
      },
    });
  } catch (error) {
    console.error("[v0] Error creating user document:", error);
    throw error;
  }
}

/**
 * Actualiza los datos de un usuario.
 *
 * NO modifica el emailVerified salvo que venga en `data`.
 */
export async function updateUser(
  companyId: string,
  userId: string,
  data: Partial<UserData>
): Promise<void> {
  try {
    const path = `EMPRESAS/${companyId}/usuarios/${userId}`;

    const oldData = (await getDocument(path)) as UserData | null;

    const updated: Partial<UserData> = {
      ...(oldData ?? {}),
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await setDocument(path, updated as any);

    await writeLog({
      companyId,
      collection: "logs_usuario",
      action: "user_updated",
      userId,
      metadata: {
        companyId,
        oldValue: oldData,
        newValue: updated,
      },
    });
  } catch (error) {
    console.error("[v0] Error updating user:", error);
    throw error;
  }
}

/**
 * Obtiene los datos de un usuario concreto de una empresa.
 */
export async function getUser(
  companyId: string,
  userId: string
): Promise<UserData | null> {
  try {
    const path = `EMPRESAS/${companyId}/usuarios/${userId}`;
    const data = (await getDocument(path)) as UserData | null;
    return data ?? null;
  } catch (error) {
    console.error("[v0] Error getting user:", error);
    throw error;
  }
}

/**
 * Busca el ID de empresa a partir del email de un usuario.
 *
 * Recorre todas las empresas y busca en la subcolección `usuarios`
 * un documento cuyo campo `email` coincida.
 *
 * OJO: esto no escala infinito, pero para pocas empresas va bien.
 */
export async function findCompanyByUserEmail(
  email: string
): Promise<string | null> {
  try {
    // 1) Listar todas las empresas
    const companies = await queryDocuments("EMPRESAS");

    // 2) Para cada empresa, buscar usuarios con ese email
    for (const company of companies) {
      const companyId = company.id ?? company.companyId ?? null;
      if (!companyId) continue;

      const users = await queryDocuments(
        `EMPRESAS/${companyId}/usuarios`,
        [where("email", "==", email)]
      );

      if (users.length > 0) {
        return companyId;
      }
    }

    return null;
  } catch (error) {
    console.error("[v0] Error finding company by user email:", error);
    return null;
  }
}
