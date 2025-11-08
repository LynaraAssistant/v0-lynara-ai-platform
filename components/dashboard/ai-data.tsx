"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

export default function AIData() {
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "Mi Negocio",
    sector: "Tecnología",
    communicationTone: "Profesional",
    brandStyle: "Innovador y moderno",
    serviceType: "SaaS",
    businessDescription: "Plataforma de automatización con IA",
    teamSize: "5",
    targetAudience: "Empresas",
    preferredLanguages: "Español, Inglés",
    communicationPriority: "Correos",
    businessHours: "9:00 - 18:00",
    timezone: "UTC-5",
    country: "Colombia",
    city: "Bogotá",
    websiteUrl: "https://example.com",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-[#eaf6ff] mb-2">Configuración de Datos IA</h2>
        <p className="text-[#96b5c7]">Personaliza cómo tus automatizaciones interactúan con tus clientes</p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 p-4 bg-[#00e1b4]/10 border border-[#00e1b4]/40 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-[#00e1b4]" />
          <span className="text-[#00e1b4] font-semibold">
            Configuración actualizada. Tus automatizaciones ahora hablarán como tu marca.
          </span>
        </div>
      )}

      <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6 space-y-6">
        {/* Identity Section */}
        <div>
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4 pb-2 border-b border-[#1a3a52]">Identidad de Marca</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Nombre comercial</Label>
              <Input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Sector</Label>
              <Input
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Tono de comunicación</Label>
              <select
                name="communicationTone"
                value={formData.communicationTone}
                onChange={(e) => setFormData((prev) => ({ ...prev, communicationTone: e.target.value }))}
                className="w-full px-3 py-2 bg-[#0a1f35] border border-[#1a3a52] text-[#eaf6ff] rounded-lg"
              >
                <option>Profesional</option>
                <option>Cercano y amable</option>
                <option>Directo y comercial</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Lenguaje o estilo de marca</Label>
              <Input
                name="brandStyle"
                value={formData.brandStyle}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
        </div>

        {/* Business Context Section */}
        <div>
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4 pb-2 border-b border-[#1a3a52]">Contexto de Negocio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Tipo de servicio o producto</Label>
              <Input
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Tamaño del equipo</Label>
              <Input
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-[#eaf6ff] mb-2 block">Descripción del negocio</Label>
              <Textarea
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Operational Parameters Section */}
        <div>
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4 pb-2 border-b border-[#1a3a52]">
            Parámetros Operativos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Horario de atención</Label>
              <Input
                name="businessHours"
                value={formData.businessHours}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Zona horaria</Label>
              <Input
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">País</Label>
              <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Ciudad</Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-[#eaf6ff] mb-2 block">URL de sitio web</Label>
              <Input
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-[#1a3a52]">
          <Button onClick={handleSave} className="bg-[#00e1b4] hover:bg-[#00c9a0] text-[#001328] font-semibold">
            Guardar configuración IA
          </Button>
        </div>
      </div>
    </div>
  )
}
