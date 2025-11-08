"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Automations from "@/components/automations"
import Pricing from "@/components/pricing"
import Waitlist from "@/components/waitlist"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001328] via-[#012b36] to-[#006184] overflow-hidden">
      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Automations />
        <Pricing />
        <Waitlist />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
