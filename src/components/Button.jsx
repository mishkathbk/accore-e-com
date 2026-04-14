import React from 'react'
import { Link } from 'react-router-dom'

const variants = {
  coral: 'bg-brand-coral text-white hover:bg-brand-coralDark shadow-lift',
  ink: 'bg-ink text-paper hover:bg-ink/90',
  ghost: 'bg-transparent text-ink hover:bg-brand-blush border border-line',
  outline: 'bg-paper text-ink hover:bg-brand-peachSoft border border-line',
  yellow: 'bg-brand-yellow text-ink hover:brightness-95',
  mint: 'bg-brand-mint text-ink hover:brightness-95',
}

const sizes = {
  sm: 'text-sm px-4 py-2 rounded-full',
  md: 'text-base px-6 py-3 rounded-full',
  lg: 'text-base px-7 py-3.5 rounded-full',
  xl: 'text-lg px-8 py-4 rounded-full',
}

export function Button({
  children,
  color = 'coral',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold ' +
    'transition-all duration-200 will-change-transform ' +
    'disabled:opacity-50 disabled:cursor-not-allowed'

  const cls = `${base} ${variants[color] || variants.coral} ${sizes[size] || sizes.md} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  )
}

export default Button
