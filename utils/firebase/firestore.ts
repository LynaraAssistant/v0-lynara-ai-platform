"use client";

/**
 * Módulo central para trabajar con Firestore usando el SDK de cliente.
 * No importa nada desde "firebase/auth".
 */

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

import { dbClient } from "@/lib/firebase"; // <- AHORA SÍ EXISTE

/**
 * Exporta helpers de Firestore + la instancia dbClient
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
