import { FaWhatsapp, FaInstagram, FaFacebookF, FaShoppingBag } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import styles from './styles.module.css';

const Contato = () => {
  return (
    <section id="contato" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Fale com a gente</span>
        <h2 className={styles.title}>Entre em Contato</h2>
        <p className={styles.text}>
          Seu espaço DeMillus continua com você! Agora nosso atendimento é 100% online, com todo o carinho e atendimento personalizado que você merece. Produtos à pronta entrega e pedidos semanais — é só chamar no WhatsApp!
        </p>

        <a
          href="https://wa.me/5511944669394?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Irenoca%20Demillus."
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          <FaWhatsapp className={styles.whatsappIcon} />
          <span>
            <strong>Chamar pelo WhatsApp</strong>
            <small>(11) 94466-9394</small>
          </span>
        </a>

        <p className={styles.orLabel}>Ou nos siga nas redes sociais</p>

        <div className={styles.socials}>
          <a href="https://www.instagram.com/irenocademillus" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaInstagram /> Instagram
          </a>
          <a href="https://www.tiktok.com/@irenoca.demillus" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaTiktok /> TikTok
          </a>
          <a href="https://www.facebook.com/ConsultoraIrenocaDeMillus" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaFacebookF /> Facebook
          </a>
          <a href="https://lista.mercadolivre.com.br/_CustId_226992186_PrCategId_AD" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaShoppingBag /> Mercado Livre
          </a>
          <a href="https://shopee.com.br/irenoca_demillus10?entryPoint=ShopBySearch&searchKeyword=irenocademillus" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaShoppingBag /> Shopee
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contato;
