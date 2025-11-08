"use client"

import { useState } from "react"
import { Edit2, Trash2, Search } from "lucide-react"
import Modal from "./modal"
import { mockUsers } from "@/lib/mock-data"

interface UsersTableProps {
  onToast: (message: string, type: "success" | "error" | "info") => void
}

export default function UsersTable({ onToast }: UsersTableProps) {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState({ name: "", email: "", role: "", company: "" })

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (user: (typeof users)[0]) => {
    setEditingId(user.id)
    setEditFormData(user)
  }

  const handleSaveEdit = () => {
    setUsers(users.map((u) => (u.id === editingId ? { ...u, ...editFormData } : u)))
    setEditingId(null)
    onToast("Usuario actualizado correctamente", "success")
  }

  const handleDelete = () => {
    onToast("Acción de eliminar activada (datos no eliminados)", "info")
  }

  const roleColors: Record<string, string> = {
    admin: "bg-purple-500/20 text-purple-300",
    user: "bg-blue-500/20 text-blue-300",
  }

  return (
    <div className="space-y-4">
      <div className="flex-1 max-w-sm relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#96b5c7]" />
        <input
          type="text"
          placeholder="Buscar usuarios..."
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
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Email</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Rol</th>
              <th className="text-left px-4 py-3 text-[#96b5c7] font-semibold text-sm">Empresa</th>
              <th className="text-right px-4 py-3 text-[#96b5c7] font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-[#1a3a52]/50 hover:bg-[#1a3a52]/20 transition-colors">
                <td className="px-4 py-3 text-[#eaf6ff]">{user.name}</td>
                <td className="px-4 py-3 text-[#96b5c7] text-sm">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${roleColors[user.role] || ""}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#96b5c7] text-sm">{user.company}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user)}
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
        title="Editar Usuario"
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
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Email</label>
            <input
              type="email"
              value={editFormData.email}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#eaf6ff] mb-2">Rol</label>
            <select
              value={editFormData.role}
              onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a3a52]/40 border border-[#1a3a52] rounded-lg text-[#eaf6ff] focus:outline-none focus:border-[#00e1b4] transition-colors"
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
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
        </div>
      </Modal>
    </div>
  )
}
