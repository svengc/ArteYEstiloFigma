import { useState } from 'react'
import { COP } from '../utils/format'

const ORDERS = [
  {
    id: 'AE-2401',
    date: '15 enero 2025',
    status: 'Entregado',
    items: [
      { name: 'Sofá Lugano',       category: 'Sala & Descanso',   qty: 1, price: 3_490_000, img: 'https://images.unsplash.com/photo-1680503397667-3877494708a1?w=200&h=200&fit=crop&auto=format' },
      { name: 'Mesa de Centro Río', category: 'Sala & Descanso',   qty: 1, price: 890_000,   img: 'https://images.unsplash.com/photo-1600623050499-84929aad17c9?w=200&h=200&fit=crop&auto=format' },
    ],
    address: 'Cra. 43A #1 Sur-100, Apto 502',
    city: 'Medellín, Antioquia',
    payment: 'Visa •••• 4821',
    shipping: 0,
    estimated: '18 enero 2025',
  },
  {
    id: 'AE-2389',
    date: '02 diciembre 2024',
    status: 'En camino',
    items: [
      { name: 'Comedor Ratán 4P',  category: 'Comedor & Reunión', qty: 1, price: 1_200_000, img: 'https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=200&h=200&fit=crop&auto=format' },
    ],
    address: 'Calle 10 #43E-28',
    city: 'Medellín, Antioquia',
    payment: 'Mastercard •••• 9204',
    shipping: 120_000,
    estimated: '07 diciembre 2024',
    tracking: 'CO-TR-88421',
  },
  {
    id: 'AE-2370',
    date: '18 noviembre 2024',
    status: 'Procesando',
    items: [
      { name: 'Silla Arce Tapizada', category: 'Detalles que Cuentan', qty: 2, price: 680_000,   img: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=200&h=200&fit=crop&auto=format' },
      { name: 'Banco Bambú Natural',  category: 'Detalles que Cuentan', qty: 1, price: 1_200_000, img: 'https://images.unsplash.com/photo-1765663241884-ebd171bdda1d?w=200&h=200&fit=crop&auto=format' },
    ],
    address: 'Av. El Poblado #17-55',
    city: 'Medellín, Antioquia',
    payment: 'PSE — Bancolombia',
    shipping: 0,
    estimated: '25 noviembre 2024',
  },
  {
    id: 'AE-2341',
    date: '04 octubre 2024',
    status: 'Cancelado',
    items: [
      { name: 'Aparador Nórdico', category: 'Descanso & Intimidad', qty: 1, price: 1_800_000, img: 'https://images.unsplash.com/photo-1576249720336-35b043fce96d?w=200&h=200&fit=crop&auto=format' },
    ],
    address: 'Cra. 43A #1 Sur-100',
    city: 'Medellín, Antioquia',
    payment: 'Contraentrega',
    shipping: 135_000,
  },
]

const STATUS_CONFIG = {
  'Entregado':  { bg: 'rgba(92,122,107,0.12)',  color: '#2E3D35',  dot: '#5C7A6B',  label: 'Entregado' },
  'En camino':  { bg: 'rgba(184,154,106,0.15)', color: '#5C3D0E',  dot: '#B89A6A',  label: 'En camino' },
  'Procesando': { bg: 'rgba(92,122,107,0.08)',  color: '#3B5A4D',  dot: '#7AA898',  label: 'Procesando' },
  'Cancelado':  { bg: 'rgba(220,80,80,0.08)',   color: '#9B2B2B',  dot: '#DC5050',  label: 'Cancelado' },
}

const TIMELINE = {
  'Entregado': [
    { label: 'Pedido recibido',  sub: 'Confirmado',        done: true,  active: false },
    { label: 'En preparación',   sub: 'Empacado',          done: true,  active: false },
    { label: 'Enviado',          sub: 'En tránsito',       done: true,  active: false },
    { label: 'Entregado',        sub: 'Recibido con éxito',done: true,  active: false },
  ],
  'En camino': [
    { label: 'Pedido recibido',  sub: 'Confirmado',        done: true,  active: false },
    { label: 'En preparación',   sub: 'Empacado',          done: true,  active: false },
    { label: 'Enviado',          sub: 'En camino',         done: false, active: true  },
    { label: 'Entregado',        sub: 'Pronto llegará',    done: false, active: false },
  ],
  'Procesando': [
    { label: 'Pedido recibido',  sub: 'Confirmado',        done: true,  active: false },
    { label: 'En preparación',   sub: 'Estamos trabajando',done: false, active: true  },
    { label: 'Enviado',          sub: 'Próximamente',      done: false, active: false },
    { label: 'Entregado',        sub: 'Próximamente',      done: false, active: false },
  ],
  'Cancelado': [
    { label: 'Pedido recibido',  sub: 'Confirmado',        done: true,  active: false },
    { label: 'Cancelado',        sub: 'Pedido anulado',    done: false, active: true  },
    { label: 'Reembolso',        sub: 'En proceso',        done: false, active: false },
    { label: 'Completado',       sub: 'Reembolso listo',   done: false, active: false },
  ],
}

function OrderCard({ order, onNavigate }) {
  const [expanded, setExpanded] = useState(false)
  const cfg     = STATUS_CONFIG[order.status]
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0)
  const total    = subtotal + order.shipping
  const timeline = TIMELINE[order.status]

  return (
    <article
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border: `1.5px solid ${expanded ? 'rgba(92,122,107,0.25)' : 'rgba(92,122,107,0.12)'}`,
        background: '#fff',
        boxShadow: expanded ? '0 8px 32px rgba(46,61,53,0.08)' : '0 1px 4px rgba(46,61,53,0.04)',
      }}
    >
      <button
        className="w-full text-left px-5 md:px-6 py-5 flex items-start md:items-center gap-4 md:gap-6"
        onClick={() => setExpanded(o => !o)}
      >
        <div className="flex-shrink-0 relative" style={{ width: 52, height: 52 }}>
          {order.items.slice(0, 2).map((item, i) => (
            <div
              key={i}
              className="absolute rounded-xl overflow-hidden border-2"
              style={{
                width: 40, height: 40,
                top: i * 10, left: i * 10,
                borderColor: '#FAFAF8',
                background: '#D6E8E2',
                zIndex: order.items.length - i,
              }}
            >
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
          ))}
          {order.items.length > 2 && (
            <div
              className="absolute rounded-xl flex items-center justify-center text-[10px] font-bold border-2"
              style={{ width: 40, height: 40, top: 20, left: 20, borderColor: '#FAFAF8', background: '#2E3D35', color: '#fff', zIndex: 1 }}
            >
              +{order.items.length - 2}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-semibold" style={{ color: '#5C7A6B' }}>#{order.id}</span>
            <span className="text-[10px] hidden sm:block" style={{ color: '#C4BAB2' }}>·</span>
            <span className="text-[11px] hidden sm:block" style={{ color: '#C4BAB2' }}>{order.date}</span>
          </div>
          <p className="text-sm font-medium truncate leading-snug" style={{ color: '#2E3D35' }}>
            {order.items.map(i => i.name).join(', ')}
          </p>
          <p className="text-[11px] mt-0.5 sm:hidden" style={{ color: '#C4BAB2' }}>{order.date}</p>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
            {cfg.label}
          </span>
          <span className="font-display text-base font-medium" style={{ color: '#2E3D35' }}>
            {COP(total)}
          </span>
        </div>

        <div className="flex-shrink-0 hidden sm:block">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4BAB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid rgba(92,122,107,0.1)' }}>
          <div className="grid md:grid-cols-2 gap-0 md:divide-x" style={{ borderColor: 'rgba(92,122,107,0.1)' }}>

            <div className="px-5 md:px-6 py-5">
              <p className="text-[10px] uppercase tracking-[0.35em] mb-3" style={{ color: '#5C7A6B' }}>
                Artículos
              </p>
              <div className="flex flex-col gap-3 mb-5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden" style={{ background: '#D6E8E2' }}>
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: '#2E3D35' }}>{item.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: '#B89A6A' }}>
                        {item.category} · ×{item.qty}
                      </p>
                    </div>
                    <span className="text-xs font-semibold flex-shrink-0" style={{ color: '#2E3D35' }}>
                      {COP(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 pt-4" style={{ borderTop: '1px solid rgba(92,122,107,0.1)' }}>
                <div className="flex justify-between text-xs" style={{ color: '#635C55' }}>
                  <span>Subtotal</span><span>{COP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: '#635C55' }}>
                  <span>Envío</span>
                  <span style={{ color: order.shipping === 0 ? '#5C7A6B' : '#635C55' }}>
                    {order.shipping === 0 ? 'Gratis' : COP(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 mt-0.5" style={{ borderTop: '1px solid rgba(92,122,107,0.1)' }}>
                  <span className="text-xs font-semibold" style={{ color: '#2E3D35' }}>Total</span>
                  <span className="font-display text-base font-medium" style={{ color: '#2E3D35' }}>{COP(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl" style={{ background: '#F7F6F4' }}>
                  <p className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: '#C4BAB2' }}>Pago</p>
                  <p className="text-xs font-medium" style={{ color: '#2E3D35' }}>{order.payment}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: '#F7F6F4' }}>
                  <p className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: '#C4BAB2' }}>Envío a</p>
                  <p className="text-xs font-medium leading-snug" style={{ color: '#2E3D35' }}>
                    {order.address}<br />
                    <span style={{ color: '#635C55', fontWeight: 400 }}>{order.city}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 md:px-6 py-5 border-t md:border-t-0" style={{ borderColor: 'rgba(92,122,107,0.1)' }}>
              <p className="text-[10px] uppercase tracking-[0.35em] mb-4" style={{ color: '#5C7A6B' }}>
                Estado del pedido
              </p>

              <div className="flex flex-col mb-5">
                {timeline.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                        style={{
                          background: step.done
                            ? order.status === 'Cancelado' && i === 1 ? '#DC5050' : '#5C7A6B'
                            : step.active
                            ? order.status === 'Cancelado' ? '#DC5050' : '#2E3D35'
                            : '#F2F0EC',
                          border: `2px solid ${step.done
                            ? order.status === 'Cancelado' && i === 1 ? '#DC5050' : '#5C7A6B'
                            : step.active
                            ? order.status === 'Cancelado' ? '#DC5050' : '#2E3D35'
                            : 'rgba(92,122,107,0.15)'
                          }`,
                        }}
                      >
                        {step.done && (
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        )}
                        {step.active && !step.done && (
                          <div className="w-2 h-2 rounded-full" style={{ background: '#fff' }} />
                        )}
                      </div>
                      {i < timeline.length - 1 && (
                        <div
                          className="w-px flex-1 my-0.5"
                          style={{
                            minHeight: 20,
                            background: step.done ? (order.status === 'Cancelado' && i === 0 ? 'rgba(220,80,80,0.2)' : 'rgba(92,122,107,0.3)') : 'rgba(92,122,107,0.1)',
                          }}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-medium" style={{ color: step.done || step.active ? '#2E3D35' : '#C4BAB2' }}>
                        {step.label}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: '#C4BAB2' }}>{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {order.tracking && order.status === 'En camino' && (
                <div
                  className="flex items-center justify-between p-3 rounded-xl mb-4"
                  style={{ background: 'rgba(184,154,106,0.1)', border: '1px solid rgba(184,154,106,0.2)' }}
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] mb-0.5" style={{ color: '#B89A6A' }}>Código de rastreo</p>
                    <p className="text-xs font-semibold" style={{ color: '#2E3D35' }}>{order.tracking}</p>
                  </div>
                  <button
                    className="text-[10px] font-medium px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: '#B89A6A', color: '#fff' }}
                  >
                    Rastrear
                  </button>
                </div>
              )}

              {order.estimated && order.status !== 'Cancelado' && (
                <div
                  className="flex items-center gap-2 p-3 rounded-xl mb-4"
                  style={{ background: '#F7F6F4' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C7A6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em]" style={{ color: '#C4BAB2' }}>
                      {order.status === 'Entregado' ? 'Entregado el' : 'Entrega estimada'}
                    </p>
                    <p className="text-xs font-medium" style={{ color: '#2E3D35' }}>{order.estimated}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {order.status === 'Entregado' && (
                  <>
                    <button
                      onClick={() => onNavigate('collections')}
                      className="w-full py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90"
                      style={{ background: '#2E3D35', color: '#fff' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                      </svg>
                      Volver a pedir
                    </button>
                    <button
                      className="w-full py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all hover:bg-black/5"
                      style={{ border: '1.5px solid rgba(92,122,107,0.2)', color: '#635C55' }}
                    >
                      Dejar una reseña
                    </button>
                  </>
                )}
                {order.status === 'En camino' && (
                  <button
                    className="w-full py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: '#2E3D35', color: '#fff' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 5v4h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    Rastrear envío
                  </button>
                )}
                {order.status === 'Procesando' && (
                  <button
                    className="w-full py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all hover:bg-black/5"
                    style={{ border: '1.5px solid rgba(220,80,80,0.25)', color: '#DC5050' }}
                  >
                    Cancelar pedido
                  </button>
                )}
                {order.status === 'Cancelado' && (
                  <button
                    onClick={() => onNavigate('collections')}
                    className="w-full py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: '#2E3D35', color: '#fff' }}
                  >
                    Volver a comprar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

const FILTERS = [
  { key: 'todos',      label: 'Todos' },
  { key: 'Procesando', label: 'Procesando' },
  { key: 'En camino',  label: 'En camino' },
  { key: 'Entregado',  label: 'Entregados' },
  { key: 'Cancelado',  label: 'Cancelados' },
]

export default function Orders({ onNavigate }) {
  const [filter, setFilter] = useState('todos')

  const filtered = filter === 'todos' ? ORDERS : ORDERS.filter(o => o.status === filter)
  const totalSpent = ORDERS.filter(o => o.status === 'Entregado').reduce((s, o) => s + o.items.reduce((si, i) => si + i.price * i.qty, 0), 0)

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8', fontFamily: 'Outfit, sans-serif' }}>

      <header
        className="sticky top-0 z-40"
        style={{ background: 'rgba(250,250,248,0.94)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(92,122,107,0.1)' }}
      >
        <nav className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('profile')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-medium transition-all hover:gap-3"
            style={{ color: '#5C7A6B' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Mi perfil
          </button>

          <button onClick={() => onNavigate('home')}>
            <span className="font-display text-lg font-light tracking-[0.2em]" style={{ color: '#2E3D35' }}>
              Arte <span style={{ color: '#B89A6A' }}>&</span> Estilo
            </span>
          </button>

          <button
            onClick={() => onNavigate('collections')}
            className="text-xs font-medium transition-opacity hover:opacity-70 hidden sm:block"
            style={{ color: '#635C55' }}
          >
            Ver catálogo →
          </button>
          <div className="sm:hidden w-20" />
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-10 py-10">

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-2" style={{ color: '#5C7A6B' }}>Mi cuenta</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-light leading-tight" style={{ color: '#2E3D35' }}>
                Mis pedidos.
              </h1>
              <p className="text-sm mt-2" style={{ color: '#635C55' }}>
                {ORDERS.length} pedidos · {ORDERS.filter(o => o.status === 'Entregado').length} entregados
              </p>
            </div>

            <div className="flex gap-6 md:gap-8">
              {[
                { label: 'Total gastado',  value: COP(totalSpent),                     color: '#2E3D35' },
                { label: 'En tránsito',    value: String(ORDERS.filter(o => o.status === 'En camino').length),  color: '#B89A6A' },
                { label: 'Procesando',     value: String(ORDERS.filter(o => o.status === 'Procesando').length), color: '#5C7A6B' },
              ].map(s => (
                <div key={s.label} className="text-right md:text-left">
                  <p className="font-display text-xl font-medium" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#C4BAB2' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(f => {
            const count = f.key === 'todos' ? ORDERS.length : ORDERS.filter(o => o.status === f.key).length
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
                style={
                  filter === f.key
                    ? { background: '#2E3D35', color: '#fff' }
                    : { background: 'transparent', color: '#635C55', border: '1px solid rgba(92,122,107,0.22)' }
                }
              >
                {f.label}
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                  style={{
                    background: filter === f.key ? 'rgba(255,255,255,0.2)' : 'rgba(92,122,107,0.1)',
                    color: filter === f.key ? '#fff' : '#5C7A6B',
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map(order => (
            <OrderCard key={order.id} order={order} onNavigate={onNavigate} />
          ))}
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-display text-2xl font-light italic mb-3" style={{ color: '#C4BAB2' }}>
                No hay pedidos en esta categoría.
              </p>
              <button
                onClick={() => onNavigate('collections')}
                className="mt-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ background: '#2E3D35', color: '#fff' }}
              >
                Explorar colecciones
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
