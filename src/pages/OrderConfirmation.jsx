import React, { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { findById } from '../data/products.js'
import { Illustration } from '../data/illustrations.jsx'
import { Chip } from '../components/Scribbles.jsx'

export default function OrderConfirmation() {
  const { id } = useParams()
  const { user } = useAuth()
  const order = useMemo(
    () => user.orders.find((o) => o.id.replace('#', '') === id),
    [user, id],
  )

  if (!order) return <Navigate to="/orders" replace />

  const etaDays = order.status === 'Processing' ? '3–5' : '2'

  return (
    <PageWrap>
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="w-20 h-20 mx-auto rounded-full bg-brand-mintSoft flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#10B981" strokeWidth="2.5">
            <path d="M5 12l5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <div className="mt-6">
          <Chip tone="mint">Order confirmed</Chip>
        </div>

        <h1 className="font-display text-4xl md:text-6xl text-ink tracking-tight leading-[1.05] mt-5">
          Thank you,{' '}
          <em className="italic text-brand-coral">{user.name.split(' ')[0]}</em>
        </h1>
        <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
          Your order is placed. We've packed it up and it's on its way — expect delivery in about{' '}
          <span className="text-ink font-semibold">{etaDays} business days</span>.
        </p>

        <div className="mt-8 inline-flex items-center gap-6 card-soft px-7 py-4">
          <div className="text-left">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider">Order number</div>
            <div className="font-display text-xl text-ink mt-0.5">{order.id}</div>
          </div>
          <div className="w-px h-10 bg-line" />
          <div className="text-left">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider">Total</div>
            <div className="font-display text-xl text-ink mt-0.5">${order.total.toFixed(2)}</div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="card-soft p-7 md:p-9">
          <h2 className="font-display text-2xl text-ink mb-6">What's on the way</h2>
          <div className="space-y-4">
            {order.items.map((it) => {
              const p = findById(it.id)
              if (!p) return null
              return (
                <div
                  key={it.id}
                  className="flex items-center gap-4 py-3 border-b border-line last:border-0"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 p-2"
                    style={{ backgroundColor: p.bgColor ? p.bgColor + '66' : '#FFF5F1' }}
                  >
                    <Illustration name={p.illust} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${p.slug}`}
                      className="font-display text-lg text-ink hover:text-brand-coralDark"
                    >
                      {p.name}
                    </Link>
                    <div className="text-xs text-muted mt-0.5">Qty {it.qty}</div>
                  </div>
                  <div className="font-semibold text-ink">${(it.price * it.qty).toFixed(0)}</div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 pt-6 border-t border-line flex justify-between items-baseline">
            <div className="text-sm text-muted">Total paid</div>
            <div className="font-display text-3xl text-ink">${order.total.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="card-soft p-6">
            <div className="w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center mb-4">
              📦
            </div>
            <div className="text-xs font-semibold text-muted uppercase tracking-wider">Shipping to</div>
            <div className="mt-1.5 text-sm text-ink leading-relaxed">
              {user.address.line1}
              <br />
              {user.address.line2 && (
                <>
                  {user.address.line2}
                  <br />
                </>
              )}
              {user.address.city}, {user.address.state} {user.address.zip}
            </div>
          </div>
          <div className="card-soft p-6">
            <div className="w-10 h-10 rounded-full bg-brand-skySoft flex items-center justify-center mb-4">
              📧
            </div>
            <div className="text-xs font-semibold text-muted uppercase tracking-wider">Confirmation</div>
            <div className="mt-1.5 text-sm text-ink break-all">Sent to {user.email}</div>
          </div>
          <div className="card-soft p-6">
            <div className="w-10 h-10 rounded-full bg-brand-mintSoft flex items-center justify-center mb-4">
              🚚
            </div>
            <div className="text-xs font-semibold text-muted uppercase tracking-wider">Estimated delivery</div>
            <div className="mt-1.5 text-sm text-ink">{etaDays} business days</div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Button to="/orders" color="coral" size="lg">
            View my orders
          </Button>
          <Button to="/shop" color="ghost" size="lg">
            Keep shopping
          </Button>
        </div>
      </section>
    </PageWrap>
  )
}
