'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { dbClient } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';

interface FirestoreSyncData {
  companyData: Record<string, any>;
  userData: Record<string, any>;
  operationalData: Record<string, any>;
  updateUserField: (field: string, value: any) => Promise<void>;
  updateCompanyField: (field: string, value: any) => Promise<void>;
  loading: boolean;
}

export function useFirestoreSync(): FirestoreSyncData {
  const { user } = useAuth();
  const [companyData, setCompanyData] = useState<Record<string, any>>({});
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [operationalData, setOperationalData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  // Get companyId from localStorage (set during login/registration)
  const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') : null;
  const userId = user?.uid;

  // Listen to company data in real-time
  useEffect(() => {
    if (!dbClient || !companyId) {
      setLoading(false);
      return;
    }

    const companyRef = doc(dbClient, 'EMPRESAS', companyId);
    const unsubscribe = onSnapshot(
      companyRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setCompanyData(snapshot.data() || {});
        }
      },
      (error) => {
        console.error('Error listening to company data:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [companyId]);

  // Listen to user data in real-time
  useEffect(() => {
    if (!dbClient || !companyId || !userId) {
      setLoading(false);
      return;
    }

    const userRef = doc(dbClient, 'EMPRESAS', companyId, 'usuarios', userId);
    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.data() || {});
        }
      },
      (error) => {
        console.error('Error listening to user data:', error);
      }
    );

    return () => unsubscribe();
  }, [companyId, userId]);

  // Listen to operational data in real-time
  useEffect(() => {
    if (!dbClient || !companyId || !userId) {
      setLoading(false);
      return;
    }

    const operationalRef = doc(
      dbClient,
      'EMPRESAS',
      companyId,
      'usuarios',
      userId,
      'datos_operativos',
      'estado_actual'
    );
    const unsubscribe = onSnapshot(
      operationalRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setOperationalData(snapshot.data() || {});
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to operational data:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [companyId, userId]);

  // Update user field
  const updateUserField = async (field: string, value: any) => {
    if (!dbClient || !companyId || !userId) {
      console.warn('Cannot update: missing dbClient, companyId, or userId');
      return;
    }

    try {
      const userRef = doc(dbClient, 'EMPRESAS', companyId, 'usuarios', userId);
      await updateDoc(userRef, { [field]: value });
    } catch (error) {
      console.error(`Error updating user field ${field}:`, error);
    }
  };

  // Update company field
  const updateCompanyField = async (field: string, value: any) => {
    if (!dbClient || !companyId) {
      console.warn('Cannot update: missing dbClient or companyId');
      return;
    }

    try {
      const companyRef = doc(dbClient, 'EMPRESAS', companyId);
      await updateDoc(companyRef, { [field]: value });
    } catch (error) {
      console.error(`Error updating company field ${field}:`, error);
    }
  };

  return {
    companyData,
    userData,
    operationalData,
    updateUserField,
    updateCompanyField,
    loading,
  };
}
