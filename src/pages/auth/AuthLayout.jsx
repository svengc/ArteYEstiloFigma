export default function AuthLayout({ image, imageAlt, aside, children }) {
  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Left panel */}
      <aside className="hidden md:flex w-2/5 flex-shrink-0 relative flex-col">
        <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(46,61,53,0.78)' }} />
        <div className="relative z-10 flex flex-col h-full px-10 py-10 gap-4">
          <div>
            <h1 className="font-display text-4xl text-white tracking-[0.15em] font-light">
              Arte <span style={{ color: '#A8C4B8' }}>&</span> Estilo
            </h1>
            <p className="text-xs uppercase tracking-[0.35em] mt-1" style={{ color: '#A8C4B8' }}>
              Mueblería & Artículos de Hogar
            </p>
          </div>
          <div className="mt-auto">{aside}</div>
        </div>
      </aside>

      {/* Right panel */}
      <section className="flex-1 flex flex-col justify-center px-8 md:px-14 py-12 overflow-y-auto"
        style={{ background: '#FAFAF8' }}>
        {children}
      </section>
    </div>
  )
}
