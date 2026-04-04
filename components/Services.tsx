'use client';

import { useRef } from 'react';
import { Monitor, Cpu, Zap, Wrench, Droplets, Battery, Wifi, Mic } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    icon: Monitor,
    title: 'Reparación de Pantallas',
    subtitle: 'Display & Táctil',
    description:
      'Cambio de pantallas OLED y LCD para iPhone, Samsung, Motorola, Xiaomi y más. Vidrio roto, táctil sin respuesta o imagen dañada — lo solucionamos.',
    features: [
      'iPhone 7 hasta iPhone 15 Pro Max',
      'Samsung Galaxy — todas las series',
      'Motorola, Xiaomi, LG, Huawei',
      'Pantallas OLED / AMOLED originales',
    ],
    color: 'green' as const,
    badge: 'MÁS SOLICITADO',
  },
  {
    icon: Cpu,
    title: 'Reparación Eléctrica',
    subtitle: 'Plaqueta & Microelectrónica',
    description:
      'Diagnóstico y reparación de plaqueta madre con soldadura SMD de precisión bajo microscopio. Recuperamos equipos dañados por agua, golpe o cortocircuito.',
    features: [
      'Soldadura SMD y reballing de chips',
      'Diagnóstico por microscopio digital',
      'Recuperación por daño de agua',
      'iPhone y Android — todas las marcas',
    ],
    color: 'blue' as const,
    badge: 'ESPECIALIDAD',
  },
];

const extraServices = [
  { icon: Battery,  label: 'Cambio de Batería',     desc: 'Batería original o premium con garantía' },
  { icon: Mic,      label: 'Micrófono / Parlante',  desc: 'Audio sin señal o voz distorsionada' },
  { icon: Wifi,     label: 'Antena & Señal',         desc: 'Sin wifi, Bluetooth o señal celular' },
  { icon: Droplets, label: 'Daño por Agua',          desc: 'Limpieza y recuperación de plaqueta' },
  { icon: Wrench,   label: 'Conector de Carga',      desc: 'No carga o carga intermitente' },
  { icon: Zap,      label: 'Cortocircuito',          desc: 'Diagnóstico y reparación eléctrica' },
];

const statsData = [
  { numeric: 500, suffix: '+', label: 'Reparaciones' },
  { numeric: 98,  suffix: '%', label: 'Satisfacción'  },
  { numeric: 24,  suffix: 'h', label: 'Diagnóstico'   },
  { numeric: 6,   suffix: 'm', label: 'Garantía'       },
];

export default function Services() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const card0Ref    = useRef<HTMLDivElement>(null);
  const card1Ref    = useRef<HTMLDivElement>(null);
  const extraRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const statNumRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // fromTo garantiza que el estado final siempre sea visible
    const reveal = (el: Element | null, vars: gsap.TweenVars, triggerEl?: Element | null) => {
      if (!el) return;
      gsap.fromTo(el,
        { autoAlpha: 0, ...vars },
        {
          autoAlpha: 1,
          x: 0, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerEl ?? el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    };

    reveal(headerRef.current, { y: 50 });
    reveal(card0Ref.current,  { x: -80 });
    reveal(card1Ref.current,  { x: 80  });

    // Extra grid items
    if (extraRef.current) {
      Array.from(extraRef.current.children).forEach((child, i) => {
        gsap.fromTo(child,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1, y: 0,
            duration: 0.5, ease: 'power2.out',
            delay: i * 0.07,
            scrollTrigger: { trigger: extraRef.current, start: 'top 88%', once: true },
          }
        );
      });
    }

    // Stats bar
    gsap.fromTo(statsRef.current,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1, y: 0,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 88%', once: true },
      }
    );

    // Number counters
    statsData.forEach((stat, i) => {
      const el = statNumRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.numeric, duration: 1.8, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix; },
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
      });
    });

  }, { scope: sectionRef });

  // 3D tilt on cards
  const onTiltMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    gsap.to(el, {
      rotationY: ((e.clientX - r.left) / r.width  - 0.5) * 12,
      rotationX: ((e.clientY - r.top)  / r.height - 0.5) * -12,
      transformPerspective: 900,
      duration: 0.3, ease: 'power1.out',
    });
  };
  const onTiltEnter = (e: React.MouseEvent<HTMLDivElement>, primary: string) =>
    gsap.to(e.currentTarget, { y: -6, boxShadow: `0 0 30px ${primary}50, inset 0 0 30px ${primary}12`, duration: 0.3, ease: 'power2.out' });
  const onTiltLeave = (e: React.MouseEvent<HTMLDivElement>, primary: string) =>
    gsap.to(e.currentTarget, { y: 0, rotationY: 0, rotationX: 0, boxShadow: `0 0 14px ${primary}20, inset 0 0 20px ${primary}10`, duration: 0.6, ease: 'elastic.out(1, 0.4)' });

  return (
    <section ref={sectionRef} id="servicios" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(26,92,255,0.03) 0%, transparent 70%)',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block font-rajdhani text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#6a9fff' }}>
            — Especialistas en reparación —
          </span>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-3 text-white">
            REPARAMOS TU <span style={{ color: '#3DFF14' }}>CELULAR</span>
          </h2>
          <p className="font-rajdhani text-base text-gray-400 max-w-xl mx-auto">
            iPhone, Samsung, Motorola, Xiaomi y más. Diagnóstico sin costo y presupuesto antes de cualquier reparación.
          </p>
          <div className="section-line w-48 mx-auto mt-5" />
        </div>

        {/* Main service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {services.map((service, ci) => {
            const Icon       = service.icon;
            const isGreen    = service.color === 'green';
            const primary    = isGreen ? '#3DFF14' : '#1A5CFF';
            const primaryDim = isGreen ? 'rgba(61,255,20,0.08)' : 'rgba(26,92,255,0.08)';
            const cardRef    = ci === 0 ? card0Ref : card1Ref;

            return (
              <div key={ci} className="perspective-wrap">
                <div
                  ref={cardRef}
                  className="relative rounded-lg p-8 cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, #0d0d0d 0%, #111 100%)',
                    border: `1px solid ${primary}35`,
                    boxShadow: `0 0 14px ${primary}20, inset 0 0 20px ${primaryDim}`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                  onMouseMove={onTiltMove}
                  onMouseEnter={(e) => onTiltEnter(e, primary)}
                  onMouseLeave={(e) => onTiltLeave(e, primary)}
                >
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-orbitron font-bold tracking-wider"
                    style={{ background: primaryDim, color: primary, border: `1px solid ${primary}40` }}>
                    {service.badge}
                  </div>
                  <div className="absolute top-0 left-0 w-5 h-5"
                    style={{ borderTop: `2px solid ${primary}`, borderLeft: `2px solid ${primary}` }} />
                  <div className="absolute bottom-0 right-0 w-5 h-5"
                    style={{ borderBottom: `2px solid ${primary}`, borderRight: `2px solid ${primary}` }} />

                  <div className="mb-5 w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ background: primaryDim, border: `1px solid ${primary}35` }}>
                    <Icon size={28} style={{ color: primary }} />
                  </div>

                  <p className="font-rajdhani text-xs font-bold tracking-[0.22em] uppercase mb-1"
                    style={{ color: primary }}>{service.subtitle}</p>
                  <h3 className="font-orbitron font-bold text-xl text-white mb-3">{service.title}</h3>
                  <p className="font-rajdhani text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 font-rajdhani text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: primary }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/541161514612?text=Hola!%20Necesito%20presupuesto%20para%20${encodeURIComponent(service.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 font-rajdhani text-sm font-bold tracking-wider uppercase group/cta"
                    style={{ color: primary }}>
                    <span>Pedir presupuesto</span>
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1.5">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra services */}
        <div className="mb-14">
          <p className="font-rajdhani text-sm font-semibold tracking-[0.25em] uppercase text-center mb-6"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            También reparamos
          </p>
          <div ref={extraRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {extraServices.map(({ icon: Icon, label, desc }, i) => (
              <div key={i}
                className="flex flex-col items-center text-center p-4 rounded-lg"
                style={{ background: '#0d0d0d', border: '1px solid rgba(61,255,20,0.12)' }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -4, borderColor: 'rgba(61,255,20,0.35)', duration: 0.25, ease: 'power2.out' })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, borderColor: 'rgba(61,255,20,0.12)', duration: 0.35, ease: 'power2.out' })}>
                <Icon size={20} className="mb-2" style={{ color: '#3DFF14' }} />
                <p className="font-rajdhani font-semibold text-xs text-white leading-tight mb-1">{label}</p>
                <p className="font-rajdhani text-xs text-gray-500 leading-tight">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-lg"
          style={{ background: 'linear-gradient(135deg, #0d0d0d, #0f0f0f)', border: '1px solid rgba(61,255,20,0.15)' }}>
          {statsData.map((stat, i) => (
            <div key={i} className="text-center">
              <div ref={(el) => { if (el) statNumRefs.current[i] = el; }}
                className="font-orbitron font-black text-3xl sm:text-4xl mb-1"
                style={{ color: '#3DFF14' }}>
                {stat.numeric}{stat.suffix}
              </div>
              <div className="font-rajdhani text-xs tracking-widest uppercase text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
