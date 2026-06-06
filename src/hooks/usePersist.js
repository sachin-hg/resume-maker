import { useEffect } from 'react'

// Simple persistence effect: serializes value to localStorage under key.
// Strings are stored directly; everything else is JSON-serialized.
export function usePersist(key, value) {
  useEffect(() => {
    if (typeof value === 'string') localStorage.setItem(key, value)
    else localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
}
