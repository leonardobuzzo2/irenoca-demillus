import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { FaWhatsapp, FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './styles.module.css';

type Slide = {
  src: string;
  position: string;
  headline: ReactNode;
  subtitle: string;
};

const slides: Slide[] = [
  {
    src: '/banner-loja.jpg',
    position: 'center',
    headline: <>Uma história de carinho<br />que continua.</>,
    subtitle: 'Agora, mais perto de você, onde estiver',
  },
  {
    src: '/images/campanha1.jpg',
    position: 'center 15%',
    headline: <>Lingerie que abraça<br />cada curva com delicadeza.</>,
    subtitle: 'Porque toda mulher merece se sentir especial — por dentro e por fora',
  },
  {
    src: '/images/campanha2.jpg',
    position: 'center 15%',
    headline: <>Conforto, estilo<br />e feminilidade em cada peça.</>,
    subtitle: 'Escolhidas com carinho para acompanhar você em todos os momentos',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          style={{ backgroundImage: `url('${slide.src}')`, backgroundPosition: slide.position }}
        />
      ))}

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 key={`h-${current}`} className={styles.title}>
          {slides[current].headline}
        </h1>
        <p key={`s-${current}`} className={styles.subtitle}>
          {slides[current].subtitle}
        </p>
        <div className={styles.ctas}>
          <a href="#catalogo" className={styles.btnPrimary}>
            <FaBookOpen /> Veja o Catálogo
          </a>
          <a
            href="https://wa.me/5511944669394"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            <FaWhatsapp /> Fale pelo WhatsApp
          </a>
        </div>
      </div>

      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Slide anterior">
        <FaChevronLeft />
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Próximo slide">
        <FaChevronRight />
      </button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
