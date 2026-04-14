import React, { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Illustration } from '../data/illustrations.jsx'
import { findProduct, byCategory } from '../data/products.js'
import { getReviews } from '../data/reviews.js'
import { Chip, StarMark } from '../components/Scribbles.jsx'
import { useCart } from '../context/CartContext.jsx'

function Stars({ value, size = 16 }) {
  const full = Math.round(value)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarMark
          key={i}
          className=""
          color={i < full ? '#FFD166' : '#E6E1D7'}
          width={size}
          height={size}
        />
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const nav = useNavigate()
  const product = findProduct(slug)
  const [qty, setQty] = useState(1)
  const [color, setColor] = useState(product?.colors?.[0])
  const [tab, setTab] = useState('desc')
  const [added, setAdded] = useState(false)
  const { add } = useCart()

  const reviews = useMemo(() => (product ? getReviews(product.id) : []), [product])
  const related = useMemo(
    () => (product ? byCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4) : []),
    [product],
  )

  if (!product) {
    return (
      <PageWrap>
        <section className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-5xl text-ink">Product not found</h1>
          <p className="mt-4 text-muted">It may have rolled under the couch.</p>
          <Button to="/shop" color="coral" size="lg" className="mt-8">
            Back to shop
          </Button>
        </section>
      </PageWrap>
    )
  }

  const onAdd = () => {
    add(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }
  const onBuyNow = () => {
    add(product.id, qty)
    nav('/checkout')
  }
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="text-muted/50">/</span>
          <Link to="/shop" className="hover:text-ink">Shop</Link>
          <span className="text-muted/50">/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-ink capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span className="text-muted/50">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square card-soft overflow-hidden flex items-center justify-center p-16"
            style={{ backgroundColor: product.bgColor ? product.bgColor + '66' : '#FFF5F1' }}
          >
            {product.tags?.includes('bestseller') && (
              <div className="absolute top-5 left-5">
                <Chip tone="butter">Bestseller</Chip>
              </div>
            )}
            {product.tags?.includes('new') && (
              <div className="absolute top-5 left-5">
                <Chip tone="mint">New</Chip>
              </div>
            )}
            <Illustration name={product.illust} className="w-full h-full" />
          </motion.div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            {[product.illust, 'beach-ball', 'kite', 'plush-bear'].map((n, i) => (
              <div
                key={i}
                className={`card-soft p-3 aspect-square flex items-center justify-center cursor-pointer ${i === 0 ? 'ring-2 ring-brand-coral' : ''}`}
              >
                <Illustration name={n} className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Chip tone="lavender">Ages {product.ageRange}</Chip>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-4 tracking-tight leading-[1.05]">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <Stars value={product.rating} />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted">({product.reviews} reviews)</span>
          </div>
          <p className="mt-5 text-muted leading-relaxed">{product.shortDesc}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-display text-4xl text-ink">${product.price.toFixed(0)}</div>
            {product.compareAt && (
              <>
                <div className="text-xl text-muted line-through">${product.compareAt}</div>
                <Chip tone="coral">Save ${(product.compareAt - product.price).toFixed(0)}</Chip>
              </>
            )}
          </div>

          {product.colors?.length > 0 && (
            <div className="mt-7">
              <div className="text-sm font-semibold mb-2">
                Colour: <span className="text-muted font-normal">{color}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                      c === color
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-paper text-ink border-line hover:border-ink'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center border border-line rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-11 hover:bg-brand-blush transition text-lg"
              >
                −
              </button>
              <div className="w-10 text-center font-semibold">{qty}</div>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-10 h-11 hover:bg-brand-blush transition text-lg"
              >
                +
              </button>
            </div>
            <div className="text-sm text-muted">
              {product.stock > 10 ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> In stock
                </span>
              ) : (
                `Only ${product.stock} left`
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={onAdd} color="coral" size="lg">
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ✓ Added to cart
                  </motion.span>
                ) : (
                  <motion.span key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Add to cart
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
            <Button onClick={onBuyNow} color="ink" size="lg">
              Buy now
            </Button>
          </div>

          <div className="mt-10 pt-7 border-t border-line grid grid-cols-2 gap-5 text-sm">
            {[
              { icon: '🚚', label: 'Free shipping', sub: 'on orders over $200' },
              { icon: '↻', label: '30-day returns', sub: 'no questions asked' },
              { icon: '🛟', label: '2-year warranty', sub: 'included free' },
              { icon: '🎁', label: 'Gift wrap', sub: 'available at checkout' },
            ].map((p) => (
              <div key={p.label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center flex-shrink-0 text-base">
                  {p.icon}
                </div>
                <div>
                  <div className="font-semibold text-ink">{p.label}</div>
                  <div className="text-xs text-muted">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-line">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-line">
          {[
            { id: 'desc', label: 'Description' },
            { id: 'features', label: 'Features' },
            { id: 'specs', label: 'Specifications' },
            { id: 'reviews', label: `Reviews (${reviews.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                tab === t.id
                  ? 'border-brand-coral text-ink'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl">
          {tab === 'desc' && <p className="text-lg text-ink/80 leading-relaxed">{product.desc}</p>}
          {tab === 'features' && (
            <ul className="space-y-4">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-brand-mintSoft flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#10B981" strokeWidth="3">
                      <path d="M5 12l5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-ink/80">{f}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === 'specs' && (
            <dl className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-line">
                  <dt className="text-muted text-sm">{k}</dt>
                  <dd className="text-ink font-medium text-sm text-right">{String(v)}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === 'reviews' && (
            <div className="grid md:grid-cols-[220px,1fr] gap-12">
              <div>
                <div className="font-display text-5xl text-ink">{avg.toFixed(1)}</div>
                <Stars value={avg} size={20} />
                <div className="text-sm text-muted mt-2">Based on {reviews.length} reviews</div>
                <div className="mt-4 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((n) => {
                    const count = reviews.filter((r) => r.rating === n).length
                    const pct = reviews.length ? (count / reviews.length) * 100 : 0
                    return (
                      <div key={n} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-muted">{n}</span>
                        <div className="flex-1 h-1.5 bg-line rounded-full overflow-hidden">
                          <div className="h-full bg-brand-yellow" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-6 text-right text-muted">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-8">
                {reviews.map((r) => (
                  <div key={r.id} className="pb-8 border-b border-line last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center font-display text-ink">
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-ink text-sm">{r.name}</div>
                        <div className="text-xs text-muted">{r.date}</div>
                      </div>
                      <div className="ml-auto"><Stars value={r.rating} size={14} /></div>
                    </div>
                    <div className="font-display text-xl text-ink mt-3">{r.title}</div>
                    <p className="mt-2 text-ink/70 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8 tracking-tight">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </PageWrap>
  )
}
