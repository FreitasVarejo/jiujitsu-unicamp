/**
 * Hooks para gerenciar eventos.
 */

import { useState, useMemo, useCallback } from 'react'
import { useFetch } from '@/hooks/core'
import { eventsService } from '@/services/strapi/events.service'
import {
  eventAdapter,
  eventSummaryAdapter,
} from '@/adapters/strapi/event.adapter'
import { Event, EventSummary } from '@/types/event'
import { Image } from '@/types/base'

interface UseEventsReturn {
  years: string[]
  groupedEvents: Record<string, EventSummary[]>
  visibleCounts: Record<string, number>
  loading: boolean
  error: Error | null
  handleSeeMore: (year: string) => void
}

/**
 * Hook para buscar e gerenciar lista de eventos agrupados por ano.
 */
export const useEvents = (): UseEventsReturn => {
  const { data: rawEvents, loading, error } = useFetch(
    () => eventsService.getAll(),
    [],
    { cache: true, cacheKey: 'events-list' }
  )

  const events = useMemo(
    () => (rawEvents || []).map(eventSummaryAdapter),
    [rawEvents]
  )

  const groupedEvents = useMemo(() => {
    return events.reduce((acc: Record<string, EventSummary[]>, event) => {
      const year = event.date.split('-')[0] || 'Antigo'
      if (!acc[year]) acc[year] = []
      acc[year].push(event)
      return acc
    }, {})
  }, [events])

  const years = useMemo(() => {
    return Object.keys(groupedEvents).sort((a, b) => Number(b) - Number(a))
  }, [groupedEvents])

  // Gerenciar contagem de itens visíveis por ano
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(() => {
    return {}
  })

  const handleSeeMore = useCallback((year: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [year]: (prev[year] || 4) + 6,
    }))
  }, [])

  // Inicializar visibleCounts com anos disponíveis
  const countsWithDefaults = useMemo(() => {
    const result: Record<string, number> = {}
    years.forEach((year) => {
      result[year] = visibleCounts[year] ?? 4
    })
    return result
  }, [years, visibleCounts])

  return {
    years,
    groupedEvents,
    visibleCounts: countsWithDefaults,
    loading,
    error,
    handleSeeMore,
  }
}

interface UseEventDetailsReturn {
  details: Event | null
  loading: boolean
  error: Error | null
  images: Image[]
}

/**
 * Hook para buscar detalhes de um evento específico.
 */
export const useEventDetails = (id?: string): UseEventDetailsReturn => {
  const { data: rawDetails, loading, error } = useFetch(
    () => {
      if (!id) throw new Error('ID do evento não fornecido')
      return eventsService.getBySlug(id)
    },
    [id],
    { immediate: !!id }
  )

  const details = useMemo(
    () => (rawDetails ? eventAdapter(rawDetails) : null),
    [rawDetails]
  )

  const images = useMemo(() => details?.gallery ?? [], [details])

  return {
    details,
    loading,
    error,
    images,
  }
}
