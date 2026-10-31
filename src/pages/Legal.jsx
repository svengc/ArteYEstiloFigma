import AuthLayout from './auth/AuthLayout'

const termsArticles = [
  { num: '01', title: 'Aceptación de los términos.', body: 'Al acceder o usar el sitio web de Arte & Estilo, confirmas que tienes al menos 18 años de edad y que aceptas estos Términos de Uso en su totalidad. Si no estás de acuerdo con alguno de ellos, te pedimos que no uses nuestros servicios.' },
  { num: '02', title: 'Uso del sitio.',              body: 'Este sitio está destinado exclusivamente para uso personal y no comercial. No está permitido reproducir, duplicar, copiar, vender o explotar ninguna parte del contenido sin autorización expresa de Arte & Estilo.' },
  { num: '03', title: 'Cuenta de usuario.',          body: 'Al crear una cuenta en Arte & Estilo, eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta. Notifícanos de inmediato si sospechas de algún uso no autorizado.' },
  { num: '04', title: 'Productos y disponibilidad.', body: 'Nos esforzamos por mantener la información de nuestros productos actualizada. Sin embargo, Arte & Estilo se reserva el derecho de modificar precios, discontinuar productos o corregir errores en cualquier momento sin previo aviso.' },
  { num: '05', title: 'Precios y pagos.',            body: 'Todos los precios publicados están expresados en pesos colombianos (COP) e incluyen los impuestos aplicables. Arte & Estilo utiliza pasarelas de pago seguras. No almacenamos información de tarjetas de crédito o débito.' },
  { num: '06', title: 'Envíos y entregas.',          body: 'Los tiempos de entrega son estimados y pueden variar según la ubicación y disponibilidad del producto. Arte & Estilo no se hace responsable por retrasos causados por terceros o circunstancias fuera de nuestro control.' },
  { num: '07', title: 'Devoluciones y garantías.',   body: 'Aceptamos devoluciones dentro de los 15 días calendario siguientes a la recepción del producto, siempre que esté en perfectas condiciones y en su empaque original. Los productos personalizados no aplican para devolución.' },
  { num: '08', title: 'Propiedad intelectual.',      body: 'Todo el contenido del sitio — textos, imágenes, logotipos, diseños y código — es propiedad exclusiva de Arte & Estilo o de sus proveedores, protegido por las leyes de propiedad intelectual vigentes en Colombia.' },
  { num: '09', title: 'Limitación de responsabilidad.', body: 'Arte & Estilo no será responsable por daños indirectos o consecuentes derivados del uso del sitio o de los productos adquiridos. Nuestra responsabilidad máxima estará limitada al valor del producto en cuestión.' },
  { num: '10', title: 'Modificaciones a los términos.', body: 'Arte & Estilo se reserva el derecho de actualizar estos Términos de Uso en cualquier momento. Las modificaciones entrarán en vigor desde su publicación. El uso continuado del sitio constituye la aceptación de los nuevos términos.' },
  { num: '11', title: 'Ley aplicable.',              body: 'Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será sometida a la jurisdicción de los tribunales competentes de la ciudad de Medellín, Antioquia.' },
  { num: '12', title: 'Contacto.',                   body: 'Si tienes preguntas sobre estos Términos de Uso, puedes contactarnos a través de nuestro WhatsApp o visitarnos en nuestra tienda ubicada en El Poblado, Medellín.' },
]

const privacyArticles = [
  { num: '01', title: 'Datos que recopilamos.',       body: 'Recopilamos información que tú nos proporcionas directamente, como nombre, correo electrónico, teléfono y dirección al crear una cuenta o realizar una compra. También recopilamos datos de navegación de forma anónima para mejorar tu experiencia.' },
  { num: '02', title: 'Uso de la información.',       body: 'Utilizamos tus datos para procesar pedidos, personalizar tu experiencia, enviarte comunicaciones relevantes y mejorar nuestros servicios. Nunca vendemos tu información personal a terceros.' },
  { num: '03', title: 'Almacenamiento y seguridad.',  body: 'Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso no autorizado, pérdida o alteración. Tus datos se almacenan en servidores seguros dentro de Colombia.' },
  { num: '04', title: 'Cookies.',                     body: 'Utilizamos cookies para mejorar la funcionalidad del sitio y analizar el tráfico. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades.' },
  { num: '05', title: 'Tus derechos.',                body: 'Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contáctanos a través de nuestros canales oficiales de atención al cliente.' },
  { num: '06', title: 'Cambios a esta política.',     body: 'Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos por correo electrónico o mediante un aviso prominente en nuestro sitio web.' },
]

export default function Legal({ type, onNavigate }) {
  const isTerms = type === 'terms'
  const articles = isTerms ? termsArticles : privacyArticles

  const aside = (
    <div>
      <div className="h-px w-16 mb-6" style={{ background: 'rgba(168,196,184,0.4)' }} />
      <p className="font-display text-lg font-light leading-snug mb-4" style={{ color: '#A8C4B8' }}>
        "En Arte & Estilo creemos en la transparencia y en construir relaciones de confianza.{' '}
        <em className="text-white not-italic font-medium">Estos términos son un compromiso mutuo.</em>"
      </p>
      <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(168,196,184,0.55)' }}>
        Arte & Estilo — Medellín
      </p>
    </div>
  )

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=1200&fit=crop&auto=format"
      imageAlt="Detalle de mueble"
      aside={aside}
    >
      <button
        onClick={() => onNavigate('login')}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-medium mb-8 transition-opacity hover:opacity-60"
        style={{ color: '#5C7A6B' }}
      >
        ← Volver
      </button>

      <p className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: '#5C7A6B' }}>
        {isTerms ? 'Términos y condiciones' : 'Política de privacidad'}
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-light mb-2" style={{ color: '#2E3D35' }}>
        {isTerms
          ? <>Nada de letra pequeña, <em style={{ color: '#B89A6A' }}>solo claridad.</em></>
          : <>Tus datos, <em style={{ color: '#B89A6A' }}>tus derechos.</em></>
        }
      </h1>
      <p className="text-sm mb-4 max-w-md" style={{ color: '#635C55' }}>
        {isTerms
          ? 'Al usar nuestro sitio y realizar compras, aceptas los siguientes términos. Son claros, justos y están pensados para protegerte.'
          : 'Nos tomamos en serio la privacidad de tus datos. Aquí explicamos qué recopilamos, cómo lo usamos y tus derechos.'
        }
      </p>

      <div className="h-px max-w-md mb-5" style={{ background: 'rgba(92,122,107,0.15)' }} />

      <div
        className="flex flex-col gap-5 overflow-y-auto pr-1 max-w-md"
        style={{ maxHeight: 'calc(100vh - 340px)' }}
      >
        {articles.map(a => (
          <div key={a.num}>
            <h2 className="font-display text-base mb-1" style={{ color: '#5C7A6B' }}>
              {a.num} — <em>{a.title}</em>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#635C55' }}>{a.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 max-w-md" style={{ borderTop: '1px solid rgba(92,122,107,0.12)' }}>
        {isTerms ? (
          <button
            onClick={() => onNavigate('privacy')}
            className="text-xs underline underline-offset-2 hover:opacity-70 transition-opacity"
            style={{ color: '#B89A6A' }}
          >
            Ver Política de privacidad →
          </button>
        ) : (
          <button
            onClick={() => onNavigate('terms')}
            className="text-xs underline underline-offset-2 hover:opacity-70 transition-opacity"
            style={{ color: '#B89A6A' }}
          >
            Ver Términos de uso →
          </button>
        )}
      </div>
    </AuthLayout>
  )
}
