"use client"

import { useState } from "react"
import CompaniesTable from "./companies-table"
import UsersTable from "./users-table"
import AutomationsTable from "./automations-table"
import ToastContainer from "./toast-container"
import { useToast } from "@/lib/use-toast"

type TabType = "companies" | "users" | "automations"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>("companies")
  const { toasts, addToast, removeToast } = useToast()

  const tabs: Array<{ id: TabType; label: string }> = [
    { id: "companies", label: "Empresas" },
    { id: "users", label: "Usuarios" },
    { id: "automations", label: "Automatizaciones" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#eaf6ff]">Panel de Administración</h1>
          <p className="text-[#96b5c7] mt-2">Gestiona empresas, usuarios y automatizaciones</p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-4 border-b border-[#1a3a52]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? "border-[#00e1b4] text-[#00e1b4]"
                : "border-transparent text-[#96b5c7] hover:text-[#eaf6ff]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-[#0a1f35]/40 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6">
        {activeTab === "companies" && <CompaniesTable onToast={addToast} />}
        {activeTab === "users" && <UsersTable onToast={addToast} />}
        {activeTab === "automations" && <AutomationsTable onToast={addToast} />}
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
