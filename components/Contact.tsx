'use client';

import { useRef } from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const info = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Colombres 1614',
    sub: 'Lomas de Zamora, Buenos Aires',
    action: { href: 'https://maps.google.com/?q=Colombres+1614+Lomas+de+Zamora', label: 'Ver en Google Maps' },
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '11 6151-4612',
    sub: 'Respondemos a la brevedad',
    action: { href: 'https://wa.me/541161514612', label: 'Abrir WhatsApp' },
  },
  {
    icon: Clock,
    label: 'Horarios',
    value: 'Lun a Vie: 9 a 19 hs',
    sub: 'Sábados: 9 a 14 hs',
    action: null,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@monster_gsm',
    sub: 'Seguinos para novedades',
    action: { href: 'https://www.instagram.com/monster_gsm/', label: 'Ver perfil' },
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
    gsap.from(headerRef.current, {
      y: 50, autoAlpha: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
    });
    gsap.from(ctaBlockRef.current, {
      y: 45, autoAlpha: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ctaBlockRef.current, start: 'top 85%' },
    });

    const pulseRing = (el: HTMLDivElement | null, delay: number) => {
      if (!el) return;
      gsap.fromTo(el,
        { scale: 1, autoAlpha: 0.55 },
        { scale: 2.4, autoAlpha: 0, duration: 1.8, ease: 'power2.out',
          repeat: -1, delay, repeatDelay: 0.3,
          scrollTrigger: { trigger: ctaBlockRef.current, start: 'top 85%', once: true } }
      );
    };
    pulseRing(ring1Ref.current, 0);
    pulseRing(ring2Ref.current, 0.6);
    pulseRing(ring3Ref.current, 1.2);

    gsap.from(waBtnRef.current, {
      scale: 0.88, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)',
      scrollTrigger: { trigger: waBtnRef.current, start: 'top 88%' },
    });

    const cards = cardsRef.current.filter(Boolean);
    gsap.from(cards, {
      y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: cards[0], start: 'top 88%' },
    });

    gsap.from(taglineRef.current, {
      y: 20, autoAlpha: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: taglineRef.current, start: 'top 92%' },
    });
  }, { scope: sectionRef });

  const onCardEnter = (e: React.MouseEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget, { y: -4, borderColor: 'rgba(61,255,20,0.42)', boxShadow: '0 0 22px rgba(61,255,20,0.14)', duration: 0.3, ease: 'power2.out' });
  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget, { y: 0, borderColor: 'rgba(61,255,20,0.14)', boxShadow: '0 0 12px rgba(61,255,20,0.05)', duration: 0.5, ease: 'power2.out' });

  return (
    <section ref={sectionRef} id="contacto" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(61,255,20,0.035) 0%, transparent 70%)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(61,255,20,0.25), transparent)',
      }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block font-rajdhani text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#3DFF14' }}>
            — Estamos para ayudarte —
          </span>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4 text-white">
            CONTACTO
          </h2>
          <div className="section-line w-36 mx-auto mt-4" />
        </div>

        {/* WhatsApp CTA */}
        <div ref={ctaBlockRef} className="text-center mb-16">
          <p className="font-rajdhani text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
            ¿Tu celular no enciende, tiene la pantalla rota o se mojó?<br/>
            <span className="text-white font-semibold">Escribinos — el diagnóstico es sin costo.</span>
          </p>

          <div className="relative inline-block">
            <div ref={ring1Ref} className="signal-ring" style={{ borderRadius: '0.5rem', border: '2px solid #3DFF14' }} />
            <div ref={ring2Ref} className="signal-ring" style={{ borderRadius: '0.5rem', border: '1.5px solid #3DFF14' }} />
            <div ref={ring3Ref} className="signal-ring" style={{ borderRadius: '0.5rem', border: '1px solid #3DFF14' }} />
            <a
              ref={waBtnRef}
              href="https://wa.me/541161514612?text=Hola%20Monster%20GSM!%20Necesito%20ayuda%20con%20mi%20dispositivo."
              target="_blank" rel="noopener noreferrer"
              className="relative inline-flex items-center gap-4 px-10 py-5 rounded-lg font-orbitron font-bold text-base text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(61,255,20,0.12), rgba(61,255,20,0.04))',
                border: '2px solid #3DFF14',
                boxShadow: '0 0 25px rgba(61,255,20,0.3), 0 0 50px rgba(61,255,20,0.12), inset 0 0 25px rgba(61,255,20,0.05)',
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, {
                scale: 1.04,
                boxShadow: '0 0 45px rgba(61,255,20,0.5), 0 0 90px rgba(61,255,20,0.2), inset 0 0 40px rgba(61,255,20,0.08)',
                duration: 0.3, ease: 'power2.out',
              })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: '0 0 25px rgba(61,255,20,0.3), 0 0 50px rgba(61,255,20,0.12), inset 0 0 25px rgba(61,255,20,0.05)',
                duration: 0.5, ease: 'elastic.out(1, 0.5)',
              })}
            >
              <MessageCircle size={26} style={{ color: '#3DFF14', flexShrink: 0 }} />
              <span>ESCRIBIR POR WHATSAPP</span>
            </a>
          </div>
          <p className="mt-5 font-rajdhani text-sm text-gray-500 tracking-wider">
            +54 11 6151-4612
          </p>
        </div>

        {/* Info cards: 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {info.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="relative p-5 rounded-lg"
                style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(61,255,20,0.14)',
                  boxShadow: '0 0 12px rgba(61,255,20,0.05)',
                  willChange: 'transform',
                }}
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
              >
                <div className="absolute top-0 left-0 w-4 h-4"
                  style={{ borderTop: '2px solid #3DFF14', borderLeft: '2px solid #3DFF14' }} />

                <div className="w-9 h-9 rounded flex items-center justify-center mb-3"
                  style={{ background: 'rgba(61,255,20,0.07)', border: '1px solid rgba(61,255,20,0.25)' }}>
                  <Icon size={18} style={{ color: '#3DFF14', filter: 'drop-shadow(0 0 4px #3DFF14)' }} />
                </div>

                <p className="font-rajdhani text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">
                  {item.label}
                </p>
                <p className="font-rajdhani font-semibold text-white text-sm leading-snug">
                  {item.value}
                </p>
                <p className="font-rajdhani text-gray-500 text-xs mt-0.5">{item.sub}</p>

                {item.action && (
                  <a href={item.action.href} target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 font-rajdhani text-xs font-semibold tracking-wider uppercase"
                    style={{ color: '#3DFF14' }}>
                    {item.action.label}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="mt-14 text-center">
          <p className="font-orbitron text-xs text-gray-600 tracking-[0.3em] uppercase">
            Monster GSM — Powered by{' '}
            <span style={{ color: '#3DFF14' }}>Precisión</span>
            {' '}&{' '}
            <span style={{ color: '#1A5CFF' }}>Tecnología</span>
          </p>
        </div>
      </div>
    </section>
  );
}
