// Minimal decorative helpers — kept intentionally subtle.
import React from 'react'

export function Chip({ children, tone = 'coral', className = '' }) {
  const tones = {
    coral: 'bg-brand-blush text-brand-coralDark',
    mint: 'bg-brand-mintSoft text-emerald-700',
    sky: 'bg-brand-skySoft text-sky-700',
    butter: 'bg-brand-butter text-amber-700',
    lavender: 'bg-brand-lavenderSoft text-violet-700',
    ink: 'bg-ink text-paper',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${tones[tone] || tones.coral} ${className}`}
    >
      {children}
    </span>
  )
}

// Legacy aliases, now map to Chip
export const Tag = ({ children, className = '' }) => <Chip className={className}>{children}</Chip>
export const Stamp = ({ children, className = '' }) => <Chip className={className}>{children}</Chip>

// A gentle decorative blob — used behind hero imagery
export function Blob({ className = '', color = '#FFDAC9' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M45.1,-58.3C56.7,-48.3,63.2,-33.1,66.7,-17.4C70.2,-1.7,70.6,14.5,63.7,27.2C56.9,40,42.7,49.3,28,55.7C13.4,62.1,-1.6,65.6,-15.9,62.5C-30.2,59.4,-43.8,49.6,-52.4,36.8C-61,24,-64.6,8.2,-63.1,-7.3C-61.7,-22.9,-55.2,-38.1,-44.1,-48.4C-33,-58.8,-17.3,-64.3,-0.6,-63.6C16.1,-62.9,33.5,-68.3,45.1,-58.3Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

// Thin gently curved divider for section separators
export function WaveDivider({ className = '', color = '#FDF9F3' }) {
  return (
    <svg viewBox="0 0 1440 80" className={className} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={color} />
    </svg>
  )
}

// Small star glyph — used sparingly
export function StarMark({ className = '', color = '#FFD166', width, height }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2 L14 9 L21 10 L16 14.5 L17.5 21.5 L12 17.5 L6.5 21.5 L8 14.5 L3 10 L10 9 Z"
        fill={color}
      />
    </svg>
  )
}
