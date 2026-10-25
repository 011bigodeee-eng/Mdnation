export const site = {
  name: "MD NATION",
  trainer: "Matheus Dias",
  cref: "201349-G/SP",
  instagram: "https://www.instagram.com/theusdias_treinador",
  // Insira o número real com código de país e DDD, somente dígitos.
  whatsappNumber: "5516996455766",
  whatsappMessage:
    "Olá, Matheus! Vim pelo site da MD Nation e gostaria de saber mais sobre o acompanhamento online.",
  images: {
    hero: "/images/matheus-academia-1400.webp",
    about: "/images/matheus-medalhas-1000.webp",
    logo: "/images/md-nation-logo-420.webp",
  },
  about:
    "Matheus Dias é Personal Trainer e Terapeuta Manual. À frente da MD Nation, propõe um treinamento com estratégia, consciência e orientação profissional. Converse sobre sua rotina e seus objetivos para conhecer sua abordagem.",
  // Propostas editoriais: validar as etapas e os benefícios com o responsável antes da publicação.
  methodologyVisual: "/images/metodologia.webp",
  methodologyImageDescriptions: [
    "Ilustração por IA: avaliação inicial com conversa sobre objetivos e ficha de avaliação.",
    "Ilustração por IA: organização do planejamento de treinos com tablet e agenda.",
    "Ilustração por IA: profissional observando um exercício e acompanhando a evolução.",
  ],
  methodology: [
    [
      "Avaliação",
      "Entender o momento atual, a rotina e os objetivos do aluno.",
    ],
    [
      "Planejamento",
      "Organizar uma estratégia de treinamento coerente com os objetivos.",
    ],
    [
      "Acompanhamento",
      "Acompanhar a evolução e ajustar o processo conforme necessário.",
    ],
  ],
  benefits: [
    [
      "Planejamento individualizado",
      "Seu ponto de partida e seus objetivos como referência.",
    ],
    [
      "Orientação profissional",
      "Mais consciência para construir sua rotina de treinamento.",
    ],
    ["Clareza nos treinos", "Entenda o propósito de cada etapa do processo."],
    [
      "Evolução acompanhada",
      "Um olhar atento ao caminho que você está construindo.",
    ],
  ],
  journeyVisual: "/images/jornadas.webp",
  journeys: [
    {
      title: "O ponto de partida",
      text: "Toda jornada começa com a decisão de dar o primeiro passo.",
      alt: "Ilustração por IA de uma pessoa chegando à academia com uma bolsa esportiva.",
    },
    {
      title: "A construção diária",
      text: "Consistência é construída em cada treino, um dia de cada vez.",
      alt: "Ilustração por IA de uma pessoa segurando um halter durante o treino.",
    },
    {
      title: "Uma nova perspectiva",
      text: "Um caminho com propósito para olhar adiante.",
      alt: "Ilustração por IA de uma pessoa olhando pela janela de uma academia.",
    },
  ],
  credentials: [
    {
      image: "/images/IMG_7746.JPG.jpeg",
      thumbnail: "/images/certificado-7746.webp",
      title: "Personal Faixa Preta",
      detail: "Musculação Faixa Preta · 2025 · 15 horas",
      alt: "Certificado de capacitação online Personal Faixa Preta em nome de Matheus Henrique Jesus Silva",
      height: 1662,
    },
    {
      image: "/images/IMG_7748.JPG.jpeg",
      thumbnail: "/images/certificado-7748.webp",
      height: 1614,
      title: "Workshop de membros inferiores",
      detail: "08 de junho de 2025 · 8 horas",
      alt: "Certificado do workshop de membros inferiores em nome de Matheus Henrique Dias Paulino",
    },
    {
      image: "/images/IMG_7747.JPG.jpeg",
      thumbnail: "/images/certificado-7747.webp",
      height: 1638,
      title: "Musculação e biomecânica",
      detail: "ENAF · 13 de agosto de 2025 · 8 horas",
      alt: "Certificado ENAF de participação em clínica de atualização em musculação e biomecânica em nome de Matheus Henrique Dias Paulino",
    },
  ],
  faq: [
    [
      "Como funciona o acompanhamento online?",
      "Entre em contato com Matheus para conhecer a proposta de acompanhamento, os canais de orientação e o formato disponível para a sua rotina.",
    ],
    [
      "O treinamento é individualizado?",
      "Converse com Matheus sobre seus objetivos e necessidades para entender como o planejamento pode ser direcionado ao seu perfil. Os detalhes serão apresentados no contato inicial.",
    ],
    [
      "Como solicitar mais informações?",
      "Use os botões de contato para falar com Matheus pelo WhatsApp ou envie uma mensagem pelo Instagram @theusdias_treinador.",
    ],
    [
      "Como começar?",
      "O primeiro passo é conversar com Matheus sobre seu momento e seus objetivos. Nesse contato, você poderá esclarecer o formato do acompanhamento e as condições disponíveis.",
    ],
  ],
};
export const whatsappUrl = site.whatsappNumber
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`
  : null;
