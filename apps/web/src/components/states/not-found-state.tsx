import { StatePanel } from "./state-panel"
import type { StatePanelProps } from "./state-panel"
import { Icons } from "@/lib/icons"

export type NotFoundStateProps = Partial<StatePanelProps>

/** Página ou registro inexistente (404). */
export function NotFoundState({
  icon = <Icons.notFound />,
  code = "404",
  title = "Página não encontrada",
  description = "O endereço não existe ou o conteúdo foi movido.",
  headingLevel = 1,
  ...props
}: NotFoundStateProps) {
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
