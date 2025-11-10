"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

const plans = [
  {
    name: "PLAN CONNECT",
    monthlyPrice: 39.99,
    yearlyPrice: 399.99,
    trialDays: 7,
    featured: false,
    features: [
      "Correos IA",
      "Gestión automática de leads",
      "Reportes y métricas básicas",
    ],
  },
  {
    name: "PLAN BUSINESS",
    monthlyPrice: 79.99,
    yearlyPrice: 799.99,
    trialDays: 7,
    featured: true,
    badge: "Más popular",
    features: [
      "Todo Plan Connect +",
      "WhatsApp IA",
      "Seguimiento IA",
      "Integraciones (webhooks personalizados)",
    ],
  },
  {
    name: "PLAN ENTERPRISE",
    monthlyPrice: 179.99,
    yearlyPrice: 1799.99,
    launchPrice: 179.99,
    launchYearlyPrice: 1799.99,
    trialDays: 10,
    featured: false,
    features: [
      "Todo Plan Business +",
      "Llamadas IA",
      "Embudos de venta inteligentes",
      "Multiusuario",
      "Soporte prioritario",
      "Análisis predictivo",
    ],
  },
]

export default function Pricing() {
  const router = useRouter()
  const [isAnnual, setIsAnnual] = useState(false)

  const handleStartNow = () => {
    router.push("/register")
  }

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-foreground mb-4 text-balance">
            Planes y <span className="text-primary">Precios</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-pretty">
            Elige el plan perfecto para tu negocio y comienza a automatizar
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <span
            className={`font-semibold transition-colors duration-200 ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Mensual
          </span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ${
              isAnnual ? "bg-primary" : "bg-muted border border-border"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-card shadow-lg transition-all duration-300 ${
                isAnnual ? "translate-x-9" : "translate-x-1"
              }`}
            />
          </button>

          <span
            className={`font-semibold transition-colors duration-200 ${
              isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Anual
          </span>

          {isAnnual && (
            <span className="ml-2 text-primary text-sm font-semibold bg-primary/10 px-3 py-1 rounded-full animate-fade-in">
              Ahorra 20%
            </span>
          )}
        </div>

        {/* Tarjetas de precios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-in-up ${
                plan.featured
                  ? "md:scale-105 md:col-span-1 bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary shadow-xl shadow-primary/20"
                  : "bg-card/60 backdrop-blur border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground py-2 text-center text-sm font-bold">
                  {plan.badge}
                </div>
              )}

              <div className={`p-8 ${plan.badge ? "pt-16" : ""}`}>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-primary">
                      €
                      {isAnnual
                        ? (plan.yearlyPrice || 0)
                            .toFixed(2)
                            .replace(".", ",")
                        : (plan.monthlyPrice || 0)
                            .toFixed(2)
                            .replace(".", ",")}
                    </span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? "año" : "mes"}
                    </span>
                  </div>

                  {plan.launchPrice && (
                    <p className="text-sm text-primary font-semibold">
                      Precio exclusivo de lanzamiento: ahorro de por vida
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.trialDays} días de prueba gratis
                  </p>
                </div>

                <button
                  onClick={handleStartNow}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 mb-6 ${
                    plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
                      : "bg-muted text-foreground hover:bg-muted/80 hover:border-primary/50 active:scale-95"
                  }`}
                >
                  Empezar ahora
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Nota final */}
        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Durante la preventa o primer mes tras lanzamiento, los precios se
          reducen permanentemente.
        </p>
      </div>
    </section>
  )
}
