'use client';

import { useRef } from 'react';
import { Monitor, Cpu, Zap, Wrench } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Monitor,
    title: 'Reparación de Pantallas',
    subtitle: 'Display & Táctil',
    description:
      'Cambio de pantallas OLED, LCD y táctiles para todas las marcas. iPhone, Samsung, Motorola, Xiaomi y más. Materiales de primera calidad con garantía.',
    features: ['Pantallas OLED / AMOLED', 'Vidrio y táctil roto', 'Todas las marcas', 'Garantía en reparación'],
    color: 'green' as const,
    badge: 'MÁS SOLICITADO',
  },
  {
    icon: Cpu,
    title: 'Reparación Eléctrica',
    subtitle: 'Plaqueta & Circuitos',
    description:
      'Diagnóstico y reparación de plaquetas madre. Soldadura SMD de precisión, reballing de chips, recuperación de circuitos dañados por agua o golpe.',
    features: ['Soldadura SMD', 'Reballing de chips', 'Diagnóstico por microscopio', 'Recuperación por agua'],
    color: 'blue' as const,
    badge: 'ESPECIALIDAD',
  },
];

const statsData = [
  { numeric: 500, suffix: '+', label: 'Reparaciones' },
  { numeric: 98,  suffix: '%', label: 'Satisfacción'  },
  { numeric: 24,  suffix: 'h', label: 'Diagnóstico'   },
  { numeric: 6,   suffix: 'm', label: 'Garantía'       },
];

const toolsData = [
  { icon: Zap,    label: 'Reparación rápida'          },
  { icon: Wrench, label: 'Herramientas profesionales' },
  { icon: Cpu,    label: 'Microscopio de precisión'   },
];

export default function Services() {
  const sectionRef     = useRef<HTMLElement>(null);
  const headerRef      = useRef<HTMLDivElement>(null);
  const card0Ref       = useRef<HTMLDivElement>(null);
  const card1Ref       = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const statNumRefs    = useRef<HTMLDivElement[]>([]);
  const featureRefs    = useRef<HTMLLIElement[][]>([[], []]);
  const toolsRef       = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ─ Section header ─
    gsap.from(headerRef.current, {
      y: 55,
      autoAlpha: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
    });

    // ─ Cards from sides ─
    gsap.from(card0Ref.current, {
      x: -90,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: card0Ref.current, start: 'top 82%' },
    });
    gsap.from(card1Ref.current, {
      x: 90,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: card1Ref.current, start: 'top 82%' },
    });

    // ─ Feature list items stagger ─
    [0, 1].forEach((cardIdx) => {
      const items = featureRefs.current[cardIdx].filter(Boolean);
      gsap.from(items, {
        x: -18,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power2.out',
        scrollTrigger: { trigger: items[0], start: 'top 85%' },
      });
    });

    // ─ Stats bar entrance ─
    gsap.from(statsRef.current, {
      y: 45,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: statsRef.current, start: 'top 86%' },
    });

    // ─ Number counters (run once when stats enter viewport) ─
    statsData.forEach((stat, i) => {
      const el = statNumRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.numeric,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = Math.round(obj.val) + stat.suffix;
        },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    });

    // ─ Tools row ─
    gsap.from(toolsRef.current?.children ?? [], {
      y: 20,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: toolsRef.current, start: 'top 90%' },
    });

  }, { scope: sectionRef });

  // ── 3-D tilt on service cards (pure GSAP, no layout props) ────────────────
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const rx   = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const ry   = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    gsap.to(el, {
      rotationY: rx,
      rotationX: ry,
      transformPerspective: 900,
      duration: 0.3,
      ease: 'power1.out',
    });
  };

  const handleTiltReset = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const handleTiltEnter = (e: React.MouseEvent<HTMLDivElement>, primary: string) => {
    gsap.to(e.currentTarget, {
      y: -6,
      boxShadow: `0 0 32px ${primary}55, 0 0 65px ${primary}22, inset 0 0 32px ${primary}14`,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>, primary: string) => {
    gsap.to(e.currentTarget, {
      y: 0,
      rotationY: 0,
      rotationX: 0,
      boxShadow: `0 0 14px ${primary}22, inset 0 0 22px ${primary}12`,
      duration: 0.65,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <section ref={sectionRef} id="servicios" className="relative py-24 px-4 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(26,92,255,0.035) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="inline-block font-rajdhani text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#1A5CFF', textShadow: '0 0 8px #1A5CFF' }}
          >
            — Lo que hacemos —
          </span>
          <h2
            className="font-orbitron font-bold text-3xl sm:text-5xl mb-4"
            style={{ color: '#fff', textShadow: '0 0 30px rgba(61,255,20,0.12)' }}
          >
            NUESTROS{' '}
            <span style={{ color: '#3DFF14', textShadow: '0 0 10px #3DFF14, 0 0 30px rgba(61,255,20,0.5)' }}>
              SERVICIOS
            </span>
          </h2>
          <div className="section-line w-48 mx-auto mt-4" />
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, cardIdx) => {
            const Icon      = service.icon;
            const isGreen   = service.color === 'green';
            const primary   = isGreen ? '#3DFF14' : '#1A5CFF';
            const primaryDim = isGreen ? 'rgba(61,255,20,0.11)' : 'rgba(26,92,255,0.11)';
            const glowSm    = isGreen
              ? '0 0 6px #3DFF14, 0 0 14px rgba(61,255,20,0.5)'
              : '0 0 6px #1A5CFF, 0 0 14px rgba(26,92,255,0.5)';
            const cardRef   = cardIdx === 0 ? card0Ref : card1Ref;

            return (
              <div
                key={cardIdx}
                ref={cardRef}
                className="perspective-wrap"
              >
                <div
                  className="relative rounded-lg p-8 cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, #0d0d0d 0%, #111111 100%)',
                    border: `1px solid ${primary}42`,
                    boxShadow: `0 0 14px ${primary}22, inset 0 0 22px ${primaryDim}`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                  onMouseMove={handleTilt}
                  onMouseLeave={(e) => handleTiltLeave(e, primary)}
                  onMouseEnter={(e) => handleTiltEnter(e, primary)}
                >
                  {/* Badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-orbitron font-bold tracking-wider"
                    style={{ background: primaryDim, color: primary, border: `1px solid ${primary}55`, textShadow: glowSm }}
                  >
                    {service.badge}
                  </div>

                  {/* Corner decorators */}
                  <div
                    className="absolute top-0 left-0 w-5 h-5"
                    style={{ borderTop: `2px solid ${primary}`, borderLeft: `2px solid ${primary}`, boxShadow: `-2px -2px 8px ${primary}55` }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-5 h-5"
                    style={{ borderBottom: `2px solid ${primary}`, borderRight: `2px solid ${primary}`, boxShadow: `2px 2px 8px ${primary}55` }}
                  />

                  {/* Icon */}
                  <div
                    className="mb-6 w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{ background: primaryDim, border: `1px solid ${primary}44`, boxShadow: `0 0 20px ${primary}28` }}
                  >
                    <Icon size={32} style={{ color: primary, filter: `drop-shadow(0 0 6px ${primary})` }} />
                  </div>

                  {/* Subtitle + Title */}
                  <p
                    className="font-rajdhani text-sm font-semibold tracking-[0.22em] uppercase mb-1"
                    style={{ color: primary, textShadow: glowSm }}
                  >
                    {service.subtitle}
                  </p>
                  <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-rajdhani text-gray-400 text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li
                        key={j}
                        ref={(el) => { if (el) featureRefs.current[cardIdx][j] = el; }}
                        className="flex items-center gap-3 font-rajdhani text-sm text-gray-300"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: primary, boxShadow: `0 0 6px ${primary}` }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <a
                    href={`https://wa.me/541161514612?text=Hola!%20Necesito%20informaci%C3%B3n%20sobre%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 font-rajdhani text-sm font-semibold tracking-wider uppercase transition-all duration-300 group/cta"
                    style={{ color: primary, textShadow: glowSm }}
                  >
                    <span>Consultar ahora</span>
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1.5">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #0d0d0d, #0f0f0f)',
            border: '1px solid rgba(61,255,20,0.18)',
            boxShadow: '0 0 30px rgba(61,255,20,0.06)',
          }}
        >
          {statsData.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                ref={(el) => { if (el) statNumRefs.current[i] = el; }}
                className="font-orbitron font-black text-3xl sm:text-4xl mb-1"
                style={{ color: '#3DFF14', textShadow: '0 0 10px #3DFF14, 0 0 25px rgba(61,255,20,0.5)' }}
              >
                {stat.numeric}{stat.suffix}
              </div>
              <div className="font-rajdhani text-xs tracking-widest uppercase text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tools row */}
        <div ref={toolsRef} className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
          {toolsData.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 font-rajdhani text-sm">
              <Icon size={15} style={{ color: 'rgba(61,255,20,0.45)' }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
