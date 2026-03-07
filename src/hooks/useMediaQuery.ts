import { useSyncExternalStore } from 'react'

/**
 * Custom hook para detectar se uma media query é atendida.
 * Detecta mudanças em tempo real e retorna boolean.
 *
 * @param query - String de media query (ex: '(min-width: 768px)')
 * @returns boolean - true se a media query é atendida, false caso contrário
 *
 * @example
 * const isMediumOrLarger = useMediaQuery('(min-width: 768px)')
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
 */
export const useMediaQuery = (query: string): boolean => {
  return useSyncExternalStore(
    (onStoreChange) => {
      // Evita erro se window não estiver disponível (SSR)
      if (typeof window === 'undefined') {
        return () => {}
      }

      const mediaQueryList = window.matchMedia(query)

      // Listener para mudanças
      const handleChange = () => {
        onStoreChange()
      }

      mediaQueryList.addEventListener('change', handleChange)

      // Cleanup
      return () => {
        mediaQueryList.removeEventListener('change', handleChange)
      }
    },
    () => {
      // Servidor: retorna false por padrão (SSR)
      if (typeof window === 'undefined') {
        return false
      }

      return window.matchMedia(query).matches
    },
    () => {
      // Snapshot inicial do servidor
      if (typeof window === 'undefined') {
        return false
      }

      return window.matchMedia(query).matches
    },
  )
}
