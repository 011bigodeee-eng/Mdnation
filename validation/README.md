# Validação do redesign

Executada no build de produção servido por `vite preview`, com Chromium headless no ambiente Linux. Todas as verificações abaixo passaram.

## Layout e funcionamento

| Largura | Overflow horizontal / texto cortado | Menu | FAQ | Jornada manual | Certificados e Escape | WhatsApp |
| --- | --- | --- | --- | --- | --- | --- |
| 320 px | Ausentes | OK | OK | OK | OK | OK |
| 375 px | Ausentes | OK | OK | OK | OK | OK |
| 390 px | Ausentes | OK | OK | OK | OK | OK |
| 430 px | Ausentes | OK | OK | OK | OK | OK |
| 768 px | Ausentes | OK | OK | OK | OK | OK |
| 1024 px | Ausentes | Desktop | OK | OK | OK | OK |
| 1440 px | Ausentes | Desktop | OK | OK | OK | OK |

- Build Vite concluído e `git diff --check` aprovado.
- Menu fecha após seleção e com Escape, com restauração do foco.
- Três etapas, sem barra de seleção ou numeração repetida, e um único CTA ao final.
- Nenhuma sobreposição entre os cards de metodologia; cards empilhados abaixo de 1024 px.
- Botões principais, controles e links dos cards com pelo menos 44 px de altura.
- Links de WhatsApp preservam `5516996455766` e a mensagem pré-preenchida. Não foram enviadas mensagens.
- Todos os destinos de âncoras existem. Uma única tag h1 e metadados canonical/Open Graph confirmados.
- Certificados abrem documentos originais no dialog, fecham com Escape e retornam o foco ao botão acionado.
- Imagens verificadas após rolagem; nenhuma imagem quebrada. Fotos e documentos originais preservados.
- Sem erros JavaScript observados durante os fluxos testados.

## Abertura e acessibilidade

Vinheta de 1,9 segundo, com limite de segurança de 2 segundos. Primeira sessão, recarga na mesma sessão, botão Pular introdução, bloqueio temporário de scroll/foco e liberação final verificados. Movimento reduzido abre a página diretamente. O watchdog também foi testado bloqueando a entrada JavaScript do build, confirmando a retirada do bloqueio visual; ele não substitui o JavaScript da aplicação se o próprio bundle não carregar.

Marcação semântica, nomes acessíveis dos controles, atributos de expansão do FAQ/menu, contraste de superfícies/texto, navegação básica por teclado e foco do dialog revisados. Não se trata de uma auditoria completa WCAG nem de teste com leitor de tela real.

## Imagens e estabilidade

O conjunto equivalente de oito imagens/miniaturas utilizado pela interface passou de **7.510.192 para 739.222 bytes**, redução de **90,2%**, sem contar fontes ou bundle. O navegador escolhe apenas uma variante da hero via srcset; os originais dos certificados são carregados ao ampliar. Originais continuam disponíveis no repositório.

Na medição local de carregamento inicial em 390 e 1440 px, o acumulado de layout shifts sem interação foi **0**. Isso não é uma garantia de Core Web Vitals em dispositivos e redes reais.

## Capturas

Capturas de desktop e mobile foram geradas e revisadas em `/workspace/artifacts/mdnation-redesign/`. A execução completa também salva imagens em `/tmp/md-nation-validation/`, incluindo hero, página completa, metodologia, certificações, contato e introdução.

## Reproduzir

Com Playwright e Chromium disponíveis no ambiente:

```sh
npm run build
npm run preview -- --port 4173
VALIDATION_URL=http://127.0.0.1:4173 node validation/check.cjs
```

Se Playwright não estiver no caminho padrão, use `PLAYWRIGHT_MODULE=/caminho/para/playwright`. O executável pode ser configurado em `CHROMIUM_PATH`, e o diretório de saída em `VALIDATION_OUTPUT`. Playwright não foi adicionado às dependências da aplicação.

## Arquivos alterados e limites

- `src/main.jsx`: composição, navegação, hero, seções institucionais, galeria, FAQ, contato e rodapé.
- `src/styles.css`: estilos consolidados e breakpoints mobile-first.
- `src/content.js`: caminhos otimizados e textos das etapas solicitados no briefing.
- `src/components/Methodology.jsx` e `.css`: cards e CTA único.
- `src/components/Credentials.css`: documentos limpos e responsivos.
- `src/components/MDNationIntro.jsx` e `.css`: vinheta e tempos atualizados, sem efeitos antigos.
- `index.html`: fallback da introdução, canonical, metadados sociais e dados estruturados reais.
- `public/images/*.webp`: nove derivados otimizados, mantendo JPEGs e PNGs originais.
- `README.md`, `validation/check.cjs` e este relatório: instruções e evidências.

Nenhuma dependência da aplicação foi adicionada; package.json e lockfile permanecem iguais. O trabalho foi feito no checkout existente.

Não foram verificados aparelhos físicos, Safari/iOS, envio real pelo WhatsApp ou status do deploy na Vercel. Métodos, benefícios e condições do acompanhamento ainda precisam da validação editorial do responsável antes da publicação definitiva.
