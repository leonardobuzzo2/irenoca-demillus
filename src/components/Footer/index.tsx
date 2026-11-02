import { FaInstagram, FaFacebookF, FaWhatsapp, FaShoppingBag } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import styles from './styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Logo Irenoca Demillus" className={styles.logo} />
          <span className={styles.name}>Irenoca Demillus</span>
          <p className={styles.tagline}>Elegância que abraça, conforto que transforma</p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/irenocademillus" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/ConsultoraIrenocaDeMillus" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://wa.me/5511944669394" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://www.tiktok.com/@irenoca.demillus" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="https://lista.mercadolivre.com.br/_CustId_226992186_PrCategId_AD" target="_blank" rel="noopener noreferrer" aria-label="Mercado Livre">
              <FaShoppingBag />
            </a>
          </div>
        </div>

        <div className={styles.links}>
          <h4>Links Rápidos</h4>
          <nav>
            <a href="#sobre">Sobre</a>
            <a href="#categorias">Categorias</a>
            <a href="#galeria">Galeria</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#videos">Vídeos</a>
            <a href="#localizacao">Contato</a>
          </nav>
        </div>

        <div className={styles.address}>
          <h4>Atendimento Online</h4>
          <p>Atendimento 100% online com todo o carinho e personalização que você merece.</p>
          <p className={styles.hoursText}>
            <a href="https://wa.me/5511944669394" target="_blank" rel="noopener noreferrer">
              WhatsApp: (11) 94466-9394
            </a><br />
            Produtos à pronta entrega<br />
            Pedidos semanais
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Irenoca Demillus. Todos os direitos reservados.</p>
        <p>Desenvolvido com ♥ para Irene dos Santos Buzzo</p>
      </div>
    </footer>
  );
};

export default Footer;
