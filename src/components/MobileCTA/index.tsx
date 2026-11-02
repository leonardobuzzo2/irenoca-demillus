import { FaDownload, FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.css';

const MobileCTA = () => (
  <div className={styles.bar}>
    <a href="/catalogo.pdf" download className={styles.btnCatalogo}>
      <FaDownload />
      <span>Catálogo</span>
    </a>
    <a
      href="https://wa.me/5511944669394?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Irenoca%20Demillus."
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btnWhatsapp}
    >
      <FaWhatsapp />
      <span>WhatsApp</span>
    </a>
  </div>
);

export default MobileCTA;
