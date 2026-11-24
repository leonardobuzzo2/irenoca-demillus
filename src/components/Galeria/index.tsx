import { useState, useEffect, useCallback, useRef, type CSSProperties } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSyncAlt, FaShoppingBag } from 'react-icons/fa';
import type { Frame360 } from '../Viewer360';
import DetalhePeca from './DetalhePeca';
import { categoryLabels, slugDe, type Category, type Product } from './tipos';
import { coresPorProduto } from '../../data/cores';
import { conjuntoPorProduto } from '../../data/conjuntos';
import styles from './styles.module.css';

type Filter = 'todas' | 'novidades' | 'giro' | 'conjuntos' | Category;

const giro = (slug: string, labels: string[]): Frame360[] =>
  labels.map(label => ({
    src: `/images/produtos/giro/${slug}-${label.toLowerCase()}.jpg`,
    label,
  }));

const MAX_BOLINHAS = 6;

const products: Product[] = [
  {
    id: 1,
    src: '/images/produtos/sutia-joli-demillus.jpg',
    name: 'Sutiã Joli DeMillus',
    description: 'Taças em espuma moldada com aro e bordado floral em tule, nas cores azul-frozen e rosa bebê.',
    category: 'sutias',
    novidade: true,
  },
  {
    id: 2,
    src: '/images/produtos/sutia-louco-amor.jpg',
    giro: giro('sutia-louco-amor', ['Frente', 'Lado', 'Costas']),
    name: 'Sutiã Louco Amor',
    description: 'Em renda elástica, com taças sem espuma e com aro, forro contrastante e um detalhe sensual no decote.',
    category: 'sutias',
    novidade: true,
  },
  {
    id: 3,
    src: '/images/produtos/sutia-demillus-miracle.jpg',
    name: 'Sutiã DeMillus Miracle',
    description: 'Romântico e delicado, com taças em espuma moldada com aro e renda elástica na cor pérola.',
    category: 'sutias',
  },
  {
    id: 4,
    src: '/images/produtos/sutia-basico-plus-ultraleve.jpg',
    name: 'Sutiã Básico Plus Ultraleve',
    description: 'Da coleção Ultraleve, sem costura, sem espuma, sem aro e sem fecho, com alças reguláveis de 15 mm para mais sustentação.',
    category: 'sutias',
  },
  {
    id: 5,
    src: '/images/produtos/fio-dental-xamego.jpg',
    name: 'Fio-dental Xamego',
    description: 'Todo em renda elástica, sem elástico na cintura e com cavas em elástico leve, disponível em várias cores.',
    category: 'calcinhas',
    novidade: true,
  },
  {
    id: 6,
    src: '/images/produtos/biquini-bicolor.jpg',
    name: 'Biquíni Bicolor',
    description: 'Em tule elástico transparente com frente forrada em malha 100% algodão e detalhes contrastantes.',
    category: 'calcinhas',
  },
  {
    id: 7,
    src: '/images/produtos/biquini-basico-ultraleve.jpg',
    giro: giro('basico-ultraleve', ['Frente', 'Costas']),
    name: 'Biquíni Básico Ultraleve',
    description: 'Da coleção Ultraleve, sem costura, com cintura levemente baixa e elástico suave nas cavas.',
    category: 'calcinhas',
  },
  {
    id: 8,
    src: '/images/produtos/shortdoll-demillus-touch.jpg',
    name: 'Shortdoll DeMillus Touch',
    description: 'Todo em renda elástica com transparência, com taças duplas, abertura frontal, alças finas e short curtinho.',
    category: 'noite',
    novidade: true,
  },
  {
    id: 9,
    src: '/images/produtos/pijama-longo-purisme.jpg',
    name: 'Pijama Longo Purisme',
    description: 'Blusa de manga longa em malha 100% algodão e calça estampada em malha de poliéster e viscose, com elástico interno na cintura.',
    category: 'noite',
    novidade: true,
  },
  {
    id: 10,
    src: '/images/produtos/pijama-feminino-legging.jpg',
    name: 'Pijama Feminino Legging',
    description: 'Blusa em malha 100% algodão com as costas mais compridas e calça estampada em moletinho leve, com versão menina para combinar.',
    category: 'noite',
    novidade: true,
  },
  {
    id: 11,
    src: '/images/produtos/blusa-ermitage.jpg',
    name: 'Blusa Ermitage',
    description: 'Em microfibra de poliéster, com tecido respirável e toque macio para treinar com conforto.',
    category: 'fitness',
    grupoTamanho: 'superior',
  },
  {
    id: 12,
    src: '/images/produtos/bermuda-velvette-ultraleve.jpg',
    name: 'Bermuda Velvette Ultraleve',
    description: 'Em microfibra elástica Ultraleve, sem costura nas laterais e com canelado confortável na cintura.',
    category: 'fitness',
  },
  {
    id: 13,
    src: '/images/produtos/legging-voragem-ultraleve.jpg',
    giro: giro('legging-voragem', ['Frente', 'Costas']),
    name: 'Legging Voragem Ultraleve',
    description: 'Sem costura, com textura em canelado diagonal e canelado confortável na cintura e no punho da bainha.',
    category: 'fitness',
  },
  {
    id: 14,
    src: '/images/produtos/body-vectra-ultraleve.jpg',
    name: 'Body Vectra Ultraleve',
    description: 'Sem espuma e sem aro, com canelado de alta compressão no abdômen que suaviza as medidas da cintura.',
    category: 'bodies',
    novidade: true,
  },
  {
    id: 15,
    src: '/images/produtos/body-ternesse.jpg',
    name: 'Body Ternesse',
    description: 'Em elastano control com detalhes em renda elástica, moderada compressão e fecho entre as pernas.',
    category: 'bodies',
    novidade: true,
  },
  {
    id: 16,
    src: '/images/produtos/bermuda-alta-modellare.jpg',
    giro: giro('bermuda-modellare', ['Frente', 'Costas']),
    name: 'Bermuda Alta Modellare',
    description: 'Modelador de cintura alta em canelado duplo com alta compressão e barbatanas que evitam que a cintura enrole.',
    category: 'bodies',
  },
  {
    id: 17,
    src: '/images/produtos/bermuda-estampada-zeus.jpg',
    name: 'Bermuda Estampada Zeus',
    description: 'Em microfibra de poliéster, com bolsos nas laterais e nas costas e cós com elástico e amarração ajustável.',
    category: 'masculino',
  },
  {
    id: 18,
    src: '/images/produtos/boxer-linhas-ultraleve.jpg',
    name: 'Boxer Linhas Ultraleve',
    description: 'Em microfibra elástica Ultraleve, sem costura nas laterais, com alta elasticidade e resistência.',
    category: 'masculino',
  },
];

const filters: { key: Filter; label: string }[] = [
  { key: 'todas',     label: 'Todas' },
  { key: 'novidades', label: 'Novidades' },
  { key: 'giro',      label: 'Gire a peça' },
  { key: 'conjuntos', label: 'Conjuntos' },
  ...(Object.keys(categoryLabels) as Category[]).map(key => ({ key, label: categoryLabels[key] })),
];

const matches = (p: Product, filter: Filter) => {
  if (filter === 'todas') return true;
  if (filter === 'novidades') return !!p.novidade;
  if (filter === 'giro') return !!p.giro;
  if (filter === 'conjuntos') return !!conjuntoPorProduto[slugDe(p)];
  return p.category === filter;
};

const Galeria = () => {
  const [active, setActive]     = useState<Filter>('todas');
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = products.filter(p => matches(p, active));

  const openLightbox  = (p: Product) => setSelected(p);
  const closeLightbox = useCallback(() => setSelected(null), []);
  const abrirPeca     = useCallback((slug: string) => {
    const peca = products.find(p => slugDe(p) === slug);
    if (peca) setSelected(peca);
  }, []);

  // No celular a janela inteira rola: ao trocar de peça, volta para o topo.
  const lightboxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lightboxRef.current?.scrollTo({ top: 0 });
  }, [selected?.id]);

  const navigate = useCallback((dir: 1 | -1) => {
    if (!selected) return;
    const idx  = filtered.findIndex(p => p.id === selected.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setSelected(next);
  }, [selected, filtered]);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft')  navigate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [selected, closeLightbox, navigate]);

  return (
    <section id="galeria" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Produtos DeMillus</span>
          <h2 className={styles.title}>Nossa Galeria</h2>
          <p className={styles.subtitle}>
            Peças da coleção atual da DeMillus. Abra uma peça, escolha a cor e o tamanho e monte sua sacolinha para pedir pelo WhatsApp.
          </p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filtrar por categoria">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`${styles.filterBtn} ${active === key ? styles.filterActive : ''}`}
              aria-pressed={active === key}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map(product => {
            const cores = coresPorProduto[slugDe(product)]?.cores ?? [];
            return (
            <button
              key={product.id}
              type="button"
              className={styles.card}
              onClick={() => openLightbox(product)}
            >
              <div className={styles.imageWrap}>
                <img
                  src={product.src}
                  alt={product.name}
                  className={styles.image}
                  loading="lazy"
                  width={736}
                  height={900}
                />
                {product.novidade && <span className={styles.badge}>Novidade</span>}
                {product.giro && (
                  <span className={styles.badgeGiro}>
                    <FaSyncAlt aria-hidden="true" /> Gire a peça
                  </span>
                )}
                <div className={styles.cardOverlay}>
                  <span className={styles.cardOverlayText}>Ver detalhes</span>
                </div>
              </div>
              <div className={styles.info}>
                <span className={styles.tag}>{categoryLabels[product.category]}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                {cores.length > 1 && (
                  <span className={styles.dots} role="img" aria-label={`${cores.length} cores`}>
                    {cores.slice(0, MAX_BOLINHAS).map(c => (
                      <span
                        key={c.codigo}
                        className={styles.dot}
                        style={{ '--swatch': c.hex } as CSSProperties}
                        title={c.nome}
                        aria-hidden="true"
                      />
                    ))}
                    {cores.length > MAX_BOLINHAS && (
                      <span className={styles.dotMore} aria-hidden="true">+{cores.length - MAX_BOLINHAS}</span>
                    )}
                  </span>
                )}
                <div className={styles.cta}>
                  <FaShoppingBag aria-hidden="true" />
                  <span>{cores.length > 1 ? 'Ver cores e tamanhos' : 'Escolher tamanho'}</span>
                </div>
              </div>
            </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className={styles.lightboxBackdrop} onClick={closeLightbox} role="dialog" aria-modal="true" aria-label={selected.name}>
          <div className={styles.lightbox} ref={lightboxRef} onClick={e => e.stopPropagation()}>
            <button className={styles.lbClose} onClick={closeLightbox} aria-label="Fechar">
              <FaTimes />
            </button>

            <button className={`${styles.lbArrow} ${styles.lbArrowLeft}`} onClick={() => navigate(-1)} aria-label="Anterior">
              <FaChevronLeft />
            </button>
            <button className={`${styles.lbArrow} ${styles.lbArrowRight}`} onClick={() => navigate(1)} aria-label="Próximo">
              <FaChevronRight />
            </button>

            <DetalhePeca key={selected.id} produto={selected} onClose={closeLightbox} onAbrirPeca={abrirPeca} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;
