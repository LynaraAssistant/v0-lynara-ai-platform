'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useFirestoreSync } from '@/hooks/useFirestoreSync'
import { SaveIndicator } from '@/components/ui/save-indicator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Account() {
  const { userData, updateUserField, loading, error, saveStatus } = useFirestoreSync()
  const [updateError, setUpdateError] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00e1b4]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#eaf6ff]">Cuenta y Suscripción</h2>
        </div>
        <SaveIndicator status={saveStatus} />
      </div>

      {/* Error Messages */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {updateError && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400">{updateError}</span>
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-[#00e1b4]/20 to-[#00a2ff]/20 border border-[#00e1b4]/40 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#eaf6ff] mb-2">Plan Connect</h3>
            <p className="text-[#96b5c7] mb-4">Costo: $49/mes o $490/año</p>
            <p className="text-sm text-[#96b5c7]">Próximo pago: 15 de diciembre 2025</p>
          </div>
          <div className="text-right">
            <div className="flex gap-2">
              <Button 
                onClick={() => console.log("[v0] Update plan button clicked")}
                className="bg-[#00a2ff] hover:bg-[#0090dd] text-white">
                Actualizar plan
              </Button>
              <Button 
                onClick={() => console.log("[v0] Cancel plan button clicked")}
                variant="outline" className="border-[#1a3a52] text-[#96b5c7] bg-transparent">
                Cancelar plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <Card className="bg-[#0a1f35]/50 border-[#1a3a52]">
        <CardHeader>
          <CardTitle className="text-[#eaf6ff]">Información de Facturación</CardTitle>
          <CardDescription className="text-[#96b5c7]">Gestiona tus detalles de pago</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[#eaf6ff]">Nombre completo</Label>
            <Input
              id="fullName"
              aria-label="Nombre completo"
              value={userData?.fullName ?? ""}
              onChange={(e) => updateUserField("fullName", e.target.value)}
              className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#eaf6ff]">Correo electrónico</Label>
              <Input
                id="email"
                aria-label="Correo electrónico"
                value={userData?.email ?? ""}
                onChange={(e) => updateUserField("email", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#eaf6ff]">Teléfono</Label>
              <Input
                id="phone"
                aria-label="Número de teléfono"
                value={userData?.phone ?? ""}
                onChange={(e) => updateUserField("phone", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-[#eaf6ff]">País</Label>
              <Input
                id="country"
                aria-label="País"
                value={userData?.country ?? ""}
                onChange={(e) => updateUserField("country", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-[#eaf6ff]">Ciudad</Label>
              <Input
                id="city"
                aria-label="Ciudad"
                value={userData?.city ?? ""}
                onChange={(e) => updateUserField("city", e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language" className="text-[#eaf6ff]">Idioma de preferencia</Label>
            <Select
              value={userData?.language ?? "es"}
              onValueChange={(value) => updateUserField("language", value)}
            >
              <SelectTrigger id="language" aria-label="Seleccionar idioma" className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]">
                <SelectValue placeholder="Selecciona un idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI Configuration */}
      <Card className="bg-[#0a1f35]/50 border-[#1a3a52]">
        <CardHeader>
          <CardTitle className="text-[#eaf6ff]">Configuración Avanzada IA</CardTitle>
          <CardDescription className="text-[#96b5c7]">Personaliza cómo tu IA interactúa con clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => console.log("[v0] Edit AI config button clicked")}
            className="bg-[#00a2ff] hover:bg-[#0090dd] text-white">
            Editar configuración IA
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
