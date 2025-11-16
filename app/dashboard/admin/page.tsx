"use client"

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/auth-context"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import AdminPanel from "@/components/admin/admin-panel"

export default function AdminPage() {
  const router = useRouter()
  const { user, loading, role } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (!user.emailVerified) {
        router.push("/verify-email")
      } else if (role !== "admin") {
        router.push("/dashboard")
      }
    }
  }, [user, loading, role, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-primary text-4xl mb-4">⏳</div>
          <p className="text-muted-foreground">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  if (!user || role !== "admin" || !user.emailVerified) {
    return null
  }

  return (
    <DashboardLayout>
      <AdminPanel />
    </DashboardLayout>
  )
}
