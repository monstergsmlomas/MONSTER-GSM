'use client';

import { useRef } from 'react';
import { Zap, Wrench, Droplets, Battery, Wifi, Mic } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Ilustración: pantalla de celular con crack ──────────────────────────────
function IlluScreen({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Phone body */}
      <rect x="20" y="8" width="80" height="124" rx="10" stroke={color} strokeWidth="2.5" strokeOpacity="0.5"/>
      <rect x="26" y="20" width="68" height="96" rx="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.04"/>
      {/* Speaker */}
      <line x1="48" y1="14" x2="72" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6"/>
      {/* Home indicator */}
      <line x1="46" y1="134" x2="74" y2="134" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6"/>
      {/* Crack lines */}
      <polyline points="60,20 50,45 65,50 42,110" stroke={color} strokeWidth="1.5" strokeOpacity="0.9" strokeLinejoin="round"/>
      <line x1="50" y1="45" x2="36" y2="60" stroke={color} strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="65" y1="50" x2="80" y2="70" stroke={color} strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="55" y1="78" x2="70" y2="90" stroke={color} strokeWidth="1" strokeOpacity="0.5"/>
      {/* Glow on crack */}
      <polyline points="60,20 50,45 65,50 42,110" stroke={color} strokeWidth="3" strokeOpacity="0.15" strokeLinejoin="round" filter="url(#gc)"/>
      <defs>
        <filter id="gc"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
    </svg>
  );
}

// ── Ilustración: plaqueta electrónica ──────────────────────────────────────
function IlluCircuit({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="gb"><feGaussianBlur stdDeviation="2.5"/></filter>
      </defs>
      {/* PCB base */}
      <rect x="10" y="10" width="120" height="100" rx="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.35" fill={color} fillOpacity="0.03"/>
      {/* Horizontal traces */}
      <line x1="10" y1="35" x2="40" y2="35" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="60" y1="35" x2="100" y2="35" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="100" y1="35" x2="100" y2="55" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="10" y1="85" x2="55" y2="85" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="75" y1="85" x2="130" y2="85" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      {/* Vertical traces */}
      <line x1="40" y1="10" x2="40" y2="35" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="40" y1="55" x2="40" y2="85" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="75" y1="55" x2="75" y2="85" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="75" y1="10" x2="75" y2="35" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
      <line x1="110" y1="55" x2="110" y2="110" stroke={color} strokeWidth="1.5" strokeOpacity="0.5"/>
      {/* Chips */}
      <rect x="40" y="35" width="35" height="20" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12"/>
      <rect x="47" y="40" width="21" height="10" rx="1" fill={color} fillOpacity="0.25"/>
      {/* Chip pins */}
      {[42,48,54,60,66].map((x,i) => (
        <line key={i} x1={x} y1="35" x2={x} y2="30" stroke={color} strokeWidth="1" strokeOpacity="0.5"/>
      ))}
      {[42,48,54,60,66].map((x,i) => (
        <line key={i} x1={x} y1="55" x2={x} y2="60" stroke={color} strokeWidth="1" strokeOpacity="0.5"/>
      ))}
      {/* Small IC */}
      <rect x="85" y="60" width="28" height="18" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
      {[87,93,99,107].map((x,i) => (
        <line key={i} x1={x} y1="60" x2={x} y2="56" stroke={color} strokeWidth="1" strokeOpacity="0.5"/>
      ))}
      {/* Via dots */}
      {[[40,35],[75,35],[40,85],[75,85],[100,55]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={color} fillOpacity="0.9" stroke={color} strokeWidth="1"/>
      ))}
      {/* Glow on chip */}
      <rect x="40" y="35" width="35" height="20" rx="2" fill={color} fillOpacity="0.06" filter="url(#gb)"/>
      {/* Solder point glow */}
      <circle cx="40" cy="35" r="5" fill={color} fillOpacity="0.2" filter="url(#gb)"/>
      <circle cx="75" cy="85" r="5" fill={color} fillOpacity="0.2" filter="url(#gb)"/>
      {/* Microscope crosshair */}
      <circle cx="100" cy="85" r="12" stroke={color} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 2"/>
      <line x1="100" y1="74" x2="100" y2="79" stroke={color} strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="100" y1="91" x2="100" y2="96" stroke={color} strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="89" y1="85" x2="94" y2="85" stroke={color} strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="106" y1="85" x2="111" y2="85" stroke={color} strokeWidth="1" strokeOpacity="0.6"/>
      <circle cx="100" cy="85" r="2.5" fill={color} fillOpacity="0.8"/>
    </svg>
  );
}

const services = [
  {
    illus: IlluScreen,
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
    illus: IlluCircuit,
    title: 'Reparación Electrónica',
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
  { icon: Battery,  label: 'Cambio de Batería',    desc: 'Batería original o premium con garantía' },
  { icon: Mic,      label: 'Micrófono / Parlante', desc: 'Audio sin señal o voz distorsionada' },
  { icon: Wifi,     label: 'Antena & Señal',        desc: 'Sin wifi, Bluetooth o señal celular' },
  { icon: Droplets, label: 'Daño por Agua',         desc: 'Limpieza y recuperación de plaqueta' },
  { icon: Wrench,   label: 'Conector de Carga',     desc: 'No carga o carga intermitente' },
  { icon: Zap,      label: 'Cortocircuito',         desc: 'Diagnóstico y reparación electrónica' },
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
    const reveal = (el: Element | null, from: gsap.TweenVars, trigger?: Element | null) => {
      if (!el) return;
      gsap.fromTo(el, { autoAlpha: 0, ...from },
        { autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: trigger ?? el, start: 'top 88%', once: true } });
    };

    reveal(headerRef.current, { y: 50 });
    reveal(card0Ref.current,  { x: -80 });
    reveal(card1Ref.current,  { x: 80  });

    if (extraRef.current) {
      Array.from(extraRef.current.children).forEach((child, i) => {
        gsap.fromTo(child, { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.07,
            scrollTrigger: { trigger: extraRef.current, start: 'top 88%', once: true } });
      });
    }

    gsap.fromTo(statsRef.current, { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 88%', once: true } });

    statsData.forEach((stat, i) => {
      const el = statNumRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, { val: stat.numeric, duration: 1.8, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix; },
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true } });
    });
  }, { scope: sectionRef });

  const onTiltMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    gsap.to(el, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 12,
      rotationX: ((e.clientY - r.top) / r.height - 0.5) * -12,
      transformPerspective: 900, duration: 0.3, ease: 'power1.out' });
  };
  const onTiltEnter = (e: React.MouseEvent<HTMLDivElement>, p: string) =>
    gsap.to(e.currentTarget, { y: -6, boxShadow: `0 0 30px ${p}50, inset 0 0 30px ${p}12`, duration: 0.3, ease: 'power2.out' });
  const onTiltLeave = (e: React.MouseEvent<HTMLDivElement>, p: string) =>
    gsap.to(e.currentTarget, { y: 0, rotationY: 0, rotationX: 0,
      boxShadow: `0 0 14px ${p}20, inset 0 0 20px ${p}10`, duration: 0.6, ease: 'elastic.out(1, 0.4)' });

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

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {services.map((service, ci) => {
            const Illus      = service.illus;
            const isGreen    = service.color === 'green';
            const primary    = isGreen ? '#3DFF14' : '#1A5CFF';
            const primaryDim = isGreen ? 'rgba(61,255,20,0.08)' : 'rgba(26,92,255,0.08)';
            const cardRef    = ci === 0 ? card0Ref : card1Ref;

            return (
              <div key={ci} className="perspective-wrap">
                <div ref={cardRef} className="relative rounded-lg p-8 cursor-default overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #0d0d0d 0%, #111 100%)',
                    border: `1px solid ${primary}35`,
                    boxShadow: `0 0 14px ${primary}20, inset 0 0 20px ${primaryDim}`,
                    transformStyle: 'preserve-3d', willChange: 'transform',
                  }}
                  onMouseMove={onTiltMove}
                  onMouseEnter={(e) => onTiltEnter(e, primary)}
                  onMouseLeave={(e) => onTiltLeave(e, primary)}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-orbitron font-bold tracking-wider"
                    style={{ background: primaryDim, color: primary, border: `1px solid ${primary}40` }}>
                    {service.badge}
                  </div>

                  {/* Corner decorators */}
                  <div className="absolute top-0 left-0 w-5 h-5"
                    style={{ borderTop: `2px solid ${primary}`, borderLeft: `2px solid ${primary}` }} />
                  <div className="absolute bottom-0 right-0 w-5 h-5"
                    style={{ borderBottom: `2px solid ${primary}`, borderRight: `2px solid ${primary}` }} />

                  {/* Illustration — top right background */}
                  <div className="absolute top-8 right-8 w-28 h-28 opacity-30 pointer-events-none select-none">
                    <Illus color={primary} />
                  </div>

                  {/* Content */}
                  <p className="font-rajdhani text-xs font-bold tracking-[0.22em] uppercase mb-1"
                    style={{ color: primary }}>{service.subtitle}</p>
                  <h3 className="font-orbitron font-bold text-xl text-white mb-3">{service.title}</h3>
                  <p className="font-rajdhani text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">{service.description}</p>

                  <ul className="space-y-2 mb-7">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 font-rajdhani text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: primary }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href={`https://wa.me/541161514612?text=Hola!%20Necesito%20presupuesto%20para%20${encodeURIComponent(service.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-rajdhani text-sm font-bold tracking-wider uppercase group/cta"
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
              <div key={i} className="flex flex-col items-center text-center p-4 rounded-lg"
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
                className="font-orbitron font-black text-3xl sm:text-4xl mb-1" style={{ color: '#3DFF14' }}>
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
