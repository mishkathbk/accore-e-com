import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { useCart } from '../context/CartContext.jsx'
import { Illustration } from '../data/illustrations.jsx'
import { Chip } from '../components/Scribbles.jsx'

export default function Cart() {
  const { detailed, count, subtotal, shipping, tax, total, setQty, remove, clear } = useCart()

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <nav className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="text-muted/50">/</span>
          <span className="text-ink">Cart</span>
        </nav>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-ink tracking-tight leading-[1.05]">
              Your <em className="italic text-brand-coral">cart</em>
            </h1>
            <p className="mt-2 text-muted">
              {count} {count === 1 ? 'item' : 'items'} ready to go
            </p>
          </div>
          {detailed.length > 0 && (
            <button
              onClick={clear}
              className="text-sm text-muted hover:text-brand-coralDark font-medium"
            >
              Clear cart
            </button>
          )}
        </div>
      </section>

      {detailed.length === 0 ? (
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="card-soft p-12 md:p-16">
            <div className="w-24 h-24 mx-auto rounded-full bg-brand-blush flex items-center justify-center text-4xl">
              🛒
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-6">Your cart is empty</h2>
            <p className="mt-3 text-muted max-w-md mx-auto">
              Looks like you haven't added anything yet. Let's find some joy to bring home.
            </p>
            <Button to="/shop" color="coral" size="lg" className="mt-8">
              Start shopping
            </Button>
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr,380px] gap-10">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {detailed.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card-soft p-5 flex gap-5 items-center"
                >
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-24 h-24 flex-shrink-0 rounded-2xl flex items-center justify-center p-3"
                    style={{ backgroundColor: item.product.bgColor ? item.product.bgColor + '66' : '#FFF5F1' }}
                  >
                    <Illustration name={item.product.illust} className="w-full h-full" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="font-display text-xl text-ink leading-tight line-clamp-2 hover:text-brand-coralDark"
                    >
                      {item.product.name}
                    </Link>
                    <div className="mt-1 text-xs text-muted">Ages {item.product.ageRange}</div>
                    <div className="mt-3 flex items-center gap-4 flex-wrap">
                      <div className="flex items-center border border-line rounded-full overflow-hidden">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="w-9 h-9 hover:bg-brand-blush transition text-lg"
                        >
                          −
                        </button>
                        <div className="w-10 text-center font-semibold text-sm">{item.qty}</div>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="w-9 h-9 hover:bg-brand-blush transition text-lg"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-sm text-muted hover:text-brand-coralDark font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-2xl text-ink">${item.lineTotal.toFixed(0)}</div>
                    {item.qty > 1 && (
                      <div className="text-xs text-muted mt-0.5">${item.product.price.toFixed(0)} ea</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="pt-4">
              <Link to="/shop" className="text-sm text-brand-coralDark font-medium hover:underline">
                ← Keep shopping
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start space-y-5">
            <div className="card-soft p-7">
              <h3 className="font-display text-2xl text-ink mb-5">Order summary</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="font-semibold text-ink">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Shipping</dt>
                  <dd className="font-semibold text-ink">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Tax (est.)</dt>
                  <dd className="font-semibold text-ink">${tax.toFixed(2)}</dd>
                </div>
                <div className="pt-4 border-t border-line flex justify-between items-baseline">
                  <dt className="font-semibold text-ink">Total</dt>
                  <dd className="font-display text-3xl text-ink">${total.toFixed(2)}</dd>
                </div>
              </dl>
              {subtotal < 200 && (
                <div className="mt-5 text-xs bg-brand-peachSoft rounded-2xl p-3 text-ink/80 flex items-start gap-2">
                  <span>🚚</span>
                  <span>Spend ${(200 - subtotal).toFixed(2)} more for free shipping</span>
                </div>
              )}
              <Button to="/checkout" color="coral" size="lg" className="w-full mt-6">
                Checkout
              </Button>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
                <span>🔒</span>
                <span>Secure checkout · demo site</span>
              </div>
            </div>

            <div className="card-soft p-5">
              <div className="text-sm font-semibold text-ink">Have a coupon?</div>
              <div className="flex gap-2 mt-3">
                <input
                  placeholder="GUZAL10"
                  className="flex-1 px-4 py-2.5 bg-cream border border-line rounded-full text-sm placeholder:text-muted/60 focus:outline-none focus:border-brand-coral"
                />
                <button className="px-5 py-2.5 bg-ink text-paper rounded-full text-sm font-semibold hover:bg-ink/90 transition">
                  Apply
                </button>
              </div>
            </div>
          </aside>
        </section>
      )}
    </PageWrap>
  )
}
