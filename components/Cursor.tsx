'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start hidden until first move
    gsap.set([dot, ring], { autoAlpha: 0 });

    let mx = 0, my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mx, y: my });
      // Ring follows with slight lag
      gsap.to(ring, { x: mx, y: my, duration: 0.18, ease: 'power2.out' });

      // Show on first move
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
    };

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, borderColor: '#3DFF14', boxShadow: '0 0 16px rgba(61,255,20,0.7)', duration: 0.25, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0.4, duration: 0.25, ease: 'power2.out' });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: '#3DFF14', boxShadow: '0 0 8px rgba(61,255,20,0.4)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.1, ease: 'power3.out' });
    };
    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup',   onMouseUp);

    const attachToInteractives = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    // Initial attach + re-attach on DOM changes (for dynamic elements)
    attachToInteractives();
    const observer = new MutationObserver(attachToInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup',   onMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
