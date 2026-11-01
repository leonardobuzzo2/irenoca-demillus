# CLAUDE.md — Planejamento do Site Irenoca Demillus

## Visão Geral

Site institucional e vitrine digital para a loja **Irenoca Demillus**, especializada em lingerie e roupas íntimas. Fundada em 2015 por Irene dos Santos Buzzo, localizada na Lapa, São Paulo.

O objetivo é ter um site elegante, feminino e funcional, com identidade visual forte, inspirado na estrutura do site A Casa do Tênis (hero, sobre, catálogo, vídeos, localização, contato, footer) — mas com a cara e a história da Irenoca Demillus.

---

## Estado Atual do Projeto

O projeto já existe em `irenoca-demillus/` com a seguinte stack:

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** + **CSS Modules**
- **react-icons v5**

### Componentes existentes (precisam de refatoração)

| Componente   | Estado atual                                                    |
|--------------|-----------------------------------------------------------------|
| `Header`     | Funcional, falta menu mobile (hamburger) e responsividade       |
| `Hero`       | Sem imagem de fundo, visual básico                              |
| `Sobre`      | Estrutura boa, precisa de refinamento visual                    |
| `Catalogo`   | Referencia `/catalogo.pdf` local inexistente, precisa de fallback |
| `Videos`     | Referencia arquivos locais inexistentes, precisa de placeholder  |
| `Localizacao`| Mapa Google Maps embutido, ok. Precisa de refinamento visual    |
| `Contato`    | Funcional com WhatsApp, precisa de visual melhorado             |
| `Footer`     | Muito simples, será expandido                                   |

### Problema atual: CSS inconsistente

`App.tsx` mistura classes Tailwind com CSS Modules. Isso gera conflitos e é difícil de manter.

---

## Decisão de Arquitetura de Estilo

**Padrão adotado: CSS Modules puros com CSS Variables globais.**

Motivo: o usuário pediu explicitamente "index e styles". Cada componente terá:
```
ComponentName/
  index.tsx
  styles.module.css
```

O Tailwind será **removido** do fluxo de estilos dos componentes. Permanece no projeto mas sem uso ativo, para não quebrar a build. As variáveis de design ficam centralizadas em `src/styles/variables.css`.

---

## Design System

### Paleta de Cores

```css
--color-primary:       #C22E78;  /* Rosa fúcsia — cor principal da marca */
--color-primary-light: #E8729A;  /* Rosa médio — hover, destaques */
--color-primary-soft:  #FCE4EC;  /* Rosa muito suave — backgrounds */
--color-accent:        #D4AF37;  /* Dourado — detalhes de luxo */
--color-dark:          #1A1A2E;  /* Azul-escuro profundo — textos */
--color-gray:          #6B7280;  /* Cinza médio — textos secundários */
--color-white:         #FFFFFF;
--color-bg:            #FFF8FA;  /* Fundo geral — off-white rosado */
```

### Tipografia (Google Fonts)

| Uso             | Fonte              | Peso       |
|-----------------|--------------------|------------|
| Títulos (h1–h3) | **Playfair Display** | 400, 700   |
| Corpo / UI      | **Poppins**          | 300, 400, 500, 600 |

### Espaçamento e Bordas

- Border radius padrão: `12px` (cards), `50px` (botões pill)
- Sombra padrão: `0 4px 20px rgba(194, 46, 120, 0.12)`
- Seções: `padding: 80px 0`

---

## Estrutura de Arquivos (após refatoração)

```
irenoca-demillus/
├── public/
│   ├── logo.png              ← logo da loja (placeholder até ter o real)
│   ├── banner-loja.jpg       ← foto da loja para o Hero
│   ├── catalogo.pdf          ← PDF do catálogo (placeholder)
│   └── images/               ← imagens de produtos, equipe, etc.
│
├── src/
│   ├── styles/
│   │   ├── global.css        ← reset, variáveis, fontes, base
│   │   └── variables.css     ← só as CSS Variables (importado pelo global)
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── index.tsx     ← logo, nav, ícones sociais, menu mobile
│   │   │   └── styles.module.css
│   │   ├── Hero/
│   │   │   ├── index.tsx     ← banner full-width com imagem + tagline + CTA
│   │   │   └── styles.module.css
│   │   ├── Sobre/
│   │   │   ├── index.tsx     ← história da loja, fundadora, missão
│   │   │   └── styles.module.css
│   │   ├── Categorias/       ← NOVO
│   │   │   ├── index.tsx     ← cards de categorias: Lingerie, Pijamas, etc.
│   │   │   └── styles.module.css
│   │   ├── Catalogo/
│   │   │   ├── index.tsx     ← botão de download PDF + descrição
│   │   │   └── styles.module.css
│   │   ├── Videos/
│   │   │   ├── index.tsx     ← grid de vídeos com fallback visual
│   │   │   └── styles.module.css
│   │   ├── Depoimentos/      ← NOVO
│   │   │   ├── index.tsx     ← carrossel de depoimentos de clientes
│   │   │   └── styles.module.css
│   │   ├── Localizacao/
│   │   │   ├── index.tsx     ← endereço + mapa Google Maps embedded
│   │   │   └── styles.module.css
│   │   ├── Contato/
│   │   │   ├── index.tsx     ← WhatsApp CTA + redes sociais
│   │   │   └── styles.module.css
│   │   └── Footer/
│   │       ├── index.tsx     ← logo, links, endereço, horário, redes
│   │       └── styles.module.css
│   │
│   ├── App.tsx               ← monta as seções em sequência, sem Tailwind
│   ├── main.tsx
│   └── index.css             ← importa global.css apenas
```

---

## Seções do Site (ordem na página)

### 1. Header (sticky)
- Logo + nome "Irenoca Demillus"
- Navegação: Sobre | Categorias | Catálogo | Vídeos | Localização | Contato
- Ícones: Instagram, Facebook, WhatsApp, Mercado Livre
- **Menu hamburger** para mobile (estado aberto/fechado via useState)
- Cor de fundo: `--color-primary-soft` (`#FCE4EC`)

### 2. Hero
- Banner full-width (`100vw`, altura `90vh` no desktop, `60vh` no mobile)
- Imagem de fundo com overlay gradiente rosa
- Tagline: *"Elegância que abraça, conforto que transforma"*
- Subtítulo: *"Lingerie e roupas íntimas selecionadas com cuidado para você"*
- Botão CTA: "Veja o Catálogo" → ancora `#catalogo`
- Botão secundário: "Fale pelo WhatsApp" → link WhatsApp

### 3. Sobre
- Layout: imagem da loja à esquerda + texto à direita (inverte no mobile)
- Texto: história de Irene dos Santos Buzzo, fundada em 2015
- Destaque visual: "10+ anos" com número grande em `--color-primary`
- 3 cards de pilares: Qualidade | Atendimento | Confiança

### 4. Categorias (novo)
- Grid de 4 cards com ícone/imagem + nome da categoria
- Categorias: Lingerie Sensual | Conforto Diário | Pijamas | Moda Praia
- Hover: eleva o card com sombra rosa
- Cada card leva ao catálogo

### 5. Catálogo
- Fundo colorido (`--color-primary`)
- Texto descritivo sobre o catálogo do mês
- Botão de download do PDF (com ícone de download)
- Se o PDF não existir: botão "Solicitar pelo WhatsApp" como fallback

### 6. Vídeos
- Grid 2×2 de vídeos (2 colunas no desktop, 1 no mobile)
- Título da seção: "Novidades e Promoções"
- Se os vídeos locais não existirem: placeholder com ícone de play + texto "Em breve"
- Integração futura: links do Instagram/Reels

### 7. Depoimentos (novo)
- 3 cards com depoimentos de clientes (dados mockados para já ter conteúdo real)
- Estrelas (★★★★★), nome e cidade
- Fundo suave (`--color-primary-soft`)

### 8. Localização
- Título + endereço completo: Rua Doze de Outubro, 235, Loja 22 — Lapa, SP
- Horário de funcionamento
- Mapa Google Maps embutido (já existente, manter)

### 9. Contato
- CTA principal: botão WhatsApp grande
- Texto motivacional para o contato
- Número: (11) 96572-9586

### 10. Footer
- Logo + tagline
- Links rápidos (âncoras internas)
- Endereço e horário
- Ícones das redes sociais
- Copyright

---

## Responsividade

Breakpoints padrão:
- `max-width: 768px` → mobile
- `max-width: 1024px` → tablet
- Acima → desktop

Comportamentos mobile:
- Header: nav links colapsam em menu hamburger
- Hero: altura reduzida, texto centralizado
- Sobre: layout muda de lado a lado para coluna
- Grid de categorias: 2×2 → 1×4
- Grid de vídeos: 2 colunas → 1 coluna
- Depoimentos: carrossel scrollável
- Footer: stacked em coluna

---

## Dados Reais da Loja

| Info              | Valor                                                      |
|-------------------|------------------------------------------------------------|
| Nome              | Irenoca Demillus                                           |
| Fundadora         | Irene dos Santos Buzzo                                     |
| Fundação          | 2015                                                       |
| Endereço          | Rua Doze de Outubro, 235, Loja 22 — Lapa, São Paulo, SP    |
| CEP               | 05073-001                                                  |
| WhatsApp          | (11) 96572-9586 → `https://wa.me/5511965729586`            |
| Instagram         | `@irenocademillus`                                         |
| Facebook          | ConsultoraIrenocaDeMillus                                  |
| Mercado Livre     | `https://www.mercadolivre.com.br/perfil/irenocademillus`   |

---

## Checklist de Implementação

- [ ] 1. Criar `src/styles/variables.css` e `src/styles/global.css`
- [ ] 2. Atualizar `src/index.css` para importar `global.css`
- [ ] 3. Refatorar `App.tsx` — remover classes Tailwind, estrutura limpa
- [ ] 4. Refatorar `Header` → pasta `Header/index.tsx` + menu mobile
- [ ] 5. Refatorar `Hero` → fundo, overlay, CTA duplo
- [ ] 6. Refatorar `Sobre` → layout lado a lado, pilares, anos
- [ ] 7. Criar `Categorias` → novo componente com 4 cards
- [ ] 8. Refatorar `Catalogo` → fundo colorido, fallback WhatsApp
- [ ] 9. Refatorar `Videos` → placeholders visuais se arquivos ausentes
- [ ] 10. Criar `Depoimentos` → novo componente com 3 depoimentos mockados
- [ ] 11. Refatorar `Localizacao` → visual melhorado, endereço + horário
- [ ] 12. Refatorar `Contato` → CTA WhatsApp mais impactante
- [ ] 13. Refatorar `Footer` → expandido com todas as informações

---

## O que NÃO será feito (nesse escopo)

- Backend / banco de dados
- Sistema de e-commerce / carrinho de compras
- Autenticação
- Blog
- Upload de catálogo pelo admin
- Integração real com feed do Instagram (requer API)

---

## Perguntas para validação antes de começar

> Responda antes de eu iniciar o desenvolvimento:

1. **Imagens**: Você tem fotos da loja, dos produtos ou da Irene para usar? Se não, uso placeholders com gradiente rosa até ter.
2. **Catálogo PDF**: Tem um catálogo em PDF para disponibilizar para download? Se não, o botão vai redirecionar para o WhatsApp.
3. **Vídeos**: Tem vídeos para a seção de novidades? Se não, uso placeholders visuais.
4. **Logo**: Tem um arquivo de logo (PNG com fundo transparente)? Se não, uso o nome em tipografia estilizada.
5. **Depoimentos**: Tem depoimentos reais de clientes para usar? Se não, uso exemplos genéricos como placeholder.
6. **Horário de funcionamento**: Qual o horário da loja?
7. **Cor**: A cor `#C22E78` (fúcsia/rosa escuro) representa bem a marca? Quer ajustar?
