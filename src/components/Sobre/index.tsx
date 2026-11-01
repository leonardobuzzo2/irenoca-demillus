import { FaStar, FaHeart, FaHandshake } from 'react-icons/fa';
import styles from './styles.module.css';

const pillars = [
  {
    icon: FaStar,
    title: 'Qualidade',
    desc: 'Produtos selecionados com os mais altos padrões de qualidade e conforto.',
  },
  {
    icon: FaHeart,
    title: 'Atendimento',
    desc: 'Um atendimento carinhoso e personalizado, pensado para cada cliente.',
  },
  {
    icon: FaHandshake,
    title: 'Confiança',
    desc: 'Mais de 10 anos construindo relações de confiança com nossas clientes.',
  },
];

const Sobre = () => {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <img src="/banner-loja.jpg" alt="Loja Irenoca Demillus" className={styles.image} />
          <div className={styles.badge}>
            <span className={styles.badgeNumber}>10+</span>
            <span className={styles.badgeLabel}>Anos de história</span>
          </div>
        </div>

        <div className={styles.textCol}>
          <span className={styles.eyebrow}>Nossa História</span>
          <h2 className={styles.title}>Feito com amor por<br />Irene dos Santos Buzzo</h2>
          <p className={styles.text}>
            Fundada em 2015 por Irene dos Santos Buzzo, a Irenoca Demillus nasceu da paixão pela moda íntima feminina. Inspirada na delicadeza e na força de cada mulher, a loja se tornou um espaço de confiança, elegância e carinho em plena Lapa, São Paulo.
          </p>
          <p className={styles.text}>
            Cada peça é escolhida com cuidado para que você se sinta única, confortável e confiante — porque beleza começa de dentro para fora.
          </p>

          <div className={styles.pillars}>
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.pillar}>
                <Icon className={styles.pillarIcon} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
