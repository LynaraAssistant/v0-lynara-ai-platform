"use client"

import { useState } from "react"
import { Edit2, Trash2, Search } from "lucide-react"
import Modal from "./modal"
import { mockAutomations } from "@/lib/mock-data"

interface AutomationsTableProps {
  onToast: (message: string, type: "success" | "error" | "info") => void
}

export default function AutomationsTable({ onToast }: AutomationsTableProps) {
  const [automations, setAutomations] = useState(mockAutomations)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState({ name: "", company: "", status: "" })

  const filteredAutomations = automations.filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleEdit = (automation: (typeof automations)[0]) => {
    setEditingId(automation.id)
    setEditFormData({ name: automation.name, company: automation.company, status: automation.status })
  }

  const handleSaveEdit = () => {
    setAutomations(
      automations.map((a) => (a.id === editingId ? { ...a, ...editFormData, lastExecution: a.lastExecution } : a)),
    )
    setEditingId(null)
    onToast("Automatización actualizada correctamente", "success")
  }

  const handleDelete = () => {
    onToast("Acción de eliminar activada (datos no eliminados)", "info")
  }

  const statusColors: Record<string, string> = {
    running: "bg-blue-500/20 text-blue-300",
    completed: "bg-emerald-500/20 text-emerald-300",
    error: "bg-red-500/20 text-red-300",
    paused: "bg-yellow-500/20 text-yellow-300",
  }

  return (
    <div className="space-y-4">
      <div className="flex-1 max-w-sm relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#96b5c7]" />
        <input
          type="text"
          placeholder="Buscar automatizaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] placeholder-[#96b5c7] focus:outline-none focus:border-[#00e1b4] transition-colors"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a3a52]">
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Nombre</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Empresa</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Estado</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Última Ejecución</th>
              <th className="text-right px-4 py-3 text-[#96b5c7] font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAutomations.map((automation) => (
              <tr key={automation.id} className="border-b border-[#1a3a52]/50 hover:bg-[#1a3a52]/20 transition-colors">
                <td className="px-4 py-3 text-[#eaf6ff]">{automation.name}</td>
                <td className="px-4 py-3 text-[#96b5c7] text-sm">{automation.company}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      statusColors[automation.status] || "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {automation.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#96b5c7] text-sm">{automation.lastExecution}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(automation)}
                      className="p-2 hover:bg-[#1a3a52] rounded-lg transition-colors text-[#00e1b4]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 hover:bg-[#1a3a52] rounded-lg transition-colors text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={editingId !== null}
        title="Editar Automatización"
        onClose={() => setEditingId(null)}
        onSave={handleSaveEdit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Nombre</label>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Empresa</label>
            <input
              type="text"
              value={editFormData.company}
              onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Estado</label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            >
              <option value="running">En ejecución</option>
              <option value="completed">Completado</option>
              <option value="error">Error</option>
              <option value="paused">Pausado</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
