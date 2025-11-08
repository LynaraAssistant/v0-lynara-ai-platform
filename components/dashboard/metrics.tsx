"use client"

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Semana 1", contactos: 120, conversaciones: 45, citas: 15 },
  { name: "Semana 2", contactos: 145, conversaciones: 52, citas: 18 },
  { name: "Semana 3", contactos: 165, conversaciones: 68, citas: 22 },
  { name: "Semana 4", contactos: 190, conversaciones: 78, citas: 28 },
]

const conversionData = [
  { name: "Leads", value: 342 },
  { name: "Conversaciones", value: 128 },
  { name: "Citas", value: 45 },
]

const COLORS = ["#00e1b4", "#00a2ff", "#006184"]

export default function Metrics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#eaf6ff]">Análisis de Métricas</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6">
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4">Evolución Mensual</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a3a52" />
              <XAxis stroke="#96b5c7" />
              <YAxis stroke="#96b5c7" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a1f35",
                  border: "1px solid #1a3a52",
                }}
                labelStyle={{ color: "#eaf6ff" }}
              />
              <Legend />
              <Bar dataKey="contactos" fill="#00e1b4" />
              <Bar dataKey="conversaciones" fill="#00a2ff" />
              <Bar dataKey="citas" fill="#00c9a0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6">
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4">Embudo de Conversión</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={{ fill: "#eaf6ff" }}
                outerRadius={120}
                fill="#00e1b4"
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a1f35",
                  border: "1px solid #1a3a52",
                }}
                labelStyle={{ color: "#eaf6ff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "ROI Promedio", value: "320%", change: "+45%" },
          { title: "Tasa de Conversión", value: "12.8%", change: "+2.3%" },
          { title: "Costo por Conversión", value: "$8.50", change: "-15%" },
        ].map((stat, index) => (
          <div key={index} className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6">
            <p className="text-[#96b5c7] text-sm mb-2">{stat.title}</p>
            <p className="text-3xl font-bold text-[#eaf6ff]">{stat.value}</p>
            <p className="text-sm text-[#00e1b4] mt-2">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
