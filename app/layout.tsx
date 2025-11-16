import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { errorMonitor } from "@/lib/monitoring"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lynara - Automatización Inteligente con IA",
  description:
    "Lynara automatiza WhatsApp, llamadas, correos y embudos con IA. Centraliza tus flujos, ahorra tiempo y deja que la IA trabaje por ti.",
  generator: "v0.app",
}

if (typeof window !== 'undefined') {
  errorMonitor.init()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans antialiased dark`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
