"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, Search } from "lucide-react"
import Modal from "./modal"
import { mockCompanies } from "@/lib/mock-data"

interface CompaniesTableProps {
  onToast: (message: string, type: "success" | "error" | "info") => void
}

export default function CompaniesTable({ onToast }: CompaniesTableProps) {
  const [companies, setCompanies] = useState(mockCompanies)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({ name: "", plan: "", status: "", domain: "" })

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (company: (typeof companies)[0]) => {
    setEditingId(company.id)
    setEditFormData(company)
  }

  const handleSaveEdit = () => {
    setCompanies(companies.map((c) => (c.id === editingId ? { ...c, ...editFormData } : c)))
    setEditingId(null)
    onToast("Empresa actualizada correctamente", "success")
  }

  const handleCreateNew = () => {
    const newCompany = {
      id: Date.now().toString(),
      ...editFormData,
    }
    setCompanies([...companies, newCompany])
    setEditFormData({ name: "", plan: "", status: "", domain: "" })
    setIsCreateOpen(false)
    onToast("Empresa creada correctamente", "success")
  }

  const handleDelete = (id: string) => {
    // Visual placeholder - data not actually deleted
    onToast("Acción de eliminar activada (datos no eliminados)", "info")
  }

  const planColors: Record<string, string> = {
    starter: "bg-blue-500/20 text-blue-300",
    pro: "bg-emerald-500/20 text-emerald-300",
    enterprise: "bg-purple-500/20 text-purple-300",
  }

  const statusColors: Record<string, string> = {
    active: "bg-emerald-500/20 text-emerald-300",
    suspended: "bg-red-500/20 text-red-300",
    inactive: "bg-gray-500/20 text-gray-300",
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#96b5c7]" />
          <input
            type="text"
            placeholder="Buscar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] placeholder-[#96b5c7] focus:outline-none focus:border-[#00e1b4] transition-colors"
          />
        </div>
        <button
          onClick={() => {
            setEditFormData({ name: "", plan: "", status: "", domain: "" })
            setIsCreateOpen(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#00e1b4] text-[#001328] rounded-lg hover:bg-[#00d9a8] transition-colors font-semibold text-sm ml-4"
        >
          <Plus className="w-4 h-4" />
          Nueva Empresa
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a3a52]">
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Nombre</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Plan</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Estado</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Dominio</th>
              <th className="text-right px-4 py-3 text-[#96b5c7] font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="border-b border-[#1a3a52]/50 hover:bg-[#1a3a52]/20 transition-colors">
                <td className="px-4 py-3 text-[#eaf6ff]">{company.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${planColors[company.plan] || ""}`}>
                    {company.plan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[company.status] || ""}`}>
                    {company.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#96b5c7] text-sm">{company.domain}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(company)}
                      className="p-2 hover:bg-[#1a3a52] rounded-lg transition-colors text-[#00e1b4]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
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
        title="Editar Empresa"
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
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Plan</label>
            <select
              value={editFormData.plan}
              onChange={(e) => setEditFormData({ ...editFormData, plan: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            >
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Estado</label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            >
              <option value="active">Activo</option>
              <option value="suspended">Suspendido</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Dominio</label>
            <input
              type="text"
              value={editFormData.domain}
              onChange={(e) => setEditFormData({ ...editFormData, domain: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCreateOpen}
        title="Crear Nueva Empresa"
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateNew}
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
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Plan</label>
            <select
              value={editFormData.plan}
              onChange={(e) => setEditFormData({ ...editFormData, plan: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            >
              <option value="">Selecciona un plan</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Estado</label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            >
              <option value="">Selecciona un estado</option>
              <option value="active">Activo</option>
              <option value="suspended">Suspendido</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Dominio</label>
            <input
              type="text"
              value={editFormData.domain}
              onChange={(e) => setEditFormData({ ...editFormData, domain: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
