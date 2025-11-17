"use client";

import {
  getFirestore,
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

import { firebaseApp } from "@/lib/firebase";

/**
 * Firestore client inicializado desde firebaseApp.
 * Este archivo SOLO reexporta funciones oficiales del SDK
 * y nunca crea wrappers personalizados que puedan romper el build.
 */

const dbClient = getFirestore(firebaseApp);

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
  type DocumentData,
  type QueryConstraint,
};
