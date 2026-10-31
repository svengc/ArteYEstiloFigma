import { useState } from 'react'
import AuthLayout from './AuthLayout'

const INPUT = {
  width: '100%',
  border: '1px solid rgba(92,122,107,0.3)',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  color: '#2E3D35',
  background: '#fff',
  outline: 'none',
  fontFamily: 'Outfit, sans-serif',
}

const steps = [
  { title: 'Ingresa tu correo', desc: 'El que usaste al crear tu cuenta en Arte & Estilo.' },
  { title: 'Revisa tu bandeja',  desc: 'Te enviaremos un enlace seguro de recuperación.' },
  { title: 'Crea tu nueva contraseña', desc: 'Elige una segura y ya podrás ingresar de nuevo.' },
]

export default function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const aside = (
    <div className="flex flex-col gap-5">
      <div className="h-px w-16 mb-2" style={{ background: 'rgba(168,196,184,0.4)' }} />
      {steps.map((s, i) => (
        <div key={s.title} className="grid grid-cols-[44px_1fr] gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium mt-0.5"
            style={{ background: 'rgba(92,122,107,0.35)', color: '#A8C4B8' }}
          >
            {i + 1}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{s.title}</p>
            <p className="text-xs mt-0.5" style={{ color: '#A8C4B8' }}>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1680503397692-cd0da21a0bec?w=800&h=1200&fit=crop&auto=format"
      imageAlt="Sala de estar"
      aside={aside}
    >
      <button
        onClick={() => onNavigate('login')}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-medium mb-10 transition-opacity hover:opacity-60"
        style={{ color: '#5C7A6B' }}
      >
        ← Volver a ingresar
      </button>

      <div className="md:hidden mb-8">
        <h2 className="font-display text-3xl font-light tracking-[0.15em]" style={{ color: '#2E3D35' }}>
          Arte <span style={{ color: '#B89A6A' }}>&</span> Estilo
        </h2>
      </div>

      {!sent ? (
        <>
          <p className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: '#5C7A6B' }}>Recuperar acceso</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-2" style={{ color: '#2E3D35' }}>
            No te preocupes, <em style={{ color: '#B89A6A' }}>te ayudamos.</em>
          </h2>
          <p className="text-sm mb-8" style={{ color: '#635C55' }}>
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña en minutos.
          </p>

          <form
            className="flex flex-col gap-4 max-w-sm"
            onSubmit={e => { e.preventDefault(); setSent(true) }}
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#635C55' }}>
                Correo electrónico
              </label>
              <input
                style={INPUT}
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <p className="text-xs" style={{ color: '#C4BAB2' }}>
                Usa el correo con el que creaste tu cuenta en Arte & Estilo.
              </p>
            </div>
            <button
              type="submit"
              className="mt-2 py-3 rounded-xl text-sm font-medium tracking-wide transition-all hover:opacity-90"
              style={{ background: '#2E3D35', color: '#fff' }}
            >
              Enviar enlace de recuperación
            </button>
          </form>
        </>
      ) : (
        <>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'rgba(92,122,107,0.1)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: '#5C7A6B' }}>Revisa tu correo</p>
          <h2 className="font-display text-4xl font-light mb-2" style={{ color: '#2E3D35' }}>
            Revisa tu bandeja, <em style={{ color: '#B89A6A' }}>de entrada.</em>
          </h2>
          <p className="text-sm mb-6" style={{ color: '#635C55' }}>
            Te enviamos un enlace de recuperación a:
          </p>
          <div
            className="px-4 py-3 rounded-xl text-sm mb-4 max-w-sm"
            style={{ background: 'rgba(92,122,107,0.08)', border: '1px solid rgba(92,122,107,0.2)', color: '#2E3D35' }}
          >
            {email}
          </div>
          <p className="text-xs mb-6" style={{ color: '#C4BAB2' }}>
            Si no lo ves en unos minutos, revisa tu carpeta de spam.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSent(false)}
              className="text-xs font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: '#5C7A6B' }}
            >
              ¿No recibiste el correo? Reenviar
            </button>
          </div>
        </>
      )}
    </AuthLayout>
  )
}
