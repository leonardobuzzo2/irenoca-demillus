import { FaStar } from 'react-icons/fa';
import styles from './styles.module.css';

const depoimentos = [
  {
    name: 'Mariana S.',
    city: 'São Paulo, SP',
    text: 'Atendimento maravilhoso! A Irene tem um cuidado especial com cada cliente. As peças são de excelente qualidade e os preços são justos. Já indiquei para todas as minhas amigas!',
  },
  {
    name: 'Fernanda L.',
    city: 'Lapa, SP',
    text: 'Compro há anos na Irenoca Demillus e nunca me decepcionei. A variedade é incrível e o atendimento personalizado faz toda a diferença. Me sinto especial em cada visita.',
  },
  {
    name: 'Carla R.',
    city: 'Pinheiros, SP',
    text: 'Descobri a loja por indicação e me apaixonei! As lingeries são lindíssimas e o conforto é incomparável. A Irene realmente entende do que está fazendo. Voltarei sempre!',
  },
];

const Depoimentos = () => {
  return (
    <section id="depoimentos" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>O que dizem nossas clientes</span>
          <h2 className={styles.title}>Depoimentos</h2>
        </div>
        <div className={styles.grid}>
          {depoimentos.map(({ name, city, text }) => (
            <div key={name} className={styles.card}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className={styles.text}>"{text}"</p>
              <div className={styles.author}>
                <span className={styles.name}>{name}</span>
                <span className={styles.city}>{city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
