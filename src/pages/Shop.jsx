import React, { useMemo, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import { Chip } from '../components/Scribbles.jsx'

const AGE_BUCKETS = [
  { id: '0-2', label: '0–2 yrs', match: (p) => /^(0|1|2)/.test(p.ageRange) },
  { id: '3-5', label: '3–5 yrs', match: (p) => /3|4|5/.test(p.ageRange) },
  { id: '6-9', label: '6–9 yrs', match: (p) => /6|7|8|9/.test(p.ageRange) },
  { id: '10+', label: '10+ yrs', match: (p) => /10|11|12/.test(p.ageRange) },
]

const PRICE_BUCKETS = [
  { id: 'lt25', label: 'Under $25', match: (p) => p.price < 25 },
  { id: '25-75', label: '$25 – $75', match: (p) => p.price >= 25 && p.price <= 75 },
  { id: '75-200', label: '$75 – $200', match: (p) => p.price > 75 && p.price <= 200 },
  { id: 'gt200', label: 'Over $200', match: (p) => p.price > 200 },
]

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
]

export default function Shop() {
  const { category } = useParams()
  const [params] = useSearchParams()
  const searchQ = (params.get('q') || '').toLowerCase()

  const [ages, setAges] = useState([])
  const [prices, setPrices] = useState([])
  const [sort, setSort] = useState('featured')

  const catMeta = CATEGORIES.find((c) => c.slug === category)

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (category) list = list.filter((p) => p.category === category)
    if (searchQ) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQ) ||
          p.shortDesc.toLowerCase().includes(searchQ) ||
          p.category.includes(searchQ),
      )
    }
    if (ages.length) {
      list = list.filter((p) => ages.some((a) => AGE_BUCKETS.find((b) => b.id === a)?.match(p)))
    }
    if (prices.length) {
      list = list.filter((p) => prices.some((a) => PRICE_BUCKETS.find((b) => b.id === a)?.match(p)))
    }

    switch (sort) {
      case 'newest':
        return [...list].sort((a, b) => Number(b.tags?.includes('new')) - Number(a.tags?.includes('new')))
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }, [category, searchQ, ages, prices, sort])

  const toggle = (arr, set, id) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id])

  return (
    <PageWrap>
      <section className="border-b border-line">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-muted mb-5">
            <Link to="/" className="hover:text-ink">Home</Link>
            <span className="text-muted/50">/</span>
            <Link to="/shop" className="hover:text-ink">Shop</Link>
            {catMeta && (
              <>
                <span className="text-muted/50">/</span>
                <span className="text-ink">{catMeta.label}</span>
              </>
            )}
          </nav>
          <h1 className="font-display text-4xl md:text-6xl text-ink tracking-tight leading-tight">
            {searchQ
              ? <>Results for <em className="italic text-brand-coral">"{searchQ}"</em></>
              : catMeta
              ? catMeta.label
              : 'All toys'}
          </h1>
          <p className="mt-3 text-muted">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-[240px,1fr] gap-10">
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h3 className="font-display text-base text-ink mb-4">Category</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/shop"
                  className={`block px-3 py-2 text-sm rounded-lg transition ${
                    !category ? 'bg-ink text-paper font-semibold' : 'text-ink/70 hover:bg-brand-blush'
                  }`}
                >
                  All toys
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/shop/${c.slug}`}
                    className={`block px-3 py-2 text-sm rounded-lg transition ${
                      category === c.slug ? 'bg-ink text-paper font-semibold' : 'text-ink/70 hover:bg-brand-blush'
                    }`}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-ink mb-4">Age</h3>
            <div className="space-y-2">
              {AGE_BUCKETS.map((a) => (
                <label key={a.id} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ages.includes(a.id)}
                    onChange={() => toggle(ages, setAges, a.id)}
                    className="w-4 h-4 rounded accent-brand-coral"
                  />
                  <span className="text-ink/80">{a.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base text-ink mb-4">Price</h3>
            <div className="space-y-2">
              {PRICE_BUCKETS.map((p) => (
                <label key={p.id} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prices.includes(p.id)}
                    onChange={() => toggle(prices, setPrices, p.id)}
                    className="w-4 h-4 rounded accent-brand-coral"
                  />
                  <span className="text-ink/80">{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {(ages.length > 0 || prices.length > 0) && (
            <button
              onClick={() => {
                setAges([])
                setPrices([])
              }}
              className="text-sm text-brand-coralDark font-medium hover:underline"
            >
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {ages.map((a) => (
                <Chip key={a} tone="coral">{AGE_BUCKETS.find((b) => b.id === a)?.label}</Chip>
              ))}
              {prices.map((p) => (
                <Chip key={p} tone="sky">{PRICE_BUCKETS.find((b) => b.id === p)?.label}</Chip>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <label className="text-muted">Sort by:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 bg-paper border border-line rounded-full font-medium focus:outline-none focus:border-brand-coral cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card-soft p-14 text-center">
              <h2 className="font-display text-2xl text-ink">No matches</h2>
              <p className="mt-2 text-muted">Try removing some filters or a different category.</p>
              <Link to="/shop" className="inline-block mt-5 text-brand-coralDark font-medium hover:underline">
                Browse all toys →
              </Link>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageWrap>
  )
}
