"use client"

import { useAuth } from "@/lib/auth-context"

export function WelcomeBanner() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches"

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-2">
        {greeting}, {user?.displayName || user?.email?.split("@")[0] || "Usuario"}
      </h2>
      <p className="text-muted-foreground">Bienvenido a Lynara AI, tu asistente automatizado de confianza.</p>
    </div>
  )
}
