import { useState } from 'react'
import { Footer } from '../components/Footer'
import { COP } from '../utils/format'

export const allProducts = [
  {
    id: 'prod-sofa-azul',
    name: 'Sofá Módena 2P',
    category: 'sala', categoryLabel: 'Sala & Descanso',
    price: 1_500_000, compareAtPrice: 1_200_000,
    discount: true, tag: 'Destacado',
    material: 'Madera + tela', style: 'Moderno / Contemporáneo', storage: 'No incluye almacenamiento',
    idealFor: 'Sala principal · Estudio · Apartamento', guarantee: '12 meses', stock: 5,
    summary: 'Sofá azul de 2 puestos, cómodo, moderno y con cojines amplios.',
    description: 'Sofá de dos puestos con diseño contemporáneo, líneas limpias y cojines generosos. Su tela suave y patas en madera lo convierten en una pieza protagonista para salas serenas y elegantes.',
    images: [
      'https://images.unsplash.com/photo-1680503397667-3877494708a1?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1680503397692-cd0da21a0bec?w=800&h=640&fit=crop&auto=format',
    ],
  },
  {
    id: 'prod-comedor-ratan',
    name: 'Comedor Ratán 4P',
    category: 'comedor', categoryLabel: 'Comedor & Reunión',
    price: 1_200_000, compareAtPrice: 1_000_000,
    discount: true, tag: '20% OFF',
    material: 'Madera maciza + ratán natural', style: 'Costero / Escandinavo', storage: 'No aplica',
    idealFor: 'Comedor · Cocina abierta · Apartamento', guarantee: '12 meses', stock: 6,
    summary: 'Mesa redonda con 4 sillas de ratán, ideal para espacios modernos.',
    description: 'Set de comedor con mesa redonda en madera clara y cuatro sillas de ratán tejidas. Equilibra comodidad, luz y calidez para cocinas abiertas o comedores compactos.',
    images: [
      'https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1636138388621-258a72ecb07e?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1666585958637-698ef8559cfc?w=800&h=640&fit=crop&auto=format',
    ],
  },
  {
    id: 'prod-aparador-nordico',
    name: 'Aparador Nórdico',
    category: 'dormitorio', categoryLabel: 'Descanso & Intimidad',
    price: 1_800_000, compareAtPrice: 1_385_000,
    discount: true, tag: '30% OFF',
    material: 'Madera maciza', style: 'Nórdico / Escandinavo', storage: '1 cajón + 2 compartimentos',
    idealFor: 'Dormitorio · Vestier · Estudio', guarantee: '12 meses', stock: 4,
    summary: 'Aparador de madera con cajón y puertas, diseño nórdico elegante.',
    description: 'Aparador de madera natural con presencia serena y solución real de guardado. Tiene cajón central, dos módulos laterales y una estética limpia que funciona perfecto en espacios íntimos.',
    images: [
      'https://images.unsplash.com/photo-1576249720336-35b043fce96d?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1619911013257-8f1fbc919fc9?w=800&h=640&fit=crop&auto=format',
    ],
  },
  {
    id: 'prod-bambu-natural',
    name: 'Banco Bambú Natural',
    category: 'detalles', categoryLabel: 'Detalles que Cuentan',
    price: 1_200_000, compareAtPrice: 1_000_000,
    discount: true, tag: 'Nuevo',
    material: 'Bambú natural + tapizado', style: 'Nórdico / Orgánico', storage: 'Estante inferior',
    idealFor: 'Entrada · Dormitorio · Vestier', guarantee: '12 meses', stock: 7,
    summary: 'Banco en bambú con tapizado y estante inferior, estilo nórdico.',
    description: 'Fabricado en bambú natural con acabado cálido y textura orgánica. Tiene una silueta ligera, estante inferior funcional y tapizado neutro para sumar carácter a entradas o vestieres.',
    images: [
      'https://images.unsplash.com/photo-1765663241884-ebd171bdda1d?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=800&h=640&fit=crop&auto=format',
    ],
  },
  {
    id: 'prod-mesa-organica',
    name: 'Mesa de Centro Orgánica',
    category: 'sala', categoryLabel: 'Sala & Descanso',
    price: 890_000, compareAtPrice: null,
    discount: false, tag: null,
    material: 'Madera clara', style: 'Orgánico / Japandi', storage: 'Superficie amplia',
    idealFor: 'Sala · Lobby · Estudio', guarantee: '12 meses', stock: 8,
    summary: 'Mesa de centro en madera clara con curva orgánica y acabado suave.',
    description: 'Mesa de centro de inspiración orgánica pensada para salas con estilo natural. Combina presencia escultórica y practicidad para acompañar sofás y textiles neutros.',
    images: [
      'https://images.unsplash.com/photo-1600623050499-84929aad17c9?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=800&h=640&fit=crop&auto=format',
    ],
  },
  {
    id: 'prod-sillon-acento',
    name: 'Sillón Acento Terracota',
    category: 'sala', categoryLabel: 'Sala & Descanso',
    price: 980_000, compareAtPrice: null,
    discount: false, tag: null,
    material: 'Madera + tapizado premium', style: 'Contemporáneo / Cálido', storage: 'No aplica',
    idealFor: 'Sala · Rincón de lectura', guarantee: '12 meses', stock: 3,
    summary: 'Sillón de acento envolvente para lectura y descanso.',
    description: 'Sillón individual con respaldo envolvente y presencia cálida. Es ideal para sumar un punto focal a cualquier sala o rincón de lectura sin recargar el ambiente.',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=640&fit=crop&auto=format',
    ],
  },
  {
    id: 'prod-comedor-brenna',
    name: 'Comedor Brenna 6P',
    category: 'comedor', categoryLabel: 'Comedor & Reunión',
    price: 4_850_000, compareAtPrice: null,
    discount: false, tag: 'Exclusivo',
    material: 'Madera maciza nogal', style: 'Clásico Contemporáneo', storage: 'No incluye',
    idealFor: 'Comedor principal · Casa · Familia numerosa', guarantee: '12 meses', stock: 3,
    summary: 'Comedor de 6 puestos en madera noble, diseño atemporal y robusto.',
    description: 'Set de comedor para seis personas fabricado en madera maciza de nogal. Sus líneas rectas y proporciones generosas lo convierten en la pieza central de cualquier comedor que aspire a la elegancia sin estridencias.',
    images: [
      'https://images.unsplash.com/photo-1666585958637-698ef8559cfc?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1636138388621-258a72ecb07e?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=800&h=640&fit=crop&auto=format',
    ],
  },
  {
    id: 'prod-silla-arce',
    name: 'Silla Arce Tapizada',
    category: 'detalles', categoryLabel: 'Detalles que Cuentan',
    price: 680_000, compareAtPrice: null,
    discount: false, tag: null,
    material: 'Madera de arce + tapizado beige', style: 'Escandinavo / Minimalista', storage: 'No aplica',
    idealFor: 'Comedor · Escritorio · Sala de reuniones', guarantee: '12 meses', stock: 10,
    summary: 'Silla tapizada en arce claro, cómoda y de líneas elegantes.',
    description: 'Silla de madera de arce con tapizado beige suave. Su estructura ligera y el asiento acolchado la hacen perfecta para largas comidas o jornadas de trabajo con estilo.',
    images: [
      'https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=800&h=640&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1765663241884-ebd171bdda1d?w=800&h=640&fit=crop&auto=format',
    ],
  },
]

const specs = (p) => [
  { label: 'Material',       value: p.material },
  { label: 'Estilo',         value: p.style },
  { label: 'Almacenamiento', value: p.storage },
  { label: 'Ideal para',     value: p.idealFor },
  { label: 'Garantía',       value: p.guarantee },
  { label: 'Stock',          value: `${p.stock} unidades disponibles` },
]

export default function ProductDetail({ productId, onNavigate }) {
  const product = allProducts.find(p => p.id === productId) ?? allProducts[0]
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const pct = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]" style={{ color: '#C4BAB2' }}>
          <button onClick={() => onNavigate('home')} className="hover:opacity-70 transition-opacity">Inicio</button>
          <span>/</span>
          <button onClick={() => onNavigate('collections')} className="hover:opacity-70 transition-opacity">Colecciones</button>
          <span>/</span>
          <span style={{ color: '#5C7A6B' }}>{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <section className="px-5 md:px-10 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden" style={{ background: '#D6E8E2', aspectRatio: '4/3' }}>
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              {(product.tag || pct) && (
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tag && (
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold"
                      style={{ background: product.discount ? '#B89A6A' : '#5C7A6B', color: '#fff' }}>
                      {product.tag}
                    </span>
                  )}
                  {pct && !product.tag && (
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold"
                      style={{ background: '#B89A6A', color: '#fff' }}>
                      -{pct}%
                    </span>
                  )}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="flex-none rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      width: 72, height: 72,
                      border: i === activeImg ? '2px solid #5C7A6B' : '2px solid transparent',
                      opacity: i === activeImg ? 1 : 0.65,
                      background: '#D6E8E2',
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: '#B89A6A' }}>{product.categoryLabel}</p>
            <h1 className="font-display text-3xl md:text-4xl font-light mb-3" style={{ color: '#2E3D35' }}>{product.name}</h1>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#635C55' }}>{product.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-medium" style={{ color: '#2E3D35' }}>{COP(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-base line-through" style={{ color: '#C4BAB2' }}>{COP(product.compareAtPrice)}</span>
              )}
              {pct && <span className="text-sm font-medium" style={{ color: '#B89A6A' }}>Ahorras {pct}%</span>}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1px solid rgba(92,122,107,0.25)' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-sage/5 text-lg font-light" style={{ color: '#2E3D35' }}>−</button>
                <span className="w-10 text-center text-sm font-medium" style={{ color: '#2E3D35' }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-sage/5 text-lg font-light" style={{ color: '#2E3D35' }}>+</button>
              </div>
              <button
                onClick={handleAddCart}
                className="flex-1 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200"
                style={{ background: added ? '#A8C4B8' : '#2E3D35', color: '#fff' }}
              >
                {added ? '¡Añadido al carrito!' : 'Agregar al carrito'}
              </button>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="py-3 rounded-xl text-sm font-medium tracking-wide transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(92,122,107,0.3)', color: '#5C7A6B' }}
            >
              Consultar disponibilidad →
            </button>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(92,122,107,0.12)' }}>
              <p className="text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: '#5C7A6B' }}>Especificaciones</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {specs(product).map(s => (
                  <div key={s.label}>
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-0.5" style={{ color: '#C4BAB2' }}>{s.label}</p>
                    <p className="text-sm" style={{ color: '#2E3D35' }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 px-5 md:px-10" style={{ background: '#F2F0EC' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: '#5C7A6B' }}>También te puede gustar</p>
            <h2 className="font-display text-3xl font-light mb-10" style={{ color: '#2E3D35' }}>Piezas <em>relacionadas.</em></h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(p => (
                <button
                  key={p.id}
                  onClick={() => onNavigate('product', p.id)}
                  className="rounded-2xl overflow-hidden text-left group transition-all duration-300 hover:-translate-y-1"
                  style={{ background: '#fff', boxShadow: '0 2px 12px rgba(46,61,53,0.06)' }}
                >
                  <div className="relative overflow-hidden" style={{ height: 200, background: '#D6E8E2' }}>
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: '#B89A6A' }}>{p.categoryLabel}</p>
                    <h3 className="font-display text-base font-medium mb-1" style={{ color: '#2E3D35' }}>{p.name}</h3>
                    <p className="text-sm font-medium" style={{ color: '#5C7A6B' }}>{COP(p.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
