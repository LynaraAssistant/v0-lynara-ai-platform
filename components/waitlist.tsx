"use client"

import type React from "react"
import { useState } from "react"
import { Mail, User, Building2, Phone, Check } from "lucide-react"

export default function Waitlist() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    if (!formData.company.trim()) newErrors.company = "La empresa es requerida"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", company: "", phone: "", email: "" })
      setSubmitted(false)
    }, 4000)
  }

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="animate-fade-in mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-foreground mb-4 text-balance">
            Preventa <span className="text-primary">Exclusiva Lynara</span>
          </h2>
          <p className="text-center text-muted-foreground text-pretty">
            Apúntate y consigue tu descuento de por vida antes del lanzamiento
          </p>
        </div>

        <div className="bg-card/60 backdrop-blur border border-border rounded-xl p-8 shadow-xl animate-slide-in-up">
          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-glow">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">¡Te hemos añadido a la preventa!</h3>
              <p className="text-muted-foreground">Te avisaremos del lanzamiento exclusivamente.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Nombre completo
                    </div>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground transition-all duration-200 ${
                      errors.name
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-border focus:border-primary focus:ring-primary/50"
                    } focus:outline-none focus:ring-1`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      Empresa
                    </div>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground transition-all duration-200 ${
                      errors.company
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-border focus:border-primary focus:ring-primary/50"
                    } focus:outline-none focus:ring-1`}
                    placeholder="Tu empresa"
                  />
                  {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Teléfono
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground transition-all duration-200 ${
                      errors.phone
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-border focus:border-primary focus:ring-primary/50"
                    } focus:outline-none focus:ring-1`}
                    placeholder="+34 600 000 000"
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email
                    </div>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground transition-all duration-200 ${
                      errors.email
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-border focus:border-primary focus:ring-primary/50"
                    } focus:outline-none focus:ring-1`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                Unirme a la preventa
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Tus datos están seguros. Solo los usaremos para avisarte del lanzamiento.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
