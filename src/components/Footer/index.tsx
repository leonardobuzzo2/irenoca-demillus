import { FaInstagram, FaFacebookF, FaWhatsapp, FaShoppingBag, FaEnvelope, FaIdCard } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { CONTATO } from '../../data/contato';
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
            <a href={CONTATO.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://vt.tiktok.com/ZSs1TAjRy/" target="_blank" rel="noopener noreferrer" aria-label="Loja no TikTok Shop">
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
            <a href="/#sobre">Sobre</a>
            <a href="/#categorias">Categorias</a>
            <a href="/#galeria">Galeria</a>
            <a href="/#catalogo">Catálogo</a>
            <a href="/#videos">Vídeos</a>
            <a href="/#localizacao">Contato</a>
          </nav>
        </div>

        <div className={styles.address}>
          <h4>Atendimento Online</h4>
          <p>Atendimento 100% online com todo o carinho e personalização que você merece.</p>
          <ul className={styles.contactList}>
            <li>
              <FaWhatsapp className={styles.contactIcon} aria-hidden="true" />
              <a href={CONTATO.whatsappUrl} target="_blank" rel="noopener noreferrer">
                {CONTATO.telefone}
              </a>
            </li>
            <li>
              <FaEnvelope className={styles.contactIcon} aria-hidden="true" />
              <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>
            </li>
            <li>
              <FaIdCard className={styles.contactIcon} aria-hidden="true" />
              <span>CNPJ: {CONTATO.cnpj}</span>
            </li>
          </ul>
          <p className={styles.hoursText}>
            Produtos à pronta entrega<br />
            Pedidos semanais
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Irenoca Demillus · CNPJ {CONTATO.cnpj}. Todos os direitos reservados.</p>
        <nav className={styles.legal} aria-label="Informações legais">
          <a href="/termos-de-uso">Termos de Uso</a>
          <a href="/politica-de-privacidade">Política de Privacidade</a>
        </nav>
        <p>Desenvolvido com ♥ para Irene dos Santos Buzzo</p>
      </div>
    </footer>
  );
};

export default Footer;
