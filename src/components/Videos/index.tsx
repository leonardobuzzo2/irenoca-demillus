import styles from './styles.module.css';

const videos = [
  { src: '/videos/tendencias1.mp4', title: 'Tendências da Estação' },
  { src: '/videos/tendencias2.mp4', title: 'Novidades Especiais' },
  { src: '/videos/tendencias3.mp4', title: 'Promoções Imperdíveis' },
  { src: '/videos/tendencias4.mp4', title: 'Looks do Momento' },
];

const Videos = () => {
  return (
    <section id="videos" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Fique por dentro</span>
          <h2 className={styles.title}>Novidades e Promoções</h2>
          <p className={styles.subtitle}>
            Veja os lançamentos e ofertas exclusivas da Irenoca Demillus.
          </p>
        </div>
        <div className={styles.grid}>
          {videos.map(({ src, title }) => (
            <div key={src} className={styles.videoCard}>
              <video controls preload="metadata" className={styles.video}>
                <source src={src} type="video/mp4" />
                Seu navegador não suporta vídeo.
              </video>
              <p className={styles.videoTitle}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
