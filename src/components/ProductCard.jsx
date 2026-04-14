import React from 'react'
import { Link } from 'react-router-dom'
import { Illustration } from '../data/illustrations.jsx'
import { Chip } from './Scribbles.jsx'
import { useCart } from '../context/CartContext.jsx'

const badgeFor = (p) => {
  if (p.tags?.includes('bestseller')) return { label: 'Bestseller', tone: 'butter' }
  if (p.tags?.includes('new')) return { label: 'New', tone: 'mint' }
  if (p.tags?.includes('sale')) return { label: 'Sale', tone: 'coral' }
  return null
}

export default function ProductCard({ product }) {
  const { add } = useCart()
  const badge = badgeFor(product)
  const save = product.compareAt ? Math.round(100 - (product.price / product.compareAt) * 100) : 0

  return (
    <div className="group">
      <Link
        to={`/product/${product.slug}`}
        className="block card-soft card-soft-hover overflow-hidden"
      >
        <div className="relative aspect-square p-8 flex items-center justify-center" style={{ backgroundColor: product.bgColor ? product.bgColor + '55' : '#FFF5F1' }}>
          {badge && (
            <div className="absolute top-4 left-4">
              <Chip tone={badge.tone}>{badge.label}</Chip>
            </div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paper/80 backdrop-blur flex items-center justify-center hairline hover:bg-paper transition"
            aria-label="Save for later"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#2D2B3A" strokeWidth="2">
              <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
            </svg>
          </button>
          <Illustration name={product.illust} className="w-full h-full max-w-[220px] max-h-[220px] transition-transform duration-500 group-hover:scale-105" />
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>Ages {product.ageRange}</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>★ {product.rating} ({product.reviews})</span>
          </div>
          <h3 className="mt-1.5 font-display text-lg leading-snug text-ink line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl text-ink">${product.price.toFixed(0)}</span>
              {product.compareAt && (
                <>
                  <span className="text-sm line-through text-muted">${product.compareAt}</span>
                  <span className="text-xs font-semibold text-brand-coralDark">−{save}%</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                add(product.id, 1)
              }}
              className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-brand-coral transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
