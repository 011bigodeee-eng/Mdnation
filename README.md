# MD Nation

Landing page de Matheus Dias, reformulada sobre o projeto existente com React, Vite, Tailwind CSS e Lucide React. Sem novos frameworks ou dependências.

## Executar

Requer Node.js 20.19+ ou 22.12+ (validado com Node 24).

```sh
npm install
npm run dev
```

Para reproduzir as versões instaladas, use `npm ci`. Neste ambiente, se o cache padrão não for gravável, acrescente `--cache /tmp/md-npm-cache`.

```sh
npm run build
npm run preview
```

O build para hospedagem estática fica em `dist/`.

## Arquivos e conteúdo

- `src/main.jsx`: cabeçalho, hero, apresentação, benefícios, jornada ilustrativa, certificados, FAQ, contato e rodapé.
- `src/styles.css`: identidade visual e layout mobile-first consolidados, sem os antigos blocos de sobrescritas.
- `src/components/Methodology.jsx` e `Methodology.css`: três etapas do acompanhamento, com um único CTA ao final e entrada discreta ao rolar.
- `src/components/Credentials.css`: galeria dos documentos reais; visualização ampliada utiliza dialog nativo, Escape e restauração do foco.
- `src/components/MDNationIntro.jsx` e seu CSS: vinheta de 1,9 segundo, com logo oficial, luz vermelha e transição. Uma vez por sessão (`mdnation:intro:seen`), opção de pular e suporte a movimento reduzido. O bootstrap de `index.html` libera o acesso em até 2 segundos mesmo se a montagem do React falhar. Para rever, remova a chave da sessão e recarregue.
- `src/content.js`: dados reais, links, textos e imagens editáveis.
- `index.html`: metadados, canonical e Open Graph para `https://mdnation.vercel.app/`.

WhatsApp configurado: **+55 16 99645-5766**. Os botões utilizam o número e a mensagem inicial centralizados em `src/content.js`.

## Imagens e documentos

Os arquivos originais recebidos permanecem intactos em `public/images/`. A interface utiliza versões WebP mais leves para fotos e miniaturas. A hero escolhe entre 800 e 1400 px via srcset. Os certificados ampliados e seus links continuam usando os documentos JPEG originais, sem distorção. As fontes são hospedadas no próprio projeto.

Certificados: `IMG_7748.JPG.jpeg` (workshop de membros inferiores), `IMG_7747.JPG.jpeg` (ENAF) e `IMG_7746.JPG.jpeg` (Personal Faixa Preta). O responsável confirmou que o último também pertence ao Matheus Dias da MD Nation, apesar da diferença de nome no documento.

As cenas de metodologia e jornada são ilustrações por IA, identificadas na página. Não são resultados ou depoimentos de alunos.

## Validação e publicação

Antes da publicação, Matheus deve confirmar os textos de metodologia, benefícios e FAQ e fornecer eventuais resultados e depoimentos reais autorizados. Não foram adicionadas condições comerciais, promessas de resultado nem qualificações fictícias.

O redesign deve ser conferido em 320, 375, 390, 430, 768, 1024 e 1440 px, incluindo menu, FAQ, galeria, WhatsApp, movimento reduzido e sessão da abertura. Os arquivos de teste e o relatório de execução são mantidos em `validation/`. Publicar a branch não substitui confirmar o deploy na Vercel. Contato e redes sociais são validados pelos destinos dos links; não foram enviadas mensagens.
