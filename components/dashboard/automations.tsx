"use client"

import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"

const automations = [
  {
    id: 1,
    name: "Automatización WhatsApp",
    description: "Responde mensajes automáticamente y calienta leads con seguimientos inteligentes.",
    icon: MessageSquare,
    active: true,
  },
  {
    id: 2,
    name: "Llamadas IVR",
    description: "Sistema de respuesta de voz interactivo que atiende llamadas y transfiere a agentes.",
    icon: Phone,
    active: true,
  },
  {
    id: 3,
    name: "Automatización de Correos",
    description: "Envía correos personalizados y secuencias de seguimiento basadas en comportamiento.",
    icon: Mail,
    active: true,
  },
  {
    id: 4,
    name: "Agendamiento Automático",
    description: "Citas automáticas sin intervención humana, sincronizado con tu calendario.",
    icon: Calendar,
    active: true,
  },
]

export default function Automations() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#eaf6ff]">Automatizaciones</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automations.map((automation) => {
          const Icon = automation.icon
          return (
            <div
              key={automation.id}
              className={`relative group bg-[#0a1f35]/50 backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                automation.active
                  ? "border-[#00e1b4]/60 hover:border-[#00e1b4] hover:shadow-[#00e1b4]/20"
                  : "border-[#1a3a52]"
              }`}
            >
              {/* Active indicator */}
              {automation.active && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00e1b4] rounded-full animate-pulse"></div>
                  <span className="text-xs text-[#00e1b4] font-semibold">ACTIVA</span>
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#00e1b4]/20 to-transparent">
                  <Icon className="w-6 h-6 text-[#00e1b4]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#eaf6ff]">{automation.name}</h3>
                  <p className="text-sm text-[#96b5c7] mt-1 leading-relaxed">{automation.description}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button 
                  onClick={() => console.log("[v0] More info clicked for:", automation.name)}
                  className="flex-1 bg-[#00e1b4] hover:bg-[#00c9a0] text-[#001328] font-semibold">
                  Más información
                </Button>
                <Button
                  onClick={() => console.log("[v0] Edit clicked for:", automation.name)}
                  variant="outline"
                  className="flex-1 border-[#1a3a52] text-[#00e1b4] hover:bg-[#1a3a52] bg-transparent"
                >
                  Editar
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
