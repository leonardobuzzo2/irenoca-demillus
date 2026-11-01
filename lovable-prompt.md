# PROMPT PARA O LOVABLE — Site Irenoca Demillus

Copie tudo abaixo da linha e cole no Lovable.

---

Crie um site institucional completo, elegante e feminino para a loja **Irenoca Demillus**, especializada em lingerie e roupas íntimas, fundada em 2015 por Irene dos Santos Buzzo, localizada na Lapa, São Paulo. O site é uma vitrine digital (one-page com âncoras), sem e-commerce.

## 1. IDENTIDADE VISUAL (Design System)

Crie design tokens centralizados (CSS variables / tailwind.config) — nunca use cores hardcoded nos componentes:

- `--color-primary: #C22E78` (rosa fúcsia — cor principal da marca)
- `--color-primary-light: #E8729A` (hover, destaques)
- `--color-primary-soft: #FCE4EC` (backgrounds suaves)
- `--color-accent: #D4AF37` (dourado — detalhes de luxo)
- `--color-dark: #1A1A2E` (textos)
- `--color-gray: #6B7280` (textos secundários)
- `--color-bg: #FFF8FA` (fundo geral off-white rosado)

Tipografia (Google Fonts, carregadas com `font-display: swap` e preconnect):
- Títulos: **Playfair Display** (400, 700)
- Corpo/UI: **Poppins** (300, 400, 500, 600)

Estilo: border-radius 12px em cards, botões pill (50px), sombra suave rosa `0 4px 20px rgba(194, 46, 120, 0.12)`, seções com `padding: 80px 0`, micro-animações sutis de entrada (fade/slide via IntersectionObserver ou framer-motion com `prefers-reduced-motion` respeitado).

## 2. DADOS REAIS DA LOJA (usar exatamente estes)

- Nome: Irenoca Demillus
- Fundadora: Irene dos Santos Buzzo — fundada em 2015 (10+ anos)
- Endereço: Rua Doze de Outubro, 235, Loja 22 — Lapa, São Paulo, SP — CEP 05073-001
- WhatsApp: (11) 96572-9586 → link `https://wa.me/5511965729586`
- Instagram: @irenocademillus
- Facebook: ConsultoraIrenocaDeMillus
- Mercado Livre: https://www.mercadolivre.com.br/perfil/irenocademillus

## 3. SEÇÕES DO SITE (nesta ordem)

1. **Header (sticky)** — logo/nome em tipografia estilizada, navegação com âncoras (Sobre | Categorias | Catálogo | Vídeos | Localização | Contato), ícones de redes sociais (Instagram, Facebook, WhatsApp, Mercado Livre). Menu hamburger acessível no mobile (com `aria-expanded`, fecha com Esc e ao clicar em link). Fundo `#FCE4EC`.

2. **Hero** — banner full-width (90vh desktop, 60vh mobile) com imagem de fundo (placeholder elegante com gradiente rosa até eu subir a foto real) e overlay gradiente. Tagline: *"Elegância que abraça, conforto que transforma"*. Subtítulo: *"Lingerie e roupas íntimas selecionadas com cuidado para você"*. Dois CTAs: "Veja o Catálogo" (âncora #catalogo) e "Fale pelo WhatsApp" (link wa.me).

3. **Sobre** — imagem à esquerda + texto à direita (empilha no mobile). História da Irene e da loja desde 2015. Destaque grande "10+ anos" na cor primária. 3 cards de pilares: Qualidade | Atendimento | Confiança.

4. **Categorias** — grid de 4 cards com ícone + nome: Lingerie Sensual | Conforto Diário | Pijamas | Moda Praia. Hover eleva o card com sombra rosa. Cada card ancora para #catalogo. Grid 4 colunas desktop → 2 tablet → 1 mobile.

5. **Catálogo** — seção com fundo `#C22E78`, texto sobre o catálogo do mês e botão principal "Solicitar catálogo pelo WhatsApp" (link wa.me com mensagem pré-preenchida via `?text=`). Deixe preparado um botão secundário de download de PDF que só aparece se o arquivo existir.

6. **Vídeos — "Novidades e Promoções"** — grid 2 colunas (1 no mobile) com 4 placeholders elegantes (ícone de play + "Em breve"), prontos para receber embeds futuros. Se usar embeds, carregar com facade pattern (thumbnail + clique para carregar iframe) para não pesar a página.

7. **Depoimentos** — 3 cards com estrelas ★★★★★, depoimento, nome e cidade (crie 3 depoimentos realistas de clientes satisfeitas). Fundo `#FCE4EC`. Carrossel scrollável com snap no mobile.

8. **Localização** — endereço completo, horário de funcionamento (placeholder "Seg–Sáb, 9h às 18h"), e mapa do Google Maps embutido apontando para "Rua Doze de Outubro, 235, Lapa, São Paulo" — o iframe do mapa deve ser lazy-loaded (`loading="lazy"`) e só renderizar quando entrar no viewport.

9. **Contato** — CTA grande e impactante de WhatsApp com texto motivacional, número visível (11) 96572-9586, e ícones das redes sociais.

10. **Footer** — logo/tagline, links rápidos (âncoras), endereço, horário, redes sociais, copyright dinâmico com o ano atual.

Botão flutuante de WhatsApp fixo no canto inferior direito, visível em todas as seções.

## 4. ARQUITETURA E QUALIDADE DE CÓDIGO

- **React + TypeScript com modo strict**, sem `any`. Componentização por seção: cada seção é um componente isolado e reutilizável.
- **Dados separados da apresentação**: informações da loja (endereço, telefone, redes, depoimentos, categorias) centralizadas em um arquivo `src/data/store.ts` tipado — nunca strings soltas dentro do JSX. Assim eu atualizo o conteúdo em um lugar só.
- Design tokens centralizados (item 1) como única fonte de verdade de estilo.
- Componentes puros e sem estado desnecessário; estado apenas onde precisa (menu mobile, carrossel).
- Estrutura de pastas limpa: `components/`, `data/`, `hooks/`, `lib/`.
- Sem dependências desnecessárias — prefira soluções nativas (CSS scroll-snap, IntersectionObserver) a bibliotecas pesadas.

## 5. PERFORMANCE (meta: Lighthouse 95+ em todas as métricas)

- Imagens otimizadas: formatos modernos (WebP/AVIF), `srcset`/`sizes` responsivos, `width`/`height` explícitos para evitar CLS, `loading="lazy"` em tudo abaixo da dobra e `fetchpriority="high"` apenas na imagem do Hero (LCP).
- Lazy loading de seções pesadas (mapa, vídeos) via IntersectionObserver / `React.lazy`.
- Fontes: preconnect ao Google Fonts, `font-display: swap`, carregar apenas os pesos listados.
- Zero layout shift: reservar espaço para todos os elementos assíncronos.
- CSS crítico enxuto, sem frameworks de UI pesados.
- Animações apenas com `transform`/`opacity` (GPU-friendly).

## 6. SEGURANÇA (melhores práticas atuais)

- Todos os links externos com `target="_blank"` devem ter `rel="noopener noreferrer"`.
- Nenhuma chave de API, token ou segredo no código do frontend.
- Sem `dangerouslySetInnerHTML`; todo conteúdo renderizado de forma segura pelo React.
- Iframes (mapa) com atributo `sandbox`/`referrerpolicy` apropriados e apenas de origens confiáveis (google.com/maps).
- Configurar headers de segurança no deploy (arquivo de headers da plataforma): `Content-Security-Policy` restritiva (permitindo apenas self, Google Fonts e Google Maps), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` mínima.
- HTTPS obrigatório (padrão do deploy do Lovable).
- Sem coleta de dados pessoais / sem formulários que enviem dados — todo contato via WhatsApp.

## 7. SEO E ACESSIBILIDADE

- HTML semântico: `header`, `nav`, `main`, `section` com headings hierárquicos (um único `h1` no Hero).
- Meta tags completas em pt-BR: title ("Irenoca Demillus — Lingerie e Moda Íntima na Lapa, SP"), description, Open Graph e Twitter Card.
- **Schema.org JSON-LD** de `LocalBusiness`/`ClothingStore` com nome, endereço, telefone, horário e geolocalização — essencial para o Google Maps/busca local.
- `lang="pt-BR"`, favicon, `robots.txt` e `sitemap.xml`.
- Acessibilidade WCAG 2.1 AA: contraste adequado (atenção ao texto sobre rosa), `alt` descritivo em todas as imagens, navegação completa por teclado, focus visible estilizado, `aria-label` nos ícones de redes sociais, áreas de toque ≥ 44px no mobile.

## 8. RESPONSIVIDADE

Mobile-first. Breakpoints: 768px (mobile) e 1024px (tablet). No mobile: menu hamburger, Hero 60vh com texto centralizado, Sobre em coluna, categorias em 1 coluna, vídeos em 1 coluna, depoimentos em carrossel com scroll-snap, footer empilhado.

## O QUE NÃO FAZER

Sem e-commerce/carrinho, sem backend, sem banco de dados, sem autenticação, sem blog, sem formulário de contato (só WhatsApp), sem cookies/trackers de terceiros.
