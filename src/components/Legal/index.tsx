import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Footer from '../Footer';
import { PAGINAS_LEGAIS, type TipoLegal } from './conteudo';
import styles from './styles.module.css';

const Legal = ({ tipo }: { tipo: TipoLegal }) => {
  const pagina = PAGINAS_LEGAIS[tipo];

  useEffect(() => {
    document.title = `${pagina.titulo} — Irenoca Demillus`;
    window.scrollTo(0, 0);
  }, [pagina.titulo]);

  return (
    <>
      <header className={styles.topbar}>
        <a href="/" className={styles.brand} aria-label="Irenoca Demillus — página inicial">
          <img src="/logo.png" alt="" className={styles.logo} />
          <span>Irenoca Demillus</span>
        </a>
        <a href="/" className={styles.back}>
          <FaArrowLeft aria-hidden="true" /> Voltar ao site
        </a>
      </header>

      <main className={styles.page}>
        <article className={styles.card}>
          <h1 className={styles.title}>{pagina.titulo}</h1>
          <p className={styles.updated}>Última atualização: {pagina.atualizadoEm}</p>
          <div className={styles.body}>{pagina.conteudo}</div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default Legal;
