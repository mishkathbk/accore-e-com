import React from 'react'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import { Illustration } from '../data/illustrations.jsx'
import { Blob } from '../components/Scribbles.jsx'

export default function NotFound() {
  return (
    <PageWrap>
      <section className="relative max-w-3xl mx-auto px-6 py-24 text-center">
        <Blob className="absolute inset-0 m-auto w-[520px] h-[520px] opacity-60 -z-10" color="#FFE4DC" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14 }}
          className="inline-block"
        >
          <div className="card-soft w-56 h-56 mx-auto flex items-center justify-center p-10">
            <Illustration name="rocket-ship" className="w-full h-full" />
          </div>
        </motion.div>

        <h1 className="font-display text-7xl md:text-[9rem] text-ink leading-none mt-10 tracking-tight">
          4<em className="italic text-brand-coral">0</em>4
        </h1>

        <h2 className="mt-6 font-display text-2xl md:text-3xl text-ink">
          This toy rolled away
        </h2>
        <p className="mt-4 text-muted max-w-md mx-auto leading-relaxed">
          We can't find the page you were looking for. It may have moved, or maybe the dog got to it
          first. Let's get you back on track.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" color="coral" size="lg">
            Back to home
          </Button>
          <Button to="/shop" color="ghost" size="lg">
            Browse toys
          </Button>
        </div>
      </section>
    </PageWrap>
  )
}
