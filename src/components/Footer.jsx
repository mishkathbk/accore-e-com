import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-peach flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-7 h-7">
                <circle cx="15" cy="18" r="2" fill="#2D2B3A" />
                <circle cx="25" cy="18" r="2" fill="#2D2B3A" />
                <path d="M14 25 Q20 30 26 25" fill="none" stroke="#2D2B3A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-display text-2xl text-ink tracking-tight">
              Babadoba<span className="italic text-brand-coral">fun</span>
            </span>
          </Link>
          <p className="mt-5 text-muted max-w-sm leading-relaxed">
            Thoughtfully-made toys, inflatable castles, and splash pools for little ones.
            Ethically sourced, parent-approved, kid-tested.
          </p>

          <form className="mt-6 max-w-sm">
            <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-2">
              Get 10% off your first order
            </label>
            <div className="flex border border-line rounded-full overflow-hidden focus-within:border-brand-coral bg-cream">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 bg-transparent focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-ink text-paper text-sm font-semibold hover:bg-brand-coral transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="font-display text-lg text-ink mb-4">Shop</h3>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><Link to="/shop/bouncy-castles" className="hover:text-brand-coralDark">Bouncy castles</Link></li>
            <li><Link to="/shop/swimming-pools" className="hover:text-brand-coralDark">Splash pools</Link></li>
            <li><Link to="/shop/plush" className="hover:text-brand-coralDark">Plush</Link></li>
            <li><Link to="/shop/vehicles" className="hover:text-brand-coralDark">Vehicles</Link></li>
            <li><Link to="/shop/blocks" className="hover:text-brand-coralDark">Blocks</Link></li>
            <li><Link to="/shop/music" className="hover:text-brand-coralDark">Music</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-ink mb-4">Help</h3>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><Link to="/profile" className="hover:text-brand-coralDark">My account</Link></li>
            <li><Link to="/orders" className="hover:text-brand-coralDark">Order history</Link></li>
            <li><Link to="/cart" className="hover:text-brand-coralDark">Cart</Link></li>
            <li><a className="hover:text-brand-coralDark cursor-pointer">Shipping</a></li>
            <li><a className="hover:text-brand-coralDark cursor-pointer">Returns</a></li>
            <li><a className="hover:text-brand-coralDark cursor-pointer">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-3 text-xs text-muted">
          <div>© 2026 BabadobaFun. All rights reserved.</div>
          <div className="md:ml-auto flex gap-5">
            <a className="hover:text-ink cursor-pointer">Privacy</a>
            <a className="hover:text-ink cursor-pointer">Terms</a>
            <a className="hover:text-ink cursor-pointer">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
