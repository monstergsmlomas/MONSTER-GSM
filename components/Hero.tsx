'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Wrench, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const MONSTER = 'MONSTER'.split('');
const GSM     = ' GSM'.split('');

const brands = ['iPhone', 'Samsung', 'Motorola', 'Xiaomi', 'LG', 'Huawei', 'OnePlus', 'Nokia'];

const pillars = [
  { icon: Wrench, text: 'Reparación Plaqueta' },
  { icon: Shield, text: 'Garantía en cada trabajo' },
  { icon: Zap,    text: 'Diagnóstico sin costo' },
];

export default function Hero() {
  const containerRef   = useRef<HTMLElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const logoWrapRef    = useRef<HTMLDivElement>(null);
  const badgeRef       = useRef<HTMLDivElement>(null);
  const headingRef     = useRef<HTMLHeadingElement>(null);
  const dividerRef     = useRef<HTMLDivElement>(null);
  const taglineRef     = useRef<HTMLParagraphElement>(null);
  const pillarsRef     = useRef<HTMLDivElement>(null);
  const brandsRef      = useRef<HTMLDivElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);
  const scrollIndRef   = useRef<HTMLAnchorElement>(null);
  const waBtnRef       = useRef<HTMLAnchorElement>(null);
  const servicesBtnRef = useRef<HTMLAnchorElement>(null);

  const mCharsRef = useRef<HTMLSpanElement[]>([]);
  const gCharsRef = useRef<HTMLSpanElement[]>([]);

  // Canvas: particles + connection lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();

    type P = { x: number; y: number; vx: number; vy: number; alpha: number; size: number; color: string };
    const colors = ['#3DFF14', '#3DFF14', '#3DFF14', '#1A5CFF'];
    const pts: P[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.45 + 0.07,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(61,255,20,${0.06 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // GSAP entrance + magnetic
  useGSAP(() => {
    const mChars = mCharsRef.current.filter(Boolean);
    const gChars = gCharsRef.current.filter(Boolean);

    gsap.set(logoWrapRef.current,  { scale: 0.1, autoAlpha: 0, rotation: -20 });
    gsap.set(badgeRef.current,     { y: -20, autoAlpha: 0 });
    gsap.set(mChars,               { y: 65, autoAlpha: 0, rotationX: -90, transformOrigin: 'center bottom' });
    gsap.set(gChars,               { y: 65, autoAlpha: 0, rotationX: -90, transformOrigin: 'center bottom' });
    gsap.set(dividerRef.current,   { scaleX: 0, transformOrigin: 'center' });
    gsap.set(taglineRef.current,   { y: 22, autoAlpha: 0 });
    gsap.set(pillarsRef.current,   { y: 22, autoAlpha: 0 });
    gsap.set(brandsRef.current,    { y: 18, autoAlpha: 0 });
    gsap.set(ctaRef.current,       { y: 28, autoAlpha: 0 });
    gsap.set(scrollIndRef.current, { autoAlpha: 0, y: 10 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .to(logoWrapRef.current, { scale: 1.1, autoAlpha: 1, rotation: 4, duration: 0.5, ease: 'power4.out' })
      .to(logoWrapRef.current, { scale: 1, rotation: 0, duration: 0.55, ease: 'elastic.out(1.2, 0.5)' })
      .to(badgeRef.current, { y: 0, autoAlpha: 1, duration: 0.4 }, '-=0.2')
      .to(mChars, { y: 0, autoAlpha: 1, rotationX: 0, stagger: 0.045, duration: 0.5, ease: 'back.out(2)' }, '-=0.1')
      .to(gChars, { y: 0, autoAlpha: 1, rotationX: 0, stagger: 0.065, duration: 0.5, ease: 'back.out(2)' }, '-=0.25')
      .to(dividerRef.current,   { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
      .to(taglineRef.current,   { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.15')
      .to(pillarsRef.current,   { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
      .to(brandsRef.current,    { y: 0, autoAlpha: 1, duration: 0.45 }, '-=0.2')
      .to(ctaRef.current,       { y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.15')
      .to(scrollIndRef.current, { y: 0, autoAlpha: 1, duration: 0.4 }, '-=0.05');

    // Floating logo
    gsap.to(logoWrapRef.current, { y: -14, duration: 3, ease: 'power1.inOut', yoyo: true, repeat: -1, delay: 1.2 });

    // Magnetic buttons
    const addMagnetic = (el: HTMLElement | null) => {
      if (!el) return;
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' });
      });
    };
    addMagnetic(waBtnRef.current);
    addMagnetic(servicesBtnRef.current);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background:
          'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(61,255,20,0.05) 0%, transparent 68%),' +
          'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(26,92,255,0.035) 0%, transparent 60%)',
      }} />

      {/* HUD corners */}
      <div className="hud-corner-tl" style={{ top: '5rem', left: '1rem' }} />
      <div className="hud-corner-tr" style={{ top: '5rem', right: '1rem' }} />
      <div className="hud-corner-bl" style={{ bottom: '1rem', left: '1rem' }} />
      <div className="hud-corner-br" style={{ bottom: '1rem', right: '1rem' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">

        {/* Logo */}
        <div
          ref={logoWrapRef}
          className="mb-7"
          style={{ filter: 'drop-shadow(0 0 18px #3DFF14) drop-shadow(0 0 36px rgba(61,255,20,0.4))' }}
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44">
            <Image src="/logo.svg" alt="Monster GSM" fill priority className="object-contain" />
          </div>
        </div>

        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(61,255,20,0.35)', background: 'rgba(61,255,20,0.06)' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3DFF14', boxShadow: '0 0 8px #3DFF14' }} />
          <span className="font-rajdhani text-xs font-bold tracking-[0.22em] uppercase" style={{ color: '#3DFF14' }}>
            Servicio Técnico · Lomas de Zamora
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-orbitron font-black text-5xl sm:text-7xl lg:text-8xl mb-2 leading-none"
          style={{ perspective: '700px' }}
        >
          {MONSTER.map((c, i) => (
            <span
              key={`m${i}`}
              ref={(el) => { if (el) mCharsRef.current[i] = el; }}
              className="anim-char"
              style={{ color: '#3DFF14' }}
            >{c}</span>
          ))}
          {GSM.map((c, i) => (
            <span
              key={`g${i}`}
              ref={(el) => { if (el) gCharsRef.current[i] = el; }}
              className="anim-char"
              style={{
                color: c === ' ' ? 'transparent' : '#1A5CFF',
                textShadow: 'none',
              }}
            >{c === ' ' ? '\u00A0' : c}</span>
          ))}
        </h1>

        {/* Divider */}
        <div ref={dividerRef} className="w-72 section-line my-5" />

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-rajdhani text-xl sm:text-2xl font-bold text-white mb-6 tracking-wide max-w-2xl"
        >
          Reparamos tu celular —{' '}
          <span style={{ color: '#3DFF14' }}>iPhone</span>
          {' '}&amp;{' '}
          <span style={{ color: '#1A5CFF' }}>Android</span>
        </p>

        {/* 3 pillars */}
        <div ref={pillarsRef} className="flex flex-wrap justify-center gap-4 mb-6">
          {pillars.map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-rajdhani text-sm font-semibold text-gray-300"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Icon size={14} style={{ color: '#3DFF14', flexShrink: 0 }} />
              {text}
            </div>
          ))}
        </div>

        {/* Brand strip */}
        <div ref={brandsRef} className="mb-10 flex flex-wrap justify-center gap-x-5 gap-y-1">
          {brands.map((b, i) => (
            <span key={i} className="font-rajdhani text-sm font-semibold tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {b}{i < brands.length - 1 && <span className="ml-5 text-xs" style={{ color: 'rgba(61,255,20,0.25)' }}>·</span>}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            ref={waBtnRef}
            href="https://wa.me/541161514612?text=Hola%20Monster%20GSM!%20Necesito%20una%20reparaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="neon-btn-green px-9 py-4 text-sm font-bold rounded flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Consultá tu reparación
          </a>
          <a
            ref={servicesBtnRef}
            href="#servicios"
            className="neon-btn-blue px-9 py-4 text-sm font-bold rounded flex items-center justify-center gap-2"
          >
            Ver Servicios
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        ref={scrollIndRef}
        href="#servicios"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        style={{ color: 'rgba(255,255,255,0.25)' }}
        aria-label="Scroll down"
      >
        <span className="font-rajdhani text-xs tracking-widest uppercase">Ver más</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
