// utils/firebase/firestore.ts
"use client";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  type DocumentData,
  type QueryConstraint,
  serverTimestamp,
} from "firebase/firestore";

import { dbClient } from "@/lib/firebase";

/**
 * Este módulo es un punto central para trabajar con Firestore.
 * Solo usa el SDK de cliente y NUNCA importa nada desde "firebase/auth".
 * 
 * Exporta:
 * - dbClient: instancia de Firestore ya inicializada
 * - helpers: funciones típicas de Firestore y tipos asociados
 */

export {
  dbClient,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  DocumentData,
  QueryConstraint,
  serverTimestamp,
};

// Additional helper functions can be added here if needed
