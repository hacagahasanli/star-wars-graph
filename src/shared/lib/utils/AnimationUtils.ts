import { type CSSProperties } from 'react'

/**
 * Returns props for fade-in animation with delay based on order.
 * @param order - sequence number for delay calculation
 * @param ms - delay multiplier in seconds (default 0.04)
 * @param style - extra inline styles to merge
 * @param className - extra CSS classes to append
 */
export function fadeInProps(order: number, ms = 0.04, style?: CSSProperties, className?: string) {
  return {
    className: `fade-in-animate ${className ?? ''}`.trim(),
    style: { '--delay': `${order * ms}s`, ...style } as CSSProperties
  }
}
