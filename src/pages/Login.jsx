import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Illustration } from '../data/illustrations.jsx'
import { Blob } from '../components/Scribbles.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()
    login(email || 'sunny@babadobafun.co', password)
    nav('/profile')
  }

  return (
    <PageWrap>
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative hidden lg:block h-[520px]">
          <Blob className="absolute -top-6 -left-8 w-[420px] h-[420px] opacity-70" color="#FFE4DC" />
          <Blob className="absolute bottom-0 right-0 w-[360px] h-[360px] opacity-60" color="#E0D6F2" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-10 left-10 w-72 card-soft p-8"
          >
            <Illustration name="plush-bear" className="w-full h-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="absolute bottom-10 right-10 w-60 card-soft p-6"
          >
            <Illustration name="xylophone" className="w-full h-auto" />
          </motion.div>
        </div>

        <div>
          <h1 className="font-display text-4xl md:text-6xl text-ink tracking-tight leading-[1.05]">
            Welcome <em className="italic text-brand-coral">back</em>
          </h1>
          <p className="mt-5 text-muted max-w-md leading-relaxed">
            Sign in to your account to see your orders, saved items, and pick up where you left off.
            This is a demo — any email and password work.
          </p>

          <form onSubmit={submit} className="mt-10 max-w-md">
            <div className="space-y-5">
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <Field
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-ink/80">
                <input type="checkbox" className="w-4 h-4 accent-brand-coral" />
                <span>Remember me</span>
              </label>
              <a className="text-brand-coralDark font-medium hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
            <Button type="submit" color="coral" size="lg" className="w-full mt-7">
              Sign in
            </Button>

            <div className="my-7 flex items-center gap-4 text-xs text-muted font-medium">
              <div className="flex-1 h-px bg-line" />
              OR CONTINUE WITH
              <div className="flex-1 h-px bg-line" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="px-4 py-3 rounded-full border border-line bg-paper text-sm font-medium hover:border-ink/30 transition"
              >
                Google
              </button>
              <button
                type="button"
                className="px-4 py-3 rounded-full border border-line bg-paper text-sm font-medium hover:border-ink/30 transition"
              >
                Apple
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-muted">
              New to BabadobaFun?{' '}
              <Link to="/signup" className="text-brand-coralDark font-semibold hover:underline">
                Create an account
              </Link>
            </div>
          </form>
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
