import { useState } from 'react'

export function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')

  const navLinks = [
    { label: 'Inicio',          page: 'home' },
    { label: 'Colecciones',     page: 'collections' },
    { label: 'Nuestra Esencia', page: 'essence' },
    { label: 'Contacto',        page: 'contact' },
  ]

  return (
    <footer style={{ background: '#2E3D35', color: 'rgba(255,255,255,0.75)' }}>
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3d5245 0%, #2E3D35 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-md">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: '#A8C4B8' }}>
              Contacto
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-light text-white leading-tight mb-4"
              style={{ fontStyle: 'italic' }}
            >
              ¿Tienes un proyecto<br />
              <span className="not-italic font-medium">en mente?</span>
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Nuestro equipo está listo para ayudarte a encontrar la pieza perfecta o crear un espacio a tu medida.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontFamily: 'Outfit, sans-serif',
                }}
              />
              <button
                className="px-6 py-3 rounded-xl text-sm font-medium tracking-wide transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: '#5C7A6B', color: '#fff' }}
              >
                Escribirnos
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm pt-2">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="text-left hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {link.label}
              </button>
            ))}
            {['Mi perfil', 'Términos de uso'].map(t => (
              <button
                key={t}
                className="text-left hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="border-t px-5 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-wide"
        style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
      >
        <button
          onClick={() => onNavigate('home')}
          className="font-display text-base font-light tracking-[0.2em] hover:opacity-80 transition-opacity"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Arte <span style={{ color: '#B89A6A' }}>&</span> Estilo
        </button>
        <span>© 2025 Arte & Estilo. Todos los derechos reservados.</span>
        <div className="flex gap-4">
          {['Instagram', 'Pinterest', 'WhatsApp'].map(s => (
            <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
