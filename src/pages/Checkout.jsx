import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Illustration } from '../data/illustrations.jsx'

const STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
]

export default function Checkout() {
  const { detailed, subtotal, shipping, tax, total, clear } = useCart()
  const { user, addOrder } = useAuth()
  const nav = useNavigate()
  const [step, setStep] = useState('contact')
  const [form, setForm] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: user?.address?.line1 || '',
    address2: user?.address?.line2 || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
    country: 'USA',
    shipMethod: 'standard',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    paymentMethod: 'card',
  })
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  if (detailed.length === 0) return <Navigate to="/cart" replace />

  const placeOrder = (e) => {
    e.preventDefault()
    const orderId = `#BDBF-${Math.floor(20000 + Math.random() * 9000)}`
    addOrder({
      id: orderId,
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
      total: Number(total.toFixed(2)),
      items: detailed.map((d) => ({ id: d.id, qty: d.qty, price: d.product.price })),
    })
    clear()
    nav(`/order-confirmation/${orderId.replace('#', '')}`)
  }

  const canContinue = {
    contact: form.email && form.phone && form.firstName && form.lastName,
    shipping: form.address && form.city && form.state && form.zip,
    payment:
      form.paymentMethod !== 'card' ||
      (form.cardName && form.cardNumber.length >= 13 && form.expiry && form.cvc),
  }

  const stepIdx = STEPS.findIndex((s) => s.id === step)

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <nav className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="text-muted/50">/</span>
          <Link to="/cart" className="hover:text-ink">Cart</Link>
          <span className="text-muted/50">/</span>
          <span className="text-ink">Checkout</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-ink tracking-tight leading-[1.05]">
          Checkout
        </h1>

        <div className="mt-8 flex items-center gap-4">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                type="button"
                onClick={() => i <= stepIdx && setStep(s.id)}
                className="flex items-center gap-2.5"
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                    step === s.id
                      ? 'bg-brand-coral text-white'
                      : i < stepIdx
                      ? 'bg-ink text-paper'
                      : 'bg-brand-blush text-ink/60'
                  }`}
                >
                  {i < stepIdx ? '✓' : i + 1}
                </span>
                <span
                  className={`hidden sm:inline text-sm font-medium ${
                    step === s.id ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-line" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr,380px] gap-10">
        <form onSubmit={placeOrder} className="space-y-6">
          {step === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-soft p-7 md:p-9"
            >
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Contact information</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="First name" value={form.firstName} onChange={upd('firstName')} />
                <Field label="Last name" value={form.lastName} onChange={upd('lastName')} />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={upd('email')}
                  className="md:col-span-2"
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={upd('phone')}
                  className="md:col-span-2"
                />
              </div>
              <div className="mt-8 flex justify-between items-center">
                <Link to="/cart" className="text-sm text-muted hover:text-ink font-medium">
                  ← Back to cart
                </Link>
                <Button
                  type="button"
                  color="coral"
                  size="lg"
                  onClick={() => canContinue.contact && setStep('shipping')}
                  disabled={!canContinue.contact}
                >
                  Continue to shipping
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'shipping' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-soft p-7 md:p-9"
            >
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Shipping address</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <Field
                  label="Address line 1"
                  value={form.address}
                  onChange={upd('address')}
                  className="md:col-span-2"
                />
                <Field
                  label="Address line 2 (optional)"
                  value={form.address2}
                  onChange={upd('address2')}
                  className="md:col-span-2"
                />
                <Field label="City" value={form.city} onChange={upd('city')} />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="State" value={form.state} onChange={upd('state')} />
                  <Field label="ZIP" value={form.zip} onChange={upd('zip')} />
                </div>
              </div>

              <h3 className="font-display text-lg text-ink mt-10 mb-4">Shipping method</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { id: 'standard', label: 'Standard', sub: '5–7 days', price: 'Free over $200' },
                  { id: 'express', label: 'Express', sub: '2–3 days', price: '+$14' },
                  { id: 'overnight', label: 'Overnight', sub: 'Next day', price: '+$39' },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setForm({ ...form, shipMethod: m.id })}
                    className={`text-left p-5 rounded-2xl border transition ${
                      form.shipMethod === m.id
                        ? 'border-brand-coral bg-brand-blush/30'
                        : 'border-line bg-paper hover:border-ink/30'
                    }`}
                  >
                    <div className="font-semibold text-ink">{m.label}</div>
                    <div className="text-xs text-muted mt-0.5">{m.sub}</div>
                    <div className="text-sm text-ink mt-3 font-medium">{m.price}</div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('contact')}
                  className="text-sm text-muted hover:text-ink font-medium"
                >
                  ← Back
                </button>
                <Button
                  type="button"
                  color="coral"
                  size="lg"
                  onClick={() => canContinue.shipping && setStep('payment')}
                  disabled={!canContinue.shipping}
                >
                  Continue to payment
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-soft p-7 md:p-9"
            >
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Payment method</h2>
              <div className="grid md:grid-cols-3 gap-3 mb-7">
                {[
                  { id: 'card', label: 'Credit card', icon: '💳' },
                  { id: 'paypal', label: 'PayPal', icon: '🅿' },
                  { id: 'apple', label: 'Apple Pay', icon: '🍎' },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setForm({ ...form, paymentMethod: m.id })}
                    className={`p-5 rounded-2xl border text-sm font-medium transition flex flex-col items-center gap-2 ${
                      form.paymentMethod === m.id
                        ? 'border-brand-coral bg-brand-blush/30'
                        : 'border-line bg-paper hover:border-ink/30'
                    }`}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-ink">{m.label}</span>
                  </button>
                ))}
              </div>

              {form.paymentMethod === 'card' && (
                <>
                  <div className="mb-7">
                    <div className="relative mx-auto max-w-md p-6 aspect-[1.6/1] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-coral via-brand-peach to-brand-butter shadow-card">
                      <div className="relative z-10 h-full flex flex-col text-ink">
                        <div className="font-display text-xl">BabadobaFun</div>
                        <div className="flex-1 flex items-center">
                          <div className="font-display text-2xl tracking-[0.2em]">
                            {form.cardNumber
                              ? form.cardNumber.replace(/(\d{4})/g, '$1 ').trim()
                              : '•••• •••• •••• ••••'}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs uppercase">
                          <div>
                            <div className="opacity-60 tracking-wider">Card holder</div>
                            <div className="font-semibold mt-0.5 text-sm normal-case">
                              {form.cardName || 'Your name'}
                            </div>
                          </div>
                          <div>
                            <div className="opacity-60 tracking-wider">Expires</div>
                            <div className="font-semibold mt-0.5 text-sm">{form.expiry || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      label="Name on card"
                      value={form.cardName}
                      onChange={upd('cardName')}
                      className="md:col-span-2"
                    />
                    <Field
                      label="Card number"
                      value={form.cardNumber}
                      onChange={(e) =>
                        setForm({ ...form, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })
                      }
                      className="md:col-span-2"
                      placeholder="4242 4242 4242 4242"
                    />
                    <Field
                      label="Expiry"
                      value={form.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                        if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2)
                        setForm({ ...form, expiry: v })
                      }}
                      placeholder="MM/YY"
                    />
                    <Field
                      label="CVC"
                      value={form.cvc}
                      onChange={(e) =>
                        setForm({ ...form, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })
                      }
                      placeholder="123"
                    />
                  </div>
                </>
              )}

              {form.paymentMethod !== 'card' && (
                <div className="p-8 rounded-2xl bg-brand-peachSoft text-center">
                  <div className="text-3xl mb-3">✨</div>
                  <div className="font-display text-lg text-ink">
                    You'll complete payment in the next step.
                  </div>
                  <div className="text-muted text-sm mt-1">(This is a demo site.)</div>
                </div>
              )}

              <div className="mt-8 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-sm text-muted hover:text-ink font-medium"
                >
                  ← Back
                </button>
                <Button type="submit" color="coral" size="lg" disabled={!canContinue.payment}>
                  Place order · ${total.toFixed(2)}
                </Button>
              </div>
            </motion.div>
          )}
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card-soft p-6">
            <h3 className="font-display text-xl text-ink mb-4">Your order</h3>
            <div className="space-y-4 max-h-80 overflow-auto pr-1 -mr-1">
              {detailed.map((d) => (
                <div key={d.id} className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center relative flex-shrink-0 p-2"
                    style={{ backgroundColor: d.product.bgColor ? d.product.bgColor + '66' : '#FFF5F1' }}
                  >
                    <Illustration name={d.product.illust} className="w-full h-full" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ink text-paper rounded-full text-[10px] font-semibold flex items-center justify-center">
                      {d.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink truncate">{d.product.name}</div>
                    <div className="text-xs text-muted mt-0.5">Ages {d.product.ageRange}</div>
                  </div>
                  <div className="text-sm font-semibold text-ink">${d.lineTotal.toFixed(0)}</div>
                </div>
              ))}
            </div>
            <dl className="mt-5 pt-5 border-t border-line space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-ink">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="font-semibold text-ink">
                  {shipping === 0 ? <span className="text-emerald-600">Free</span> : `$${shipping.toFixed(2)}`}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Tax</dt>
                <dd className="font-semibold text-ink">${tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between items-baseline pt-3 mt-2 border-t border-line">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-display text-2xl text-ink">${total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </PageWrap>
  )
}

function Field({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-2">
        {label}
      </span>
      <input
        {...props}
        className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-sm focus:outline-none focus:border-brand-coral focus:bg-paper transition"
      />
    </label>
  )
}
