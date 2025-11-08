"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
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
      } else if (role !== "admin") {
        router.push("/dashboard")
      }
    }
  }, [user, loading, role, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#1a3a52] border-t-[#00e1b4] animate-spin mx-auto"></div>
          <p className="text-[#96b5c7] mt-4">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  if (!user || role !== "admin") {
    return null
  }

  return (
    <DashboardLayout activeSection="admin" onSectionChange={() => {}}>
      <AdminPanel />
    </DashboardLayout>
  )
}
