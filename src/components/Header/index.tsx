import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import styles from './styles.module.css';

const navLinks = [
  { href: 'sobre',       label: 'Sobre' },
  { href: 'categorias',  label: 'Categorias' },
  { href: 'galeria',     label: 'Galeria' },
  { href: 'catalogo',    label: 'Catálogo' },
  { href: 'videos',      label: 'Vídeos' },
  { href: 'localizacao', label: 'Contato' },
];

const Header = () => {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled]       = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.42) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.brand}>
          <img src="/logo.png" alt="Logo Irenoca Demillus" className={styles.logo} />
          <span>Irenoca Demillus</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={`#${href}`}
              className={activeSection === href ? styles.navActive : ''}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
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

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
