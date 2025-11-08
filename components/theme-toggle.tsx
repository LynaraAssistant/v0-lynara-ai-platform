"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/use-theme"

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) return null

  return (
    <button
      onClick={() => toggleTheme()}
      className="relative inline-flex items-center justify-center p-2 rounded-lg border border-border bg-card hover:bg-muted transition-all duration-200 group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 group-hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 transition-transform duration-300 group-hover:-rotate-90" />
      )}
    </button>
  )
}
