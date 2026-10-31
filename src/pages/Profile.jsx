import { useState } from 'react'
import { COP } from '../utils/format'
import { INPUT_STATIC as INPUT } from '../utils/inputStyle'

const mockUser = {
  name: 'María Pérez',
  email: 'maria.perez@correo.com',
  phone: '300 000 0000',
  city: 'Medellín',
  member: 'Miembro desde 2024',
}

const mockOrders = [
  { id: '#AE-2401', product: 'Sofá Lugano',       date: '15 ene 2025', status: 'Entregado',  price: 3_490_000 },
  { id: '#AE-2389', product: 'Mesa de Centro Río', date: '02 dic 2024', status: 'En camino',  price: 1_290_000 },
  { id: '#AE-2370', product: 'Silla Arce x2',     date: '18 nov 2024', status: 'Procesando', price: 1_360_000 },
]

const mockFavorites = [
  { name: 'Comedor Brenna 6P', price: 4_850_000, img: 'https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=300&h=240&fit=crop&auto=format' },
  { name: 'Sofá Módena',       price: 5_100_000, img: 'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=300&h=240&fit=crop&auto=format' },
]

const STATUS_COLORS = {
  'Entregado':  { bg: 'rgba(168,196,184,0.35)', color: '#2E3D35' },
  'En camino':  { bg: 'rgba(212,184,150,0.4)',  color: '#6B4C1E' },
  'Procesando': { bg: 'rgba(184,154,106,0.2)',  color: '#5C4020' },
}

function SectionCard({ num, title, action, children }) {
  return (
    <article className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(92,122,107,0.15)', background: '#fff' }}>
      <div className="px-6 py-4 flex items-center justify-between" style={{ background: '#D6E8E2' }}>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#5C7A6B' }}>{num}</p>
          <h2 className="font-display text-xl font-light mt-1" style={{ color: '#2E3D35' }}>{title}</h2>
        </div>
        {action}
      </div>
      <div className="px-6 py-5">{children}</div>
    </article>
  )
}

export default function Profile({ onNavigate }) {
  const [editOpen, setEditOpen] = useState(false)
  const [addAddressOpen, setAddAddressOpen] = useState(false)
  const [addPayOpen, setAddPayOpen] = useState(false)
  const [user, setUser] = useState(mockUser)
  const [editForm, setEditForm] = useState({ name: user.name, phone: user.phone, city: user.city })
  const [addresses, setAddresses] = useState([{ label: 'Principal', line: 'Calle 10 #43E-28', city: 'Medellín', region: 'Antioquia' }])
  const [addrForm, setAddrForm] = useState({ label: '', line: '', city: '', region: '' })
  const [payments, setPayments] = useState([{ brand: 'Visa', last4: '4821', expiry: '08/27' }])
  const [payForm, setPayForm] = useState({ brand: '', last4: '', expiry: '' })

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>
      {/* Profile navbar */}
      <header className="sticky top-0 z-40" style={{ background: 'rgba(92,122,107,0.95)', backdropFilter: 'blur(12px)' }}>
        <nav className="max-w-7xl mx-auto px-5 md:px-10 py-3.5 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="font-display text-xl font-light tracking-[0.18em] text-white">
            Arte <span style={{ color: '#A8C4B8' }}>&</span> Estilo
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('collections')}
              className="hidden md:flex items-center px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.25em] transition-all hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}
            >
              Ver catálogo
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}
              title="Cerrar sesión"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        {/* Profile header */}
        <section
          className="rounded-2xl overflow-hidden mb-6 p-6 md:p-8"
          style={{ background: '#fff', border: '1px solid rgba(92,122,107,0.15)' }}
        >
          <div className="grid gap-5 md:grid-cols-[120px_1fr_auto] items-center">
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden mx-auto bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format)' }}
            />
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: '#5C7A6B' }}>Mi cuenta</p>
              <h1 className="font-display text-3xl md:text-4xl font-light" style={{ color: '#2E3D35' }}>{user.name}</h1>
              <p className="text-sm mt-1" style={{ color: '#635C55' }}>{user.email}</p>
              <p className="text-xs mt-1" style={{ color: '#B89A6A' }}>{user.member}</p>
            </div>
            <div className="flex flex-col gap-2 min-w-[140px]">
              <button
                onClick={() => onNavigate('orders')}
                className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all hover:opacity-80 text-center"
                style={{ border: '1px solid rgba(92,122,107,0.3)', color: '#2E3D35' }}
              >
                Mis pedidos
              </button>
              <button
                onClick={() => setEditOpen(o => !o)}
                className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all hover:opacity-90 text-center"
                style={{ background: '#5C7A6B', color: '#fff' }}
              >
                {editOpen ? 'Cancelar' : 'Editar perfil'}
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all hover:opacity-80 text-center"
                style={{ border: '1px solid rgba(92,122,107,0.3)', color: '#2E3D35' }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          {editOpen && (
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(92,122,107,0.15)' }}>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={e => { e.preventDefault(); setUser(u => ({ ...u, name: editForm.name, phone: editForm.phone, city: editForm.city })); setEditOpen(false) }}
              >
                {[
                  { key: 'name',  label: 'Nombre completo', placeholder: 'María Pérez' },
                  { key: 'phone', label: 'Teléfono',         placeholder: '300 000 0000' },
                  { key: 'city',  label: 'Ciudad',           placeholder: 'Medellín' },
                ].map(f => (
                  <div key={f.key} className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#635C55' }}>{f.label}</label>
                    <input
                      style={INPUT}
                      value={editForm[f.key]}
                      onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}
                <div className="md:col-span-2 flex gap-3 mt-1">
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium" style={{ background: '#5C7A6B', color: '#fff' }}>Guardar</button>
                  <button type="button" onClick={() => setEditOpen(false)} className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium" style={{ border: '1px solid rgba(92,122,107,0.3)', color: '#2E3D35' }}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Personal data */}
          <SectionCard num="01 — Cuenta" title="Datos personales">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nombre completo',    value: user.name },
                { label: 'Correo electrónico', value: user.email },
                { label: 'Teléfono',           value: user.phone },
                { label: 'Ciudad',             value: user.city },
              ].map(d => (
                <div key={d.label}>
                  <p className="text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: '#5C7A6B' }}>{d.label}</p>
                  <p className="text-sm font-medium" style={{ color: '#2E3D35' }}>{d.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Cart */}
          <SectionCard
            num="02 — Carrito"
            title="Tu compra actual"
            action={
              <button className="px-4 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-medium" style={{ background: '#5C7A6B', color: '#fff' }}>
                Finalizar
              </button>
            }
          >
            <p className="text-sm text-center py-6" style={{ color: '#C4BAB2' }}>Tu carrito está vacío.</p>
            <div className="pt-4 flex justify-between items-center" style={{ borderTop: '1px solid rgba(92,122,107,0.12)' }}>
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#635C55' }}>Total</span>
              <strong className="font-display text-2xl font-light" style={{ color: '#2E3D35' }}>$0</strong>
            </div>
          </SectionCard>

          {/* Addresses */}
          <SectionCard
            num="03 — Envío"
            title="Direcciones"
            action={
              <button
                onClick={() => setAddAddressOpen(o => !o)}
                className="px-4 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(92,122,107,0.3)', color: '#2E3D35' }}
              >
                {addAddressOpen ? 'Cancelar' : 'Agregar'}
              </button>
            }
          >
            {addAddressOpen && (
              <form
                className="mb-5 pb-5 flex flex-col gap-3"
                style={{ borderBottom: '1px solid rgba(92,122,107,0.12)' }}
                onSubmit={e => {
                  e.preventDefault()
                  setAddresses(a => [...a, addrForm])
                  setAddrForm({ label: '', line: '', city: '', region: '' })
                  setAddAddressOpen(false)
                }}
              >
                {[
                  { key: 'label',  label: 'Etiqueta',  placeholder: 'Principal' },
                  { key: 'line',   label: 'Dirección', placeholder: 'Calle 10 #43E-28' },
                  { key: 'city',   label: 'Ciudad',    placeholder: 'Medellín' },
                  { key: 'region', label: 'Región',    placeholder: 'Antioquia' },
                ].map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#635C55' }}>{f.label}</label>
                    <input style={INPUT} value={addrForm[f.key]} onChange={e => setAddrForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} required />
                  </div>
                ))}
                <button type="submit" className="mt-1 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium" style={{ background: '#5C7A6B', color: '#fff' }}>Guardar</button>
              </form>
            )}
            <div className="flex flex-col gap-3">
              {addresses.map((a, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(214,232,226,0.35)' }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: '#5C7A6B' }}>{a.label}</p>
                  <p className="text-sm" style={{ color: '#2E3D35' }}>{a.line}</p>
                  <p className="text-xs" style={{ color: '#635C55' }}>{a.city}, {a.region}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Payment methods */}
          <SectionCard
            num="04 — Pago"
            title="Métodos de pago"
            action={
              <button
                onClick={() => setAddPayOpen(o => !o)}
                className="px-4 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(92,122,107,0.3)', color: '#2E3D35' }}
              >
                {addPayOpen ? 'Cancelar' : 'Agregar'}
              </button>
            }
          >
            {addPayOpen && (
              <form
                className="mb-5 pb-5 grid grid-cols-3 gap-3"
                style={{ borderBottom: '1px solid rgba(92,122,107,0.12)' }}
                onSubmit={e => {
                  e.preventDefault()
                  setPayments(p => [...p, payForm])
                  setPayForm({ brand: '', last4: '', expiry: '' })
                  setAddPayOpen(false)
                }}
              >
                {[
                  { key: 'brand',  label: 'Tipo',      placeholder: 'Visa' },
                  { key: 'last4',  label: 'Últimos 4',  placeholder: '4821' },
                  { key: 'expiry', label: 'Vence',      placeholder: '08/27' },
                ].map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#635C55' }}>{f.label}</label>
                    <input style={INPUT} value={payForm[f.key]} onChange={e => setPayForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} required />
                  </div>
                ))}
                <div className="col-span-3">
                  <button type="submit" className="py-2.5 px-5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium" style={{ background: '#5C7A6B', color: '#fff' }}>Guardar</button>
                </div>
              </form>
            )}
            <div className="flex flex-col gap-3">
              {payments.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(214,232,226,0.35)' }}>
                  <div className="w-10 h-7 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: '#2E3D35', color: '#fff' }}>
                    {p.brand.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#2E3D35' }}>{p.brand} •••• {p.last4}</p>
                    <p className="text-xs" style={{ color: '#635C55' }}>Vence {p.expiry}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Orders */}
          <SectionCard
            num="05 — Compras"
            title="Historial de pedidos"
            action={
              <button
                onClick={() => onNavigate('orders')}
                className="px-4 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all hover:opacity-80"
                style={{ background: '#5C7A6B', color: '#fff' }}
              >
                Ver todos
              </button>
            }
          >
            <div className="flex flex-col gap-3">
              {mockOrders.map(o => (
                <div key={o.id} className="flex items-center justify-between gap-3 py-2" style={{ borderBottom: '1px solid rgba(92,122,107,0.08)' }}>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#5C7A6B' }}>{o.id}</p>
                    <p className="text-sm font-medium" style={{ color: '#2E3D35' }}>{o.product}</p>
                    <p className="text-xs" style={{ color: '#C4BAB2' }}>{o.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wide font-medium mb-1"
                      style={STATUS_COLORS[o.status]}
                    >
                      {o.status}
                    </span>
                    <p className="text-xs font-medium" style={{ color: '#2E3D35' }}>{COP(o.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Favorites */}
          <SectionCard
            num="06 — Guardados"
            title="Mis favoritos"
            action={
              <button
                onClick={() => onNavigate('collections')}
                className="text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                style={{ color: '#2E3D35' }}
              >
                Ver catálogo
              </button>
            }
          >
            <div className="grid grid-cols-2 gap-3">
              {mockFavorites.map(f => (
                <div key={f.name} className="rounded-xl overflow-hidden cursor-pointer group" style={{ border: '1px solid rgba(92,122,107,0.15)' }}>
                  <div className="h-28 overflow-hidden" style={{ background: '#D6E8E2' }}>
                    <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium leading-tight" style={{ color: '#2E3D35' }}>{f.name}</p>
                    <p className="text-xs mt-1" style={{ color: '#5C7A6B' }}>{COP(f.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  )
}
