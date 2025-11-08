"use client"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          ¿Tienes dudas o quieres más información?
        </h2>

        <a
          href="https://t.me/lynaraassistant"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-accent hover:bg-accent/90 text-primary-foreground rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-accent/30 active:scale-95"
        >
          Contactar por Telegram
        </a>
      </div>
    </section>
  )
}
