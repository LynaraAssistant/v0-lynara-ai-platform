"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Clock, MessageSquare, Calendar, Settings, LogOut } from "lucide-react"
import { useState } from "react"

const mockData = [
  { name: "Lun", conversations: 45, bookings: 12 },
  { name: "Mar", conversations: 52, bookings: 15 },
  { name: "Mié", conversations: 48, bookings: 13 },
  { name: "Jue", conversations: 61, bookings: 18 },
  { name: "Vie", conversations: 55, bookings: 16 },
  { name: "Sab", conversations: 42, bookings: 10 },
  { name: "Dom", conversations: 38, bookings: 8 },
]

export default function Dashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001328] via-[#012b36] to-[#006184]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-primary-foreground">
                L
              </div>
              <span className="font-bold text-xl text-foreground">Lynara</span>
              <span className="text-muted-foreground text-sm ml-4">Panel Lynara Assistant</span>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline text-sm">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-8">
        {/* Metrics Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active Conversations */}
            <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-muted-foreground">Conversaciones activas</h3>
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">247</div>
              <p className="text-sm text-muted-foreground mt-2">+12% vs. semana pasada</p>
            </div>

            {/* Confirmed Appointments */}
            <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-muted-foreground">Citas confirmadas</h3>
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">89</div>
              <p className="text-sm text-muted-foreground mt-2">+8% vs. semana pasada</p>
            </div>

            {/* Time Saved */}
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur border border-accent/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-muted-foreground">Tiempo ahorrado</h3>
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">142.5</div>
              <p className="text-sm text-muted-foreground mt-2">horas</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Conversaciones vs Citas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A3A52" />
                <XAxis dataKey="name" stroke="#96B5C7" />
                <YAxis stroke="#96B5C7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A1F35",
                    border: "1px solid #1A3A52",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#EAF6FF" }}
                />
                <Bar dataKey="conversations" fill="#00E1B4" />
                <Bar dataKey="bookings" fill="#006184" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Tendencia de conversiones</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A3A52" />
                <XAxis dataKey="name" stroke="#96B5C7" />
                <YAxis stroke="#96B5C7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A1F35",
                    border: "1px solid #1A3A52",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#EAF6FF" }}
                />
                <Line type="monotone" dataKey="bookings" stroke="#00E1B4" strokeWidth={2} dot={{ fill: "#00E1B4" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-6 text-lg">Accesos rápidos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: MessageSquare, label: "Automatizaciones", color: "text-accent" },
                { icon: Calendar, label: "Suscripción", color: "text-accent" },
                { icon: Settings, label: "Cuenta y configuración", color: "text-accent" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <button
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left group"
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-foreground group-hover:text-accent transition-colors">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
