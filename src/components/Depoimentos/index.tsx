import { FaStar, FaStarHalfAlt, FaGoogle, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './styles.module.css';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=irenoca+demillus#lrd=0x94cef864068566cf:0xf4f108dfac2b9540,1,,,,';

const avaliacoes = [
  {
    name: 'Màri S.',
    stars: 5,
    text: 'Ótimo atendimento, sempre atenciosos e me ajudam com minhas necessidades, sempre entregando produtos de qualidade. Compro sempre com eles!',
  },
  {
    name: 'Camila P.',
    stars: 5,
    text: 'Atendimento maravilhoso e personalizado! Comprei várias vezes e me surpreendi com a ótima qualidade dos produtos e atendimento impecável! Recomendo muito!',
  },
  {
    name: 'Lindinês F.',
    stars: 5,
    text: 'Excelente!!! Além dos produtos serem maravilhosos em detalhes e qualidades, somos bem atendidos, o preço é justo pois estamos pagando por um produto com longa durabilidade. Irenoca parabéns pelo seu trabalho 😘👏👏👏',
  },
  {
    name: 'Mayara M.',
    stars: 5,
    text: 'Irenoca, tem um excelente atendimento e atenção com seus produtos e clientes. Para quem busca lingerie a pronta entrega ou sob encomenda encontrou o lugar certo para realizar sua compra.',
  },
  {
    name: 'Andreia A.',
    stars: 5,
    text: 'Gente que lugar lindo, com peças lindas e o atendimento maravilhoso. Certeza que voltarei outras vezes. Indico muitooooo.',
  },
  {
    name: 'Ailson J.',
    stars: 5,
    text: 'Super indico, além do atendimento excelente, entrega rápida e preço justo.',
  },
  {
    name: 'Aline C.',
    stars: 5,
    text: 'Atendimento maravilhoso e os produtos de ótima qualidade.',
  },
];

const Depoimentos = () => {
  return (
    <section id="depoimentos" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Avaliações no Google</span>
          <h2 className={styles.title}>O que dizem nossas clientes</h2>
          <div className={styles.summary}>
            <span className={styles.score}>4,7</span>
            <div className={styles.summaryInfo}>
              <div className={styles.stars} role="img" aria-label="Nota 4,7 de 5">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              </div>
              <span className={styles.summaryText}>23 avaliações no Google</span>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.allLink}
          >
            Ver todas no Google <FaExternalLinkAlt />
          </a>
        </div>
        <div className={styles.grid}>
          {avaliacoes.map(({ name, stars, text }) => (
            <figure key={name} className={styles.card}>
              <div className={styles.stars} role="img" aria-label={`${stars} de 5 estrelas`}>
                {[...Array(stars)].map((_, i) => <FaStar key={i} />)}
              </div>
              <blockquote className={styles.text}>“{text}”</blockquote>
              <figcaption className={styles.author}>
                <span className={styles.name}>{name}</span>
                <span className={styles.source}><FaGoogle /> Avaliação no Google</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
