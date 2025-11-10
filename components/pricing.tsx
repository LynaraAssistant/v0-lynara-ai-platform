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
    monthlyPrice: 179.99, // precio de lanzamiento
    yearlyPrice: 1799.99,
    launch: true,
        {/* Toggle mensual/anual */}
                        ? plan.yearlyPrice.toFixed(2).replace(".", ",")
                        : plan.monthlyPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? "año" : "mes"}
                    </span>
                  </div>

                  {plan.launch && !isAnnual && (
                    <p className="text-sm text-primary font-semibold">
                      Precio exclusivo de lanzamiento
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
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Durante la preventa o primer mes tras lanzamiento, los precios se reducen permanentemente.
        </p>
      </div>
    </section>
  )
}
