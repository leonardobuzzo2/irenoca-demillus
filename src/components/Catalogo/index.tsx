import { FaDownload, FaWhatsapp, FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa';
import { edicoesRevista, edicaoAtual, REVISTA_TODAS_EDICOES_URL } from '../../data/revista';
import styles from './styles.module.css';

const WHATSAPP_REVISTA_URL =
  'https://wa.me/5511944669394?text=Ol%C3%A1!%20Gostaria%20de%20receber%20o%20cat%C3%A1logo%20por%20WhatsApp.';

const Catalogo = () => {
  return (
    <section id="catalogo" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Novidades da estação</span>
          <h2 className={styles.title}>Revista Digital</h2>
          <p className={styles.text}>
            Folheie a revista DeMillus, escolha suas peças favoritas e faça seu pedido com a Irenoca Demillus. Baixe o PDF ou veja online a edição atual e a próxima.
          </p>
        </header>

        <div className={styles.grid}>
          {edicoesRevista.map(edicao => {
            const atual = edicao.id === edicaoAtual.id;
            return (
              <article key={edicao.id} className={styles.card}>
                <div className={styles.coverWrap}>
                  <img
                    src={edicao.capa}
                    alt={`Capa da revista DeMillus ${edicao.titulo}`}
                    width={750}
                    height={1046}
                    loading="lazy"
                    decoding="async"
                    className={styles.cover}
                  />
                </div>
                <div className={styles.info}>
                  <span className={atual ? styles.badgeAtual : styles.badge}>{edicao.rotulo}</span>
                  <h3 className={styles.cardTitle}>{edicao.titulo}</h3>
                  <p className={styles.cardSubtitle}>{edicao.subtitulo}</p>
                  <div className={styles.cardButtons}>
                    <a
                      href={edicao.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnPrimary}
                    >
                      <FaDownload aria-hidden="true" /> Baixar PDF
                    </a>
                    <a
                      href={edicao.folhearUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnSecondary}
                    >
                      <FaExternalLinkAlt aria-hidden="true" /> Folhear online
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.buttons}>
          <a
            href={WHATSAPP_REVISTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhite}
          >
            <FaWhatsapp aria-hidden="true" /> Receber pelo WhatsApp
          </a>
          <a
            href={REVISTA_TODAS_EDICOES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnOutline}
          >
            <FaBookOpen aria-hidden="true" /> Ver todas as edições
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
