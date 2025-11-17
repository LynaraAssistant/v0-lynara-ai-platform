"use client";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";

import { firebaseApp } from "@/lib/firebase";

export const dbClient = getFirestore(firebaseApp);

export {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  DocumentData,
  QueryConstraint,
};
