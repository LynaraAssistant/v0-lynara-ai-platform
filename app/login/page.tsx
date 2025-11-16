'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authClient } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(authClient, email, password)
      const companyId = localStorage.getItem('companyId') || 'default-company'
      localStorage.setItem('companyId', companyId)
      router.push('/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#1a3a52] border-t-[#00e1b4] animate-spin mx-auto"></div>
          <p className="text-[#96b5c7] mt-4">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#eaf6ff] mb-2">Lynara</h1>
          <p className="text-[#96b5c7]">Inicia sesión en tu panel</p>
        </div>

        <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#eaf6ff] mb-2 block">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff] placeholder-[#96b5c7]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#eaf6ff] mb-2 block">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff] placeholder-[#96b5c7]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#96b5c7] hover:text-[#00e1b4]"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00e1b4] hover:bg-[#00c9a0] text-[#001328] font-semibold py-2 rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,225,180,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center text-[#96b5c7]">
            ¿Aún no tienes cuenta?{' '}
            <Link href="/register" className="text-[#00e1b4] hover:text-[#00a2ff] font-semibold">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
