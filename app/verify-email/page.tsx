"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { resendVerificationEmail } from "@/utils/firebase/auth"
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    // Redirect if not logged in
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    // Redirect if already verified
    if (user?.emailVerified) {
      router.push("/dashboard")
      return
    }
  }, [user, authLoading, router])

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    if (!user || countdown > 0) return

    setSending(true)
    setMessage(null)

    try {
      await resendVerificationEmail(user)
      setMessage({
        type: "success",
        text: "Correo de verificación enviado exitosamente. Revisa tu bandeja de entrada.",
      })
      setCountdown(60) // 60 seconds cooldown
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Error al enviar el correo. Intenta de nuevo.",
      })
    } finally {
      setSending(false)
    }
  }

  const handleCheckVerification = () => {
    // Reload user to check verification status
    if (user) {
      user.reload().then(() => {
        if (user.emailVerified) {
          router.push("/dashboard")
        } else {
          setMessage({
            type: "error",
            text: "Tu correo aún no ha sido verificado. Por favor, verifica tu bandeja de entrada.",
          })
        }
      })
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center">
        <div className="animate-spin text-primary text-4xl">⏳</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001328] via-[#012b36] to-[#006184] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Verifica tu correo electrónico
            </h1>
            <p className="text-muted-foreground">
              Hemos enviado un correo de verificación a{" "}
              <strong>{user.email}</strong>
            </p>
          </div>

          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="mb-6"
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="mb-2">
                Para continuar, haz clic en el enlace que enviamos a tu correo.
              </p>
              <p>
                Si no ves el correo, revisa tu carpeta de spam o correo no deseado.
              </p>
            </div>

            <Button
              onClick={handleCheckVerification}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Ya verifiqué mi correo
            </Button>

            <Button
              onClick={handleResendEmail}
              variant="outline"
              className="w-full"
              disabled={sending || countdown > 0}
            >
              {sending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Enviando...
                </>
              ) : countdown > 0 ? (
                `Reenviar en ${countdown}s`
              ) : (
                "Reenviar correo de verificación"
              )}
            </Button>

            <Button
              onClick={() => router.push("/login")}
              variant="ghost"
              className="w-full"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
