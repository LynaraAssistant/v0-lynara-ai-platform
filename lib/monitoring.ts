// Monitoring y error tracking centralizado

interface MonitoringConfig {
  dsn?: string
  environment: 'development' | 'staging' | 'production'
  enableConsoleLogging: boolean
}

interface ErrorContext {
  user?: {
    id: string
    email: string
    role: string
  }
  tags?: Record<string, string>
  extra?: Record<string, any>
}

class ErrorMonitor {
  private config: MonitoringConfig
  private isInitialized = false

  constructor() {
    this.config = {
      environment: (process.env.NODE_ENV as any) || 'development',
      enableConsoleLogging: process.env.NODE_ENV === 'development',
    }
  }

  init(dsn?: string) {
    if (this.isInitialized) return

    this.config.dsn = dsn

    // Solo inicializar en browser
    if (typeof window === 'undefined') return

    // Aquí se integraría Sentry o similar
    // import * as Sentry from "@sentry/nextjs"
    // Sentry.init({ dsn, environment: this.config.environment })

    // Capturar errores no manejados
    window.addEventListener('error', (event) => {
      this.captureException(event.error, {
        extra: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      })
    })

    // Capturar promesas rechazadas
    window.addEventListener('unhandledrejection', (event) => {
      this.captureException(event.reason, {
        extra: {
          type: 'unhandledrejection',
          promise: event.promise,
        },
      })
    })

    this.isInitialized = true
    console.info('[v0] Error Monitor initialized')
  }

  captureException(error: Error, context?: ErrorContext) {
    if (this.config.enableConsoleLogging) {
      console.error('[v0] Captured Exception:', error, context)
    }

    // En producción, enviar a Sentry
    // if (this.config.environment === 'production') {
    //   Sentry.captureException(error, {
    //     user: context?.user,
    //     tags: context?.tags,
    //     extra: context?.extra,
    //   })
    // }

    // También podríamos enviar a backend custom
    this.sendToBackend(error, context)
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (this.config.enableConsoleLogging) {
      console[level]('[v0] Captured Message:', message)
    }

    // Sentry.captureMessage(message, level)
  }

  setUser(user: { id: string; email: string; role: string }) {
    // Sentry.setUser(user)
    if (this.config.enableConsoleLogging) {
      console.info('[v0] User context set:', user)
    }
  }

  clearUser() {
    // Sentry.setUser(null)
    if (this.config.enableConsoleLogging) {
      console.info('[v0] User context cleared')
    }
  }

  private async sendToBackend(error: Error, context?: ErrorContext) {
    try {
      // Endpoint para logs de errores
      await fetch('/api/logs/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
          context,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      })
    } catch (err) {
      console.error('[v0] Failed to send error to backend:', err)
    }
  }
}

export const errorMonitor = new ErrorMonitor()

// Exponer globalmente para Error Boundary
if (typeof window !== 'undefined') {
  ;(window as any).errorMonitor = errorMonitor
}

// Helpers para retry logic
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      console.warn(`[v0] Retry attempt ${attempt}/${maxRetries} failed:`, error)

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt))
      }
    }
  }

  errorMonitor.captureException(lastError!, {
    tags: { retry: 'failed', maxRetries: String(maxRetries) },
  })

  throw lastError
}

// Helper para exponential backoff
export async function withExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
  baseDelayMs = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt - 1)
        console.warn(
          `[v0] Exponential backoff: waiting ${delay}ms before retry ${attempt}/${maxRetries}`
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}
