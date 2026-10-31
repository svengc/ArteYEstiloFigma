import { useState } from 'react'
import { COP } from '../utils/format'
import { inputStyle as inputCls } from '../utils/inputStyle'

const STEPS = [
  { key: 'shipping', label: 'Datos de envío', short: 'Envío' },
  { key: 'payment',  label: 'Método de pago', short: 'Pago' },
  { key: 'confirm',  label: 'Confirmación',   short: 'Listo' },
]

function StepBar({ current }) {
  const idx = STEPS.findIndex(s => s.key === current)
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((s, i) => {
        const done    = i < idx
        const active  = i === idx
        return (
          <div key={s.key} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all duration-300"
                style={{
                  background: done ? '#5C7A6B' : active ? '#2E3D35' : 'transparent',
                  border: `2px solid ${done ? '#5C7A6B' : active ? '#2E3D35' : 'rgba(92,122,107,0.2)'}`,
                  color: done || active ? '#fff' : '#C4BAB2',
                }}
              >
                {done
                  ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
                  : i + 1
                }
              </div>
              <span className="text-xs font-medium hidden sm:block" style={{ color: active ? '#2E3D35' : done ? '#5C7A6B' : '#C4BAB2' }}>
                {s.short}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="mx-3 transition-all duration-500"
                style={{ width: 32, height: 1.5, background: i < idx ? '#5C7A6B' : 'rgba(92,122,107,0.15)', borderRadius: 2 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function OrderSummary({ items }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal > 2_000_000 ? 0 : 120_000
  const total    = subtotal + shipping
  const [open, setOpen] = useState(true)

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#F7F6F4', border: '1px solid rgba(92,122,107,0.1)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 lg:cursor-default"
        style={{ background: 'transparent' }}
      >
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C7A6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="text-sm font-medium" style={{ color: '#2E3D35' }}>Resumen del pedido</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#5C7A6B', color: '#fff' }}>
            {items.reduce((s, i) => s + i.qty, 0)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-base font-medium" style={{ color: '#2E3D35' }}>{COP(total)}</span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4BAB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
            className="lg:hidden"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} lg:max-h-none lg:opacity-100`}>
        <div className="px-5 pb-2 flex flex-col gap-3">
          {items.map(item => (
            <div key={item.id} className="flex gap-3">
              <div className="relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden" style={{ background: '#D6E8E2' }}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <span
                  className="absolute -top-1.5 -right-1.5 rounded-full text-[9px] flex items-center justify-center font-bold"
                  style={{ background: '#635C55', color: '#fff', width: 18, height: 18 }}
                >
                  {item.qty}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium leading-tight truncate" style={{ color: '#2E3D35' }}>{item.name}</p>
                <p className="text-[10px] mt-0.5 truncate" style={{ color: '#B89A6A' }}>{item.category}</p>
              </div>
              <span className="text-xs font-semibold flex-shrink-0" style={{ color: '#2E3D35' }}>{COP(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 my-3 h-px" style={{ background: 'rgba(92,122,107,0.1)' }} />

        <div className="px-5 mb-3">
          <div className="flex gap-2">
            <input
              placeholder="Código de descuento"
              style={{
                flex: 1, background: '#fff', border: '1.5px solid rgba(92,122,107,0.18)',
                borderRadius: 10, padding: '9px 12px', fontSize: 13, color: '#2E3D35',
                outline: 'none', fontFamily: 'Outfit, sans-serif',
              }}
            />
            <button className="px-4 rounded-xl text-xs font-medium transition-all hover:opacity-80" style={{ background: '#2E3D35', color: '#fff', whiteSpace: 'nowrap' }}>
              Aplicar
            </button>
          </div>
        </div>

        <div className="mx-5 mb-3 h-px" style={{ background: 'rgba(92,122,107,0.1)' }} />

        <div className="px-5 pb-5 flex flex-col gap-2">
          <div className="flex justify-between text-sm" style={{ color: '#635C55' }}>
            <span>Subtotal</span><span>{COP(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm" style={{ color: '#635C55' }}>
            <span>Envío</span>
            <span style={{ color: shipping === 0 ? '#5C7A6B' : '#635C55' }}>
              {shipping === 0 ? 'Gratis' : COP(shipping)}
            </span>
          </div>
          <div className="flex justify-between pt-3 mt-1" style={{ borderTop: '1.5px solid rgba(92,122,107,0.12)' }}>
            <span className="font-semibold text-sm" style={{ color: '#2E3D35' }}>Total</span>
            <span className="font-display text-lg font-medium" style={{ color: '#2E3D35' }}>{COP(total)}</span>
          </div>
          {shipping === 0 && (
            <p className="text-[11px] text-center" style={{ color: '#5C7A6B' }}>✓ Envío gratuito incluido</p>
          )}
        </div>
      </div>
    </div>
  )
}

function ShippingForm({ onNext }) {
  const [v, setV] = useState({
    nombre: '', apellido: '', email: '', telefono: '',
    direccion: '', ciudad: '', departamento: '', referencia: '',
  })
  const [focused, setFocused] = useState(null)
  const set = (k, val) => setV(prev => ({ ...prev, [k]: val }))

  const fields = [
    { id: 'nombre',       label: 'Nombre',            type: 'text',  placeholder: 'Valentina' },
    { id: 'apellido',     label: 'Apellido',           type: 'text',  placeholder: 'Pérez' },
    { id: 'email',        label: 'Correo electrónico', type: 'email', placeholder: 'tu@email.com', span: true },
    { id: 'telefono',     label: 'Teléfono',           type: 'tel',   placeholder: '+57 300 000 0000' },
    { id: 'ciudad',       label: 'Ciudad',             type: 'text',  placeholder: 'Medellín' },
    { id: 'departamento', label: 'Departamento',       type: 'text',  placeholder: 'Antioquia' },
    { id: 'direccion',    label: 'Dirección',          type: 'text',  placeholder: 'Cra. 43A #1 Sur-100', span: true },
    { id: 'referencia',   label: 'Referencia / Apto',  type: 'text',  placeholder: 'Apto 502, Torre B', span: true },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(v)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-display text-2xl font-light mb-1" style={{ color: '#2E3D35' }}>Datos de envío</h2>
      <p className="text-sm mb-6" style={{ color: '#635C55' }}>¿Dónde entregamos tu pedido?</p>

      <div className="grid grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.id} className={`flex flex-col gap-1.5 ${f.span ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}>
            <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>
              {f.label}
            </label>
            <input
              style={inputCls(focused === f.id)}
              type={f.type}
              placeholder={f.placeholder}
              value={v[f.id]}
              onChange={e => set(f.id, e.target.value)}
              onFocus={() => setFocused(f.id)}
              onBlur={() => setFocused(null)}
              required={f.id !== 'referencia'}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-3.5 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90"
        style={{ background: '#2E3D35', color: '#fff' }}
      >
        Continuar al pago
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </form>
  )
}

function PaymentForm({ onNext, onBack }) {
  const [method, setMethod]   = useState('card')
  const [focused, setFocused] = useState(null)
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry]   = useState('')
  const [cvv, setCvv]         = useState('')
  const [name, setName]       = useState('')

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    return clean.length >= 3 ? clean.slice(0, 2) + '/' + clean.slice(2) : clean
  }

  const METHODS = [
    {
      key: 'card', label: 'Tarjeta de crédito / débito', sub: 'Visa, Mastercard, Amex',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      key: 'pse', label: 'PSE — Pago en línea', sub: 'Débito bancario directo',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 15h4" /><path d="M14 15h4" />
        </svg>
      ),
    },
    {
      key: 'cash', label: 'Contraentrega', sub: 'Pago al recibir el pedido',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
        </svg>
      ),
    },
  ]

  const handleSubmit = (e) => { e.preventDefault(); onNext() }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-display text-2xl font-light mb-1" style={{ color: '#2E3D35' }}>Método de pago</h2>
      <p className="text-sm mb-6" style={{ color: '#635C55' }}>Selecciona cómo quieres pagar</p>

      <div className="flex flex-col gap-2 mb-6">
        {METHODS.map(m => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMethod(m.key)}
            className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200"
            style={{
              border: `1.5px solid ${method === m.key ? '#2E3D35' : 'rgba(92,122,107,0.18)'}`,
              background: method === m.key ? 'rgba(46,61,53,0.04)' : '#fff',
            }}
          >
            <div
              className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
              style={{ borderColor: method === m.key ? '#2E3D35' : 'rgba(92,122,107,0.3)' }}
            >
              {method === m.key && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2E3D35' }} />}
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: method === m.key ? '#2E3D35' : '#F2F0EC', color: method === m.key ? '#fff' : '#635C55' }}
            >
              {m.icon}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#2E3D35' }}>{m.label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#C4BAB2' }}>{m.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {method === 'card' && (
        <div className="flex flex-col gap-4 p-5 rounded-2xl mb-2" style={{ background: '#F7F6F4' }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>Número de tarjeta</label>
            <div className="relative">
              <input
                style={inputCls(focused === 'cardNum', { paddingRight: 60 })}
                placeholder="0000 0000 0000 0000"
                value={cardNum}
                onChange={e => setCardNum(formatCard(e.target.value))}
                onFocus={() => setFocused('cardNum')}
                onBlur={() => setFocused(null)}
                required={method === 'card'}
                inputMode="numeric"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                {cardNum.startsWith('4') && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#1A1F71', color: '#fff' }}>VISA</span>
                )}
                {(cardNum.startsWith('5') || cardNum.startsWith('2')) && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#EB001B', color: '#fff' }}>MC</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>Nombre del titular</label>
            <input
              style={inputCls(focused === 'name')}
              placeholder="VALENTINA PÉREZ"
              value={name}
              onChange={e => setName(e.target.value.toUpperCase())}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              required={method === 'card'}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>Vencimiento</label>
              <input
                style={inputCls(focused === 'expiry')}
                placeholder="MM/AA"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                onFocus={() => setFocused('expiry')}
                onBlur={() => setFocused(null)}
                required={method === 'card'}
                inputMode="numeric"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>CVV</label>
              <input
                style={inputCls(focused === 'cvv')}
                placeholder="•••"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                onFocus={() => setFocused('cvv')}
                onBlur={() => setFocused(null)}
                type="password"
                required={method === 'card'}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p className="text-[11px]" style={{ color: '#C4BAB2' }}>Pago seguro con encriptación SSL de 256 bits</p>
          </div>
        </div>
      )}

      {method === 'pse' && (
        <div className="p-5 rounded-2xl mb-2 flex flex-col gap-3" style={{ background: '#F7F6F4' }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>Banco</label>
            <select
              style={{ ...inputCls(focused === 'bank'), appearance: 'none' }}
              onFocus={() => setFocused('bank')}
              onBlur={() => setFocused(null)}
              required={method === 'pse'}
            >
              <option value="">Selecciona tu banco</option>
              {['Bancolombia', 'Banco de Bogotá', 'Davivienda', 'Banco Popular', 'BBVA', 'Colpatria', 'Nequi'].map(b => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>Tipo de cuenta</label>
            <div className="flex gap-3">
              {['Ahorros', 'Corriente'].map(t => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="acctype" defaultChecked={t === 'Ahorros'} />
                  <span className="text-sm" style={{ color: '#635C55' }}>{t}</span>
                </label>
              ))}
            </div>
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: '#C4BAB2' }}>
            Serás redirigido al portal de tu banco para completar el pago de forma segura.
          </p>
        </div>
      )}

      {method === 'cash' && (
        <div className="p-5 rounded-2xl mb-2" style={{ background: '#F7F6F4' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#635C55' }}>
            Pagas en efectivo cuando recibas tu pedido. Asegúrate de tener el monto exacto disponible.
          </p>
          <div className="mt-3 flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B89A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[11px]" style={{ color: '#B89A6A' }}>Se cobra un recargo de $15.000 por servicio de contraentrega</p>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:bg-black/5"
          style={{ border: '1.5px solid rgba(92,122,107,0.2)', color: '#635C55' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Atrás
        </button>
        <button
          type="submit"
          className="flex-[2] py-3.5 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: '#2E3D35', color: '#fff' }}
        >
          Confirmar pedido
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  )
}

function ConfirmScreen({ shipping, items, onNavigate }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const orderId = `AE-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(92,122,107,0.1)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#5C7A6B' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <p className="text-[10px] uppercase tracking-[0.45em] mb-2" style={{ color: '#5C7A6B' }}>Pedido confirmado</p>
      <h2 className="font-display text-3xl font-light mb-2" style={{ color: '#2E3D35' }}>
        ¡Gracias{shipping?.nombre ? `, ${shipping.nombre}` : ''}!
      </h2>
      <p className="text-sm max-w-xs mb-6" style={{ color: '#635C55' }}>
        Tu pedido está en camino. Te notificaremos cuando sea despachado.
      </p>

      <div className="w-full max-w-sm rounded-2xl p-5 text-left mb-6" style={{ background: '#F7F6F4', border: '1px solid rgba(92,122,107,0.1)' }}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: '#C4BAB2' }}>Pedido</span>
            <span className="text-xs font-semibold" style={{ color: '#2E3D35' }}>{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: '#C4BAB2' }}>Total</span>
            <span className="font-display text-base font-medium" style={{ color: '#2E3D35' }}>{COP(total)}</span>
          </div>
          {shipping?.email && (
            <div className="flex justify-between">
              <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: '#C4BAB2' }}>Confirmación a</span>
              <span className="text-xs" style={{ color: '#635C55' }}>{shipping.email}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: '#C4BAB2' }}>Entrega estimada</span>
            <span className="text-xs font-medium" style={{ color: '#5C7A6B' }}>3–5 días hábiles</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm mb-8">
        {[
          { label: 'Pedido recibido', sub: 'Justo ahora',        done: true,  active: false },
          { label: 'En preparación',  sub: 'Pronto comenzamos',  done: false, active: true  },
          { label: 'Enviado',         sub: '1–2 días hábiles',   done: false, active: false },
          { label: 'Entregado',       sub: '3–5 días hábiles',   done: false, active: false },
        ].map((step, i) => (
          <div key={i} className="flex gap-4 text-left">
            <div className="flex flex-col items-center">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: step.done ? '#5C7A6B' : step.active ? '#2E3D35' : '#F2F0EC', border: `2px solid ${step.done ? '#5C7A6B' : step.active ? '#2E3D35' : 'rgba(92,122,107,0.15)'}` }}
              >
                {step.done && (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                )}
              </div>
              {i < 3 && <div className="w-px flex-1 my-1" style={{ background: 'rgba(92,122,107,0.15)', minHeight: 20 }} />}
            </div>
            <div className="pb-4">
              <p className="text-sm font-medium" style={{ color: step.done || step.active ? '#2E3D35' : '#C4BAB2' }}>{step.label}</p>
              <p className="text-[11px]" style={{ color: '#C4BAB2' }}>{step.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={() => onNavigate('orders')}
          className="flex-1 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all hover:opacity-90"
          style={{ background: '#2E3D35', color: '#fff' }}
        >
          Ver mis pedidos
        </button>
        <button
          onClick={() => onNavigate('collections')}
          className="flex-1 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all hover:bg-black/5"
          style={{ border: '1.5px solid rgba(92,122,107,0.2)', color: '#635C55' }}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  )
}

export default function Checkout({ items, onNavigate }) {
  const [step, setStep]         = useState('shipping')
  const [shippingData, setShipping] = useState(null)

  const handleShipping = (d) => { setShipping(d); setStep('payment') }
  const handlePayment  = () => setStep('confirm')

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8', fontFamily: 'Outfit, sans-serif' }}>
      <div
        className="sticky top-0 z-40 px-5 md:px-10 py-4 flex items-center justify-between"
        style={{ background: 'rgba(250,250,248,0.93)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(92,122,107,0.1)' }}
      >
        <button
          onClick={() => step === 'shipping' ? onNavigate('home') : setStep(step === 'payment' ? 'shipping' : 'payment')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-medium transition-all hover:gap-3"
          style={{ color: '#5C7A6B' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          {step === 'shipping' ? 'Volver al carrito' : step === 'payment' ? 'Editar envío' : ''}
        </button>

        <button onClick={() => onNavigate('home')}>
          <span className="font-display text-lg font-light tracking-[0.2em]" style={{ color: '#2E3D35' }}>
            Arte <span style={{ color: '#B89A6A' }}>&</span> Estilo
          </span>
        </button>

        {step !== 'confirm' && <StepBar current={step} />}
        {step === 'confirm' && <div />}
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="flex-1 min-w-0">
            {step === 'shipping' && <ShippingForm onNext={handleShipping} />}
            {step === 'payment'  && <PaymentForm  onNext={handlePayment} onBack={() => setStep('shipping')} />}
            {step === 'confirm'  && <ConfirmScreen shipping={shippingData} items={items} onNavigate={onNavigate} />}
          </div>

          {step !== 'confirm' && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <OrderSummary items={items} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
