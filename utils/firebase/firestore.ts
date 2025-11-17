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
import { writeLog } from "./logging";

/**
 * Helpers centralizados para Firestore
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
