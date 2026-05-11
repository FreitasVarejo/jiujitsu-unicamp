/**
 * Wrapper para links externos (target="_blank") com rastreamento de telemetria.
 *
 * Drop-in replacement para <a target="_blank" rel="noopener noreferrer">.
 * Dispara trackEvent('outbound_link_click') antes de navegar, sem bloquear o navegador.
 *
 * @example
 * <OutboundLink
 *   href="https://www.instagram.com/jiujitsu.unicamp/"
 *   trackLabel="instagram_footer"
 *   className="text-gray-400 hover:text-primary"
 *   aria-label="Instagram"
 * >
 *   <Instagram size={24} />
 * </OutboundLink>
 */

import { AnchorHTMLAttributes, MouseEvent } from "react";
import { telemetry } from "@/services/telemetry";

interface OutboundLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /**
   * Identificador semântico do link em snake_case.
   * Usado como payload.label no evento 'outbound_link_click'.
   * Ex: 'instagram_footer', 'maps_event', 'product_order_form'
   */
  trackLabel: string;
  /** Payload adicional mesclado ao evento, ex: { productId, category }. */
  trackPayload?: Record<string, unknown>;
}

export const OutboundLink = ({
  href,
  trackLabel,
  trackPayload,
  onClick,
  children,
  ...rest
}: OutboundLinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    telemetry.trackEvent("outbound_link_click", {
      label: trackLabel,
      url: href,
      ...trackPayload,
    });
    onClick?.(e);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
};
