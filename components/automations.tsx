"use client"

import { MessageCircle, Phone, Mail, Zap, Brain, Calendar, CheckCircle, Users } from "lucide-react"

const automations = [
  {
    title: "WhatsApp IA",
    icon: MessageCircle,
    description:
      "Tu asistente virtual responde automáticamente cada mensaje de WhatsApp, clasifica los leads, agenda citas en tu calendario y mantiene conversaciones naturales que parecen humanas. Olvídate de perder clientes por falta de respuesta: Lynara los atiende 24/7.",
    flow: [
      { icon: MessageCircle, label: "Chat" },
      { icon: Brain, label: "IA" },
      { icon: Calendar, label: "Calendario" },
      { icon: CheckCircle, label: "Check" },
    ],
  },
  {
    title: "Llamadas Inteligentes",
    icon: Phone,
    description:
      "Con voz natural y adaptable al tono de tu empresa, Lynara realiza y responde llamadas para confirmar citas, recopilar información y reactivar clientes fríos. Una experiencia de voz que elimina la necesidad de un call center.",
    flow: [
      { icon: Phone, label: "Teléfono" },
      { icon: Brain, label: "IA" },
      { icon: Users, label: "Personal" },
    ],
  },
  {
    title: "Correos IA",
    icon: Mail,
    description:
      "Campañas de correo automatizadas que aprenden de la interacción de tus clientes. Envía recordatorios, seguimientos o propuestas personalizadas con lenguaje coherente con tu marca y comportamiento del cliente.",
    flow: [
      { icon: Mail, label: "Email" },
      { icon: Brain, label: "Datos" },
      { icon: CheckCircle, label: "Enviado" },
    ],
  },
  {
    title: "Embudos IA",
    icon: Zap,
    description:
      "Crea flujos completos de venta que se adaptan a cada usuario según su comportamiento. Lynara conecta mensajes, llamadas y correos en una estrategia unificada que guía al cliente hasta la conversión.",
    flow: [
      { icon: Zap, label: "Embudo" },
      { icon: Brain, label: "IA" },
      { icon: Users, label: "Cliente" },
    ],
  },
]

export default function Automations() {
  return (
    <section id="automations" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-foreground mb-4">
          Automatizaciones que <span className="text-accent">trabajan por ti</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Cuatro herramientas poderosas diseñadas para automatizar cada aspecto de tu negocio
        </p>

        {/* Automations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {automations.map((automation, idx) => {
            const Icon = automation.icon
            return (
              <div
                key={idx}
                className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{automation.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{automation.description}</p>
                <div className="flex flex-wrap gap-2">
                  {automation.flow.map((item, i) => {
                    const FlowIcon = item.icon
                    return (
                      <div key={i} className="flex items-center gap-1 text-xs">
                        <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center">
                          <FlowIcon className="w-4 h-4 text-accent" />
                        </div>
                        {i < automation.flow.length - 1 && <span className="text-accent/50 mx-1">→</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Ecosystem Visualization */}
        <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur border border-accent/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-6">Ecosistema Lynara Integrado</h3>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-accent" />
            </div>
            <div className="hidden sm:block w-12 h-1 bg-gradient-to-r from-accent/50 to-accent/10"></div>
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <div className="hidden sm:block w-12 h-1 bg-gradient-to-r from-accent/50 to-accent/10"></div>
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <div className="hidden sm:block w-12 h-1 bg-gradient-to-r from-accent/50 to-accent/10"></div>
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="mt-8">
            <div className="inline-block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent flex items-center justify-center animate-glow">
                <Brain className="w-8 h-8 text-accent" />
              </div>
            </div>
            <p className="mt-4 text-accent font-semibold">Núcleo IA Central</p>
          </div>
        </div>
      </div>
    </section>
  )
}
