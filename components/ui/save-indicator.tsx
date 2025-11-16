/**
 * Save Indicator Component
 * 
 * Visual feedback for auto-save operations
 */

"use client"

import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

interface SaveIndicatorProps {
  status: "idle" | "saving" | "saved" | "error"
  message?: string
}

export function SaveIndicator({ status, message }: SaveIndicatorProps) {
  if (status === "idle") return null

  return (
    <div className="inline-flex items-center gap-2 text-sm animate-fade-in">
      {status === "saving" && (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span className="text-muted-foreground">Guardando...</span>
        </>
      )}
      {status === "saved" && (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-500">Guardado</span>
        </>
      )}
      {status === "error" && (
        <>
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-destructive">{message || "Error al guardar"}</span>
        </>
      )}
    </div>
  )
}
