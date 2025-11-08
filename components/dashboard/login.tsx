"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#eaf6ff] mb-2">Lynara</h1>
          <p className="text-[#96b5c7]">{isSignup ? "Crea tu cuenta" : "Inicia sesión en tu panel"}</p>
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
                required
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff] placeholder-[#96b5c7]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#eaf6ff] mb-2 block">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff] placeholder-[#96b5c7]"
              />
            </div>

            {!isSignup && (
              <div className="text-right">
                <a href="#" className="text-sm text-[#00a2ff] hover:text-[#00e1b4]">
                  ¿Has olvidado tu contraseña?
                </a>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#00e1b4] hover:bg-[#00c9a0] text-[#001328] font-semibold py-2 rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,225,180,0.4)]"
            >
              {isSignup ? "Registrarse" : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center text-[#96b5c7]">
            {isSignup ? (
              <>
                ¿Ya tienes cuenta?{" "}
                <button onClick={() => setIsSignup(false)} className="text-[#00e1b4] hover:text-[#00a2ff]">
                  Inicia sesión
                </button>
              </>
            ) : (
              <>
                ¿Aún no tienes cuenta?{" "}
                <button onClick={() => setIsSignup(true)} className="text-[#00e1b4] hover:text-[#00a2ff]">
                  Regístrate aquí
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
