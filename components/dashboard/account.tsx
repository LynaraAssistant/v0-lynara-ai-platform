'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { useFirestoreSync } from '@/hooks/useFirestoreSync'

export default function Account() {
  const { userData, updateUserField, loading } = useFirestoreSync()
  const [updated, setUpdated] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00e1b4]"></div>
      </div>
    )
  }

  const handleSave = () => {
    setUpdated(true)
    setTimeout(() => setUpdated(false), 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-[#eaf6ff]">Cuenta y Suscripción</h2>
      </div>

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
              <Button className="bg-[#00a2ff] hover:bg-[#0090dd] text-white">Actualizar plan</Button>
              <Button variant="outline" className="border-[#1a3a52] text-[#96b5c7] bg-transparent">
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
            <Label className="text-[#eaf6ff]">Nombre completo</Label>
            <Input
              value={userData.fullName || ''}
              onChange={(e) => updateUserField('fullName', e.target.value)}
              className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#eaf6ff]">Empresa</Label>
            <Input
              value={userData.company || ''}
              onChange={(e) => updateUserField('company', e.target.value)}
              className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#eaf6ff]">Teléfono</Label>
              <Input
                value={userData.phone || ''}
                onChange={(e) => updateUserField('phone', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#eaf6ff]">Correo electrónico</Label>
              <Input
                value={userData.email || ''}
                onChange={(e) => updateUserField('email', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#eaf6ff]">País</Label>
              <Input
                value={userData.country || ''}
                onChange={(e) => updateUserField('country', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#eaf6ff]">Ubicación</Label>
              <Input
                value={userData.location || ''}
                onChange={(e) => updateUserField('location', e.target.value)}
                className="bg-[#0a1f35] border-[#1a3a52] text-[#eaf6ff]"
              />
            </div>
          </div>
          <Button onClick={handleSave} className="bg-[#00e1b4] hover:bg-[#00c9a0] text-[#001328] font-semibold">
            Actualizar información
          </Button>
          {updated && (
            <div className="flex items-center gap-2 text-[#00e1b4]">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Información actualizada correctamente</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Configuration */}
      <Card className="bg-[#0a1f35]/50 border-[#1a3a52]">
        <CardHeader>
          <CardTitle className="text-[#eaf6ff]">Configuración Avanzada IA</CardTitle>
          <CardDescription className="text-[#96b5c7]">Personaliza cómo tu IA interactúa con clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-[#00a2ff] hover:bg-[#0090dd] text-white">Editar configuración IA</Button>
        </CardContent>
      </Card>
    </div>
  )
}
