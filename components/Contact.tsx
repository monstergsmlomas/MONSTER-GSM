'use client';

import { useRef } from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const info = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Colombres 1614, Lomas de Zamora',
    sub: 'Buenos Aires, Argentina',
    action: { href: 'https://maps.google.com/?q=Colombres+1614+Lomas+de+Zamora', label: 'Ver en mapa' },
  },
  {
    icon: Phone,
    label: 'Teléfono / WhatsApp',
    value: '11 6151-4612',
    sub: 'Llamadas y mensajes',
    action: { href: 'https://wa.me/541161514612', label: 'Abrir WhatsApp' },
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun – Sáb',
    sub: 'Consultá disponibilidad',
    action: null,
  },
];

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const ctaBlockRef = useRef<HTMLDivElement>(null);
  const waBtnRef    = useRef<HTMLAnchorElement>(null);
  const ring1Ref    = useRef<HTMLDivElement>(null);
  const ring2Ref    = useRef<HTMLDivElement>(null);
  const ring3Ref    = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement[]>([]);
  const taglineRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ─ Section header ─
    gsap.from(headerRef.current, {
      y: 50,
      autoAlpha: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
    });

    // ─ CTA block ─
    gsap.from(ctaBlockRef.current, {
      y: 45,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: ctaBlockRef.current, start: 'top 85%' },
    });

    // ─ Pulse rings: fromTo so they reset properly on repeat ─
    const pulseRing = (el: HTMLDivElement | null, delay: number) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { scale: 1, autoAlpha: 0.55 },
        {
          scale: 2.4,
          autoAlpha: 0,
          duration: 1.8,
          ease: 'power2.out',
          repeat: -1,
          delay,
          repeatDelay: 0.3,
          scrollTrigger: { trigger: ctaBlockRef.current, start: 'top 85%', once: true },
        }
      );
    };

    pulseRing(ring1Ref.current, 0);
    pulseRing(ring2Ref.current, 0.6);
    pulseRing(ring3Ref.current, 1.2);

    // ─ WA button micro-bounce on scroll enter ─
    gsap.from(waBtnRef.current, {
      scale: 0.88,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: waBtnRef.current, start: 'top 88%' },
    });

    // ─ Info cards stagger from below ─
    const cards = cardsRef.current.filter(Boolean);
    gsap.from(cards, {
      y: 40,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: cards[0], start: 'top 88%' },
    });

    // ─ Tagline ─
    gsap.from(taglineRef.current, {
      y: 20,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: taglineRef.current, start: 'top 92%' },
    });

  }, { scope: sectionRef });

  // ─ Card hover glow ─
  const onCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -4,
      borderColor: 'rgba(61,255,20,0.42)',
      boxShadow: '0 0 22px rgba(61,255,20,0.14)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      borderColor: 'rgba(61,255,20,0.14)',
      boxShadow: '0 0 12px rgba(61,255,20,0.05)',
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} id="contacto" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(61,255,20,0.035) 0%, transparent 70%)' }}
      />

      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(61,255,20,0.28), transparent)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="inline-block font-rajdhani text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#3DFF14', textShadow: '0 0 8px #3DFF14' }}
          >
            — Estamos para ayudarte —
          </span>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4 text-white">
            CONTACTO
          </h2>
          <div className="section-line w-36 mx-auto mt-4" />
        </div>

        {/* Main WhatsApp CTA */}
        <div ref={ctaBlockRef} className="text-center mb-16">
          <p className="font-rajdhani text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            ¿Tu dispositivo tiene problemas? Escribinos por WhatsApp y te respondemos
            a la brevedad con diagnóstico sin costo.
          </p>

          {/* Button wrapper for pulse rings */}
          <div className="relative inline-block">
            {/* Pulse rings */}
            <div
              ref={ring1Ref}
              className="signal-ring"
              style={{ borderRadius: '0.5rem', border: '2px solid #3DFF14' }}
            />
            <div
              ref={ring2Ref}
              className="signal-ring"
              style={{ borderRadius: '0.5rem', border: '1.5px solid #3DFF14' }}
            />
            <div
              ref={ring3Ref}
              className="signal-ring"
              style={{ borderRadius: '0.5rem', border: '1px solid #3DFF14' }}
            />

            <a
              ref={waBtnRef}
              href="https://wa.me/541161514612?text=Hola%20Monster%20GSM!%20Necesito%20ayuda%20con%20mi%20dispositivo."
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-4 px-10 py-5 rounded-lg font-orbitron font-bold text-base"
              style={{
                background: 'linear-gradient(135deg, rgba(61,255,20,0.1), rgba(61,255,20,0.04))',
                border: '2px solid #3DFF14',
                color: '#3DFF14',
                textShadow: '0 0 10px #3DFF14',
                boxShadow: '0 0 25px rgba(61,255,20,0.3), 0 0 50px rgba(61,255,20,0.15), inset 0 0 25px rgba(61,255,20,0.05)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.04,
                  boxShadow: '0 0 45px rgba(61,255,20,0.5), 0 0 90px rgba(61,255,20,0.25), inset 0 0 40px rgba(61,255,20,0.1)',
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  boxShadow: '0 0 25px rgba(61,255,20,0.3), 0 0 50px rgba(61,255,20,0.15), inset 0 0 25px rgba(61,255,20,0.05)',
                  duration: 0.5,
                  ease: 'elastic.out(1, 0.5)',
                });
              }}
            >
              <MessageCircle size={26} />
              <span>ESCRIBIR POR WHATSAPP</span>
            </a>
          </div>

          <p className="mt-5 font-rajdhani text-sm text-gray-600 tracking-wider">
            +54 11 6151-4612
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {info.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="relative p-6 rounded-lg"
                style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(61,255,20,0.14)',
                  boxShadow: '0 0 12px rgba(61,255,20,0.05)',
                  willChange: 'transform',
                }}
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
              >
                {/* Top-left corner */}
                <div
                  className="absolute top-0 left-0 w-4 h-4"
                  style={{ borderTop: '2px solid #3DFF14', borderLeft: '2px solid #3DFF14' }}
                />

                <div
                  className="w-10 h-10 rounded flex items-center justify-center mb-4"
                  style={{ background: 'rgba(61,255,20,0.07)', border: '1px solid rgba(61,255,20,0.28)' }}
                >
                  <Icon size={20} style={{ color: '#3DFF14', filter: 'drop-shadow(0 0 4px #3DFF14)' }} />
                </div>

                <p className="font-rajdhani text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-1">
                  {item.label}
                </p>
                <p className="font-rajdhani font-semibold text-white text-base">
                  {item.value}
                </p>
                <p className="font-rajdhani text-gray-500 text-sm mt-0.5">
                  {item.sub}
                </p>

                {item.action && (
                  <a
                    href={item.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-rajdhani text-xs font-semibold tracking-wider uppercase transition-colors"
                    style={{ color: '#3DFF14', textShadow: '0 0 6px #3DFF14' }}
                  >
                    {item.action.label}
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div ref={taglineRef} className="mt-16 text-center">
          <p className="font-orbitron text-sm text-gray-600 tracking-[0.3em] uppercase">
            Monster GSM — Powered by{' '}
            <span style={{ color: '#3DFF14', textShadow: '0 0 6px #3DFF14' }}>Precisión</span>
            {' '}&{' '}
            <span style={{ color: '#1A5CFF', textShadow: '0 0 6px #1A5CFF' }}>Tecnología</span>
          </p>
        </div>
      </div>
    </section>
  );
}
