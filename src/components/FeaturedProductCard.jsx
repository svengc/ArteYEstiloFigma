import { useState } from 'react'
import { CartIcon } from './icons'
import { COP } from '../utils/format'

export default function FeaturedProductCard({ p, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex-none w-64 md:w-72 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{ scrollSnapAlign: 'start', background: '#fff', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hovered ? '0 20px 40px rgba(46,61,53,0.12)' : '0 2px 12px rgba(46,61,53,0.06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('product', p.pid)}
    >
      <div className="relative h-52 overflow-hidden" style={{ background: '#D6E8E2' }}>
        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        {p.tag && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium" style={{ background: '#5C7A6B', color: '#fff' }}>
            {p.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: '#B89A6A' }}>{p.category}</p>
        <h3 className="font-display text-lg font-medium mb-3" style={{ color: '#2E3D35' }}>{p.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: '#635C55' }}>{COP(p.price)}</span>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: hovered ? '#5C7A6B' : '#F2F0EC', color: hovered ? '#fff' : '#5C7A6B' }}
          >
            <CartIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
