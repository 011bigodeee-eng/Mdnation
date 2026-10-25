import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site, whatsappUrl } from '../content';
import './Methodology.css';

export default function Methodology() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    const cards = [...sectionRef.current.querySelectorAll('.md-method-card')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.removeAttribute('data-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(card => { card.dataset.pending = 'true'; observer.observe(card); });
    const revealAll = () => {
      if (motion.matches) {
        cards.forEach(card => card.removeAttribute('data-pending'));
        observer.disconnect();
      }
    };
    motion.addEventListener('change', revealAll);
    return () => { observer.disconnect(); motion.removeEventListener('change', revealAll); };
  }, []);

  return <section id="metodologia" className="md-methodology" ref={sectionRef} aria-labelledby="md-method-title">
    <div className="md-method-container">
      <header className="md-method-heading">
        <div>
          <p className="md-method-eyebrow"><span aria-hidden="true"/>O CAMINHO MD NATION</p>
          <h2 id="md-method-title">NÃO É SÓ TREINAR.<br/>É SABER <em>AONDE IR.</em></h2>
        </div>
        <p className="md-method-lead">Entender seu momento. Construir uma direção.<br className="md-method-desktop-break"/> Acompanhar cada próximo passo.</p>
      </header>
      <div className="md-method-grid">
        {site.methodology.map(([title, text], i) => <article className="md-method-card" key={title} aria-labelledby={`md-method-step-${i}`}>
          <div className="md-method-image">
            <div className="md-method-photo" role="img" aria-label={site.methodologyImageDescriptions[i]} style={{ backgroundImage: `url(${site.methodologyVisual})`, backgroundPosition: `${i * 50}% center` }}/>
          </div>
          <div className="md-method-content">
            <span className="md-method-label">ETAPA 0{i + 1}</span>
            <h3 id={`md-method-step-${i}`}>{title}</h3>
            <p>{text}</p>
            <a className="md-method-contact" href={whatsappUrl || '#contato'} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined} aria-label={`Falar com Matheus sobre ${title.toLocaleLowerCase('pt-BR')}`}>
              Conversar sobre esta etapa <span aria-hidden="true"><ArrowUpRight size={19}/></span>
            </a>
          </div>
        </article>)}
      </div>
      <p className="md-method-note">Imagens ilustrativas geradas por IA. Etapas propostas; formato e entregas sujeitos à validação de Matheus Dias.</p>
    </div>
  </section>;
}
