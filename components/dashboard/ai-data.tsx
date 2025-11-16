'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useFirestoreSync } from '@/hooks/useFirestoreSync'
import { SaveIndicator } from '@/components/ui/save-indicator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function AIData() {
  const { companyData, updateCompanyField, loading, error, saveStatus } = useFirestoreSync()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00e1b4]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#eaf6ff] mb-2">Configuración de Datos IA</h2>
          <p className="text-[#96b5c7]">Personaliza cómo tus automatizaciones interactúan con tus clientes</p>
        </div>
        <SaveIndicator status={saveStatus} />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6 space-y-6">
        {/* Identity Section */}
        <div>
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4 pb-2 border-b border-[#1a3a52]">Identidad de Marca</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName" className="text-[#eaf6ff] mb-2 block">Nombre comercial</Label>
              <Input
                id="businessName"
                aria-label="Nombre del negocio"
                value={companyData?.businessName ?? ""}
                onChange={(e) => updateCompanyField("businessName", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label htmlFor="sector" className="text-[#eaf6ff] mb-2 block">Sector</Label>
              <Input
                id="sector"
                aria-label="Sector del negocio"
                value={companyData?.sector ?? ""}
                onChange={(e) => updateCompanyField("sector", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label htmlFor="communicationTone" className="text-[#eaf6ff] mb-2 block">Tono de comunicación</Label>
              <Select
                value={companyData?.communicationTone ?? "Profesional"}
                onValueChange={(value) => updateCompanyField("communicationTone", value)}
              >
                <SelectTrigger id="communicationTone" aria-label="Seleccionar tono de comunicación" className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]">
                  <SelectValue placeholder="Selecciona el tono" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Profesional">Profesional</SelectItem>
                  <SelectItem value="Cercano y amable">Cercano y amable</SelectItem>
                  <SelectItem value="Directo y comercial">Directo y comercial</SelectItem>
                  <SelectItem value="Personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brandStyle" className="text-[#eaf6ff] mb-2 block">Lenguaje o estilo de marca</Label>
              <Input
                id="brandStyle"
                aria-label="Estilo de marca"
                value={companyData?.brandStyle ?? ""}
                onChange={(e) => updateCompanyField("brandStyle", e.target.value)}
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
              <Label htmlFor="serviceType" className="text-[#eaf6ff] mb-2 block">Tipo de servicio o producto</Label>
              <Input
                id="serviceType"
                aria-label="Tipo de servicio o producto"
                value={companyData?.serviceType ?? ""}
                onChange={(e) => updateCompanyField("serviceType", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label htmlFor="teamSize" className="text-[#eaf6ff] mb-2 block">Tamaño del equipo</Label>
              <Input
                id="teamSize"
                aria-label="Tamaño del equipo"
                value={companyData?.teamSize ?? ""}
                onChange={(e) => updateCompanyField("teamSize", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="businessDescription" className="text-[#eaf6ff] mb-2 block">Descripción del negocio</Label>
              <Textarea
                id="businessDescription"
                aria-label="Descripción del negocio"
                value={companyData?.businessDescription ?? ""}
                onChange={(e) => updateCompanyField("businessDescription", e.target.value)}
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
              <Label htmlFor="businessHours" className="text-[#eaf6ff] mb-2 block">Horario de atención</Label>
              <Input
                id="businessHours"
                aria-label="Horario de atención"
                value={companyData?.businessHours ?? ""}
                onChange={(e) => updateCompanyField("businessHours", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label htmlFor="timezone" className="text-[#eaf6ff] mb-2 block">Zona horaria</Label>
              <Input
                id="timezone"
                aria-label="Zona horaria"
                value={companyData?.timezone ?? ""}
                onChange={(e) => updateCompanyField("timezone", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label htmlFor="country" className="text-[#eaf6ff] mb-2 block">País</Label>
              <Input
                id="country"
                aria-label="País"
                value={companyData?.country ?? ""}
                onChange={(e) => updateCompanyField("country", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-[#eaf6ff] mb-2 block">Ciudad</Label>
              <Input
                id="city"
                aria-label="Ciudad"
                value={companyData?.city ?? ""}
                onChange={(e) => updateCompanyField("city", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="websiteUrl" className="text-[#eaf6ff] mb-2 block">URL de sitio web</Label>
              <Input
                id="websiteUrl"
                aria-label="URL del sitio web"
                value={companyData?.websiteUrl ?? ""}
                onChange={(e) => updateCompanyField("websiteUrl", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
        </div>

        {/* Advanced Automation Data Section */}
        <div>
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4 pb-2 border-b border-[#1a3a52]">
            Datos avanzados para automatización
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="customerTypes" className="text-[#eaf6ff] mb-2 block">Tipos de clientes con los que trabaja habitualmente</Label>
              <Textarea
                id="customerTypes"
                aria-label="Tipos de clientes"
                value={companyData?.customerTypes ?? ""}
                onChange={(e) => updateCompanyField("customerTypes", e.target.value)}
                placeholder="Ejemplo: Empresas medianas, startups, agencias de marketing, autónomos..."
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="additionalContext" className="text-[#eaf6ff] mb-2 block">
                Información adicional o contexto específico del negocio (Añade todos los datos del desarrollo del
                negocio que creas relevantes y no los hayas puesto antes)
              </Label>
              <Textarea
                id="additionalContext"
                aria-label="Contexto adicional del negocio"
                value={companyData?.additionalContext ?? ""}
                onChange={(e) => updateCompanyField("additionalContext", e.target.value)}
                placeholder="Ejemplo: Tengo 45 mesas en el restaurante, 2 turnos de atención (13:00-14:45 y 15:00-17:00), capacidad para 200 personas por turno y 3 empleados en sala. Adaptar respuestas según esto."
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
                rows={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
