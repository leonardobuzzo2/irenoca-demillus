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
          <h2 className={styles.title}>Uma história de amor<br />pela moda íntima</h2>
          <p className={styles.text}>
            Fundada em 2015 por Irene dos Santos Buzzo (revendedora autorizada), a Irenoca DeMillus nasceu da paixão pela moda íntima feminina e do desejo de oferecer muito mais do que produtos: proporcionar às mulheres uma experiência de cuidado, autoestima e bem-estar.
          </p>
          <p className={styles.text}>
            Acreditamos que a lingerie vai muito além de uma peça de roupa. Ela representa feminilidade, liberdade e confiança — a conexão especial de cada mulher consigo mesma. Cada peça é escolhida com atenção e carinho, para acompanhá-la em todos os momentos da vida.
          </p>
          <p className={styles.text}>
            Hoje, a Irenoca DeMillus inicia uma nova etapa no ambiente digital, levando todo esse carinho e dedicação para online. Atendimento personalizado pelo WhatsApp, pronta entrega e pedidos semanais — porque para nós, cada cliente é especial.
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
