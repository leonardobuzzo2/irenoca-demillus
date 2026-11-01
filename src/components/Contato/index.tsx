import { FaWhatsapp, FaInstagram, FaFacebookF, FaShoppingBag } from 'react-icons/fa';
import styles from './styles.module.css';

const Contato = () => {
  return (
    <section id="contato" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Fale com a gente</span>
        <h2 className={styles.title}>Entre em Contato</h2>
        <p className={styles.text}>
          Tem alguma dúvida, quer saber mais sobre os produtos ou deseja um atendimento personalizado? Estamos aqui para você. É só chamar no WhatsApp — respondemos rapidinho!
        </p>

        <a
          href="https://wa.me/5511965729586?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Irenoca%20Demillus."
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          <FaWhatsapp className={styles.whatsappIcon} />
          <span>
            <strong>Chamar pelo WhatsApp</strong>
            <small>(11) 96572-9586</small>
          </span>
        </a>

        <p className={styles.orLabel}>Ou nos siga nas redes sociais</p>

        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/irenocademillus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaInstagram /> Instagram
          </a>
          <a
            href="https://www.facebook.com/ConsultoraIrenocaDeMillus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaFacebookF /> Facebook
          </a>
          <a
            href="https://www.mercadolivre.com.br/perfil/irenocademillus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaShoppingBag /> Mercado Livre
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contato;
