import { StatePanel } from "./state-panel"
import type { StatePanelProps } from "./state-panel"
import { Icons } from "@/lib/icons"

export type ForbiddenStateProps = Partial<StatePanelProps>

/** Usuário autenticado sem acesso ao conteúdo (403). */
export function ForbiddenState({
  icon = <Icons.forbidden />,
  code = "403",
  title = "Sem permissão",
  description = "Você não tem acesso a este conteúdo. Peça acesso a quem administra.",
  headingLevel = 1,
  ...props
}: ForbiddenStateProps) {
  return (
    <StatePanel
      icon={icon}
      code={code}
      title={title}
      description={description}
      headingLevel={headingLevel}
      {...props}
    />
  )
}
