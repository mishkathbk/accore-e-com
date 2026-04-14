import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findById } from '../data/products'

const CartContext = createContext(null)
const KEY = 'babadoba_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const add = (productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId)
      if (existing) {
        return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: productId, qty }]
    })
  }

  const setQty = (productId, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== productId) : prev.map((i) => (i.id === productId ? { ...i, qty } : i)),
    )
  }

  const remove = (productId) => setItems((prev) => prev.filter((i) => i.id !== productId))
  const clear = () => setItems([])

  const detailed = useMemo(
    () =>
      items
        .map((i) => {
          const p = findById(i.id)
          if (!p) return null
          return { ...i, product: p, lineTotal: p.price * i.qty }
        })
        .filter(Boolean),
    [items],
  )

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotal = useMemo(() => detailed.reduce((sum, i) => sum + i.lineTotal, 0), [detailed])
  const shipping = subtotal > 200 ? 0 : subtotal === 0 ? 0 : 12
  const tax = +(subtotal * 0.07).toFixed(2)
  const total = +(subtotal + shipping + tax).toFixed(2)

  return (
    <CartContext.Provider
      value={{ items, detailed, count, subtotal, shipping, tax, total, add, setQty, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
