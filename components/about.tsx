"use client"

import { MessageCircle, Phone, Mail, Zap } from "lucide-react"

export default function About() {
  const features = [
    { icon: MessageCircle, label: "WhatsApp IA" },
    { icon: Phone, label: "Llamadas IA" },
    { icon: Mail, label: "Correos IA" },
    { icon: Zap, label: "Embudos IA" },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Qué es <span className="text-accent">Lynara</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Lynara es una plataforma de automatización que unifica WhatsApp, llamadas, correos y embudos inteligentes
            para escalar tu negocio sin esfuerzo. Mientras tú descansas, la IA sigue vendiendo, respondiendo y
            gestionando tus clientes las 24 horas.
          </p>
        </div>

        {/* Feature Flow */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 mb-2">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center">{feature.label}</span>
              </div>
              {idx < features.length - 1 && (
                <div className="hidden sm:block w-12 h-1 bg-gradient-to-r from-accent/50 to-accent/10"></div>
              )}
            </div>
          ))}
          <div className="w-full sm:w-auto flex items-center justify-center mt-4 sm:mt-0">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 mb-2 animate-glow">
                <div className="w-8 h-8 rounded-full bg-accent animate-pulse"></div>
              </div>
              <span className="text-sm font-semibold text-accent">Resultados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
