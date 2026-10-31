import { useState } from 'react'
import { Eye, EyeOff, Spinner } from '../../components/icons'
import { inputStyle } from '../../utils/inputStyle'
import BackButton from '../../components/BackButton'
import SocialLoginButtons from '../../components/SocialLoginButtons'

const FIELDS = [
  { id: 'nombre',   label: 'Nombre',               type: 'text',     placeholder: 'Valentina' },
  { id: 'apellido', label: 'Apellido',              type: 'text',     placeholder: 'Pérez' },
  { id: 'email',    label: 'Correo electrónico',    type: 'email',    placeholder: 'tu@email.com', fullWidth: true },
  { id: 'password', label: 'Contraseña',            type: 'password', placeholder: '••••••••' },
  { id: 'confirm',  label: 'Confirmar contraseña',  type: 'password', placeholder: '••••••••' },
  { id: 'ciudad',   label: 'Ciudad',                type: 'text',     placeholder: 'Medellín' },
  { id: 'telefono', label: 'Teléfono',              type: 'tel',      placeholder: '+57 300 000 0000', optional: true },
]

function passwordStrength(pw) {
  if (!pw) return { level: 0, label: '', color: '' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 1) return { level: 1, label: 'Débil',   color: '#E07070' }
  if (score === 2) return { level: 2, label: 'Regular', color: '#B89A6A' }
  if (score === 3) return { level: 3, label: 'Buena',   color: '#5C7A6B' }
  return { level: 4, label: 'Fuerte', color: '#2E3D35' }
}

export default function Register({ onNavigate }) {
  const [values, setValues]   = useState({})
  const [showPass, setShowPass] = useState({})
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed]   = useState(false)

  const pw       = values.password ?? ''
  const strength = passwordStrength(pw)
  const pwMatch  = !values.confirm || values.password === values.confirm

  const set         = (id, val) => setValues(v => ({ ...v, [id]: val }))
  const toggleShow  = (id) => setShowPass(v => ({ ...v, [id]: !v[id] }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!pwMatch || !agreed) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onNavigate('profile') }, 1000)
  }

  const benefits = [
    { num: '01', title: 'Acceso a preventas exclusivas', desc: 'Sé el primero en conocer nuevas colecciones y descuentos de temporada.' },
    { num: '02', title: 'Seguimiento en tiempo real',    desc: 'Consulta el estado de tus pedidos desde cualquier dispositivo.' },
    { num: '03', title: 'Lista de favoritos',            desc: 'Guarda las piezas que más te gustan y compártelas fácilmente.' },
  ]

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Outfit, sans-serif' }}>

      {/* ── Left panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[40%] flex-shrink-0 relative flex-col overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=1400&fit=crop&auto=format"
          alt="Sala Arte & Estilo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(170deg, rgba(46,61,53,0.6) 0%, rgba(46,61,53,0.88) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(46,61,53,0.2) 40%, rgba(46,61,53,0.9) 100%)' }} />

        <div className="relative z-10 p-10">
          <button onClick={() => onNavigate('home')}>
            <span className="font-display text-2xl font-light tracking-[0.18em] text-white hover:opacity-80 transition-opacity">
              Arte <span style={{ color: '#A8C4B8' }}>&</span> Estilo
            </span>
          </button>
          <p className="text-[10px] uppercase tracking-[0.35em] mt-1" style={{ color: 'rgba(168,196,184,0.6)' }}>
            Mueblería & Artículos de Hogar
          </p>
        </div>

        <div className="relative z-10 mt-auto p-10">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-6" style={{ color: '#A8C4B8' }}>
            Beneficios de tu cuenta
          </p>
          <div className="flex flex-col gap-6">
            {benefits.map(b => (
              <div key={b.num} className="flex gap-4">
                <span className="font-display text-xs font-light flex-shrink-0 mt-0.5" style={{ color: 'rgba(168,196,184,0.5)' }}>
                  {b.num}
                </span>
                <div>
                  <p className="text-sm font-medium text-white leading-tight mb-1">{b.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-full" style={{ width: 6, height: 6, background: i === 1 ? '#5C7A6B' : 'rgba(168,196,184,0.3)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-16 py-10" style={{ background: '#FAFAF8' }}>

        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto lg:mx-0">
          <BackButton onClick={() => onNavigate('home')} />
          <div className="lg:hidden">
            <span className="font-display text-lg font-light tracking-[0.15em]" style={{ color: '#2E3D35' }}>
              Arte <span style={{ color: '#B89A6A' }}>&</span> Estilo
            </span>
          </div>
          <button
            onClick={() => onNavigate('login')}
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: '#635C55' }}
          >
            ¿Ya tienes cuenta?{' '}
            <span style={{ color: '#5C7A6B', textDecoration: 'underline', textUnderlineOffset: 3 }}>Ingresa</span>
          </button>
        </div>

        <div className="max-w-xl mx-auto lg:mx-0 mb-8">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-3" style={{ color: '#5C7A6B' }}>Nueva cuenta</p>
          <h1 className="font-display text-4xl md:text-5xl font-light leading-tight mb-2" style={{ color: '#2E3D35' }}>
            Crea tu
          </h1>
          <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-5" style={{ fontStyle: 'italic', color: '#B89A6A' }}>
            espacio propio.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#635C55' }}>
            Únete a más de 3.400 hogares que confían en Arte & Estilo para crear espacios con alma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto lg:mx-0">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {FIELDS.map(f => (
              <div
                key={f.id}
                className={`flex flex-col gap-1.5 ${f.fullWidth ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}
              >
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>
                    {f.label}
                    {f.optional && <span style={{ color: '#C4BAB2' }}> (opcional)</span>}
                  </label>
                  {f.id === 'confirm' && values.confirm && (
                    <span className="text-[10px]" style={{ color: pwMatch ? '#5C7A6B' : '#E07070' }}>
                      {pwMatch ? '✓ Coinciden' : '✗ No coinciden'}
                    </span>
                  )}
                  {f.id === 'password' && pw && (
                    <span className="text-[10px] font-medium" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    style={inputStyle(focused === f.id, {
                      error: !pwMatch && f.id === 'confirm',
                      paddingRight: (f.id === 'password' || f.id === 'confirm') ? 44 : 16,
                    })}
                    type={f.type === 'password' ? (showPass[f.id] ? 'text' : 'password') : f.type}
                    placeholder={f.placeholder}
                    value={values[f.id] ?? ''}
                    onChange={e => set(f.id, e.target.value)}
                    onFocus={() => setFocused(f.id)}
                    onBlur={() => setFocused(null)}
                    required={!f.optional}
                    autoComplete={
                      f.id === 'email' ? 'email'
                      : f.id === 'password' ? 'new-password'
                      : 'off'
                    }
                  />
                  {f.type === 'password' && (
                    <button
                      type="button"
                      onClick={() => toggleShow(f.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                      style={{ color: '#C4BAB2' }}
                      tabIndex={-1}
                    >
                      {showPass[f.id] ? <EyeOff /> : <Eye />}
                    </button>
                  )}
                </div>

                {f.id === 'password' && pw && (
                  <div className="flex gap-1 mt-0.5">
                    {[1, 2, 3, 4].map(n => (
                      <div
                        key={n}
                        className="flex-1 rounded-full transition-all duration-300"
                        style={{ height: 3, background: n <= strength.level ? strength.color : 'rgba(92,122,107,0.12)' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <label className="flex items-start gap-3 mt-5 cursor-pointer select-none">
            <div
              className="flex-shrink-0 w-4 h-4 rounded mt-0.5 border-[1.5px] flex items-center justify-center transition-all"
              style={{
                borderColor: agreed ? '#5C7A6B' : 'rgba(92,122,107,0.3)',
                background: agreed ? '#5C7A6B' : 'transparent',
              }}
              onClick={() => setAgreed(a => !a)}
            >
              {agreed && (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2 6 5 9 10 3" />
                </svg>
              )}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#635C55' }}>
              Acepto los{' '}
              <button type="button" onClick={() => onNavigate('terms')} className="hover:opacity-70" style={{ color: '#B89A6A', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                Términos de uso
              </button>{' '}
              y la{' '}
              <button type="button" onClick={() => onNavigate('privacy')} className="hover:opacity-70" style={{ color: '#B89A6A', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                Política de privacidad
              </button>{' '}
              de Arte & Estilo
            </p>
          </label>

          <button
            type="submit"
            disabled={loading || !agreed || !pwMatch}
            className="w-full mt-5 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: !agreed || !pwMatch || loading ? 'rgba(92,122,107,0.45)' : '#2E3D35',
              color: '#fff',
              cursor: !agreed || !pwMatch ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? <><Spinner /> Creando tu cuenta...</> : 'Crear mi cuenta'}
          </button>

          <div className="mb-10">
            <SocialLoginButtons label="o regístrate con" />
          </div>
        </form>
      </div>
    </div>
  )
}
