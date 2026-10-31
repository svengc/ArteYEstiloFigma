import { useState, useEffect } from 'react'
import Collections from './pages/Collections'
import Essence from './pages/Essence'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'
import Legal from './pages/Legal'
import { Footer } from './components/Footer'
import { COP } from './utils/format'
import { CartIcon, UserIcon, ArrowRight } from './components/icons'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import CategoryCard from './components/CategoryCard'
import FeaturedProductCard from './components/FeaturedProductCard'
import DiscountCard from './components/DiscountCard'

const INITIAL_CART = [
  { id: 'prod-sofa-azul',     name: 'Sofá Módena 2P',      category: 'Sala & Descanso',   price: 1_500_000, qty: 1, img: 'https://images.unsplash.com/photo-1680503397667-3877494708a1?w=200&h=200&fit=crop&auto=format' },
  { id: 'prod-comedor-ratan', name: 'Comedor Ratán 4P',     category: 'Comedor & Reunión', price: 1_200_000, qty: 2, img: 'https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=200&h=200&fit=crop&auto=format' },
]

const categories = [
  { key: 'muebles',   name: 'Muebles',   sub: 'Salas & sofás',        img: 'https://images.unsplash.com/photo-1680503397692-cd0da21a0bec?w=800&h=600&fit=crop&auto=format' },
  { key: 'comedores', name: 'Comedores', sub: 'Conjuntos completos',   img: 'https://images.unsplash.com/photo-1636138388621-258a72ecb07e?w=600&h=900&fit=crop&auto=format' },
  { key: 'mesas',     name: 'Mesas',     sub: 'Centro y auxiliares',   img: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&h=500&fit=crop&auto=format' },
  { key: 'sillas',    name: 'Sillas',    sub: 'Tapizadas & diseño',    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=500&fit=crop&auto=format' },
]

const products = [
  { id: 1, pid: 'prod-sofa-azul',       name: 'Sofá Lugano',      category: 'Sala',    price: 3_490_000, img: 'https://images.unsplash.com/photo-1680503397667-3877494708a1?w=500&h=420&fit=crop&auto=format', tag: 'Nuevo' },
  { id: 2, pid: 'prod-comedor-ratan',   name: 'Comedor Brenna 6P',category: 'Comedor', price: 4_850_000, img: 'https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=500&h=420&fit=crop&auto=format', tag: 'Destacado' },
  { id: 3, pid: 'prod-mesa-organica',   name: 'Mesa Río',         category: 'Mesa',    price: 1_290_000, img: 'https://images.unsplash.com/photo-1619911013257-8f1fbc919fc9?w=500&h=420&fit=crop&auto=format', tag: null },
  { id: 4, pid: 'prod-bambu-natural',   name: 'Silla Arce',       category: 'Silla',   price: 680_000,   img: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=500&h=420&fit=crop&auto=format', tag: null },
  { id: 5, pid: 'prod-sillon-acento',   name: 'Sofá Módena',      category: 'Sala',    price: 5_100_000, img: 'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=500&h=420&fit=crop&auto=format', tag: 'Exclusivo' },
]

const discounts = [
  { id: 1, pid: 'prod-bambu-natural',   name: 'Silla Tapizada Oslo',  original: 920_000,   sale: 690_000,   pct: 25, img: 'https://images.unsplash.com/photo-1765663241884-ebd171bdda1d?w=500&h=420&fit=crop&auto=format' },
  { id: 2, pid: 'prod-mesa-organica',   name: 'Mesa de Centro Belga', original: 1_450_000, sale: 1_015_000, pct: 30, img: 'https://images.unsplash.com/photo-1600623050499-84929aad17c9?w=500&h=420&fit=crop&auto=format' },
  { id: 3, pid: 'prod-comedor-ratan',   name: 'Comedor Aspen 4P',     original: 3_200_000, sale: 2_560_000, pct: 20, img: 'https://images.unsplash.com/photo-1576249720336-35b043fce96d?w=500&h=420&fit=crop&auto=format' },
]

function CartDrawer({ open, onClose, items, onQty, onRemove, onNavigate }) {
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping  = subtotal > 2_000_000 ? 0 : 120_000
  const total     = subtotal + shipping
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <div
        className="fixed inset-0 z-[60] transition-all duration-300"
        style={{
          background: 'rgba(46,61,53,0.45)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 h-screen z-[70] flex flex-col"
        style={{
          width: 'min(420px, 100vw)',
          background: '#FAFAF8',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32,0,0.15,1)',
          boxShadow: open ? '-24px 0 60px rgba(46,61,53,0.18)' : 'none',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(92,122,107,0.12)' }}
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-light" style={{ color: '#2E3D35' }}>
              Mi carrito
            </span>
            {itemCount > 0 && (
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: '#5C7A6B', color: '#fff' }}
              >
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-black/5"
            style={{ color: '#635C55' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: '#F2F0EC' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4BAB2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div>
              <p className="font-display text-xl font-light mb-1" style={{ color: '#2E3D35' }}>Tu carrito está vacío</p>
              <p className="text-sm" style={{ color: '#C4BAB2' }}>Aún no has agregado ninguna pieza</p>
            </div>
            <button
              onClick={() => { onClose(); onNavigate('collections') }}
              className="px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all hover:scale-105"
              style={{ background: '#2E3D35', color: '#fff' }}
            >
              Explorar colecciones
            </button>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl transition-all" style={{ background: '#F7F6F4' }}>
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden" style={{ background: '#D6E8E2' }}>
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.28em] mb-0.5" style={{ color: '#B89A6A' }}>{item.category}</p>
                    <p className="text-sm font-medium leading-tight mb-2 truncate" style={{ color: '#2E3D35' }}>{item.name}</p>
                    <p className="text-sm font-semibold mb-3" style={{ color: '#5C7A6B' }}>{COP(item.price * item.qty)}</p>
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center rounded-full overflow-hidden"
                        style={{ border: '1.5px solid rgba(92,122,107,0.2)', background: '#fff' }}
                      >
                        <button onClick={() => onQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-sm transition-colors hover:bg-black/5" style={{ color: '#635C55' }}>−</button>
                        <span className="w-6 text-center text-xs font-medium" style={{ color: '#2E3D35' }}>{item.qty}</span>
                        <button onClick={() => onQty(item.id, +1)} className="w-7 h-7 flex items-center justify-center text-sm transition-colors hover:bg-black/5" style={{ color: '#635C55' }}>+</button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-[11px] transition-opacity hover:opacity-50" style={{ color: '#C4BAB2', textDecoration: 'underline', textUnderlineOffset: 2 }}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}

              {shipping > 0 && (
                <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(184,154,106,0.1)', border: '1px solid rgba(184,154,106,0.2)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B89A6A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 5v4h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <p className="text-xs leading-snug" style={{ color: '#635C55' }}>
                    Agrega{' '}
                    <span className="font-semibold" style={{ color: '#B89A6A' }}>{COP(2_000_000 - subtotal)}</span>{' '}
                    más para envío gratis
                  </p>
                </div>
              )}
              {shipping === 0 && (
                <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(92,122,107,0.08)', border: '1px solid rgba(92,122,107,0.15)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C7A6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-xs" style={{ color: '#5C7A6B' }}><span className="font-semibold">¡Envío gratis!</span> — Tu pedido califica</p>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 px-6 py-5" style={{ borderTop: '1px solid rgba(92,122,107,0.12)' }}>
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex justify-between text-sm" style={{ color: '#635C55' }}>
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'pieza' : 'piezas'})</span>
                  <span>{COP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: '#635C55' }}>
                  <span>Envío</span>
                  <span style={{ color: shipping === 0 ? '#5C7A6B' : '#635C55' }}>{shipping === 0 ? 'Gratis' : COP(shipping)}</span>
                </div>
                <div className="flex justify-between pt-3 mt-1" style={{ borderTop: '1px solid rgba(92,122,107,0.1)' }}>
                  <span className="text-sm font-semibold" style={{ color: '#2E3D35' }}>Total</span>
                  <span className="font-display text-lg font-medium" style={{ color: '#2E3D35' }}>{COP(total)}</span>
                </div>
              </div>
              <button
                onClick={() => { onClose(); onNavigate('checkout') }}
                className="w-full py-3.5 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: '#2E3D35', color: '#fff' }}
              >
                Finalizar compra
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                onClick={() => { onClose(); onNavigate('collections') }}
                className="w-full mt-2 py-3 rounded-xl text-sm font-medium tracking-wide transition-all hover:bg-black/5"
                style={{ color: '#635C55' }}
              >
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

const NO_NAVBAR = ['login', 'register', 'forgotPassword', 'terms', 'privacy']

function MenuLines({ transparent }) {
  const c = transparent ? '#fff' : '#2E3D35'
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <line x1="0" y1="1"  x2="18" y2="1"  stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="7"  x2="14" y2="7"  stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="13" x2="10" y2="13" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function Navbar({ scrolled, page, onNavigate, cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const transparent = page === 'home' && !scrolled

  const links = [
    { label: 'Inicio',          page: 'home' },
    { label: 'Colecciones',     page: 'collections' },
    { label: 'Nuestra Esencia', page: 'essence' },
    { label: 'Contacto',        page: 'contact' },
    { label: 'Iniciar sesión',  page: 'login' },
  ]

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: transparent ? 'transparent' : 'rgba(250,250,248,0.93)',
        backdropFilter: transparent ? 'none' : 'blur(14px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(92,122,107,0.12)',
      }}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-10 py-4 flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200"
            style={{
              borderColor: transparent ? 'rgba(255,255,255,0.25)' : 'rgba(92,122,107,0.25)',
              color: transparent ? '#fff' : '#2E3D35',
              background: transparent ? 'rgba(255,255,255,0.06)' : 'transparent',
            }}
          >
            <MenuLines transparent={transparent} />
            <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] font-medium">Menú</span>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <ul
                className="absolute top-full left-0 mt-3 w-60 flex flex-col gap-1 p-4 rounded-2xl shadow-2xl z-50"
                style={{ background: '#1a2920', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {links.map(l => (
                  <li key={l.page}>
                    <button
                      onClick={() => { onNavigate(l.page); setMenuOpen(false) }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-white/10"
                      style={{ color: page === l.page ? '#A8C4B8' : 'rgba(255,255,255,0.75)' }}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="font-display text-xl md:text-2xl font-light tracking-[0.2em] transition-colors duration-300"
          style={{ color: transparent ? '#fff' : '#2E3D35' }}
        >
          Arte <span style={{ color: transparent ? 'rgba(255,255,255,0.6)' : '#B89A6A' }}>&</span> Estilo
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            aria-label="Carrito"
            onClick={onCartOpen}
            className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-200"
            style={{
              borderColor: transparent ? 'rgba(255,255,255,0.25)' : 'rgba(92,122,107,0.25)',
              color: transparent ? '#fff' : '#2E3D35',
              background: transparent ? 'rgba(255,255,255,0.06)' : 'transparent',
            }}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: '#B89A6A', color: '#fff' }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
          <button
            aria-label="Mi cuenta"
            onClick={() => onNavigate('login')}
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-200"
            style={{
              borderColor: transparent ? 'rgba(255,255,255,0.25)' : 'rgba(92,122,107,0.25)',
              color: transparent ? '#fff' : '#2E3D35',
              background: transparent ? 'rgba(255,255,255,0.06)' : 'transparent',
            }}
          >
            <UserIcon />
          </button>
        </div>
      </nav>
    </header>
  )
}


function HomePage({ onNavigate }) {
  return (
    <div>
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1680503397667-3877494708a1?w=1600&h=1000&fit=crop&auto=format" alt="Sala elegante" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(46,61,53,0.78) 0%, rgba(46,61,53,0.25) 55%, transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,61,53,0.55) 0%, transparent 40%)' }} />
        <div className="relative h-full flex flex-col justify-between px-8 md:px-16 max-w-7xl mx-auto py-8">
          <div />
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.45em] mb-5" style={{ color: '#A8C4B8' }}>Colección 2025</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-light leading-[1.0] text-white max-w-3xl mb-10" style={{ fontStyle: 'italic' }}>
              Cada espacio,<br /><span className="not-italic font-medium">una historia.</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('collections')} className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105" style={{ background: '#5C7A6B', color: '#fff' }}>
                Ver Colecciones <ArrowRight size={16} />
              </button>
              <button onClick={() => onNavigate('essence')} className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}>
                Nuestra Esencia
              </button>
            </div>
          </div>
          <div className="flex items-end justify-between pb-2">
            <div className="flex gap-8 md:gap-12">
              {[{ n: '12+', label: 'Años de historia' }, { n: '600+', label: 'Piezas únicas' }, { n: '3.4K+', label: 'Hogares transformados' }].map(s => (
                <div key={s.n}>
                  <p className="font-display text-2xl md:text-3xl font-light text-white">{s.n}</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-0.5" style={{ color: 'rgba(168,196,184,0.65)' }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className="hidden md:flex flex-col items-center gap-2">
              <div className="w-px h-10 opacity-35" style={{ background: '#A8C4B8' }} />
              <span className="text-[9px] uppercase tracking-[0.35em]" style={{ color: 'rgba(168,196,184,0.55)', writingMode: 'vertical-rl' }}>Explorar</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: '#5C7A6B' }}>Explorar</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight" style={{ color: '#2E3D35' }}>
              Algo para cada<br /><em>rincón de tu casa.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: '#635C55' }}>Muebles, mesas, sillas y comedores — todo lo que necesitas.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridTemplateRows: '300px 260px' }}>
          <div className="col-span-2 row-span-1"><CategoryCard cat={categories[0]} onClick={() => onNavigate('collections')} /></div>
          <div className="col-span-1 row-span-2 md:col-span-2 md:row-span-2"><CategoryCard cat={categories[1]} onClick={() => onNavigate('collections')} /></div>
          <div className="col-span-1"><CategoryCard cat={categories[2]} onClick={() => onNavigate('collections')} /></div>
          <div className="col-span-1"><CategoryCard cat={categories[3]} onClick={() => onNavigate('collections')} /></div>
        </div>
      </section>

      <section className="py-12 md:py-20" style={{ background: '#F2F0EC' }}>
        <div className="px-5 md:px-10 max-w-7xl mx-auto mb-8 md:mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: '#5C7A6B' }}>Destacados</p>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: '#2E3D35' }}>Piezas que<br /><em>hacen diferencia.</em></h2>
        </div>
        <div className="flex gap-4 px-5 md:px-10 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
          {products.map(p => <FeaturedProductCard key={p.id} p={p} onNavigate={onNavigate} />)}
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=1600&h=700&fit=crop&auto=format" alt="Sala editorial" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(46,61,53,0.85) 0%, rgba(46,61,53,0.3) 60%, transparent 100%)' }} />
        <div className="relative flex flex-col justify-center h-full min-h-[480px] px-8 md:px-16 max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-5" style={{ color: '#A8C4B8' }}>Nuestra filosofía</p>
          <blockquote className="font-display text-3xl md:text-5xl font-light leading-tight text-white max-w-xl mb-8" style={{ fontStyle: 'italic' }}>
            "El buen diseño no llama la atención.<br /><span className="not-italic font-medium">Transforma el espacio."</span>
          </blockquote>
          <button onClick={() => onNavigate('essence')} className="self-start inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105" style={{ background: '#B89A6A', color: '#fff' }}>
            Conocer nuestra esencia <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: '#B89A6A' }}>Ofertas</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight" style={{ color: '#2E3D35' }}>Buen precio,<br /><em>mejor pieza.</em></h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: '#635C55' }}>Porque renovar tu espacio no debería ser un lujo.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {discounts.map(d => <DiscountCard key={d.id} item={d} onNavigate={onNavigate} />)}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default function App() {
  const [page, setPage]           = useState('home')
  const [productId, setProductId] = useState('prod-sofa-azul')
  const [legalType, setLegalType] = useState('terms')
  const [scrolled, setScrolled]   = useState(false)
  const [cartOpen, setCartOpen]   = useState(false)
  const [cartItems, setCartItems] = useState(INITIAL_CART)

  const navigate = (p, extra) => {
    if (p === 'product' && extra) setProductId(extra)
    if (p === 'terms')   setLegalType('terms')
    if (p === 'privacy') setLegalType('privacy')
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }
  const handleRemove = (id) => setCartItems(prev => prev.filter(i => i.id !== id))

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setScrolled(false) }, [page])

  const hideNavbar = NO_NAVBAR.includes(page) || page === 'profile' || page === 'checkout' || page === 'orders'

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif' }}>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onQty={handleQty}
        onRemove={handleRemove}
        onNavigate={p => { setCartOpen(false); navigate(p) }}
      />
      {!hideNavbar && <Navbar scrolled={scrolled} page={page} onNavigate={p => navigate(p)} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />}

      {page === 'home'           && <HomePage       onNavigate={navigate} />}
      {page === 'collections'    && <Collections    onNavigate={navigate} />}
      {page === 'essence'        && <Essence        onNavigate={navigate} />}
      {page === 'contact'        && <Contact        onNavigate={navigate} />}
      {page === 'login'          && <Login          onNavigate={navigate} />}
      {page === 'register'       && <Register       onNavigate={navigate} />}
      {page === 'forgotPassword' && <ForgotPassword onNavigate={navigate} />}
      {page === 'profile'        && <Profile        onNavigate={navigate} />}
      {page === 'product'        && <ProductDetail  productId={productId} onNavigate={navigate} />}
      {page === 'terms'          && <Legal          type="terms"   onNavigate={navigate} />}
      {page === 'privacy'        && <Legal          type="privacy" onNavigate={navigate} />}
      {page === 'checkout'       && <Checkout       items={cartItems}              onNavigate={navigate} />}
      {page === 'orders'         && <Orders                                        onNavigate={navigate} />}
    </div>
  )
}
