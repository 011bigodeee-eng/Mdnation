import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { site, whatsappUrl } from '../content';
import './Hero.css';

export default function Hero() {
  return <section id="inicio" className="md-hero" aria-labelledby="md-hero-title">
    <div className="md-hero-light" aria-hidden="true"/>
    <div className="md-hero-layout">
      <div className="md-hero-copy">
        <p className="md-hero-eyebrow"><span aria-hidden="true"/> MD NATION <span className="md-hero-eyebrow-divider" aria-hidden="true"/> ACOMPANHAMENTO ONLINE</p>
        <h1 id="md-hero-title"><span>A SUA EVOLUÇÃO</span><span>NÃO ACONTECE</span><span>POR <em>ACASO.</em></span></h1>
        <p className="md-hero-description">Treinamento estratégico, acompanhamento profissional e um planejamento direcionado aos seus objetivos.</p>
        <div className="md-hero-actions">
          <a className="md-hero-primary" href={whatsappUrl || '#contato'} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined}>QUERO COMEÇAR MINHA EVOLUÇÃO <span aria-hidden="true"><ArrowUpRight size={22}/></span></a>
          <a className="md-hero-secondary" href="#sobre">CONHEÇA A MD NATION <ArrowRight size={19} aria-hidden="true"/></a>
        </div>
        <div className="md-hero-principles" aria-label="Princípios MD Nation"><span>ESTRATÉGIA</span><span>CONSISTÊNCIA</span><span>EVOLUÇÃO</span></div>
      </div>
      <div className="md-hero-portrait">
        <div className="md-hero-photo"><img src={site.images.hero} alt="Matheus Dias de braços cruzados na academia" fetchPriority="high" width="2358" height="2436"/></div>
        <span className="md-hero-frame-light" aria-hidden="true"/>
      </div>
      <a href="#sobre" className="md-hero-scroll"><ArrowDown size={18} aria-hidden="true"/> EXPLORE SUA PRÓXIMA VERSÃO</a>
    </div>
  </section>;
}
