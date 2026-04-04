'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { href: '#inicio',    label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto',  label: 'Contacto' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef    = useRef<HTMLElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const linksRef     = useRef<HTMLAnchorElement[]>([]);
  const waBtnRef     = useRef<HTMLAnchorElement>(null);
  const logoRef      = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ─ Entrance: header slides down ─
    gsap.set(headerRef.current, { y: -90, autoAlpha: 0 });
    const links = linksRef.current.filter(Boolean);
    gsap.set(links, { y: -12, autoAlpha: 0 });
    gsap.set(waBtnRef.current, { y: -12, autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .to(headerRef.current, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.1)
      .to(links, {
        y: 0, autoAlpha: 1,
        stagger: 0.07,
        duration: 0.45,
      }, 0.55)
      .to(waBtnRef.current, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.75);

    // ─ Scroll progress bar ─
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end:   'max',
        scrub: 0.1,
      },
    });

    // ─ Background on scroll (GSAP instead of useState) ─
    ScrollTrigger.create({
      start: 'top+=40 top',
      onEnter: () => {
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(14px)',
          borderBottomColor: 'rgba(61,255,20,0.18)',
          boxShadow: '0 2px 24px rgba(61,255,20,0.08)',
          duration: 0.4,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(headerRef.current, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          borderBottomColor: 'transparent',
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power2.out',
        });
      },
    });

  }, { scope: headerRef });

  // ── Mobile menu open/close with GSAP ──────────────────────────────────────
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (mobileMenuRef.current) {
      if (next) {
        gsap.fromTo(
          mobileMenuRef.current,
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, { autoAlpha: 0, y: -10, duration: 0.25, ease: 'power2.in' });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: 'transparent', backgroundColor: 'transparent' }}
    >
      {/* Scroll progress bar */}
      <div ref={progressRef} className="scroll-progress" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            ref={logoRef}
            href="#inicio"
            className="flex items-center gap-3 group"
          >
            <div
              className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 8px #3DFF14)' }}
            >
              <Image src="/logo.svg" alt="Monster GSM Logo" fill className="object-contain" />
            </div>
            <span
              className="font-orbitron font-bold text-lg tracking-widest"
              style={{ color: '#3DFF14', fontFamily: 'Betterlett, sans-serif', fontSize: '1.4rem' }}
            >
              Monster<span style={{ color: '#1A5CFF' }}> gsm</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => { if (el) linksRef.current[i] = el; }}
                className="font-rajdhani font-semibold text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: '#3DFF14', boxShadow: '0 0 6px #3DFF14' }}
                />
              </a>
            ))}

            <a
              ref={waBtnRef}
              href="https://wa.me/541161514612"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn-green px-5 py-2 text-xs font-semibold rounded"
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: '#3DFF14' }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-b"
          style={{
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(61,255,20,0.2)',
          }}
        >
          <div className="px-6 py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="font-rajdhani font-semibold text-base tracking-widest uppercase text-gray-300 hover:text-white transition-colors py-1.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/541161514612"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn-green px-5 py-3 text-sm font-semibold rounded text-center mt-1"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
