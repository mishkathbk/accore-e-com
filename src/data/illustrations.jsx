// Real-life photographic illustrations for every product.
import React from 'react'

const IMAGE_MAP = {
  'castle-rainbow': '/assets/illustrations/castle-rainbow.png',
  'castle-dragon': '/assets/illustrations/castle-dragon.png',
  'pool-circle': '/assets/illustrations/pool-circle.png',
  'pool-whale': '/assets/illustrations/pool-whale.png',
  'plush-bear': '/assets/illustrations/plush-bear.png',
  'plush-dino': '/assets/illustrations/plush-dino.png',
  'toy-car': '/assets/illustrations/toy-car.png',
  'skateboard': '/assets/illustrations/skateboard.png',
  'building-blocks': '/assets/illustrations/building-blocks.png',
  'rocket-ship': '/assets/illustrations/rocket-ship.png',
  'beach-ball': '/assets/illustrations/beach-ball.png',
  'kite': '/assets/illustrations/kite.png',
  'toy-drum': '/assets/illustrations/toy-drum.png',
  'xylophone': '/assets/illustrations/xylophone.png',
}

export function Illustration({ name, className }) {
  const src = IMAGE_MAP[name] || IMAGE_MAP['beach-ball']
  return (
    <div className={`aspect-square overflow-hidden rounded-2xl bg-slate-50 relative ${className}`}>
      <img 
        src={src} 
        alt={name} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
    </div>
  )
}
