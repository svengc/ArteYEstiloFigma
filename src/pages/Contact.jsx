import { useState } from 'react'
import { Footer } from '../components/Footer'

const INPUT_CONTACT = {
  width: '100%',
  background: 'rgba(92,122,107,0.06)',
  border: '1px solid rgba(92,122,107,0.2)',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: 14,
  color: '#2E3D35',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'Outfit, sans-serif',
}

const hours = [
  { day: 'Lunes – Viernes', time: '9:00 am – 7:00 pm' },
  { day: 'Sábados',         time: '9:00 am – 5:00 pm' },
  { day: 'Domingos',        time: '10:00 am – 3:00 pm' },
]

const faqs = [
  {
    q: '¿Hacen envíos a domicilio?',
    a: 'Sí, realizamos envíos a toda la ciudad. Los tiempos y costos de entrega varían según tu ubicación — escríbenos por WhatsApp para cotizar.',
  },
  {
    q: '¿Puedo ver los productos antes de comprar?',
    a: 'Por supuesto. Te invitamos a visitar nuestra tienda y conocer cada pieza de cerca. Nuestro equipo estará encantado de asesorarte.',
  },
  {
    q: '¿Tienen garantía los productos?',
    a: 'Todos nuestros productos incluyen garantía de 12 meses. Escríbenos si tienes algún inconveniente y lo resolvemos sin complicaciones.',
  },
  {
    q: '¿Puedo hacer pedidos personalizados?',
    a: 'Trabajamos con algunos proveedores que ofrecen personalización. Contáctanos y evaluamos tu caso con gusto.',
  },
]

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b transition-colors duration-200"
      style={{ borderColor: 'rgba(92,122,107,0.15)' }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(o => !o)}
      >
        <span
          className="font-display text-lg md:text-xl font-light pr-8 leading-snug"
          style={{ color: open ? '#5C7A6B' : '#2E3D35' }}
        >
          {faq.q}
        </span>
        <span
          className="flex-none w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 text-sm font-light"
          style={{
            background: open ? '#5C7A6B' : 'rgba(92,122,107,0.1)',
            color: open ? '#fff' : '#5C7A6B',
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
          }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? 200 : 0, opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-sm md:text-base leading-relaxed" style={{ color: '#635C55' }}>
          {faq.a}
        </p>
      </div>
    </div>
  )
}

function ContactInfo({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex-none w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
        style={{ background: 'rgba(92,122,107,0.1)', color: '#5C7A6B' }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] mb-0.5" style={{ color: '#C4BAB2' }}>{label}</p>
        <p className="text-sm font-medium" style={{ color: '#2E3D35' }}>{value}</p>
      </div>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.82h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18v-.08z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5C7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function Contact({ onNavigate }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const inputBase = INPUT_CONTACT

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-20 px-5 md:px-10"
        style={{ background: 'linear-gradient(180deg, #F2F0EC 0%, #FAFAF8 100%)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] mb-4" style={{ color: '#5C7A6B' }}>Contacto</p>
            <h1 className="font-display text-4xl md:text-6xl font-light leading-tight mb-6" style={{ color: '#2E3D35' }}>
              Hablemos de tu<br />
              <em style={{ color: '#B89A6A' }}>hogar ideal.</em>
            </h1>
            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: '#635C55' }}>
              Nuestro equipo no solo vende — acompaña, asesora y se asegura de que cada pieza llegue
              exactamente como la imaginaste. Escríbenos o visítanos en nuestra tienda.
            </p>
            <div className="flex flex-col gap-4">
              <ContactInfo icon={<PhoneIcon />} label="WhatsApp" value="+57 300 000 0000" />
              <ContactInfo icon={<MailIcon />}  label="Email"    value="hola@arteyestilo.co" />
              <ContactInfo icon={<MapIcon />}   label="Tienda"   value="Calle 80 #15-32, Bogotá D.C." />
            </div>
          </div>

          {/* Contact form */}
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{ background: '#fff', boxShadow: '0 8px 40px rgba(46,61,53,0.08)' }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(92,122,107,0.12)' }}>
                  <CheckIcon />
                </div>
                <h3 className="font-display text-2xl font-light" style={{ color: '#2E3D35' }}>¡Mensaje enviado!</h3>
                <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#635C55' }}>
                  Te contactaremos pronto. Gracias por confiar en Arte & Estilo.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs uppercase tracking-widest font-medium underline underline-offset-4"
                  style={{ color: '#5C7A6B' }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-display text-xl font-light mb-2" style={{ color: '#2E3D35' }}>Envianos un mensaje</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#635C55' }}>Nombre</label>
                    <input style={inputBase} placeholder="Tu nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#635C55' }}>Email</label>
                    <input style={inputBase} type="email" placeholder="tu@correo.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#635C55' }}>Asunto</label>
                  <input style={inputBase} placeholder="¿En qué podemos ayudarte?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#635C55' }}>Mensaje</label>
                  <textarea
                    style={{ ...inputBase, resize: 'none', height: 120 }}
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: '#2E3D35', color: '#fff' }}
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16 md:py-20 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] mb-4" style={{ color: '#5C7A6B' }}>Horarios</p>
            <h2 className="font-display text-3xl md:text-4xl font-light mb-8" style={{ color: '#2E3D35' }}>
              Estamos aquí<br /><em>para acompañarte.</em>
            </h2>
            <div className="flex flex-col gap-0">
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center py-4"
                  style={{ borderBottom: i < hours.length - 1 ? '1px solid rgba(92,122,107,0.12)' : 'none' }}
                >
                  <span className="text-sm font-medium" style={{ color: '#2E3D35' }}>{h.day}</span>
                  <span className="text-sm px-4 py-1.5 rounded-full" style={{ background: 'rgba(92,122,107,0.1)', color: '#5C7A6B' }}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden relative" style={{ height: 280, background: '#D6E8E2' }}>
            <img
              src="https://images.unsplash.com/photo-1681152968214-9dad026ad188?w=900&h=500&fit=crop&auto=format"
              alt="Vista de la tienda Arte & Estilo"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" style={{ background: 'rgba(46,61,53,0.45)' }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: '#A8C4B8' }}>Visítanos</p>
              <p className="font-display text-xl font-light text-white" style={{ fontStyle: 'italic' }}>
                Calle 80 #15-32<br />Bogotá D.C.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-5 md:px-10" style={{ background: '#F2F0EC' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.45em] mb-4" style={{ color: '#5C7A6B' }}>FAQ</p>
            <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: '#2E3D35' }}>
              Preguntas<br /><em>frecuentes.</em>
            </h2>
          </div>
          <div>
            {faqs.map(faq => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
