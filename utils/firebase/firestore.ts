// utils/firebase/firestore.ts
"use client"

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore"

import { firebaseApp } from "@/lib/firebase"

const dbClient = getFirestore(firebaseApp)

export {
  dbClient,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
}
