'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// ─── Split helper ─────────────────────────────────────────────────────────────
const MONSTER = 'MONSTER'.split('');
const GSM     = ' GSM'.split('');

export default function Hero() {
  const containerRef   = useRef<HTMLElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const logoWrapRef    = useRef<HTMLDivElement>(null);
  const badgeRef       = useRef<HTMLDivElement>(null);
  const dividerRef     = useRef<HTMLDivElement>(null);
  const subtitleRef    = useRef<HTMLParagraphElement>(null);
  const descRef        = useRef<HTMLParagraphElement>(null);
  const scrollIndRef   = useRef<HTMLAnchorElement>(null);
  const waBtnRef       = useRef<HTMLAnchorElement>(null);
  const servicesBtnRef = useRef<HTMLAnchorElement>(null);

  const mCharsRef = useRef<HTMLSpanElement[]>([]);
  const gCharsRef = useRef<HTMLSpanElement[]>([]);

  // ── Canvas particles with connection lines ─────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; size: number; color: string };
    const colors  = ['#3DFF14', '#3DFF14', '#3DFF14', '#1A5CFF'];
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.45,
      vy:    (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.5 + 0.08,
      size:  Math.random() * 2.2 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(61,255,20,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle   = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── GSAP Animations ────────────────────────────────────────────────────────
  useGSAP(() => {
    const mChars = mCharsRef.current.filter(Boolean);
    const gChars = gCharsRef.current.filter(Boolean);

    // ─ Set hidden initial states ─
    gsap.set(logoWrapRef.current,    { scale: 0.15, autoAlpha: 0, rotation: -25 });
    gsap.set(badgeRef.current,       { y: -24, autoAlpha: 0 });
    gsap.set(mChars,                 { y: 70, autoAlpha: 0, rotationX: -90, transformOrigin: 'center bottom' });
    gsap.set(gChars,                 { y: 70, autoAlpha: 0, rotationX: -90, transformOrigin: 'center bottom' });
    gsap.set(dividerRef.current,     { scaleX: 0, transformOrigin: 'center' });
    gsap.set(subtitleRef.current,    { y: 24, autoAlpha: 0 });
    gsap.set(descRef.current,        { y: 24, autoAlpha: 0 });
    gsap.set(waBtnRef.current,       { y: 32, autoAlpha: 0 });
    gsap.set(servicesBtnRef.current, { y: 32, autoAlpha: 0 });
    gsap.set(scrollIndRef.current,   { autoAlpha: 0, y: 12 });

    // ─ Master entrance timeline ─
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      // Logo: dramatic slam-in
      .to(logoWrapRef.current, {
        scale: 1.12, autoAlpha: 1, rotation: 6,
        duration: 0.55, ease: 'power4.out',
      })
      .to(logoWrapRef.current, {
        scale: 1, rotation: 0,
        duration: 0.5, ease: 'elastic.out(1.2, 0.5)',
      })

      // Badge
      .to(badgeRef.current, { y: 0, autoAlpha: 1, duration: 0.45 }, '-=0.25')

      // "MONSTER" chars — flip in from bottom, perspective 3D
      .to(mChars, {
        y: 0, autoAlpha: 1, rotationX: 0,
        stagger: 0.048,
        duration: 0.55,
        ease: 'back.out(2.2)',
      }, '-=0.15')

      // " GSM" chars
      .to(gChars, {
        y: 0, autoAlpha: 1, rotationX: 0,
        stagger: 0.07,
        duration: 0.55,
        ease: 'back.out(2.2)',
      }, '-=0.28')

      // Divider line draws out from center
      .to(dividerRef.current, {
        scaleX: 1,
        duration: 0.55,
        ease: 'power2.inOut',
      }, '-=0.25')

      // Subtitle + description
      .to(subtitleRef.current, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.2')
      .to(descRef.current,     { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.35')

      // CTA buttons stagger
      .to([waBtnRef.current, servicesBtnRef.current], {
        y: 0, autoAlpha: 1,
        stagger: 0.14,
        duration: 0.55,
        ease: 'back.out(1.6)',
      }, '-=0.25')

      // Scroll indicator
      .to(scrollIndRef.current, { y: 0, autoAlpha: 1, duration: 0.4 }, '-=0.1')

      // Neon logo flicker after entrance
      .to(logoWrapRef.current, {
        filter: 'drop-shadow(0 0 35px #3DFF14) drop-shadow(0 0 70px rgba(61,255,20,0.7))',
        duration: 0.08, yoyo: true, repeat: 7, ease: 'none',
      }, '-=0.1');

    // ─ Perpetual floating (logo) ─
    gsap.to(logoWrapRef.current, {
      y: -16,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });

    // ─ Magnetic buttons ─
    const addMagnetic = (el: HTMLElement | null) => {
      if (!el) return;

      const onMove = (e: MouseEvent) => {
        const r  = el.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        gsap.to(el, {
          x: (e.clientX - cx) * 0.3,
          y: (e.clientY - cy) * 0.3,
          duration: 0.35,
          ease: 'power2.out',
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0, y: 0,
          duration: 0.65,
          ease: 'elastic.out(1, 0.4)',
        });
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
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
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(61,255,20,0.055) 0%, transparent 68%),' +
            'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(26,92,255,0.04) 0%, transparent 60%)',
        }}
      />

      {/* HUD corner brackets */}
      <div className="hud-corner-tl" style={{ top: '5rem', left: '1rem', width: 28, height: 28 }} />
      <div className="hud-corner-tr" style={{ top: '5rem', right: '1rem', width: 28, height: 28 }} />
      <div className="hud-corner-bl" style={{ bottom: '1rem', left: '1rem', width: 28, height: 28 }} />
      <div className="hud-corner-br" style={{ bottom: '1rem', right: '1rem', width: 28, height: 28 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">

        {/* Floating logo */}
        <div
          ref={logoWrapRef}
          className="mb-8"
          style={{ filter: 'drop-shadow(0 0 22px #3DFF14) drop-shadow(0 0 44px rgba(61,255,20,0.45))' }}
        >
          <div className="relative w-44 h-44 sm:w-56 sm:h-56">
            <Image
              src="/logo.svg"
              alt="Monster GSM"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Status badge */}
        <div
          ref={badgeRef}
          className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(61,255,20,0.35)', background: 'rgba(61,255,20,0.05)' }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#3DFF14', boxShadow: '0 0 8px #3DFF14' }}
          />
          <span
            className="font-rajdhani text-sm font-semibold tracking-[0.22em] uppercase"
            style={{ color: '#3DFF14' }}
          >
            Servicio Técnico Especializado
          </span>
        </div>

        {/* Main heading — split chars with GSAP */}
        <h1
          className="font-orbitron font-black text-5xl sm:text-7xl lg:text-8xl mb-2 leading-none"
          style={{ perspective: '700px' }}
        >
          {MONSTER.map((char, i) => (
            <span
              key={`m${i}`}
              ref={(el) => { if (el) mCharsRef.current[i] = el; }}
              className="anim-char"
              style={{
                color: '#3DFF14',
                textShadow: '0 0 10px #3DFF14, 0 0 28px #3DFF14, 0 0 55px rgba(61,255,20,0.5)',
              }}
            >
              {char}
            </span>
          ))}
          {GSM.map((char, i) => (
            <span
              key={`g${i}`}
              ref={(el) => { if (el) gCharsRef.current[i] = el; }}
              className="anim-char"
              style={{
                color: char === ' ' ? 'transparent' : '#1A5CFF',
                textShadow: char === ' '
                  ? 'none'
                  : '0 0 10px #1A5CFF, 0 0 28px #1A5CFF, 0 0 55px rgba(26,92,255,0.5)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Divider */}
        <div ref={dividerRef} className="w-72 section-line my-6" />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-rajdhani text-xl sm:text-2xl font-semibold text-gray-200 mb-3 tracking-wide max-w-2xl"
        >
          Especialistas en{' '}
          <span className="neon-text-green">Eléctrica de Dispositivos Móviles</span>
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="font-rajdhani text-base sm:text-lg text-gray-400 mb-12 max-w-xl leading-relaxed"
        >
          Diagnóstico, reparación de plaquetas y pantallas con tecnología de punta.
          <br className="hidden sm:block" />
          Lomas de Zamora — Colombres 1614
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            ref={waBtnRef}
            href="https://wa.me/541161514612?text=Hola%20Monster%20GSM!%20Necesito%20una%20reparaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="neon-btn-green px-9 py-4 text-sm font-bold rounded flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contactar por WhatsApp
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-colors"
        style={{ color: 'rgba(255,255,255,0.3)' }}
        aria-label="Scroll down"
      >
        <span className="font-rajdhani text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
