import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const DEFAULT_USER = {
  id: 'u-demo',
  name: 'Sunny Bubbles',
  email: 'sunny@babadobafun.co',
  avatarColor: '#FFCE3A',
  joined: 'March 2025',
  address: {
    line1: '42 Giggleberry Lane',
    line2: 'Apt #7',
    city: 'Marshmallow Falls',
    state: 'WA',
    zip: '98007',
    country: 'USA',
  },
  phone: '(555) 234-9911',
  kids: [
    { name: 'Juniper', age: 6, fav: 'castles' },
    { name: 'Finn', age: 3, fav: 'plushies' },
  ],
  orders: [
    {
      id: '#BDBF-20198',
      date: '2026-03-22',
      status: 'Delivered',
      total: 621.0,
      items: [
        { id: 'p-castle-rainbow', qty: 1, price: 499 },
        { id: 'p-plush-bear', qty: 2, price: 34 },
        { id: 'p-beach-ball', qty: 1, price: 14 },
      ],
    },
    {
      id: '#BDBF-20165',
      date: '2026-02-14',
      status: 'Delivered',
      total: 94.0,
      items: [
        { id: 'p-plush-dino', qty: 1, price: 28 },
        { id: 'p-kite', qty: 1, price: 22 },
        { id: 'p-xylophone', qty: 1, price: 29 },
        { id: 'p-beach-ball', qty: 1, price: 14 },
      ],
    },
    {
      id: '#BDBF-19990',
      date: '2026-01-06',
      status: 'Delivered',
      total: 74.0,
      items: [{ id: 'p-rocket', qty: 1, price: 74 }],
    },
    {
      id: '#BDBF-21044',
      date: '2026-04-08',
      status: 'In transit',
      total: 177.0,
      items: [
        { id: 'p-pool-whale', qty: 1, price: 89 },
        { id: 'p-blocks', qty: 2, price: 38 },
        { id: 'p-beach-ball', qty: 1, price: 14 },
      ],
    },
  ],
}

const KEY = 'babadoba_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : DEFAULT_USER
    } catch {
      return DEFAULT_USER
    }
  })
  const [signedIn, setSignedIn] = useState(() => {
    try {
      return localStorage.getItem(KEY + '_signedIn') === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(user))
  }, [user])
  useEffect(() => {
    localStorage.setItem(KEY + '_signedIn', signedIn ? '1' : '0')
  }, [signedIn])

  const login = (email /*, password */) => {
    setUser((u) => ({ ...u, email: email || u.email }))
    setSignedIn(true)
  }
  const signup = ({ name, email }) => {
    setUser((u) => ({ ...u, name: name || u.name, email: email || u.email }))
    setSignedIn(true)
  }
  const logout = () => setSignedIn(false)
  const update = (patch) => setUser((u) => ({ ...u, ...patch }))
  const addOrder = (order) =>
    setUser((u) => ({ ...u, orders: [{ ...order }, ...(u.orders || [])] }))

  return (
    <AuthContext.Provider value={{ user, signedIn, login, signup, logout, update, addOrder }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
