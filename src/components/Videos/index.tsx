import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import styles from './styles.module.css';

type Video = {
  id: string;
  title: string;
  duration: string;
  framedThumb?: boolean;
};

const destaques: Video[] = [
  { id: 'WsXIRAdGCp4', title: 'Fashion Film C19-01/27', duration: '0:52' },
  { id: 'h1betBfmm2c', title: 'Lançamentos da Revista C19-01/27', duration: '18:15' },
  { id: 'wLnoqeDAk_w', title: 'Grazi Massafera, a nova embaixadora DeMillus', duration: '0:41' },
  { id: '5Tcs1iLdqTw', title: 'Lançamentos das Campanhas 19-01/27', duration: '29:44' },
];

const medidas: Video[] = [
  { id: 'VwXB_fJQW-c', title: 'Descubra o tamanho certo do seu sutiã', duration: '3:47' },
  { id: 'iQzmGjUUHjc', title: 'Como descobrir suas medidas com a fita métrica DeMillus', duration: '3:54', framedThumb: true },
];

const VideoCard = ({ id, title, duration, framedThumb }: Video) => {
  const [playing, setPlaying] = useState(false);

  return (
    <article className={styles.videoCard}>
      <div className={styles.player}>
        {playing ? (
          <iframe
            ref={el => el?.focus()}
            className={styles.frame}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.thumbButton}
            onClick={() => setPlaying(true)}
            aria-label={`Assistir: ${title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              width={480}
              height={360}
              className={framedThumb ? `${styles.thumb} ${styles.thumbFramed}` : styles.thumb}
            />
            <span className={styles.playIcon} aria-hidden="true">
              <FaPlay />
            </span>
            <span className={styles.duration} aria-hidden="true">{duration}</span>
          </button>
        )}
      </div>
      <p className={styles.videoTitle}>{title}</p>
    </article>
  );
};

const Videos = () => {
  return (
    <section id="videos" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Fique por dentro</span>
          <h2 className={styles.title}>Novidades da Campanha</h2>
          <p className={styles.subtitle}>
            Vídeos do canal oficial da DeMillus no YouTube com os lançamentos da nova campanha.
            Somos revendedora independente dos produtos DeMillus.
          </p>
        </div>

        <div className={styles.grid}>
          {destaques.map(video => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>

        <div className={styles.sizes}>
          <div className={styles.sizesHeader}>
            <h3 className={styles.sizesTitle}>Acerte no tamanho</h3>
            <p className={styles.sizesText}>
              Dicas da DeMillus para descobrir o tamanho ideal de sutiã e calcinha antes de escolher suas peças.
            </p>
          </div>
          <div className={styles.sizesGrid}>
            {medidas.map(video => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
