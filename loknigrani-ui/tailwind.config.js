export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['Inter', 'sans-serif'] },
    colors: { navy: '#0B1730', card: '#111F3D', primary: '#2563EB', ok: '#22C55E', warn: '#F59E0B', risk: '#EF4444', verify: '#A855F7' },
    boxShadow: { glow: '0 0 24px rgba(37,99,235,0.15)' }
  } },
  plugins: []
}
