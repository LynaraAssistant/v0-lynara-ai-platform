'use client'

import { Menu, LogOut, Sun, Moon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'
import { useTheme } from '@/lib/use-theme'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { theme, toggleTheme, mounted } = useTheme()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    console.log("[v0] Header logout button clicked")
    setIsLoggingOut(true)
    try {
      await logout()
      window.location.href = '/'
    } catch (error) {
      console.error('[v0] Logout error:', error)
      alert('Error al cerrar sesión. Por favor intenta de nuevo.')
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-card/50 backdrop-blur-xl border-b border-border p-6 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Panel de Control</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bienvenido, {user?.displayName || user?.email || 'Usuario'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => {
                console.log("[v0] Theme toggle clicked, current theme:", theme)
                toggleTheme()
              }}
              className="hidden sm:flex items-center justify-center p-2 rounded-lg border border-border hover:bg-muted transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          )}

          <button
            onClick={() => {
              console.log("[v0] Header logout button clicked")
              handleLogout()
            }}
            disabled={isLoggingOut}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive hover:text-destructive transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-destructive/30"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">{isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}</span>
          </button>
          <button onClick={() => {
            console.log("[v0] Mobile menu button clicked")
            onMenuClick()
          }} className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
            <Menu className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </header>
  )
}
