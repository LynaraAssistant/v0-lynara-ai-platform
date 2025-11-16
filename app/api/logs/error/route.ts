import { NextRequest, NextResponse } from 'next/server'
import { doc, setDoc, collection } from 'firebase/firestore'
import { dbClient } from '@/lib/firebase'

// API endpoint para recibir logs de errores del frontend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { error, context, timestamp, userAgent, url } = body

    // Guardar en Firestore (colección global de errores)
    const errorRef = doc(collection(dbClient, 'system_errors'))
    
    await setDoc(errorRef, {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context: context || null,
      timestamp,
      userAgent,
      url,
      environment: process.env.NODE_ENV,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[v0] Error logging error to Firestore:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to log error' },
      { status: 500 }
    )
  }
}
