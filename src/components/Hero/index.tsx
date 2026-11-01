import { useState, useEffect, useCallback } from 'react';
import { FaWhatsapp, FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './styles.module.css';

const slides = [
  { src: '/banner-loja.jpg', position: 'center' },
  { src: '/images/campanha1.jpg', position: 'center 15%' },
  { src: '/images/campanha2.jpg', position: 'center 15%' },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section className={styles.hero} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          style={{ backgroundImage: `url('${slide.src}')`, backgroundPosition: slide.position }}
        />
      ))}

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>
          Elegância que abraça,<br />conforto que transforma
        </h1>
        <p className={styles.subtitle}>
          Lingerie e roupas íntimas selecionadas com cuidado para você
        </p>
        <div className={styles.ctas}>
          <a href="#catalogo" className={styles.btnPrimary}>
            <FaBookOpen /> Veja o Catálogo
          </a>
          <a
            href="https://wa.me/5511965729586"
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
