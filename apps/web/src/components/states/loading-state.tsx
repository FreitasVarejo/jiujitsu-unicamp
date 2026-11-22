import type { ReactNode } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export type LoadingVariant = "list" | "table" | "cards" | "detail"

export interface LoadingStateProps {
  variant?: LoadingVariant
  /** Texto anunciado a leitores de tela enquanto carrega. */
  label?: ReactNode
  /** Quantidade de linhas (list, table) ou cartões (cards). */
  count?: number
  className?: string
}

const DEFAULT_COUNT: Record<LoadingVariant, number> = {
  list: 5,
  table: 6,
  cards: 6,
  detail: 1,
}

const bone = "motion-reduce:animate-none"

function ListSkeleton({ count }: { count: number }) {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="flex items-center gap-3">
          <Skeleton className={cn("size-10 shrink-0 rounded-full", bone)} />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className={cn("h-4 w-2/5", bone)} />
            <Skeleton className={cn("h-3 w-4/5", bone)} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function TableSkeleton({ count }: { count: number }) {
  const columns = "grid grid-cols-[2fr_1fr_1fr_1fr] gap-4"
  return (
    <div className="flex flex-col gap-3">
      <div className={cn(columns, "border-b pb-3")}>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className={cn("h-3 w-3/5", bone)} />
        ))}
      </div>
      {Array.from({ length: count }, (_, row) => (
        <div key={row} className={columns}>
          <Skeleton className={cn("h-4 w-4/5", bone)} />
          <Skeleton className={cn("h-4 w-3/5", bone)} />
          <Skeleton className={cn("h-4 w-2/5", bone)} />
          <Skeleton className={cn("h-4 w-3/5", bone)} />
        </div>
      ))}
    </div>
  )
}

function CardsSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-lg border bg-card p-4"
        >
          <Skeleton className={cn("aspect-video w-full", bone)} />
          <Skeleton className={cn("h-4 w-3/5", bone)} />
          <Skeleton className={cn("h-3 w-full", bone)} />
          <Skeleton className={cn("h-3 w-4/5", bone)} />
        </div>
      ))}
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-4">
        <Skeleton className={cn("h-8 w-3/5", bone)} />
        <Skeleton className={cn("h-4 w-2/5", bone)} />
        <Skeleton className={cn("mt-2 aspect-video w-full", bone)} />
        <Skeleton className={cn("h-4 w-full", bone)} />
        <Skeleton className={cn("h-4 w-full", bone)} />
        <Skeleton className={cn("h-4 w-3/5", bone)} />
      </div>
      <div className="flex flex-col gap-3 rounded-lg border bg-card p-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className={cn("h-3 w-1/3", bone)} />
            <Skeleton className={cn("h-4 w-3/4", bone)} />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Esqueleto de carregamento. A região é `role="status"` e `aria-busy`; o texto
 * em `label` é lido por leitores de tela e o esqueleto fica oculto para eles.
 */
export function LoadingState({
  variant = "list",
  label = "Carregando…",
  count = DEFAULT_COUNT[variant],
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-variant={variant}
      className={cn("w-full", className)}
    >
      <span className="sr-only">{label}</span>
      <div aria-hidden="true">
        {variant === "list" ? <ListSkeleton count={count} /> : null}
        {variant === "table" ? <TableSkeleton count={count} /> : null}
        {variant === "cards" ? <CardsSkeleton count={count} /> : null}
        {variant === "detail" ? <DetailSkeleton /> : null}
      </div>
    </div>
  )
}
