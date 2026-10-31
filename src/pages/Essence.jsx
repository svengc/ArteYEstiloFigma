import { useEffect, useRef, useState } from 'react'
import { Footer } from '../components/Footer'

const values = [
  {
    num: '01',
    label: 'Creatividad',
    title: 'Cada espacio,\nuna visión única.',
    body: 'Traducimos tu estilo de vida en composiciones únicas donde la estética y el propósito conviven en perfecta armonía. Cada ambiente nace de una idea — y culmina en un hogar irrepetible.',
    img: 'https://images.unsplash.com/photo-1631396326646-c06a935ff3a6?w=900&h=700&fit=crop&auto=format',
    alt: 'Artesano trabajando en una silla en taller de madera',
  },
  {
    num: '02',
    label: 'Innovación',
    title: 'Diseño que\ndefine el mañana.',
    body: 'Evolucionamos con el diseño contemporáneo sin perder de vista lo atemporal. Incorporamos materiales, formas y tendencias que transforman los interiores del presente.',
    img: 'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=900&h=700&fit=crop&auto=format',
    alt: 'Sala moderna con sofá seccional y obras de arte',
  },
  {
    num: '03',
    label: 'Calidad',
    title: 'Elegancia\nque no caduca.',
    body: 'Seleccionamos cada detalle con rigor. Nuestras piezas están concebidas para perdurar — porque la verdadera elegancia es una inversión en el tiempo, no un capricho del momento.',
    img: 'https://images.unsplash.com/photo-1631396326838-de37e5f8bcbc?w=900&h=700&fit=crop&auto=format',
    alt: 'Artesano lijando madera en taller',
  },
]

const stats = [
  { value: '12+',    label: 'Años de experiencia' },
  { value: '600+',   label: 'Piezas en catálogo' },
  { value: '3.400+', label: 'Hogares transformados' },
  { value: '100%',   label: 'Garantía en cada pieza' },
]

function ValueSection({ v, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-3xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: `${index * 0.1}s`,
        background: '#fff',
        boxShadow: '0 4px 32px rgba(46,61,53,0.07)',
      }}
    >
      <div className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`} style={{ minHeight: 380 }}>
        <img src={v.img} alt={v.alt} className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.08) 100%)'
              : 'linear-gradient(to left, transparent 60%, rgba(255,255,255,0.08) 100%)',
          }}
        />
      </div>

      <div className={`flex flex-col justify-center p-10 md:p-14 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-4xl font-display font-light" style={{ color: 'rgba(184,154,106,0.25)' }}>{v.num}</span>
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: '#5C7A6B' }}>{v.label}</span>
        </div>
        <h3
          className="font-display text-3xl md:text-4xl font-light leading-tight mb-5"
          style={{ color: '#2E3D35', whiteSpace: 'pre-line' }}
        >
          <em>{v.title}</em>
        </h3>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: '#635C55' }}>{v.body}</p>
      </div>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function Essence({ onNavigate }) {
  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight: '70vh', background: '#2E3D35' }}>
        <img
          src="https://images.unsplash.com/photo-1659930087003-2d64e33181f7?w=1600&h=800&fit=crop&auto=format"
          alt="Taller de fabricación de muebles"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(46,61,53,0.4) 0%, rgba(46,61,53,0.9) 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-36 pb-20 md:pb-28">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-5" style={{ color: '#A8C4B8' }}>Quiénes somos</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.05] max-w-3xl mb-8" style={{ fontStyle: 'italic' }}>
            Donde el buen gusto<br />
            <span className="not-italic font-medium">encuentra su hogar.</span>
          </h1>
          <div className="h-px max-w-xs mb-8" style={{ background: 'rgba(168,196,184,0.35)' }} />
          <p className="max-w-xl text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Creemos que un hogar bien concebido es la expresión más íntima del carácter de quien lo
            habita. Cada línea, cada textura, cada proporción habla en silencio de quien elige vivirlo.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-5 md:px-10 py-10" style={{ background: '#F2F0EC', borderBottom: '1px solid rgba(92,122,107,0.1)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center text-center px-4 py-2">
              <span className="font-display text-3xl md:text-4xl font-light mb-1" style={{ color: '#5C7A6B' }}>{s.value}</span>
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#635C55' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-4" style={{ color: '#5C7A6B' }}>Lo que nos define</p>
          <h2 className="font-display text-3xl md:text-5xl font-light" style={{ color: '#2E3D35' }}>
            Tres principios,<br /><em>un solo propósito.</em>
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {values.map((v, i) => (
            <ValueSection key={v.num} v={v} index={i} />
          ))}
        </div>
      </section>

      {/* Closing manifesto */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ background: '#2E3D35' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-8" style={{ color: '#A8C4B8' }}>Nuestra promesa</p>
          <blockquote className="font-display text-3xl md:text-5xl font-light text-white leading-tight mb-10" style={{ fontStyle: 'italic' }}>
            "Más que mobiliario, ofrecemos el<br />
            <span className="not-italic font-medium" style={{ color: '#B89A6A' }}>arte de vivir bien.</span>"
          </blockquote>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Hay espacios que simplemente se habitan, y hay espacios que se sienten desde el primer
            instante en que se cruza su umbral. En Arte & Estilo trabajamos para que cada hogar
            pertenezca a esa segunda categoría — donde cada mueble tiene su razón de ser.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
            style={{ background: '#5C7A6B', color: '#fff' }}
          >
            Conversemos sobre tu hogar
            <ArrowRight />
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
