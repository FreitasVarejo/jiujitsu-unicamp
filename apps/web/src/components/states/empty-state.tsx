import { StatePanel } from "./state-panel"
import type { StatePanelProps } from "./state-panel"
import { Icons } from "@/lib/icons"

export type EmptyStateProps = Partial<StatePanelProps>

/** Lista ou busca sem resultado. Todo texto é sobrescrevível por prop. */
export function EmptyState({
  icon = <Icons.empty />,
  title = "Nada por aqui",
  description = "Ainda não há nada para mostrar.",
  ...props
}: EmptyStateProps) {
  return (
    <StatePanel
      icon={icon}
      title={title}
      description={description}
      {...props}
    />
  )
}
