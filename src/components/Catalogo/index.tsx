import { FaDownload, FaWhatsapp, FaBookOpen } from 'react-icons/fa';
import styles from './styles.module.css';

// URL do PDF mais recente da DeMillus. Atualize quando sair nova edição.
// Padrão: https://demillus.vestemuitomelhor.com.br/wp-content/uploads/AAAA/MM/AAAA-NN.pdf
const REVISTA_PDF_URL = 'https://demillus.vestemuitomelhor.com.br/wp-content/uploads/2026/04/2026-09.pdf';
const REVISTA_PAGE_URL = 'https://demillus.vestemuitomelhor.com.br/revista-digital/';

const Catalogo = () => {
  return (
    <section id="catalogo" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Novidades da estação</span>
          <h2 className={styles.title}>Revista Digital</h2>
          <p className={styles.text}>
            Descubra as novas coleções e tendências da DeMillus disponíveis aqui na Irenoca Demillus. Nossa revista digital traz uma seleção refinada de lingeries, fitness, pijamas e muito mais.
          </p>
          <div className={styles.buttons}>
            <a
              href={REVISTA_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhite}
            >
              <FaDownload /> Baixar Edição Atual (PDF)
            </a>
            <a
              href={REVISTA_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnOutlineLight}
            >
              <FaBookOpen /> Ver todas as edições
            </a>
            <a
              href="https://wa.me/5511965729586?text=Ol%C3%A1!%20Gostaria%20de%20receber%20o%20cat%C3%A1logo%20por%20WhatsApp."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnOutline}
            >
              <FaWhatsapp /> Receber pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
