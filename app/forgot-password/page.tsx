"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendPasswordReset } from "@/utils/firebase/auth"
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { z } from "zod"

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Debe ser un correo electrónico válido")
    .toLowerCase()
    .trim(),
})

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate input
      const validatedData = emailSchema.parse({ email })

      // Send reset email
      await sendPasswordReset(validatedData.email)

      setSuccess(true)
    } catch (err: any) {
      if (err.errors) {
        // Zod validation error
        setError(err.errors[0]?.message || "Datos inválidos")
      } else {
        setError(err.message || "Error al enviar el correo de recuperación")
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Correo enviado
              </h1>
              <p className="text-muted-foreground">
                Hemos enviado un correo electrónico a <strong>{email}</strong> con
                instrucciones para restablecer tu contraseña.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Volver al inicio de sesión
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                ¿No recibiste el correo?{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-primary hover:underline"
                >
                  Intentar de nuevo
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Recuperar contraseña
            </h1>
            <p className="text-muted-foreground">
              Ingresa tu correo electrónico y te enviaremos instrucciones para
              restablecer tu contraseña.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Enviando...
                </>
              ) : (
                "Enviar correo de recuperación"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Recordaste tu contraseña?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
