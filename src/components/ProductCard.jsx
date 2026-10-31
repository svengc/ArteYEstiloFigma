import { useState } from 'react'
import { COP } from '../utils/format'

export default function ProductCard({ p, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  const pct = p.compareAtPrice ? Math.round((1 - p.price / p.compareAtPrice) * 100) : null

  return (
    <article
      className="rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300"
      style={{
        background: '#fff',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 48px rgba(46,61,53,0.13)' : '0 2px 12px rgba(46,61,53,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('product', p.id)}
    >
      <div className="relative overflow-hidden" style={{ height: 240, background: '#D6E8E2' }}>
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {p.tag && (
            <span
              className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold"
              style={{ background: p.discount ? '#B89A6A' : '#5C7A6B', color: '#fff' }}
            >
              {p.tag}
            </span>
          )}
          {pct && (
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold" style={{ background: '#B89A6A', color: '#fff' }}>
              -{pct}%
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: '#B89A6A' }}>{p.categoryLabel}</p>
        <h3 className="font-display text-lg font-medium mb-2 leading-tight" style={{ color: '#2E3D35' }}>{p.name}</h3>
        <div className="flex items-baseline gap-2 mt-auto mb-4">
          <span className="text-sm font-semibold" style={{ color: '#2E3D35' }}>{COP(p.price)}</span>
          {p.compareAtPrice && (
            <span className="text-xs line-through" style={{ color: '#C4BAB2' }}>{COP(p.compareAtPrice)}</span>
          )}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onNavigate('product', p.id) }}
          className="w-full py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200"
          style={{ background: hovered ? '#5C7A6B' : '#F2F0EC', color: hovered ? '#fff' : '#5C7A6B' }}
        >
          Ver detalle
        </button>
      </div>
    </article>
  )
}
