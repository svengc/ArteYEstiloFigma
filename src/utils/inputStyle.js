export function inputStyle(focused, options = {}) {
  const { error = false, paddingRight = 16 } = options
  return {
    width: '100%',
    background: focused ? '#fff' : '#F7F6F4',
    border: `1.5px solid ${error ? '#E07070' : focused ? '#5C7A6B' : 'rgba(92,122,107,0.2)'}`,
    borderRadius: 12,
    padding: `13px ${paddingRight}px 13px 16px`,
    fontSize: 14,
    color: '#2E3D35',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'Outfit, sans-serif',
  }
}

export const INPUT_STATIC = {
  width: '100%',
  border: '1px solid rgba(92,122,107,0.25)',
  borderRadius: 10,
  padding: '10px 14px',
  fontSize: 14,
  color: '#2E3D35',
  background: '#FAFAF8',
  outline: 'none',
  fontFamily: 'Outfit, sans-serif',
}
