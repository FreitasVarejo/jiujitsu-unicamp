import { useCallback, useRef, useState } from "react"
import type { ReactNode } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Icons } from "@/lib/icons"

export interface ConfirmTexts {
  title?: ReactNode
  description?: ReactNode
  confirmLabel?: ReactNode
  cancelLabel?: ReactNode
  /** ícone do diálogo, acima do título */
  icon?: ReactNode
  /**
   * ícone do verbo, à esquerda do rótulo do botão que confirma; leve
   * `data-icon="inline-start"` no elemento para o botão ajustar o espaço
   */
  confirmIcon?: ReactNode
}

export interface ConfirmDestructiveProps extends ConfirmTexts {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Chamado ao confirmar. O diálogo fecha quando a promessa resolve. */
  onConfirm: () => void | Promise<void>
}

/**
 * Confirmação de ação destrutiva sobre o alert-dialog do shadcn. O botão de
 * confirmar é preenchido com os tokens `destructive` e `destructive-foreground`
 * e leva o ícone do verbo; o foco inicial fica em cancelar.
 */
export function ConfirmDestructive({
  open,
  onOpenChange,
  onConfirm,
  title = "Excluir este item?",
  description = "Esta ação não pode ser desfeita.",
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  icon = <Icons.trash />,
  confirmIcon = <Icons.trash data-icon="inline-start" />,
}: ConfirmDestructiveProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [pending, setPending] = useState(false)

  async function confirm() {
    setPending(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } finally {
      setPending(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent initialFocus={cancelRef}>
        <AlertDialogHeader>
          <AlertDialogMedia>{icon}</AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelRef} disabled={pending}>
            {cancelLabel}
          </AlertDialogCancel>
          {/* O destrutivo do shadcn é suave (`bg-destructive/10`); aqui é cheio,
              também no escuro, onde o botão suave tem `dark:bg-destructive/20`. */}
          <AlertDialogAction
            variant="destructive"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
            disabled={pending}
            onClick={confirm}
          >
            {confirmIcon}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/**
 * Versão imperativa: `const { confirm, dialog } = useConfirmDestructive()`.
 * Renderize `{dialog}` uma vez e use `if (await confirm({...})) apagar()`.
 * Resolve `false` se a pessoa cancelar, fechar ou apertar Esc.
 */
export function useConfirmDestructive() {
  const [texts, setTexts] = useState<ConfirmTexts>({})
  const [open, setOpen] = useState(false)
  const resolver = useRef<((confirmed: boolean) => void) | null>(null)

  const settle = useCallback((confirmed: boolean) => {
    resolver.current?.(confirmed)
    resolver.current = null
    setOpen(false)
  }, [])

  const confirm = useCallback((next: ConfirmTexts = {}) => {
    resolver.current?.(false)
    setTexts(next)
    setOpen(true)
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve
    })
  }, [])

  const dialog = (
    <ConfirmDestructive
      {...texts}
      open={open}
      onOpenChange={(next) => {
        if (!next) settle(false)
      }}
      onConfirm={() => settle(true)}
    />
  )

  return { confirm, dialog }
}
