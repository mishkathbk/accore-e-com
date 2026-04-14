import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Button from '../components/Button.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import { Illustration } from '../data/illustrations.jsx'
import { Chip, Blob, StarMark } from '../components/Scribbles.jsx'

const catColors = {
  'bouncy-castles': '#FFDAC9',
  'swimming-pools': '#CBE6F5',
  'plush': '#FFE4DC',
  'vehicles': '#FFD6CC',
  'blocks': '#FFF2CC',
  'outdoor': '#D8ECE1',
  'music': '#E0D6F2',
}

const catIllust = {
  'bouncy-castles': 'castle-rainbow',
  'swimming-pools': 'pool-circle',
  'plush': 'plush-bear',
  'vehicles': 'toy-car',
  'blocks': 'building-blocks',
  'outdoor': 'beach-ball',
  'music': 'xylophone',
}

/* ─── Hero offer slider ─── */
const SLIDES = [
  {
    id: 'castles',
    badge: 'Spring Sale',
    title: 'Bouncy Castles',
    highlight: '20% Off',
    desc: 'Turn any backyard into a royal jumping court. Safety-certified, inflates in 90 seconds.',
    cta: 'Shop castles',
    ctaLink: '/shop/bouncy-castles',
    illust: 'castle-rainbow',
    bgFrom: '#FFE4DC',
    bgTo: '#FFDAC9',
    accent: '#FF8A7A',
    blobColor: '#FFD1C4',
  },
  {
    id: 'pools',
    badge: 'Summer Ready',
    title: 'Splash Pools',
    highlight: '30% Off',
    desc: 'Portable pools and inflatable whales for backyards, balconies, and surprise heatwaves.',
    cta: 'Shop pools',
    ctaLink: '/shop/swimming-pools',
    illust: 'pool-whale',
    bgFrom: '#E0F0FA',
    bgTo: '#CBE6F5',
    accent: '#5BA4D9',
    blobColor: '#B8D9F0',
  },
  {
    id: 'plush',
    badge: 'Best Deal',
    title: 'Cuddly Plushies',
    highlight: 'Buy 2 Get 1',
    desc: 'Hand-stitched plushies with weighted bottoms so they always sit upright and wait patiently.',
    cta: 'Shop plushies',
    ctaLink: '/shop/plush',
    illust: 'plush-bear',
    bgFrom: '#F1ECF8',
    bgTo: '#E0D6F2',
    accent: '#9B7FD4',
    blobColor: '#D4C4EF',
  },
  {
    id: 'free-ship',
    badge: 'Free Shipping',
    title: 'New Arrivals',
    highlight: '$0 Delivery',
    desc: 'Free shipping on all orders over $200. Castles, pools, and everything in between.',
    cta: 'Shop all',
    ctaLink: '/shop',
    illust: 'rocket-ship',
    bgFrom: '#FFF4D1',
    bgTo: '#FFE9A0',
    accent: '#D4A020',
    blobColor: '#FFE088',
  },
]

const AUTOPLAY_MS = 5500

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

const illustVariants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.85 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.85 }),
}

function Hero() {
  const [[page, direction], setPage] = useState([0, 0])
  const [paused, setPaused] = useState(false)

  const idx = ((page % SLIDES.length) + SLIDES.length) % SLIDES.length
  const slide = SLIDES[idx]

  const go = useCallback(
    (dir) => setPage(([p]) => [p + dir, dir]),
    [],
  )

  const goTo = useCallback(
    (i) => setPage(([p]) => [i, i > (((p % SLIDES.length) + SLIDES.length) % SLIDES.length) ? 1 : -1]),
    [],
  )

  /* auto-play */
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, go])

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Gradient background — instant swap for each slide */}
      <motion.div
        key={slide.id + '-bg'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
        }}
      />

      {/* Decorative blobs */}
      <Blob
        className="absolute -top-24 -right-24 w-[500px] h-[500px] opacity-40 pointer-events-none"
        color={slide.blobColor}
      />
      <Blob
        className="absolute -bottom-32 -left-20 w-[400px] h-[400px] opacity-30 pointer-events-none"
        color={slide.blobColor}
      />

      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 lg:py-24 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[420px] md:min-h-[520px]">
        {/* ─ Left: text content ─ */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id + '-text'}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative z-10"
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-white"
              style={{ backgroundColor: slide.accent }}
            >
              {slide.badge}
            </span>

            {/* Title + highlight */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink mt-5 leading-[1.02] tracking-tight">
              {slide.title}
              <br />
              <span
                className="relative inline-block"
                style={{ color: slide.accent }}
              >
                {slide.highlight}
                {/* underline flourish */}
                <svg
                  className="absolute -bottom-1 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C40 2, 80 12, 120 6 S180 2, 198 8"
                    fill="none"
                    stroke={slide.accent}
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-ink/70 max-w-md leading-relaxed">
              {slide.desc}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to={slide.ctaLink} color="ink" size="lg">
                {slide.cta}
              </Button>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-medium text-ink/70 hover:text-ink"
              >
                View all
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─ Right: illustration ─ */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id + '-illust'}
              custom={direction}
              variants={illustVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center"
            >
              {/* Circle backdrop */}
              <div
                className="absolute inset-[8%] rounded-full opacity-40"
                style={{ backgroundColor: slide.blobColor }}
              />
              <div className="relative w-3/4 h-3/4 animate-float">
                <Illustration name={slide.illust} className="w-full h-full drop-shadow-lg" />
              </div>

              {/* Floating discount badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: -6 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center text-white shadow-card"
                style={{ backgroundColor: slide.accent }}
              >
                <span className="font-display text-lg md:text-2xl leading-none">
                  {slide.highlight.split(' ')[0]}
                </span>
                <span className="text-[10px] md:text-xs font-semibold opacity-90 uppercase tracking-wider">
                  {slide.highlight.split(' ').slice(1).join(' ')}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─ Controls ─ */}
      <div className="max-w-7xl mx-auto px-6 pb-8 flex items-center justify-between relative z-10">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative p-1"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === idx ? 'w-8 h-2' : 'w-2 h-2 group-hover:bg-ink/50'
                }`}
                style={{
                  backgroundColor: i === idx ? slide.accent : 'rgba(45,43,58,0.2)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="w-11 h-11 rounded-full bg-white/80 backdrop-blur border border-line flex items-center justify-center hover:bg-white transition shadow-soft"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="w-11 h-11 rounded-full bg-white/80 backdrop-blur border border-line flex items-center justify-center hover:bg-white transition shadow-soft"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-ink/5">
        <motion.div
          key={slide.id + '-progress'}
          className="h-full"
          style={{ backgroundColor: slide.accent }}
          initial={{ width: '0%' }}
          animate={{ width: paused ? undefined : '100%' }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
        />
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <Chip tone="mint">Collections</Chip>
            <h2 className="font-display text-4xl md:text-5xl text-ink mt-4 tracking-tight">
              Shop by category
            </h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 font-medium text-ink hover:text-brand-coralDark">
            View all
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={`/shop/${cat.slug}`}
                className="block card-soft card-soft-hover p-6 text-center h-full"
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: catColors[cat.slug] }}
                >
                  <Illustration name={catIllust[cat.slug]} className="w-14 h-14" />
                </div>
                <div className="mt-4 font-display text-base text-ink">{cat.label}</div>
                <div className="mt-1 text-xs text-muted">
                  {PRODUCTS.filter((p) => p.category === cat.slug).length} items
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const featured = PRODUCTS.filter((p) => p.tags?.includes('bestseller') || p.tags?.includes('new')).slice(0, 8)
  return (
    <section className="py-20 tint-blush">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <Chip tone="coral">Most loved</Chip>
            <h2 className="font-display text-4xl md:text-5xl text-ink mt-4 tracking-tight">
              This week's favourites
            </h2>
            <p className="mt-3 text-muted max-w-md">
              Parent-picked, kid-tested, and shipped with care from our tiny warehouse.
            </p>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 font-medium text-ink hover:text-brand-coralDark">
            Browse all
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Promo() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] max-w-md mx-auto card-soft overflow-hidden tint-sky p-10 flex items-center justify-center">
            <Illustration name="pool-whale" className="w-full h-full animate-float" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Chip tone="sky">Summer ready</Chip>
          <h3 className="font-display text-4xl md:text-5xl text-ink mt-4 tracking-tight leading-[1.05]">
            Splash season<br />
            starts here.
          </h3>
          <p className="mt-5 text-muted leading-relaxed max-w-md">
            Portable pools, inflatable whales, and sprinklers made for backyards,
            balconies, and sudden heatwaves. Assembly takes three minutes.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              'Certified-safe PVC, BPA-free',
              'Inflates in under 3 minutes',
              'Fits in a carry-sized bag',
              '30-day no-quibble returns',
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-mintSoft flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#10B981" strokeWidth="3">
                    <path d="M5 12l5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-ink/80">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button to="/shop/swimming-pools" color="coral" size="lg">
              Shop pools
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Values() {
  const items = [
    {
      title: 'Ethically made',
      desc: 'Every supplier is audited for fair labour and safe materials.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#FF8A7A" strokeWidth="1.8">
          <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
        </svg>
      ),
    },
    {
      title: 'Free delivery',
      desc: 'Complimentary shipping on everything over $200 — castles included.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#FF8A7A" strokeWidth="1.8">
          <path d="M3 7h11v9H3zM14 10h4l3 4v2h-7z" strokeLinejoin="round" />
          <circle cx="7" cy="19" r="2" />
          <circle cx="17" cy="19" r="2" />
        </svg>
      ),
    },
    {
      title: '30-day returns',
      desc: 'Change your mind? Send it back, no questions asked.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#FF8A7A" strokeWidth="1.8">
          <path d="M21 12a9 9 0 1 1-3-6.7" strokeLinecap="round" />
          <path d="M21 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Safety tested',
      desc: 'CPSIA-certified, BPA-free, and stress-tested by real kids.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#FF8A7A" strokeWidth="1.8">
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.title} className="card-soft p-7">
              <div className="w-12 h-12 rounded-2xl bg-brand-blush flex items-center justify-center">
                {it.icon}
              </div>
              <h3 className="mt-5 font-display text-xl text-ink">{it.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const items = [
    {
      name: 'Amber W.',
      role: 'Parent of two',
      text: "The rainbow castle has basically lived in our backyard for three weeks. Worth every penny and the kids still aren't bored of it.",
      rating: 5,
    },
    {
      name: 'Sandeep K.',
      role: 'Dad of a 5-year-old',
      text: "Wally the Whale sprays water in your face if you lean over it. My kid thinks it's the funniest thing ever invented. So do I, if I'm being honest.",
      rating: 5,
    },
    {
      name: 'Laura V.',
      role: 'Grandma',
      text: 'Ordered Marmalade the Bear for my granddaughter and she has not let go of it since. The weighted bottom is a beautiful touch.',
      rating: 5,
    },
  ]
  return (
    <section className="py-20 tint-peach">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <Chip tone="coral">Reviews</Chip>
          <h2 className="font-display text-4xl md:text-5xl text-ink mt-4 tracking-tight">
            Loved by thousands<br />of tiny critics.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-soft p-8"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarMark key={j} className="w-4 h-4" color="#FFD166" />
                ))}
              </div>
              <p className="text-ink/80 leading-relaxed">"{t.text}"</p>
              <div className="mt-6 pt-6 border-t border-line">
                <div className="font-semibold text-ink">{t.name}</div>
                <div className="text-xs text-muted mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <PageWrap>
      <Hero />
      <Categories />
      <Featured />
      <Promo />
      <Values />
      <Testimonials />
    </PageWrap>
  )
}
