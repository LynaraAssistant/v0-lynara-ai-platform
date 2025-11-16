'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2 } from 'lucide-react'
import { useFirestoreSync } from '@/hooks/useFirestoreSync'

export default function AIData() {
  const { companyData, updateCompanyField, loading } = useFirestoreSync()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00e1b4]"></div>
      </div>
    )
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
                value={companyData.businessName || ''}
                onChange={(e) => updateCompanyField('businessName', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Sector</Label>
              <Input
                value={companyData.sector || ''}
                onChange={(e) => updateCompanyField('sector', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Tono de comunicación</Label>
              <select
                value={companyData.communicationTone || 'Profesional'}
                onChange={(e) => updateCompanyField('communicationTone', e.target.value)}
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
                value={companyData.brandStyle || ''}
                onChange={(e) => updateCompanyField('brandStyle', e.target.value)}
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
                value={companyData.serviceType || ''}
                onChange={(e) => updateCompanyField('serviceType', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Tamaño del equipo</Label>
              <Input
                value={companyData.teamSize || ''}
                onChange={(e) => updateCompanyField('teamSize', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-[#eaf6ff] mb-2 block">Descripción del negocio</Label>
              <Textarea
                value={companyData.businessDescription || ''}
                onChange={(e) => updateCompanyField('businessDescription', e.target.value)}
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
                value={companyData.businessHours || ''}
                onChange={(e) => updateCompanyField('businessHours', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Zona horaria</Label>
              <Input
                value={companyData.timezone || ''}
                onChange={(e) => updateCompanyField('timezone', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">País</Label>
              <Input
                value={companyData.country || ''}
                onChange={(e) => updateCompanyField('country', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Ciudad</Label>
              <Input
                value={companyData.city || ''}
                onChange={(e) => updateCompanyField('city', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-[#eaf6ff] mb-2 block">URL de sitio web</Label>
              <Input
                value={companyData.websiteUrl || ''}
                onChange={(e) => updateCompanyField('websiteUrl', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-4 pb-2 border-b border-[#1a3a52]">
            Datos avanzados para automatización
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">Tipos de clientes con los que trabaja habitualmente</Label>
              <Textarea
                value={companyData.customerTypes || ''}
                onChange={(e) => updateCompanyField('customerTypes', e.target.value)}
                placeholder="Ejemplo: Empresas medianas, startups, agencias de marketing, autónomos..."
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-[#eaf6ff] mb-2 block">
                Información adicional o contexto específico del negocio (Añade todos los datos del desarrollo del
                negocio que creas relevantes y no los hayas puesto antes)
              </Label>
              <Textarea
                value={companyData.additionalContext || ''}
                onChange={(e) => updateCompanyField('additionalContext', e.target.value)}
                placeholder="Ejemplo: Tengo 45 mesas en el restaurante, 2 turnos de atención (13:00-14:45 y 15:00-17:00), capacidad para 200 personas por turno y 3 empleados en sala. Adaptar respuestas según esto."
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
                rows={5}
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
