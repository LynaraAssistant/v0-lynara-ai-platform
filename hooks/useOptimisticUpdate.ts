/**
 * Optimistic UI Updates Hook
 * 
 * Provides instant feedback while Firestore updates are in progress
 */

import { useState } from "react"

interface OptimisticState<T> {
  data: T
  isOptimistic: boolean
  error: string | null
}

export function useOptimisticUpdate<T>(initialData: T) {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isOptimistic: false,
    error: null,
  })

  const updateOptimistically = async (
    optimisticData: T,
    updateFn: () => Promise<void>
  ) => {
    // Immediately show optimistic update
    setState({
      data: optimisticData,
      isOptimistic: true,
      error: null,
    })

    try {
      // Perform actual update
      await updateFn()

      // Confirm success
      setState({
        data: optimisticData,
        isOptimistic: false,
        error: null,
      })
    } catch (error: any) {
      // Revert on error
      setState({
        data: initialData,
        isOptimistic: false,
        error: error.message || "Error al actualizar",
      })

      throw error
    }
  }

  const resetError = () => {
    setState((prev) => ({ ...prev, error: null }))
  }

  return {
    ...state,
    updateOptimistically,
    resetError,
  }
}
