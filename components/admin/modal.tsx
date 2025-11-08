"use client"

import { X } from "lucide-react"
import type React from "react"

interface ModalProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  onSave?: () => void
  isSaving?: boolean
}

export default function Modal({ isOpen, title, children, onClose, onSave, isSaving }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-[#0a1f35]/95 border border-[#1a3a52] rounded-xl shadow-2xl max-w-2xl w-full animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-[#1a3a52]">
          <h2 className="text-xl font-bold text-[#eaf6ff]">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#1a3a52] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#96b5c7]" />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#1a3a52]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1a3a52] text-[#eaf6ff] hover:bg-[#2a4a62] transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          {onSave && (
            <button
              onClick={onSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-[#00e1b4] text-[#001328] hover:bg-[#00d9a8] transition-colors text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
