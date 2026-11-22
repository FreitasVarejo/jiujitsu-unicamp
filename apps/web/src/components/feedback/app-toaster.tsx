import { useSyncExternalStore } from "react"

import { Toaster } from "@/components/ui/sonner"
import { Icons } from "@/lib/icons"

type ToasterProps = React.ComponentProps<typeof Toaster>

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

const isDark = () => document.documentElement.classList.contains("dark")

/** Segue a classe `dark` do <html>, que é o que o shadcn usa para o tema. */
function useColorScheme(): "light" | "dark" {
  return useSyncExternalStore(
    subscribe,
    () => (isDark() ? "dark" : "light"),
    () => "light"
  )
}

// O sonner traz fonte e sombra próprias: `fontFamily` e `shadow-lg!` as trocam
// pelas do tema. As quatro variáveis `--normal-*` e `--border-radius` são as
// que o Toaster do shadcn define; repetidas aqui porque `style` substitui o dele.
const toasterStyle = {
  fontFamily: "var(--font-sans)",
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
  "--border-radius": "var(--radius)",
} as React.CSSProperties

/**
 * Toaster do shadcn (sonner) com o claro/escuro do <html> e os ícones do tema
 * (`@/lib/icons`). Monte uma vez, perto da raiz.
 */
export function AppToaster(props: ToasterProps) {
  const theme = useColorScheme()
  return (
    <Toaster
      theme={theme}
      position="bottom-right"
      style={toasterStyle}
      toastOptions={{ classNames: { toast: "cn-toast shadow-lg!" } }}
      icons={{
        success: <Icons.success className="size-4" />,
        info: <Icons.info className="size-4" />,
        warning: <Icons.warning className="size-4" />,
        error: <Icons.error className="size-4" />,
        loading: <Icons.loading className="size-4 animate-spin" />,
      }}
      {...props}
    />
  )
}
