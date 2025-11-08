"use client"

import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<string>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") || "dark"
    setTheme(stored)
    document.documentElement.classList.toggle("light", stored === "light")
    document.documentElement.classList.toggle("dark", stored === "dark")
  }, [])

  const toggleTheme = (newTheme?: string) => {
    const next = newTheme || (theme === "dark" ? "light" : "dark")
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("light", next === "light")
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  return { theme, toggleTheme, mounted }
}
