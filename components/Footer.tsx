import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-10 px-4 border-t" style={{ borderColor: 'rgba(61,255,20,0.15)', background: '#030303' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8" style={{ filter: 'drop-shadow(0 0 6px #3DFF14)' }}>
            <Image src="/logo.svg" alt="Monster GSM" fill className="object-contain" />
          </div>
          <span
            className="font-orbitron font-bold text-sm tracking-widest"
            style={{ color: '#3DFF14', textShadow: '0 0 8px #3DFF14' }}
          >
            MONSTER<span style={{ color: '#1A5CFF', textShadow: '0 0 8px #1A5CFF' }}>GSM</span>
          </span>
        </div>

        {/* Center */}
        <p className="font-rajdhani text-sm text-gray-600 text-center">
          © {year} Monster GSM · Colombres 1614, Lomas de Zamora · Todos los derechos reservados
        </p>

        {/* WhatsApp link */}
        <a
          href="https://wa.me/541161514612"
          target="_blank"
          rel="noopener noreferrer"
          className="font-rajdhani text-sm font-semibold tracking-wider transition-all duration-300"
          style={{ color: '#3DFF14', textShadow: '0 0 6px #3DFF14' }}
        >
          +54 11 6151-4612
        </a>
      </div>
    </footer>
  );
}
