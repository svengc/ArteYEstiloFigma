import { GoogleIcon, FacebookIcon } from './icons'

export default function SocialLoginButtons({ label = 'o continúa con' }) {
  return (
    <>
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px" style={{ background: 'rgba(92,122,107,0.12)' }} />
        <span className="text-[11px]" style={{ color: '#C4BAB2' }}>{label}</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(92,122,107,0.12)' }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Google',   Icon: GoogleIcon },
          { label: 'Facebook', Icon: FacebookIcon },
        ].map(({ label: name, Icon }) => (
          <button
            key={name}
            type="button"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium transition-all hover:opacity-80"
            style={{ border: '1.5px solid rgba(92,122,107,0.2)', color: '#2E3D35', background: '#fff' }}
          >
            <Icon />
            {name}
          </button>
        ))}
      </div>
    </>
  )
}
