"use client"

import { useState } from "react"
import { MessageCircle, FileText, HelpCircle, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const faqs = [
  {
    question: "¿Cómo actualizo mi configuración de marca?",
    answer:
      "Accede a la sección 'Datos IA' en el menú lateral. Allí puedes actualizar tu nombre comercial, tono de comunicación y otros parámetros que personalizarán tus automatizaciones.",
  },
  {
    question: "¿Qué incluye cada plan de suscripción?",
    answer:
      "Nuestros planes Connect, Business y Enterprise incluyen diferentes niveles de automatizaciones. Consulta la página de precios o contacta al equipo de soporte para más detalles.",
  },
  {
    question: "¿Cómo cambio de plan?",
    answer:
      "En la sección 'Cuenta', verás tu plan actual y la opción de actualizar. Selecciona el nuevo plan y completa el proceso de pago.",
  },
  {
    question: "¿Hay soporte por teléfono?",
    answer:
      "Sí, puedes contactarnos por Telegram en nuestro canal de soporte oficial o enviar un correo al equipo de atención al cliente.",
  },
  {
    question: "¿Cómo integro mi CRM existente?",
    answer:
      "En la sección 'Datos IA', puedes indicar qué plataforma CRM utilizas. Nuestro equipo se encargará de la integración inicial.",
  },
]

export default function Support() {
  const [openItems, setOpenItems] = useState<string[]>(["0"])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-[#eaf6ff]">Soporte y Asistencia</h2>
        <p className="text-[#96b5c7] mt-2">Te ayudamos a sacar el máximo provecho de Lynara</p>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6 flex flex-col items-center text-center">
          <MessageCircle className="w-8 h-8 text-[#00e1b4] mb-4" />
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-2">Soporte por Telegram</h3>
          <p className="text-[#96b5c7] text-sm mb-4">Contacta directamente con nuestro equipo</p>
          <a
            href="https://t.me/lynara_support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-[#00a2ff] hover:bg-[#0090dd] text-white rounded-lg font-semibold transition-colors"
          >
            Abrir Telegram
          </a>
        </div>

        <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6 flex flex-col items-center text-center">
          <FileText className="w-8 h-8 text-[#00e1b4] mb-4" />
          <h3 className="text-lg font-bold text-[#eaf6ff] mb-2">Documentación</h3>
          <p className="text-[#96b5c7] text-sm mb-4">Consulta nuestros tutoriales y guías</p>
          <a
            href="#"
            className="inline-block px-6 py-2 bg-[#00e1b4] hover:bg-[#00c9a0] text-[#001328] rounded-lg font-semibold transition-colors"
          >
            Ver Documentos
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-[#00e1b4]" />
          <h3 className="text-lg font-bold text-[#eaf6ff]">Preguntas Frecuentes</h3>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(String(index))}
              onOpenChange={() => toggleItem(String(index))}
            >
              <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-[#1a3a52]/50 transition-colors text-left group">
                <span className="font-medium text-[#eaf6ff] group-hover:text-[#00e1b4]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00e1b4] transition-transform ${
                    openItems.includes(String(index)) ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 text-[#96b5c7]">{faq.answer}</CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-[#0a1f35]/50 backdrop-blur-xl border border-[#1a3a52] rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#eaf6ff] mb-4">Recursos Útiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="#"
            className="p-4 rounded-lg bg-[#1a3a52]/30 hover:bg-[#1a3a52]/60 transition-colors text-[#00e1b4] font-semibold text-sm"
          >
            Tutorial: Configuración inicial
          </a>
          <a
            href="#"
            className="p-4 rounded-lg bg-[#1a3a52]/30 hover:bg-[#1a3a52]/60 transition-colors text-[#00e1b4] font-semibold text-sm"
          >
            Guía de automatizaciones
          </a>
          <a
            href="#"
            className="p-4 rounded-lg bg-[#1a3a52]/30 hover:bg-[#1a3a52]/60 transition-colors text-[#00e1b4] font-semibold text-sm"
          >
            Mejores prácticas
          </a>
          <a
            href="#"
            className="p-4 rounded-lg bg-[#1a3a52]/30 hover:bg-[#1a3a52]/60 transition-colors text-[#00e1b4] font-semibold text-sm"
          >
            Roadmap de funciones
          </a>
        </div>
      </div>
    </div>
  )
}
