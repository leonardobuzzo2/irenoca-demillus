import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import styles from './styles.module.css';

const WhatsAppFloat = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      {tooltipVisible && (
        <div className={styles.tooltip}>
          <button
            className={styles.closeTooltip}
            onClick={() => setTooltipVisible(false)}
            aria-label="Fechar"
          >
            <FaTimes />
          </button>
          <p>Olá! Como posso te ajudar?</p>
          <a
            href="https://wa.me/5511965729586?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Irenoca%20Demillus."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tooltipBtn}
            onClick={() => setTooltipVisible(false)}
          >
            <FaWhatsapp /> Iniciar conversa
          </a>
        </div>
      )}

      <button
        className={styles.fab}
        onClick={() => setTooltipVisible(!tooltipVisible)}
        aria-label="Abrir WhatsApp"
      >
        <FaWhatsapp className={styles.icon} />
        <span className={styles.pulse} />
      </button>
    </div>
  );
};

export default WhatsAppFloat;
