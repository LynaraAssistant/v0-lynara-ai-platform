'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { authClient } from './firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  role: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: React.ReactNode) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<string>('user')

  useEffect(() => {
    if (!authClient) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(authClient, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        const userRole = localStorage.getItem(`user_role_${currentUser.uid}`) || 'user'
        setRole(userRole)
      } else {
        setRole('user')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, loading, error, role }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
