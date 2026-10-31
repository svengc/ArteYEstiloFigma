import { useState } from 'react'
import { Footer } from '../components/Footer'
import ProductCard from '../components/ProductCard'

const FILTERS = [
  { key: 'todos',      label: 'Todos' },
  { key: 'sala',       label: 'Sala' },
  { key: 'comedor',    label: 'Comedor' },
  { key: 'dormitorio', label: 'Dormitorio' },
  { key: 'detalles',   label: 'Detalles' },
]

const allProducts = [
  { id: 'prod-sofa-azul',       name: 'Sofá Módena 2P',            category: 'sala',       categoryLabel: 'Sala & Descanso',        price: 1_500_000, compareAtPrice: 1_200_000, discount: true,  tag: 'Destacado', img: 'https://images.unsplash.com/photo-1680503397667-3877494708a1?w=600&h=500&fit=crop&auto=format' },
  { id: 'prod-comedor-ratan',   name: 'Comedor Ratán 4P',          category: 'comedor',    categoryLabel: 'Comedor & Reunión',      price: 1_200_000, compareAtPrice: 1_000_000, discount: true,  tag: '20% OFF',   img: 'https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=600&h=500&fit=crop&auto=format' },
  { id: 'prod-aparador-nordico',name: 'Aparador Nórdico',          category: 'dormitorio', categoryLabel: 'Descanso & Intimidad',   price: 1_800_000, compareAtPrice: 1_385_000, discount: true,  tag: '30% OFF',   img: 'https://images.unsplash.com/photo-1576249720336-35b043fce96d?w=600&h=500&fit=crop&auto=format' },
  { id: 'prod-bambu-natural',   name: 'Banco Bambú Natural',       category: 'detalles',   categoryLabel: 'Detalles que Cuentan',   price: 1_200_000, compareAtPrice: 1_000_000, discount: true,  tag: 'Nuevo',     img: 'https://images.unsplash.com/photo-1765663241884-ebd171bdda1d?w=600&h=500&fit=crop&auto=format' },
  { id: 'prod-mesa-organica',   name: 'Mesa de Centro Orgánica',   category: 'sala',       categoryLabel: 'Sala & Descanso',        price: 890_000,   compareAtPrice: null,      discount: false, tag: null,        img: 'https://images.unsplash.com/photo-1600623050499-84929aad17c9?w=600&h=500&fit=crop&auto=format' },
  { id: 'prod-sillon-acento',   name: 'Sillón Acento Terracota',   category: 'sala',       categoryLabel: 'Sala & Descanso',        price: 980_000,   compareAtPrice: null,      discount: false, tag: null,        img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=500&fit=crop&auto=format' },
  { id: 'prod-comedor-brenna',  name: 'Comedor Brenna 6P',         category: 'comedor',    categoryLabel: 'Comedor & Reunión',      price: 4_850_000, compareAtPrice: null,      discount: false, tag: 'Exclusivo', img: 'https://images.unsplash.com/photo-1666585958637-698ef8559cfc?w=600&h=500&fit=crop&auto=format' },
  { id: 'prod-silla-arce',      name: 'Silla Arce Tapizada',       category: 'detalles',   categoryLabel: 'Detalles que Cuentan',   price: 680_000,   compareAtPrice: null,      discount: false, tag: null,        img: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=600&h=500&fit=crop&auto=format' },
]


export default function Collections({ onNavigate }) {
  const [active, setActive] = useState('todos')
  const filtered = active === 'todos' ? allProducts : allProducts.filter(p => p.category === active)

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>

      <section className="pt-32 pb-14 px-5 md:px-10" style={{ background: 'linear-gradient(180deg, #F2F0EC 0%, #FAFAF8 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-4" style={{ color: '#5C7A6B' }}>Catálogo</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="font-display text-4xl md:text-6xl font-light leading-tight" style={{ color: '#2E3D35' }}>
              Nuestras<br /><em>Colecciones.</em>
            </h1>
            <p className="max-w-sm text-sm leading-relaxed md:text-right" style={{ color: '#635C55' }}>
              Piezas pensadas para quienes eligen vivir con intención. Cada pieza fue seleccionada
              para transformar tu hogar en un espacio que se siente, se recuerda y se atesora.
            </p>
          </div>

          <div className="mt-10 mb-8 h-px" style={{ background: 'rgba(92,122,107,0.18)' }} />

          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className="px-5 py-2 rounded-full text-xs uppercase tracking-[0.25em] font-medium transition-all duration-200"
                style={
                  active === f.key
                    ? { background: '#2E3D35', color: '#fff' }
                    : { background: 'transparent', color: '#635C55', border: '1px solid rgba(92,122,107,0.25)' }
                }
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto self-center text-xs" style={{ color: '#C4BAB2' }}>
              {filtered.length} {filtered.length === 1 ? 'pieza' : 'piezas'}
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onNavigate={onNavigate} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-light italic" style={{ color: '#C4BAB2' }}>
              No hay piezas en esta categoría por ahora.
            </p>
          </div>
        )}
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
