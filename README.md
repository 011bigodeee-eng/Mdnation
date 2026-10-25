# MD Nation

Landing page de Matheus Dias em React, Vite, Tailwind CSS e Lucide React.

## Executar

Requer Node.js 20.19+ ou 22.12+ (validado com Node 24).

```sh
npm install
npm run dev
```

No ambiente de nuvem, se o cache padrão do npm não for gravável, use `npm install --cache /tmp/md-npm-cache`.

```sh
npm run build
npm run preview
```

`npm ci` reproduz as dependências do lockfile em instalações posteriores.

## Conteúdo e publicação

- Edite os dados, imagens, textos, metodologia, benefícios e FAQ em `src/content.js`.
- WhatsApp configurado em `site.whatsappNumber`: +55 16 99645-5766. Os CTAs usam esse número com a mensagem inicial já preparada. Para trocar o número, mantenha somente dígitos, incluindo país e DDD.
- Valide metodologia, benefícios, respostas do FAQ e apresentação profissional com Matheus antes de publicar.
- Envie fotos de resultados e depoimentos reais autorizados. A galeria de resultados mantém espaços reservados, sem exemplos fictícios. Três certificados reais recebidos foram incluídos na seção de certificações.
- As imagens originais estão em `public/images/`, com os nomes recebidos no ZIP, incluindo `.JPG.jpeg`. Os arquivos originais foram preservados.
- Configure o domínio definitivo e a URL absoluta de `og:image` em `index.html` antes de compartilhar em redes sociais.
- O build estático fica em `dist/`, pronto para hospedagem estática. Fontes Inter e Barlow Condensed são hospedadas no próprio projeto, sem dependência do Google Fonts.

## Componentes

`Header`, `Hero`, `BrandStrip`, `About`, `Methodology`, `Benefits`, `Results`, `Credentials`, `FAQ`, `FinalCTA` e `Footer` estão em `src/main.jsx`. Layout e animações estão em `src/styles.css`, com suporte a movimento reduzido, menu por teclado, FAQ acessível e imagens abaixo da dobra com lazy loading.

## Certificados recebidos

Incluídos: `IMG_7748.JPG.jpeg` (workshop de membros inferiores), `IMG_7747.JPG.jpeg` (ENAF) e `IMG_7746.JPG.jpeg` (Personal Faixa Preta). O responsável confirmou que o último também pertence ao Matheus Dias da MD Nation, apesar da diferença de nome no documento. Todos os originais foram preservados.

## Abertura cinematográfica

`src/components/MDNationIntro.jsx` e seu CSS controlam a abertura de 3,6 segundos, sem dependências adicionais de animação. Há 0,5 segundo inicial de tela preta, revelação da marca, luz nas letras, expansão e fade para a página. O bootstrap em `index.html` evita mostrar a página antes da montagem do React; um fallback libera o conteúdo se a montagem falhar.

A chave `mdnation:intro:seen` do sessionStorage evita repetir a abertura na mesma sessão. Para rever em desenvolvimento, remova essa chave nas ferramentas do navegador e recarregue, ou use uma nova sessão. Com `prefers-reduced-motion: reduce`, a página abre imediatamente. O botão Pular introdução e a tecla Escape encerram a abertura; foco e rolagem são restaurados. Se o armazenamento estiver bloqueado, a abertura continua funcionando, mas pode repetir em outra navegação. A introdução não usa vídeo, serviços externos nem downloads adicionais de fontes.
