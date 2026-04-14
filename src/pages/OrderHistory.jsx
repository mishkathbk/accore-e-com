import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { findById } from '../data/products.js'
import { Illustration } from '../data/illustrations.jsx'
import { Chip } from '../components/Scribbles.jsx'

const statusTones = {
  Delivered: 'mint',
  'In transit': 'butter',
  Processing: 'coral',
  Cancelled: 'lavender',
}

export default function OrderHistory() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All orders' },
    { id: 'Delivered', label: 'Delivered' },
    { id: 'In transit', label: 'In transit' },
    { id: 'Processing', label: 'Processing' },
  ]

  const filtered = filter === 'all' ? user.orders : user.orders.filter((o) => o.status === filter)

  return (
    <PageWrap>
      <section className="max-w-5xl mx-auto px-6 pt-12">
        <nav className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="text-muted/50">/</span>
          <Link to="/profile" className="hover:text-ink">Profile</Link>
          <span className="text-muted/50">/</span>
          <span className="text-ink">Orders</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-ink tracking-tight leading-[1.05]">
          Order <em className="italic text-brand-coral">history</em>
        </h1>
        <p className="mt-3 text-muted">
          {user.orders.length} {user.orders.length === 1 ? 'order' : 'orders'} placed
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                filter === f.id
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-line hover:border-ink/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-5">
        {filtered.length === 0 ? (
          <div className="card-soft p-14 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-blush flex items-center justify-center text-2xl mb-4">
              📭
            </div>
            <h2 className="font-display text-2xl text-ink">No orders here</h2>
            <p className="mt-2 text-muted text-sm">Start shopping and come back with stories.</p>
            <Button to="/shop" color="coral" size="lg" className="mt-6">
              Browse toys
            </Button>
          </div>
        ) : (
          filtered.map((o) => (
            <motion.article
              key={o.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-soft p-6 md:p-7"
            >
              <header className="flex flex-wrap items-center gap-4 justify-between pb-5 border-b border-line">
                <div>
                  <div className="font-display text-xl text-ink">{o.id}</div>
                  <div className="text-xs text-muted mt-0.5">Ordered {o.date}</div>
                </div>
                <Chip tone={statusTones[o.status] || 'coral'}>{o.status}</Chip>
                <div className="font-display text-2xl text-ink">${o.total.toFixed(2)}</div>
              </header>

              <div className="mt-5 flex flex-wrap gap-3">
                {o.items.map((it) => {
                  const p = findById(it.id)
                  if (!p) return null
                  return (
                    <Link
                      to={`/product/${p.slug}`}
                      key={it.id}
                      className="flex items-center gap-3 pr-4 py-2 pl-2 rounded-2xl border border-line hover:border-ink/30 transition"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center p-1.5"
                        style={{
                          backgroundColor: p.bgColor ? p.bgColor + '66' : '#FFF5F1',
                        }}
                      >
                        <Illustration name={p.illust} className="w-full h-full" />
                      </div>
                      <div>
                        <div className="text-sm text-ink leading-tight max-w-[180px] truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted mt-0.5">Qty {it.qty}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-5 pt-5 border-t border-line flex flex-wrap gap-3 justify-end">
                <Button
                  to={`/order-confirmation/${o.id.replace('#', '')}`}
                  color="ghost"
                  size="sm"
                >
                  View details
                </Button>
                <Button color="ghost" size="sm">
                  Track
                </Button>
                <Button color="coral" size="sm">
                  Reorder
                </Button>
              </div>
            </motion.article>
          ))
        )}
      </section>
    </PageWrap>
  )
}
