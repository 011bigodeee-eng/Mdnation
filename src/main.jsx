import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  Instagram,
} from "lucide-react";
import { site, whatsappUrl } from "./content";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "./styles.css";
import MDNationIntro from "./components/MDNationIntro";
import Methodology from "./components/Methodology";
import "./components/Credentials.css";

function ContactButton({ children = "Falar com Matheus", className = "" }) {
  return (
    <a
      className={`button ${className}`}
      href={whatsappUrl || site.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </a>
  );
}
function SectionLabel({ children }) {
  return (
    <p className="section-label">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label="MD Nation — início">
      <img src={site.images.logo} alt="" width="64" height="64" />
      <span>
        MD NATION<small>POR MATHEUS DIAS</small>
      </span>
    </a>
  );
}
function TrainerPhoto({ className = "", priority = false }) {
  return (
    <img
      className={className}
      src={site.images.hero}
      srcSet="/images/matheus-academia-800.webp 800w, /images/matheus-academia-1400.webp 1400w"
      sizes="(max-width: 767px) 100vw, 55vw"
      alt="Matheus Dias de braços cruzados na academia"
      width="2358"
      height="2436"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef(null);
  const mobileRef = useRef(null);
  const links = [
    ["sobre", "Sobre Matheus"],
    ["metodologia", "Acompanhamento"],
    ["certificacoes", "Formação"],
    ["faq", "Dúvidas"],
  ];
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      for (const id of [
        "sobre",
        "metodologia",
        "beneficios",
        "resultados",
        "certificacoes",
        "faq",
        "contato",
      ]) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= 150)
          current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      schedule();
      if (innerWidth >= 1024) setOpen(false);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    mobileRef.current?.querySelector("a")?.focus();
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <ContactButton className="header-cta">Quero começar</ContactButton>
        <button
          type="button"
          ref={toggleRef}
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {open && (
        <nav
          ref={mobileRef}
          id="mobile-nav"
          className="mobile-nav container"
          aria-label="Navegação mobile"
        >
          {[...links, ["contato", "Contato"]].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                setOpen(false);
                document.getElementById(id)?.focus({ preventScroll: true });
              }}
            >
              {label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-photo">
        <TrainerPhoto priority />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-content">
        <SectionLabel>MD NATION · ACOMPANHAMENTO ONLINE</SectionLabel>
        <h1 id="hero-title">
          A SUA EVOLUÇÃO
          <br />
          NÃO ACONTECE
          <br />
          POR <em>ACASO.</em>
        </h1>
        <p>
          Treinamento com estratégia.
          <br />
          Orientação profissional para os seus objetivos.
        </p>
        <ContactButton>QUERO COMEÇAR MEU ACOMPANHAMENTO</ContactButton>
        <a href="#metodologia" className="hero-discover">
          Conheça o acompanhamento <ArrowRight size={18} aria-hidden="true" />
        </a>
        <div className="hero-signature">
          <span>MATHEUS DIAS</span>
          <small>Personal Trainer · CREF {site.cref}</small>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>SEU OBJETIVO MERECE DIREÇÃO.</span>
        <a href="#sobre" aria-label="Conhecer Matheus Dias">
          Explore <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
function BrandStrip() {
  return (
    <div className="brand-strip">
      <div className="container">
        <span>ESTRATÉGIA</span>
        <i aria-hidden="true" />
        <span>CONSISTÊNCIA</span>
        <i aria-hidden="true" />
        <span>EVOLUÇÃO</span>
      </div>
    </div>
  );
}
function About() {
  return (
    <section
      id="sobre"
      tabIndex="-1"
      className="section container about"
      aria-labelledby="about-title"
    >
      <figure className="about-portrait">
        <img
          src={site.images.about}
          alt="Matheus Dias com suas medalhas"
          loading="lazy"
          width="2358"
          height="2362"
        />
        <figcaption>
          <strong>MATHEUS DIAS</strong>
          <span>À frente da MD Nation.</span>
        </figcaption>
      </figure>
      <div className="about-copy">
        <SectionLabel>O PROFISSIONAL POR TRÁS DA MARCA</SectionLabel>
        <h2 id="about-title">
          SEU OBJETIVO.
          <br />
          NOSSA <em>ESTRATÉGIA.</em>
        </h2>
        <p className="lead">
          Por trás de cada evolução,
          <br />
          existe uma direção.
        </p>
        <p>{site.about}</p>
        <dl className="professional-details">
          <div>
            <dt>Personal Trainer</dt>
            <dd>CREF {site.cref}</dd>
          </div>
          <div>
            <dt>Terapeuta Manual</dt>
            <dd>Matheus Dias</dd>
          </div>
        </dl>
        <div className="about-links">
          <a
            className="text-link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={18} aria-hidden="true" /> Conheça meu trabalho{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href="#certificacoes">
            Ver formação <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
function Benefits() {
  return (
    <section
      id="beneficios"
      className="section benefits"
      aria-labelledby="benefits-title"
    >
      <div className="container benefits-layout">
        <div>
          <SectionLabel>CADA TREINO TEM UM PORQUÊ</SectionLabel>
          <h2 id="benefits-title">
            MENOS DÚVIDA.
            <br />
            MAIS <em>PROPÓSITO.</em>
          </h2>
          <p className="benefits-intro">
            Mais do que seguir uma sequência.
            <br />
            Entenda a direção do seu esforço.
          </p>
        </div>
        <div className="benefits-list">
          {site.benefits.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
          <p className="editorial-note">
            Proposta de acompanhamento a confirmar com Matheus. Resultados
            variam de pessoa para pessoa.
          </p>
        </div>
      </div>
    </section>
  );
}
function Results() {
  const [active, setActive] = useState(0);
  const journey = site.journeys[active];
  return (
    <section
      id="resultados"
      className="section container results"
      aria-labelledby="results-title"
    >
      <header className="section-heading">
        <div>
          <SectionLabel>CADA JORNADA É ÚNICA</SectionLabel>
          <h2 id="results-title">
            UM PASSO.
            <br />
            UMA NOVA <em>DIREÇÃO.</em>
          </h2>
        </div>
        <p>
          O caminho é construído dia após dia.
          <br />
          Explore os momentos dessa jornada.
        </p>
      </header>
      <div className="journey-layout">
        <div className="journey-image">
          <div
            className="journey-scene"
            role="img"
            aria-label={journey.alt}
            style={{
              backgroundImage: `url(${site.journeyVisual})`,
              backgroundPosition: `${active * 50}% center`,
            }}
          />
          <span>IMAGEM ILUSTRATIVA · IA</span>
        </div>
        <div className="journey-content">
          <div
            className="journey-options"
            role="group"
            aria-label="Escolha um momento da jornada"
          >
            {site.journeys.map((item, i) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="journey-story">
            <h3>
              {journey.title}
              <em>.</em>
            </h3>
            <p>{journey.text}</p>
            <a href="#contato" className="text-link">
              Comece a sua jornada <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="editorial-note">
            Cenas geradas por IA. Não representam alunos ou resultados reais da
            MD Nation. Relatos reais serão publicados somente com autorização.
          </p>
        </div>
      </div>
    </section>
  );
}
function Credentials() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [selected]);
  const open = (event, certificate) => {
    triggerRef.current = event.currentTarget;
    setSelected(certificate);
  };
  const close = () => {
    dialogRef.current?.close();
    setSelected(null);
    triggerRef.current?.focus({ preventScroll: true });
  };
  return (
    <section
      id="certificacoes"
      tabIndex="-1"
      className="md-credentials"
      aria-labelledby="credentials-title"
    >
      <div className="container">
        <header className="section-heading">
          <div>
            <SectionLabel>FORMAÇÃO & ATUALIZAÇÃO</SectionLabel>
            <h2 id="credentials-title">
              CONHECIMENTO
              <br />
              EM CONSTANTE <em>EVOLUÇÃO.</em>
            </h2>
          </div>
          <p>
            Dedicação além do treino.
            <br />
            Documentos reais, disponíveis para consulta.
          </p>
        </header>
        <div className="md-credentials-grid">
          {site.credentials.map((c) => (
            <article className="md-credential" key={c.image}>
              <button
                type="button"
                className="md-credential-preview"
                aria-label={`Ampliar certificado: ${c.title}`}
                aria-haspopup="dialog"
                onClick={(e) => open(e, c)}
              >
                <img
                  src={c.thumbnail}
                  alt={c.alt}
                  loading="lazy"
                  width="2358"
                  height={c.height}
                />
                <span>
                  <Plus size={18} aria-hidden="true" /> Ampliar
                </span>
              </button>
              <div className="md-credential-info">
                <h3>{c.title}</h3>
                <p>{c.detail}</p>
                <button
                  type="button"
                  className="md-credential-open"
                  onClick={(e) => open(e, c)}
                  aria-haspopup="dialog"
                >
                  Ver certificado <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <dialog
          className="certificate-dialog"
          ref={dialogRef}
          aria-label={
            selected ? `Certificado: ${selected.title}` : "Certificado"
          }
          onCancel={(e) => {
            e.preventDefault();
            close();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onClose={() => {
            setSelected(null);
            triggerRef.current?.focus({ preventScroll: true });
          }}
        >
          {selected && (
            <>
              <div className="certificate-dialog-header">
                <div>
                  <span>DOCUMENTO ORIGINAL</span>
                  <h3>{selected.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar certificado"
                  autoFocus
                >
                  <X size={22} />
                </button>
              </div>
              <img
                src={selected.image}
                alt={selected.alt}
                width="2358"
                height={selected.height}
              />
              <a
                href={selected.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Abrir original em nova aba{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </>
          )}
        </dialog>
      </div>
    </section>
  );
}
function FAQ() {
  const [active, setActive] = useState(null);
  return (
    <section
      id="faq"
      tabIndex="-1"
      className="section container faq"
      aria-labelledby="faq-title"
    >
      <div>
        <SectionLabel>CLAREZA PARA COMEÇAR</SectionLabel>
        <h2 id="faq-title">
          ANTES DO
          <br />
          PRIMEIRO <em>PASSO.</em>
        </h2>
        <p>
          O que você precisa saber
          <br />
          para começar essa conversa.
        </p>
        <a href="#contato" className="text-link">
          Ainda tem uma dúvida? <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="faq-list">
        {site.faq.map(([q, a], i) => (
          <div className="faq-item" key={q}>
            <h3>
              <button
                type="button"
                id={`faq-question-${i}`}
                aria-expanded={active === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                <span>{q}</span>
                {active === i ? (
                  <Minus size={20} aria-hidden="true" />
                ) : (
                  <Plus size={20} aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              hidden={active !== i}
            >
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function FinalCTA() {
  return (
    <section
      id="contato"
      tabIndex="-1"
      className="final-cta"
      aria-labelledby="contact-title"
    >
      <div className="container contact-layout">
        <div>
          <SectionLabel>O PRÓXIMO CAPÍTULO É SEU</SectionLabel>
          <h2 id="contact-title">
            SEU OBJETIVO.
            <br />
            NOSSO PRÓXIMO
            <br />
            <em>ASSUNTO.</em>
          </h2>
        </div>
        <div className="contact-copy">
          <p>
            Conte seu objetivo e tire suas dúvidas sobre o acompanhamento MD
            Nation.
          </p>
          <ContactButton>FALAR COM MATHEUS</ContactButton>
          <span className="contact-caption">
            {whatsappUrl ? "Contato pelo WhatsApp" : "Contato pelo Instagram"} ·
            Matheus Dias
          </span>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <Instagram size={18} aria-hidden="true" /> @theusdias_treinador{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Logo />
            <p>Estratégia. Consistência. Evolução.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <a href="#sobre">Sobre Matheus</a>
            <a href="#metodologia">Acompanhamento</a>
            <a href="#resultados">A jornada</a>
            <a href="#certificacoes">Formação</a>
          </nav>
          <div className="footer-professional">
            <strong>Matheus Dias</strong>
            <p>
              Personal Trainer · CREF {site.cref}
              <br />
              Terapeuta Manual
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MD Nation. Todos os direitos
            reservados.
          </p>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}
function App() {
  return (
    <>
      <MDNationIntro />
      <div id="md-site-content">
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex="-1">
          <Hero />
          <BrandStrip />
          <About />
          <Methodology />
          <Benefits />
          <Results />
          <Credentials />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
