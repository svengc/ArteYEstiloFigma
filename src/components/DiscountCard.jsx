import { useState } from 'react'
import { COP } from '../utils/format'

export default function DiscountCard({ item, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{ background: '#fff', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hovered ? '0 20px 40px rgba(46,61,53,0.1)' : '0 2px 10px rgba(46,61,53,0.05)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('product', item.pid)}
    >
      <div className="relative h-56 overflow-hidden" style={{ background: '#D6E8E2' }}>
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide" style={{ background: '#B89A6A', color: '#fff' }}>
          -{item.pct}%
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-medium mb-3" style={{ color: '#2E3D35' }}>{item.name}</h3>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-base font-semibold" style={{ color: '#5C7A6B' }}>{COP(item.sale)}</span>
          <span className="text-sm line-through" style={{ color: '#C4BAB2' }}>{COP(item.original)}</span>
        </div>
        <button
          className="w-full py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200"
          style={{ background: hovered ? '#5C7A6B' : '#F2F0EC', color: hovered ? '#fff' : '#5C7A6B' }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}
