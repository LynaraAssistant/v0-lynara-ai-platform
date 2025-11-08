"use client"
import { X, AlertCircle, CheckCircle, Info } from "lucide-react"
import type { Toast } from "@/lib/use-toast"

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-auto">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-xl border animate-fade-in max-w-sm ${
            toast.type === "success"
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
              : toast.type === "error"
                ? "bg-red-500/20 border-red-500/40 text-red-300"
                : "bg-blue-500/20 border-blue-500/40 text-blue-300"
          }`}
        >
          {toast.type === "success" && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === "info" && <Info className="w-5 h-5 flex-shrink-0" />}
          <span className="text-sm font-medium flex-1">{toast.message}</span>
          <button onClick={() => onRemove(toast.id)} className="hover:opacity-70 transition-opacity flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
