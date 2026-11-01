import { useState, useEffect, useCallback } from 'react';
import { FaWhatsapp, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './styles.module.css';

type Category = 'todas' | 'feminino' | 'novidades' | 'fitness' | 'noite' | 'masculino';

interface Product {
  id: number;
  src: string;
  name: string;
  description: string;
  category: Exclude<Category, 'todas'>;
  tag: string;
}

const products: Product[] = [
  // ── Feminino ──────────────────────────────────────────────
  {
    id: 1,
    src: '/images/sutia-magenta.jpg',
    name: 'Sutiã Aninha — Magenta',
    description: 'Sutiã Aninha Ultraleve em magenta vibrante. Conforto e elegância para o dia a dia.',
    category: 'feminino',
    tag: 'Feminino',
  },
  {
    id: 2,
    src: '/images/sutia-preto.jpg',
    name: 'Sutiã Aninha — Preto',
    description: 'Clássico e sofisticado. Sutiã ultraleve perfeito para qualquer ocasião.',
    category: 'feminino',
    tag: 'Feminino',
  },
  {
    id: 3,
    src: '/images/sutia-bege.jpg',
    name: 'Sutiã Aninha — Bege Rosado',
    description: 'Tom suave e natural, ideal para o uso diário com total discrição.',
    category: 'feminino',
    tag: 'Feminino',
  },
  // ── Novidades ─────────────────────────────────────────────
  {
    id: 4,
    src: '/images/sutia-argent.jpg',
    name: 'Sutiã Argent',
    description: 'Lançamento exclusivo com design refinado e alto conforto. Novidade da coleção.',
    category: 'novidades',
    tag: 'Novidades',
  },
  {
    id: 5,
    src: '/images/sutia-sonata-vermelho.jpg',
    name: 'Sutiã Sonata — Chic Red',
    description: 'Vermelho vibrante para quem não tem medo de ousar. Tamanhos 48 a 56.',
    category: 'novidades',
    tag: 'Novidades',
  },
  {
    id: 6,
    src: '/images/sutia-sonata-verde.jpg',
    name: 'Sutiã Sonata — Verde Esmeralda',
    description: 'Verde esmeralda elegante e moderno. Um dos destaques da nova coleção.',
    category: 'novidades',
    tag: 'Novidades',
  },
  // ── Fitness ───────────────────────────────────────────────
  {
    id: 7,
    src: '/images/fitness-top.jpg',
    name: 'Top Stadium Ultraleve',
    description: 'Top esportivo com tecnologia de alto desempenho. Ideal para treinos intensos.',
    category: 'fitness',
    tag: 'Fitness',
  },
  {
    id: 8,
    src: '/images/fitness-legging-preta.jpg',
    name: 'Legging Bio Ultraleve — Preto',
    description: 'Legging com fio Amni Soul Eco, cintura canelada. Conforto e sustentação.',
    category: 'fitness',
    tag: 'Fitness',
  },
  {
    id: 9,
    src: '/images/fitness-legging-verde.jpg',
    name: 'Legging Bio Ultraleve — Verde',
    description: 'Leveza e mobilidade para qualquer atividade. Tecido de alta elasticidade.',
    category: 'fitness',
    tag: 'Fitness',
  },
  // ── Noite ─────────────────────────────────────────────────
  {
    id: 10,
    src: '/images/camisola-full.jpg',
    name: 'Camisola Di Carla',
    description: 'Camisola delicada para noites especiais. Tecido leve, macio e feminino.',
    category: 'noite',
    tag: 'Noite & Pijamas',
  },
  {
    id: 11,
    src: '/images/camisola-ferveur.jpg',
    name: 'Camisola Ferveur',
    description: 'Lançamento da linha noite. Sofisticada e confortável para noites perfeitas.',
    category: 'noite',
    tag: 'Noite & Pijamas',
  },
  {
    id: 12,
    src: '/images/camisola-ferveur2.jpg',
    name: 'Camisola Ferveur — Rosa',
    description: 'Delicadeza em tons suaves. Perfeita para presentear ou se presentear.',
    category: 'noite',
    tag: 'Noite & Pijamas',
  },
  // ── Masculino (Zeus) ──────────────────────────────────────
  {
    id: 13,
    src: '/images/zeus-boxer-preto.jpg',
    name: 'Boxer Bio Esportiva — Preto',
    description: 'Fio Amni Soul Eco com alta elasticidade e resistência. Linha Zeus masculina.',
    category: 'masculino',
    tag: 'Masculino',
  },
  {
    id: 14,
    src: '/images/zeus-boxer-vinho.jpg',
    name: 'Boxer Bio Esportiva — Vinho',
    description: 'Microfilamento ultraleve para máximo conforto no dia a dia.',
    category: 'masculino',
    tag: 'Masculino',
  },
  {
    id: 15,
    src: '/images/zeus-boxer-azul.jpg',
    name: 'Boxer Bio Esportiva — Azul',
    description: 'Tecnologia esportiva com estilo. O melhor da linha Zeus DeMillus.',
    category: 'masculino',
    tag: 'Masculino',
  },
];

const filters: { key: Category; label: string }[] = [
  { key: 'todas',    label: 'Todas' },
  { key: 'feminino', label: 'Feminino' },
  { key: 'novidades',label: 'Novidades' },
  { key: 'fitness',  label: 'Fitness' },
  { key: 'noite',    label: 'Noite & Pijamas' },
  { key: 'masculino',label: 'Masculino' },
];

const Galeria = () => {
  const [active, setActive]     = useState<Category>('todas');
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = active === 'todas' ? products : products.filter(p => p.category === active);

  const openLightbox  = (p: Product) => setSelected(p);
  const closeLightbox = useCallback(() => setSelected(null), []);

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

  const waLink = (name: string) =>
    `https://wa.me/5511965729586?text=Ol%C3%A1!%20Tenho%20interesse%20em%3A%20${encodeURIComponent(name)}`;

  return (
    <section id="galeria" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Produtos DeMillus</span>
          <h2 className={styles.title}>Nossa Galeria</h2>
          <p className={styles.subtitle}>
            Confira nossa seleção por categoria. Clique em qualquer peça para ver os detalhes.
          </p>
        </div>

        <div className={styles.filters}>
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${active === key ? styles.filterActive : ''}`}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map(product => (
            <button
              key={product.id}
              className={styles.card}
              onClick={() => openLightbox(product)}
            >
              <div className={styles.imageWrap}>
                <img src={product.src} alt={product.name} className={styles.image} loading="lazy" />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardOverlayText}>Ver detalhes</span>
                </div>
              </div>
              <div className={styles.info}>
                <span className={styles.tag}>{product.tag}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.cta}>
                  <FaWhatsapp /> Tenho interesse
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className={styles.lightboxBackdrop} onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className={styles.lightbox} onClick={e => e.stopPropagation()}>
            <button className={styles.lbClose} onClick={closeLightbox} aria-label="Fechar">
              <FaTimes />
            </button>

            <button className={`${styles.lbArrow} ${styles.lbArrowLeft}`} onClick={() => navigate(-1)} aria-label="Anterior">
              <FaChevronLeft />
            </button>
            <button className={`${styles.lbArrow} ${styles.lbArrowRight}`} onClick={() => navigate(1)} aria-label="Próximo">
              <FaChevronRight />
            </button>

            <div className={styles.lbImageCol}>
              <img src={selected.src} alt={selected.name} className={styles.lbImage} />
            </div>

            <div className={styles.lbInfo}>
              <span className={styles.lbTag}>{selected.tag}</span>
              <h3 className={styles.lbName}>{selected.name}</h3>
              <p className={styles.lbDesc}>{selected.description}</p>

              <a
                href={waLink(selected.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.lbWhatsapp}
                onClick={closeLightbox}
              >
                <FaWhatsapp /> Tenho interesse nessa peça
              </a>

              <button className={styles.lbCancel} onClick={closeLightbox}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;
