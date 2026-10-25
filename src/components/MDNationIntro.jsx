import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '../content';
import './MDNationIntro.css';

export const INTRO_SESSION_KEY = 'mdnation:intro:seen';
const DURATION = 2200;
const REVEAL_PAGE_AT = 1850;

export default function MDNationIntro() {
  const [visible, setVisible] = useState(() => document.documentElement.classList.contains('md-intro-running'));
  const skipRef = useRef(null);
  const skippedRef = useRef(false);
  const restoreRef = useRef(() => {});
  const finish = useCallback((skipped = false) => {
    // Release the page directly before updating React, including on watchdog expiry.
    skippedRef.current = skipped;
    window.__mdIntroRelease?.();
    restoreRef.current(skipped);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const content = document.getElementById('md-site-content');
    const previousInert = content?.inert ?? false;
    const previousFocus = document.activeElement;
    if (content) content.inert = true;
    let restored = false;
    const restore = (skipped = false) => {
      if (restored) return;
      restored = true;
      if (content) content.inert = previousInert;
      if (skipped) document.querySelector('.header .logo')?.focus({ preventScroll: true });
      else if (previousFocus instanceof HTMLElement && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
    };
    restoreRef.current = restore;
    const onRelease = () => { restore(skippedRef.current); setVisible(false); };
    window.addEventListener('md-intro-release', onRelease);
    skipRef.current?.focus({ preventScroll: true });
    const revealTimer = window.setTimeout(() => document.documentElement.classList.remove('md-intro-pending'), REVEAL_PAGE_AT);
    const finishTimer = window.setTimeout(() => finish(), DURATION);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { if (motion.matches) finish(); };
    motion.addEventListener('change', onMotion);
    if (motion.matches) finish();
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener('md-intro-release', onRelease);
      motion.removeEventListener('change', onMotion);
      restore();
      // Also release on unexpected unmount, without waiting for React to recover.
      window.__mdIntroRelease?.();
    };
  }, [visible, finish]);

  if (!visible) return null;
  return <div className="md-intro" role="dialog" aria-modal="true" aria-label="Abertura MD Nation" onKeyDown={event => {
    if (event.key === 'Escape') finish(true);
    if (event.key === 'Tab') { event.preventDefault(); skipRef.current?.focus(); }
  }}>
    <div className="md-intro-beam" aria-hidden="true"/>
    <div className="md-intro-brand" aria-hidden="true">
      <div className="md-intro-logo">
        <img src={site.images.logo} alt="" width="2160" height="2160" fetchPriority="high" decoding="async" onError={() => finish()}/>
        <span className="md-intro-reflection"/>
      </div>
    </div>
    <button ref={skipRef} className="md-intro-skip" onClick={() => finish(true)}>Pular introdução</button>
  </div>;
}
