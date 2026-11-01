import { FaInstagram, FaFacebookF, FaWhatsapp, FaShoppingBag, FaMapMarkerAlt } from 'react-icons/fa';
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
            <a href="https://wa.me/5511965729586" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://www.mercadolivre.com.br/perfil/irenocademillus" target="_blank" rel="noopener noreferrer" aria-label="Mercado Livre">
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
            <a href="#localizacao">Localização</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>

        <div className={styles.address}>
          <h4>Onde Estamos</h4>
          <p>
            <FaMapMarkerAlt className={styles.pin} />
            Rua Doze de Outubro, 235, Loja 22<br />
            Lapa — São Paulo, SP<br />
            CEP 05073-001
          </p>
          <h4 className={styles.hoursTitle}>Horário</h4>
          <p className={styles.hoursText}>
            Seg–Sex: 9h às 18h<br />
            Sáb: 9h às 14h<br />
            Dom: Fechado
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
