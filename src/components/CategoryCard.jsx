import { useState } from 'react'
import { ArrowRight } from './icons'

export default function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer h-full"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#D6E8E2', minHeight: 200 }}
    >
      <img
        src={cat.img}
        alt={cat.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(46,61,53,0.8) 0%, rgba(46,61,53,0.1) 50%, transparent 100%)', opacity: hovered ? 1 : 0.7 }}
      />
      <div className="absolute bottom-0 left-0 p-5 md:p-6">
        <p className="text-[9px] uppercase tracking-[0.35em] mb-1" style={{ color: '#A8C4B8' }}>{cat.sub}</p>
        <h3 className="font-display text-xl md:text-2xl font-medium text-white">{cat.name}</h3>
      </div>
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
        style={{ background: hovered ? '#5C7A6B' : 'rgba(255,255,255,0.15)', transform: hovered ? 'scale(1)' : 'scale(0.8)', opacity: hovered ? 1 : 0 }}
      >
        <ArrowRight size={14} color="#fff" />
      </div>
    </div>
  )
}
