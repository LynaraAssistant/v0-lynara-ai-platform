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
  companyId: string | null
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<string>('user')
  const [companyId, setCompanyId] = useState<string | null>(null)

  useEffect(() => {
    if (!authClient) {
      setLoading(false)
      return
    }

    try {
      const unsubscribe = onAuthStateChanged(
        authClient,
        (currentUser) => {
          setUser(currentUser)
          if (currentUser) {
            if (typeof window !== 'undefined') {
              const userRole = localStorage.getItem(`user_role_${currentUser.uid}`) || 'user'
              const userCompanyId = localStorage.getItem('companyId')
              setRole(userRole)
              setCompanyId(userCompanyId)
            }
          } else {
            setRole('user')
            setCompanyId(null)
          }
          setLoading(false)
        },
        (err) => {
          console.error('[v0] Auth state change error:', err)
          setError(err.message)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (err: any) {
      console.error('[v0] Error setting up auth listener:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  const logout = async () => {
    if (!authClient || !user) {
      console.warn('[v0] Cannot logout: no auth client or user')
      return
    }

    try {
      const { signOut } = await import('firebase/auth')
      await signOut(authClient)
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('companyId')
        localStorage.removeItem(`user_role_${user.uid}`)
      }
      
      console.log('[v0] Logout successful')
    } catch (err: any) {
      console.error('[v0] Logout error:', err)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, role, companyId, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
