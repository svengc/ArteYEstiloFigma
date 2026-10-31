import { useState } from 'react'
import { Eye, EyeOff, Spinner } from '../../components/icons'
import { inputStyle } from '../../utils/inputStyle'
import BackButton from '../../components/BackButton'
import SocialLoginButtons from '../../components/SocialLoginButtons'

export default function Login({ onNavigate }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); onNavigate('profile') }, 900)
  }

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Outfit, sans-serif' }}>

      {/* ── Left panel ─────────────────────────────────────────── */}
      <div className="hidden md:flex w-[42%] flex-shrink-0 relative flex-col overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=900&h=1300&fit=crop&auto=format"
          alt="Comedor Arte & Estilo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(46,61,53,0.55) 0%, rgba(46,61,53,0.82) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,61,53,0.9) 0%, transparent 50%)' }} />

        <div className="relative z-10 p-10">
          <button onClick={() => onNavigate('home')} className="group flex items-center gap-2">
            <span className="font-display text-2xl font-light tracking-[0.18em] text-white group-hover:opacity-80 transition-opacity">
              Arte <span style={{ color: '#A8C4B8' }}>&</span> Estilo
            </span>
          </button>
          <p className="text-[10px] uppercase tracking-[0.35em] mt-1" style={{ color: 'rgba(168,196,184,0.65)' }}>
            Mueblería & Artículos de Hogar
          </p>
        </div>

        <div className="relative z-10 mt-auto p-10">
          <div className="h-px w-12 mb-6" style={{ background: 'rgba(168,196,184,0.4)' }} />
          <blockquote className="font-display text-2xl font-light leading-snug mb-5" style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
            "Cada espacio cuenta<br />una historia.{' '}
            <span className="not-italic font-semibold" style={{ color: '#A8C4B8' }}>La tuya<br />empieza aquí.</span>"
          </blockquote>
          <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: 'rgba(168,196,184,0.5)' }}>
            Arte & Estilo — Medellín
          </p>
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-full" style={{ width: i === 0 ? 20 : 6, height: 6, background: i === 0 ? '#5C7A6B' : 'rgba(168,196,184,0.3)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────── */}
      <div
        className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-12 overflow-y-auto"
        style={{ background: '#FAFAF8' }}
      >
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <BackButton onClick={() => onNavigate('home')} />
          <div className="md:hidden">
            <span className="font-display text-lg font-light tracking-[0.15em]" style={{ color: '#2E3D35' }}>
              Arte <span style={{ color: '#B89A6A' }}>&</span> Estilo
            </span>
          </div>
          <button
            onClick={() => onNavigate('register')}
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: '#635C55' }}
          >
            ¿Sin cuenta?{' '}
            <span style={{ color: '#5C7A6B', textDecoration: 'underline', textUnderlineOffset: 3 }}>Regístrate</span>
          </button>
        </div>

        <div className="w-full max-w-sm mx-auto md:mx-0">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-3" style={{ color: '#5C7A6B' }}>Mi cuenta</p>
          <h1 className="font-display text-4xl md:text-5xl font-light mb-2 leading-tight" style={{ color: '#2E3D35' }}>
            Bienvenido
          </h1>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight" style={{ fontStyle: 'italic', color: '#B89A6A' }}>
            de vuelta.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#635C55' }}>
            Ingresa a tu cuenta para ver tus pedidos, favoritos y más.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>
                Correo electrónico
              </label>
              <input
                style={inputStyle(focusedField === 'email')}
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#635C55' }}>
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('forgotPassword')}
                  className="text-[11px] transition-opacity hover:opacity-70"
                  style={{ color: '#5C7A6B', textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  style={inputStyle(focusedField === 'password', { paddingRight: 44 })}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: '#C4BAB2' }}
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div
                  className="w-4 h-4 rounded border-[1.5px] peer-checked:bg-sage peer-checked:border-sage transition-all"
                  style={{ borderColor: 'rgba(92,122,107,0.35)', background: 'transparent' }}
                />
              </div>
              <span className="text-xs" style={{ color: '#635C55' }}>Recordar mi sesión</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading ? 'rgba(92,122,107,0.6)' : '#2E3D35',
                color: '#fff',
                transform: loading ? 'scale(0.99)' : 'scale(1)',
              }}
            >
              {loading
                ? <><Spinner /> Ingresando...</>
                : 'Ingresar a mi cuenta'
              }
            </button>
          </form>

          <SocialLoginButtons />

          <p className="mt-8 text-[11px] leading-relaxed text-center" style={{ color: '#C4BAB2' }}>
            Al ingresar aceptas nuestros{' '}
            <button onClick={() => onNavigate('terms')} className="hover:opacity-70 transition-opacity" style={{ color: '#B89A6A', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Términos de uso
            </button>{' '}
            y{' '}
            <button onClick={() => onNavigate('privacy')} className="hover:opacity-70 transition-opacity" style={{ color: '#B89A6A', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Política de privacidad
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
