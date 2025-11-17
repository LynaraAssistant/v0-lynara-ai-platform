"use client"

import {
  Home,
  TrendingUp,
  Zap,
  Brain,
  User,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { Logo } from "../logo"   // ✅ CORREGIDO — antes estaba mal

const menuItems = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "metrics", label: "Métricas", icon: TrendingUp },
  { id: "automatizaciones", label: "Automatizaciones", icon: Zap },
  { id: "ai-data", label: "Datos IA", icon: Brain },
  { id: "cuenta", label: "Cuenta", icon: User },
  { id: "support", label: "Soporte", icon: HelpCircle },
]

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
  onToggle: () => void
  role?: string
}

export default function Sidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onToggle,
  role,
}: SidebarProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    console.log("[v0] Sidebar logout button clicked")
    setIsLoggingOut(true)

    try {
      await logout()
      console.log("[v0] Logout successful, redirecting to home")
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] Logout error:", error)
      alert("Error al cerrar sesión. Por favor intenta de nuevo.")
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => {
          console.log("[v0] Mobile menu toggle clicked, current state:", isOpen)
          onToggle()
        }}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-all duration-200 hover:shadow-lg"
        aria-label="Toggle sidebar menu"
      >
        {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => {
            console.log("[v0] Sidebar overlay clicked, toggling sidebar")
            onToggle()
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static h-screen w-64 bg-card/80 backdrop-blur-xl border-r border-border transition-all duration-300 z-40 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-col h-full p-6">
          <div className="mb-12 mt-12 md:mt-0 flex items-center gap-2">
            <Logo size="sm" />
            <div>
              <h2 className="text-2xl font-bold text-primary">Lynara</h2>
              <p className="text-xs text-muted-foreground">Panel de Control</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    console.log("[v0] Sidebar navigation clicked:", item.id)
                    onSectionChange(item.id)
                    if (window.innerWidth < 768) onToggle()
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/40 shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}

            {/* Admin Section */}
            {role === "admin" && (
              <button
                onClick={() => {
                  console.log("[v0] Admin section clicked")
                  onSectionChange("admin")
                  if (window.innerWidth < 768) onToggle()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  activeSection === "admin"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/20"
                    : "text-muted-foreground hover:bg-muted hover:text-purple-400"
                }`}
              >
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Administración</span>
              </button>
            )}
          </nav>

          {/* User info + Logout */}
          <div className="pt-6 border-t border-border space-y-3">
            {user && (
              <div className="px-4 py-3 rounded-lg bg-muted/40 border border-border transition-colors">
                <p className="text-xs text-muted-foreground">Sesión activa</p>
                <p className="text-sm font-semibold text-primary truncate">{user.email}</p>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:text-destructive rounded-lg hover:bg-destructive/10 transition-all duration-200 border border-transparent hover:border-destructive/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-4 h-4" />
              <span>{isLoggingOut ? "Cerrando..." : "Cerrar sesión"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
