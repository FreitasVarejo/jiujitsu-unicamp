import type { ReactNode } from "react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

export interface StatePanelProps {
  /** Ícone do estado; use um de `Icons` (@/lib/icons). */
  icon?: ReactNode
  /** Texto curto acima do título, ex.: "404". */
  code?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** Botão ou link de saída do estado. */
  action?: ReactNode
  /** Nível semântico do título (1 a 6). */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

/** Painel centralizado que os estados vazio, erro, 404 e 403 compartilham. */
export function StatePanel({
  icon,
  code,
  title,
  description,
  action,
  headingLevel = 2,
  className,
}: StatePanelProps) {
  return (
    <Empty className={cn("min-h-64", className)}>
      <EmptyHeader>
        {icon ? <EmptyMedia variant="icon">{icon}</EmptyMedia> : null}
        {code ? (
          <p className="font-mono text-xs text-muted-foreground">{code}</p>
        ) : null}
        <EmptyTitle role="heading" aria-level={headingLevel}>
          {title}
        </EmptyTitle>
        {description ? (
          <EmptyDescription>{description}</EmptyDescription>
        ) : null}
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  )
}
