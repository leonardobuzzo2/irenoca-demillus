import { FaHeart, FaMoon, FaSun, FaUmbrellaBeach } from 'react-icons/fa';
import styles from './styles.module.css';

const categories = [
  {
    icon: FaHeart,
    name: 'Lingerie Sensual',
    description: 'Peças sofisticadas que valorizam cada curva com elegância e charme.',
  },
  {
    icon: FaMoon,
    name: 'Conforto Diário',
    description: 'Sutiãs, calcinhas e bodies para o dia a dia com leveza e praticidade.',
  },
  {
    icon: FaSun,
    name: 'Pijamas',
    description: 'Noites de sono com estilo, conforto e muita delicadeza.',
  },
  {
    icon: FaUmbrellaBeach,
    name: 'Moda Praia',
    description: 'Biquínis e maiôs para realçar sua beleza com confiança no verão.',
  },
];

const Categorias = () => {
  return (
    <section id="categorias" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>O que temos para você</span>
          <h2 className={styles.title}>Nossas Categorias</h2>
          <p className={styles.subtitle}>
            Uma seleção especial de peças que combinam beleza, conforto e elegância.
          </p>
        </div>
        <div className={styles.grid}>
          {categories.map(({ icon: Icon, name, description }) => (
            <a key={name} href="#catalogo" className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon />
              </div>
              <h3 className={styles.cardTitle}>{name}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categorias;
