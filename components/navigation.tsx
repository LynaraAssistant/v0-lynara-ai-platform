"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Qué es Lynara", href: "#about" },
  { label: "Automatizaciones IA", href: "#automations" },
  { label: "Planes y precios", href: "#pricing" },
  { label: "Preventa", href: "#waitlist" },
  { label: "Contacto", href: "#contact" },
]

export default function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Logo size="md" />
            <span className="font-bold text-xl text-foreground">Lynara</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLoginClick}
            className="hidden md:block px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Iniciar sesión
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border animate-slide-in">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleLoginClick()
                setIsOpen(false)
              }}
              className="w-full mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all"
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
