"use client"

import { useState, useEffect } from "react"
import { Users, Building2, Activity, TrendingUp } from 'lucide-react'
import CompaniesTable from "./companies-table"
import UsersTable from "./users-table"
import { getPlatformStats } from "@/utils/firebase/admin"
import { Card } from "@/components/ui/card"

type TabType = "overview" | "companies" | "users"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalUsers: 0,
    activeCompanies: 0,
    recentSignups: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const platformStats = await getPlatformStats()
      setStats(platformStats)
    } catch (error) {
      console.error("Error loading stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const tabs: Array<{ id: TabType; label: string }> = [
    { id: "overview", label: "Resumen" },
    { id: "companies", label: "Empresas" },
    { id: "users", label: "Usuarios" },
  ]

  const statCards = [
    {
      title: "Total Empresas",
      value: stats.totalCompanies,
      icon: Building2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Usuarios",
      value: stats.totalUsers,
      icon: Users,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Empresas Activas",
      value: stats.activeCompanies,
      icon: Activity,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Nuevos Registros (7d)",
      value: stats.recentSignups,
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tu plataforma multi-tenant
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-4 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-20 bg-muted rounded"></div>
                </Card>
              ))
            ) : (
              statCards.map((stat, index) => (
                <Card key={index} className="p-6 border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Actividad Reciente
            </h3>
            <p className="text-muted-foreground text-sm">
              Próximamente: Vista de actividad en tiempo real de la plataforma
            </p>
          </Card>
        </div>
      )}

      {activeTab === "companies" && (
        <Card className="p-6">
          <CompaniesTable onStatsUpdate={loadStats} />
        </Card>
      )}

      {activeTab === "users" && (
        <Card className="p-6">
          <UsersTable />
        </Card>
      )}
    </div>
  )
}
