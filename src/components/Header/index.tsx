import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

const socialLinks = [
  { href: 'https://www.instagram.com/irenocademillus', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.facebook.com/ConsultoraIrenocaDeMillus', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://wa.me/5511944669394', label: 'WhatsApp', Icon: FaWhatsapp },
  { href: 'https://www.tiktok.com/@irenoca.demillus', label: 'TikTok', Icon: FaTiktok },
  { href: 'https://lista.mercadolivre.com.br/_CustId_226992186_PrCategId_AD', label: 'Mercado Livre', Icon: FaShoppingBag },
];

const SocialIcons = ({ className }: { className: string }) => (
  <div className={className}>
    {socialLinks.map(({ href, label, Icon }) => (
      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Icon />
      </a>
    ))}
  </div>
);

const Header = () => {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled]       = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

  useLayoutEffect(() => {
    if (!menuOpen) return;
    const updateNavTop = () => {
      const header = headerRef.current;
      if (header) header.style.setProperty('--nav-top', `${header.getBoundingClientRect().bottom}px`);
    };
    updateNavTop();
    window.addEventListener('scroll', updateNavTop, { passive: true });
    window.addEventListener('resize', updateNavTop);
    return () => {
      window.removeEventListener('scroll', updateNavTop);
      window.removeEventListener('resize', updateNavTop);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.brand}>
          <img src="/logo.png" alt="Logo Irenoca Demillus" className={styles.logo} />
          <span>Irenoca Demillus</span>
        </a>

        <nav id="menu-principal" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
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
          <SocialIcons className={styles.navSocials} />
        </nav>

        <div className={styles.right}>
          <SocialIcons className={styles.socials} />

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
