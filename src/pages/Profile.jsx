import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Chip } from '../components/Scribbles.jsx'
import { findById } from '../data/products.js'
import { Illustration } from '../data/illustrations.jsx'

const TABS = [
  { id: 'details', label: 'Your details', icon: '👤' },
  { id: 'address', label: 'Address', icon: '🏠' },
  { id: 'kids', label: 'Kids', icon: '🧒' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
]

export default function Profile() {
  const { user, update, logout } = useAuth()
  const [tab, setTab] = useState('details')
  const [form, setForm] = useState(user)
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    update(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const recentOrder = user.orders[0]
  const recentProduct = recentOrder ? findById(recentOrder.items[0]?.id) : null

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex items-center gap-6 flex-wrap">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center font-display text-4xl text-ink shadow-card"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.name[0]}
          </div>
          <div className="flex-1 min-w-[220px]">
            <h1 className="font-display text-4xl md:text-5xl text-ink tracking-tight leading-[1.05]">
              Hi, <em className="italic text-brand-coral">{user.name.split(' ')[0]}</em>
            </h1>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <Chip tone="lavender">Member since {user.joined}</Chip>
              <span className="text-sm text-muted">{user.orders.length} orders</span>
            </div>
          </div>
          <Button onClick={logout} color="ghost" size="md">
            Log out
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-[260px,1fr] gap-10">
        <aside className="space-y-1 lg:sticky lg:top-28 lg:self-start">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-2xl font-medium transition ${
                tab === t.id
                  ? 'bg-ink text-paper'
                  : 'text-ink/70 hover:bg-brand-blush'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
          <Link
            to="/orders"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-2xl font-medium text-ink/70 hover:bg-brand-blush transition"
          >
            <span className="text-base">📦</span>
            <span>Order history</span>
          </Link>
        </aside>

        <div className="space-y-6">
          {tab === 'details' && (
            <form onSubmit={save} className="card-soft p-7 md:p-9">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Your details</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <Field
                  label="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="md:col-span-2"
                />
              </div>
              <div className="mt-7 flex items-center gap-4">
                <Button type="submit" color="coral" size="lg">
                  {saved ? '✓ Saved' : 'Save changes'}
                </Button>
              </div>
            </form>
          )}

          {tab === 'address' && (
            <form onSubmit={save} className="card-soft p-7 md:p-9">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Shipping address</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <Field
                  label="Address line 1"
                  value={form.address.line1}
                  onChange={(e) =>
                    setForm({ ...form, address: { ...form.address, line1: e.target.value } })
                  }
                  className="md:col-span-2"
                />
                <Field
                  label="Address line 2"
                  value={form.address.line2 || ''}
                  onChange={(e) =>
                    setForm({ ...form, address: { ...form.address, line2: e.target.value } })
                  }
                  className="md:col-span-2"
                />
                <Field
                  label="City"
                  value={form.address.city}
                  onChange={(e) =>
                    setForm({ ...form, address: { ...form.address, city: e.target.value } })
                  }
                />
                <div className="grid grid-cols-2 gap-5">
                  <Field
                    label="State"
                    value={form.address.state}
                    onChange={(e) =>
                      setForm({ ...form, address: { ...form.address, state: e.target.value } })
                    }
                  />
                  <Field
                    label="ZIP"
                    value={form.address.zip}
                    onChange={(e) =>
                      setForm({ ...form, address: { ...form.address, zip: e.target.value } })
                    }
                  />
                </div>
              </div>
              <div className="mt-7">
                <Button type="submit" color="coral" size="lg">
                  {saved ? '✓ Saved' : 'Save address'}
                </Button>
              </div>
            </form>
          )}

          {tab === 'kids' && (
            <div className="card-soft p-7 md:p-9">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">Your little ones</h2>
              <p className="text-muted mb-7 text-sm">
                We use this for age-appropriate picks and birthday reminders.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {user.kids.map((k, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-line">
                    <div className="w-12 h-12 rounded-full bg-brand-peachSoft flex items-center justify-center font-display text-xl text-ink mb-3">
                      {k.name[0]}
                    </div>
                    <div className="font-display text-xl text-ink">{k.name}</div>
                    <div className="text-sm text-muted mt-1">
                      Age {k.age} · Loves {k.fav}
                    </div>
                  </div>
                ))}
                <button className="p-5 rounded-2xl border border-dashed border-line text-muted hover:border-brand-coral hover:text-brand-coralDark transition text-sm font-medium">
                  + Add a child
                </button>
              </div>
            </div>
          )}

          {tab === 'payments' && (
            <div className="card-soft p-7 md:p-9">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Saved payments</h2>
              <div className="max-w-md p-6 aspect-[1.6/1] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-coral via-brand-peach to-brand-butter shadow-card">
                <div className="relative h-full flex flex-col text-ink">
                  <div className="font-display text-xl">BabadobaFun</div>
                  <div className="flex-1 flex items-center font-display text-2xl tracking-[0.2em]">
                    •••• •••• •••• 4242
                  </div>
                  <div className="flex justify-between text-xs uppercase">
                    <div>
                      <div className="opacity-60 tracking-wider">Card holder</div>
                      <div className="font-semibold mt-0.5 text-sm normal-case">{user.name}</div>
                    </div>
                    <div>
                      <div className="opacity-60 tracking-wider">Expires</div>
                      <div className="font-semibold mt-0.5 text-sm">08/29</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mt-6 px-5 py-2.5 rounded-full border border-line bg-paper text-sm font-medium hover:border-ink/30 transition">
                + Add new card
              </button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="card-soft p-7 md:p-9">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Notifications</h2>
              <div className="space-y-3">
                {[
                  { id: 'deals', label: 'Weekly deals', sub: 'Fridays only, we promise', def: true },
                  { id: 'restock', label: 'Restock alerts', sub: 'For items on your wishlist', def: true },
                  { id: 'order', label: 'Order & shipping updates', sub: 'Status, tracking, delivery', def: true },
                  { id: 'birthday', label: 'Birthday reminders', sub: 'For kids on your profile', def: false },
                ].map((n) => (
                  <label
                    key={n.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-line hover:border-ink/20 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={n.def}
                      className="w-4 h-4 accent-brand-coral"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-ink text-sm">{n.label}</div>
                      <div className="text-xs text-muted mt-0.5">{n.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {recentOrder && recentProduct && (
            <div className="card-soft p-6 bg-brand-peachSoft">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                Most recent order
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 p-2 bg-paper"
                >
                  <Illustration name={recentProduct.illust} className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg text-ink">{recentOrder.id}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {recentOrder.date} · {recentOrder.status}
                  </div>
                </div>
                <Button
                  to={`/order-confirmation/${recentOrder.id.replace('#', '')}`}
                  color="ink"
                  size="md"
                >
                  View
                </Button>
              </div>
            </div>
          )}
        </div>
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
