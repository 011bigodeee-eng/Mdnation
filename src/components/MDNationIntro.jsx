import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '../content';
import './MDNationIntro.css';

export const INTRO_SESSION_KEY = 'mdnation:intro:seen';
const DURATION = 3600;

// The head bootstrap sets this class before the first paint, avoiding a page flash.
export default function MDNationIntro() {
  const [visible, setVisible] = useState(() => document.documentElement.classList.contains('md-intro-pending'));
  const skipRef = useRef(null);
  const skippedRef = useRef(false);
  const finish = useCallback((skipped = false) => {
    skippedRef.current = skipped;
    window.clearTimeout(window.__mdIntroWatchdog);
    try { sessionStorage.setItem(INTRO_SESSION_KEY, '1'); } catch { /* Storage may be disabled. */ }
    document.documentElement.classList.remove('md-intro-pending');
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const content = document.getElementById('md-site-content');
    const previousInert = content?.inert;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const previousFocus = document.activeElement;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    if (content) content.inert = true;
    skipRef.current?.focus({ preventScroll: true });
    window.clearTimeout(window.__mdIntroWatchdog);
    // Reveal the still-inert page under the fading overlay.
    const revealTimer = window.setTimeout(() => document.documentElement.classList.remove('md-intro-pending'), 3150);
    const timer = window.setTimeout(() => finish(), DURATION);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { if (motion.matches) finish(); };
    motion.addEventListener('change', onMotion);
    if (motion.matches) finish();
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(revealTimer);
      motion.removeEventListener('change', onMotion);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (content) content.inert = previousInert;
      if (skippedRef.current) document.querySelector('.header .logo')?.focus({ preventScroll: true });
      else if (previousFocus instanceof HTMLElement && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
    };
  }, [visible, finish]);

  if (!visible) return null;
  return <div className="md-intro" role="dialog" aria-modal="true" aria-label="Abertura MD Nation" onKeyDown={event => { if (event.key === 'Escape') finish(true); if (event.key === 'Tab') { event.preventDefault(); skipRef.current?.focus(); } }}>
    <div className="md-intro-scene" aria-hidden="true">
      <div className="md-intro-aura"/>
      <div className="md-intro-rays">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ '--ray': i }}/>)}</div>
      <div className="md-intro-particles">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--particle': i, left: `${12 + (i * 37 % 78)}%`, top: `${18 + (i * 23 % 65)}%` }}/>)}</div>
      <div className="md-intro-camera">
        <div className="md-intro-emblem"><img src={site.images.logo} alt="" width="216" height="216"/><span/></div>
        <div className="md-intro-wordmark" data-text="MD NATION">MD <span>NATION</span></div>
        <div className="md-intro-rule"/>
        <p className="md-intro-signature">ESTRATÉGIA. CONSISTÊNCIA. EVOLUÇÃO.</p>
      </div>
      <div className="md-intro-expansion"/>
    </div>
    <button ref={skipRef} className="md-intro-skip" onClick={() => finish(true)}>Pular introdução <ArrowUpRight size={15} aria-hidden="true"/></button>
  </div>;
}
