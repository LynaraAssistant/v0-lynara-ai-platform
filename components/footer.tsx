"use client"

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© 2025 Lynara. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
