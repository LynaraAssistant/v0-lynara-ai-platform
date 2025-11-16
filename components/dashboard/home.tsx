"use client"

import { useRouter } from 'next/navigation'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Phone, Mail, Calendar, Clock, Zap } from 'lucide-react'
import { WelcomeBanner } from "./welcome-banner"

const metricsData = [
  { name: "Lun", valor: 65 },
  { name: "Mar", valor: 78 },
  { name: "Mié", valor: 90 },
  { name: "Jue", valor: 81 },
  { name: "Vie", valor: 95 },
  { name: "Sab", valor: 72 },
  { name: "Dom", valor: 88 },
]

const metrics = [
  { label: "Leads contactados", value: "342", change: "+12%", icon: TrendingUp, color: "from-primary" },
  { label: "Conversaciones iniciadas", value: "128", change: "+8%", icon: Zap, color: "from-blue-500" },
  { label: "Llamadas atendidas", value: "45", change: "+15%", icon: Phone, color: "from-emerald-500" },
  { label: "Correos respondidos", value: "198", change: "+5%", icon: Mail, color: "from-secondary" },
  { label: "Citas generadas", value: "28", change: "+23%", icon: Calendar, color: "from-primary" },
  { label: "Horas ahorradas", value: "156", change: "+30%", icon: Clock, color: "from-blue-500" },
]

export default function Home() {
  const router = useRouter()

  const handleQuickAction = (action: string) => {
    console.log("[v0] Quick action clicked:", action)
    router.push(`/dashboard?section=${action}`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <WelcomeBanner onQuickActionClick={handleQuickAction} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div
              key={index}
              className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} to-transparent opacity-20 group-hover:opacity-40 transition-all`}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-sm text-primary font-semibold">{metric.change} esta semana</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-4">Tendencia de Actividad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-4">Rendimiento Diario</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Bar dataKey="valor" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-4">Tasa de Conversión</h3>
          <div className="space-y-4">
            {[
              { name: "Leads a Conversaciones", percentage: 73 },
              { name: "Conversaciones a Citas", percentage: 45 },
              { name: "Citas a Ventas", percentage: 68 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground text-sm">{item.name}</span>
                  <span className="text-primary font-semibold">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-4">Resumen Semanal</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Automatizaciones activas:</span>
              <span className="text-primary font-semibold">7 de 7</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Errores detectados:</span>
              <span className="text-secondary font-semibold">0</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tiempo de respuesta promedio:</span>
              <span className="text-primary font-semibold">2.3s</span>
            </div>
            <div className="flex justify-between text-muted-foreground pt-3 border-t border-border">
              <span>Porcentaje automatizado:</span>
              <span className="text-primary font-semibold">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
