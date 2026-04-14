import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Illustration } from '../data/illustrations.jsx'
import { Blob } from '../components/Scribbles.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    signup({ name: form.name || 'Sunny Bubbles', email: form.email || 'sunny@babadobafun.co' })
    nav('/profile')
  }

  return (
    <PageWrap>
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-4xl md:text-6xl text-ink tracking-tight leading-[1.05]">
            Join the <em className="italic text-brand-coral">family</em>
          </h1>
          <p className="mt-5 text-muted max-w-md leading-relaxed">
            Create a free account and get 10% off your first order, exclusive deals, and faster
            checkout. No strings attached.
          </p>

          <form onSubmit={submit} className="mt-10 max-w-md">
            <div className="space-y-5">
              <Field label="Full name" value={form.name} onChange={upd('name')} placeholder="Sunny Bubbles" />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={upd('email')}
                placeholder="you@example.com"
              />
              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={upd('password')}
                placeholder="••••••••"
              />
              <Field
                label="Confirm password"
                type="password"
                value={form.confirm}
                onChange={upd('confirm')}
                placeholder="••••••••"
              />
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-ink/80">
              <input type="checkbox" defaultChecked className="w-4 h-4 mt-0.5 accent-brand-coral" />
              <span>Email me weekly deals and new arrivals. Fridays only.</span>
            </label>

            <Button type="submit" color="coral" size="lg" className="w-full mt-7">
              Create account
            </Button>

            <div className="mt-6 text-center text-sm text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-coralDark font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        <div className="relative hidden lg:block h-[560px]">
          <Blob className="absolute -top-4 right-0 w-[440px] h-[440px] opacity-70" color="#E0D6F2" />
          <Blob className="absolute bottom-0 left-0 w-[380px] h-[380px] opacity-60" color="#FFE4DC" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-10 right-12 w-80 card-soft p-8"
          >
            <Illustration name="castle-rainbow" className="w-full h-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="absolute bottom-10 left-8 w-60 card-soft p-6"
          >
            <Illustration name="plush-dino" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>
    </PageWrap>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block">
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
