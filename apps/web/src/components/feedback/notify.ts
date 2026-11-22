import { toast } from "sonner"
import type { ExternalToast } from "sonner"

type Message = Parameters<typeof toast>[0]

export interface UndoOptions extends Omit<ExternalToast, "action"> {
  /** Chamado se a pessoa clicar em desfazer. */
  onUndo: () => void
  undoLabel?: string
}

export interface PromiseMessages<T> {
  loading?: string
  success?: string | ((value: T) => string)
  error?: string | ((reason: unknown) => string)
}

/**
 * Toasts do sonner com texto padrão em pt-BR. Todo texto é sobrescrevível
 * pelos argumentos. Monte `<AppToaster />` uma vez na raiz do app.
 */
export const notify = {
  success: (message: Message, options?: ExternalToast) =>
    toast.success(message, options),

  error: (message: Message, options?: ExternalToast) =>
    toast.error(message, options),

  info: (message: Message, options?: ExternalToast) =>
    toast.info(message, options),

  /** Ação já feita, com botão para desfazer enquanto o toast está na tela. */
  undo: (
    message: Message,
    { onUndo, undoLabel = "Desfazer", ...options }: UndoOptions
  ) =>
    toast(message, {
      duration: 8000,
      ...options,
      action: { label: undoLabel, onClick: () => onUndo() },
    }),

  /** Acompanha uma promessa: carregando, sucesso ou erro. */
  promise: <T>(promise: Promise<T>, messages: PromiseMessages<T> = {}) =>
    toast.promise(promise, {
      loading: messages.loading ?? "Salvando…",
      success: messages.success ?? "Pronto",
      error: messages.error ?? "Não foi possível concluir",
    }),

  dismiss: (id?: string | number) => toast.dismiss(id),
}
