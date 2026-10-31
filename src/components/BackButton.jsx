import { ArrowLeft } from './icons'

export default function BackButton({ onClick, label = 'Volver' }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-medium transition-all hover:gap-3"
      style={{ color: '#5C7A6B' }}
    >
      <ArrowLeft size={14} />
      {label}
    </button>
  )
}
