"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { dbClient } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { logCompanyAction, logUserAction } from "@/utils/firebase/logging";
import { sanitizeInput } from "@/utils/security/sanitize";
import { errorMonitor } from "@/lib/monitoring";

interface CompanyData {
  // Identity
  businessName?: string;
  sector?: string;
  communicationTone?: string;
  brandStyle?: string;
  // Business Context
  serviceType?: string;
  teamSize?: string;
  businessDescription?: string;
  // Operational
  businessHours?: string;
  timezone?: string;
  country?: string;
  city?: string;
  websiteUrl?: string;
  // Advanced
  customerTypes?: string;
  additionalContext?: string;
  [key: string]: any;
}

interface UserData {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  language?: string;
  [key: string]: any;
}

interface OperationalData {
  [key: string]: any;
}

interface FirestoreSyncReturn {
  companyData: CompanyData;
  userData: UserData;
  operationalData: OperationalData;
  updateUserField: (field: string, value: any) => Promise<void>;
  updateCompanyField: (field: string, value: any) => Promise<void>;
  loading: boolean;
  error: string | null;
  saveStatus: "idle" | "saving" | "saved" | "error";
}

export function useFirestoreSync(): FirestoreSyncReturn {
  const { user, companyId: authCompanyId } = useAuth();
  const [companyData, setCompanyData] = useState<CompanyData>({});
  const [userData, setUserData] = useState<UserData>({});
  const [operationalData, setOperationalData] = useState<OperationalData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const companyId = authCompanyId || (typeof window !== "undefined" ? localStorage.getItem("companyId") : null);
  const userId = user?.uid;

  useEffect(() => {
    if (!dbClient || !companyId) {
      setLoading(false);
      return;
    }

    try {
      const companyRef = doc(dbClient, "EMPRESAS", companyId);
      const unsubscribe = onSnapshot(
        companyRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setCompanyData(snapshot.data() as CompanyData);
          } else {
            setDoc(companyRef, {
              businessName: "",
              sector: "",
              createdAt: new Date().toISOString(),
            }).catch((err) => console.error("[v0] Error initializing company:", err));
          }
        },
        (err) => {
          console.error("[v0] Error listening to company data:", err);
          setError(err.message);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error("[v0] Error setting up company listener:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (!dbClient || !companyId || !userId) {
      setLoading(false);
      return;
    }

    try {
      const userRef = doc(dbClient, "EMPRESAS", companyId, "usuarios", userId);
      const unsubscribe = onSnapshot(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data() as UserData);
          } else {
            setDoc(userRef, {
              fullName: user?.displayName || "",
              email: user?.email || "",
              createdAt: new Date().toISOString(),
            }).catch((err) => console.error("[v0] Error initializing user:", err));
          }
        },
        (err) => {
          console.error("[v0] Error listening to user data:", err);
          setError(err.message);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error("[v0] Error setting up user listener:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [companyId, userId, user]);

  useEffect(() => {
    if (!dbClient || !companyId || !userId) {
      setLoading(false);
      return;
    }

    try {
      const operationalRef = doc(
        dbClient,
        "EMPRESAS",
        companyId,
        "datos_operativos",
        "estado_actual"
      );
      const unsubscribe = onSnapshot(
        operationalRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setOperationalData(snapshot.data() as OperationalData);
          }
          setLoading(false);
        },
        (err) => {
          console.error("[v0] Error listening to operational data:", err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error("[v0] Error setting up operational listener:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [companyId, userId]);

  const updateUserField = useCallback(
    async (field: string, value: any): Promise<void> => {
      if (!dbClient || !companyId || !userId) {
        console.warn("[v0] Cannot update: missing dbClient, companyId, or userId");
        return;
      }

      const sanitizedValue = typeof value === "string" ? sanitizeInput(value) : value;
      const oldValue = userData[field];

      setSaveStatus("saving");

      try {
        const userRef = doc(dbClient, "EMPRESAS", companyId, "usuarios", userId);
        await updateDoc(userRef, {
          [field]: sanitizedValue,
          updatedAt: new Date().toISOString(),
        });

        await logUserAction(companyId, userId, `update_${field}`, {
          field,
          oldValue,
          newValue: sanitizedValue,
        });

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err: any) {
        console.error(`[v0] Error updating user field ${field}:`, err);
        setError(err.message);
        setSaveStatus("error");
        
        errorMonitor.captureException(err, {
          tags: { operation: 'updateUserField', field },
          extra: { companyId, userId, value: sanitizedValue },
        });
        
        setTimeout(() => setSaveStatus("idle"), 3000);
        throw err;
      }
    },
    [dbClient, companyId, userId, userData]
  );

  const updateCompanyField = useCallback(
    async (field: string, value: any): Promise<void> => {
      if (!dbClient || !companyId) {
        console.warn("[v0] Cannot update: missing dbClient or companyId");
        return;
      }

      const sanitizedValue = typeof value === "string" ? sanitizeInput(value) : value;
      const oldValue = companyData[field];

      setSaveStatus("saving");

      try {
        const companyRef = doc(dbClient, "EMPRESAS", companyId);
        await updateDoc(companyRef, {
          [field]: sanitizedValue,
          updatedAt: new Date().toISOString(),
        });

        if (userId) {
          await logCompanyAction(companyId, userId, `update_${field}`, oldValue, sanitizedValue, {
            field,
          });
        }

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err: any) {
        console.error(`[v0] Error updating company field ${field}:`, err);
        setError(err.message);
        setSaveStatus("error");
        
        errorMonitor.captureException(err, {
          tags: { operation: 'updateCompanyField', field },
          extra: { companyId, userId, value: sanitizedValue },
        });
        
        setTimeout(() => setSaveStatus("idle"), 3000);
        throw err;
      }
    },
    [dbClient, companyId, userId, companyData]
  );

  return {
    companyData,
    userData,
    operationalData,
    updateUserField,
    updateCompanyField,
    loading,
    error,
    saveStatus,
  };
}
