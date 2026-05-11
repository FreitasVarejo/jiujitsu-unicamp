/**
 * OutboundLink Component
 *
 * Wrapper for external links with automatic telemetry tracking
 * Fires outbound_link_click event when clicked
 *
 * Usage:
 *   <OutboundLink
 *     label="instagram_footer"
 *     url="https://instagram.com/jiujitsu.unicamp"
 *     target="_blank"
 *     rel="noopener noreferrer"
 *   >
 *     Follow us on Instagram
 *   </OutboundLink>
 */

import { telemetry } from '@/services/telemetry'

interface OutboundLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Identifier for the link (used in telemetry) */
  label: string
  /** Full URL destination */
  url: string
  /** Link text/content */
  children?: React.ReactNode
}

export const OutboundLink = ({
  label,
  url,
  children,
  onClick,
  ...props
}: OutboundLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    telemetry.trackEvent('outbound_link_click', { label, url })
    onClick?.(e)
  }

  return (
    <a href={url} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
