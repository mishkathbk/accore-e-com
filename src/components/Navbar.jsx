import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const navLinks = [
  { to: '/shop', label: 'Shop all' },
  { to: '/shop/bouncy-castles', label: 'Castles' },
  { to: '/shop/swimming-pools', label: 'Pools' },
  { to: '/shop/plush', label: 'Plush' },
  { to: '/shop/blocks', label: 'Toys' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="BabadobaFun home">
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
  )
}

export default function Navbar() {
  const { count } = useCart()
  const { signedIn, user } = useAuth()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const onSearch = (e) => {
    e.preventDefault()
    if (q.trim()) {
      navigate(`/shop?q=${encodeURIComponent(q.trim())}`)
      setSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/shop'}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive ? 'bg-ink text-paper' : 'text-ink/80 hover:text-brand-coralDark'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-blush transition"
            aria-label="Search"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#2D2B3A" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            to={signedIn ? '/profile' : '/login'}
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-brand-blush transition"
            aria-label="Account"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#2D2B3A" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21 Q 12 13, 20 21" strokeLinecap="round" />
            </svg>
          </Link>

          <Link
            to="/cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-blush transition"
            aria-label="Cart"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#2D2B3A" strokeWidth="2">
              <path d="M5 6h15l-1.5 9H7L5 3H3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" fill="#2D2B3A" />
              <circle cx="18" cy="20" r="1.4" fill="#2D2B3A" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-brand-coral text-white text-[10px] font-bold rounded-full px-1">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-blush transition"
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#2D2B3A" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line bg-paper">
          <form onSubmit={onSearch} className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 border-b border-line focus-within:border-brand-coral pb-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for castles, pools, plush..."
                className="flex-1 bg-transparent text-lg font-display focus:outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-sm text-muted hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {open && (
        <div className="lg:hidden border-t border-line bg-paper px-6 py-5 space-y-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-2xl hover:bg-brand-blush font-medium"
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to={signedIn ? '/profile' : '/login'}
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-2xl hover:bg-brand-blush font-medium"
          >
            {signedIn ? user.name : 'Sign in'}
          </Link>
        </div>
      )}
    </header>
  )
}
