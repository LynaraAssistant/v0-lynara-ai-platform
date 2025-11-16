'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('[v0] Error Boundary caught error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo,
    })

    // Send to monitoring service (Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && (window as any).errorMonitor) {
      (window as any).errorMonitor.captureException(error, {
        errorInfo,
        componentStack: errorInfo.componentStack,
      })
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error!}
            reset={this.handleReset}
          />
        )
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Oops! Algo salió mal
            </h1>
            
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado
              automáticamente.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <summary className="cursor-pointer font-semibold text-red-800 mb-2">
                  Detalles del error (solo desarrollo)
                </summary>
                <pre className="text-xs text-red-900 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-3">
              <Button
                onClick={this.handleReset}
                className="w-full"
                size="lg"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Intentar nuevamente
              </Button>
              
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Si el problema persiste, contacta soporte en{' '}
              <a
                href="mailto:soporte@lynara.ai"
                className="text-blue-600 hover:underline"
              >
                soporte@lynara.ai
              </a>
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
