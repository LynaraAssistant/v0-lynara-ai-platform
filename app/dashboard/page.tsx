"use client"

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import Home from "@/components/dashboard/home"
import Metrics from "@/components/dashboard/metrics"
import Automations from "@/components/dashboard/automations"
import AIData from "@/components/dashboard/ai-data"
import Account from "@/components/dashboard/account"
import Support from "@/components/dashboard/support"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, role } = useAuth()
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#1a3a52] border-t-[#00e1b4] animate-spin mx-auto"></div>
          <p className="text-[#96b5c7] mt-4">Cargando panel...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      role={role}
    >
      {activeSection === "home" && <Home />}
      {activeSection === "metrics" && <Metrics />}
      {activeSection === "automations" && <Automations />}
      {activeSection === "ai-data" && <AIData />}
      {activeSection === "account" && <Account />}
      {activeSection === "support" && <Support />}
    </DashboardLayout>
  )
}
