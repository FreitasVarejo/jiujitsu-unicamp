import type { ReactNode } from "react"

import { StatePanel } from "./state-panel"
import type { StatePanelProps } from "./state-panel"
import { Button } from "@/components/ui/button"
import { Icons } from "@/lib/icons"

export interface ErrorStateProps extends Partial<
  Omit<StatePanelProps, "action">
> {
  /** Detalhe técnico (mensagem do erro), mostrado em fonte mono. */
  detail?: ReactNode
  /** Quando existe, mostra o botão de tentar de novo. */
  onRetry?: () => void
  retryLabel?: ReactNode
  /** Ação extra ao lado do botão (ex.: link de suporte). */
  action?: ReactNode
}

/** Falha de carregamento. Anunciado a leitores de tela (role="alert"). */
export function ErrorState({
  icon = <Icons.error />,
  title = "Algo deu errado",
  description = "Não foi possível carregar. Tente de novo em instantes.",
  detail,
  onRetry,
  retryLabel = "Tentar de novo",
  action,
  ...props
}: ErrorStateProps) {
  return (
    <div role="alert">
      <StatePanel
        icon={icon}
        title={title}
        description={
          detail ? (
            <>
              {description}
              <code className="mt-2 block font-mono text-xs break-words">
                {detail}
              </code>
            </>
          ) : (
            description
          )
        }
        action={
          onRetry || action ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {onRetry ? (
                <Button onClick={onRetry}>
                  <Icons.retry data-icon="inline-start" />
                  {retryLabel}
                </Button>
              ) : null}
              {action}
            </div>
          ) : undefined
        }
        {...props}
      />
    </div>
  )
}
