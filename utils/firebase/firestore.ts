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
 *  - dbClient: instancia de Firestore ya inicializada
 *  - helpers: funciones típicas de Firestore y tipos asociados
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
  serverTimestamp,
};

export type { DocumentData, QueryConstraint };
