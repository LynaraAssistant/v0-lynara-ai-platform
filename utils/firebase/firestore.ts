// utils/firebase/firestore.ts
"use client";

import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";

import { dbClient } from "@/lib/firebase";

/**
 * Módulo central para trabajar con Firestore usando el SDK de cliente.
 * NO importa nada desde "firebase/auth".
 *
 * Exporta:
 *   - dbClient: instancia de Firestore ya inicializada
 *   - helpers: funciones típicas de Firestore y tipos asociados
 */
export {
  dbClient,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
};
