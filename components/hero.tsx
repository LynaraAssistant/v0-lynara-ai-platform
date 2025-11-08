"use client"

export default function Hero() {
  const handleDiscover = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="inicio" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Automatización <span className="text-accent">Inteligente</span> para tu Negocio
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          Centraliza tus flujos, ahorra tiempo y deja que la IA trabaje por ti.
        </p>
        <button
          onClick={handleDiscover}
          className="inline-block px-8 py-4 bg-accent hover:bg-accent/90 text-primary-foreground rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-accent/30 active:scale-95"
        >
          Descubre cómo funciona
        </button>
      </div>
    </section>
  )
}
