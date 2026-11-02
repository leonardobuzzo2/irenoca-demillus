import { FaWhatsapp, FaInstagram, FaShoppingBag } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import styles from './styles.module.css';

const channels = [
  {
    icon: <FaWhatsapp />,
    label: 'WhatsApp',
    desc: '(11) 94466-9394',
    href: 'https://wa.me/5511944669394?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Irenoca%20Demillus.',
  },
  {
    icon: <FaInstagram />,
    label: 'Instagram',
    desc: '@irenocademillus',
    href: 'https://www.instagram.com/irenocademillus',
  },
  {
    icon: <FaTiktok />,
    label: 'TikTok',
    desc: '@irenoca.demillus',
    href: 'https://www.tiktok.com/@irenoca.demillus',
  },
  {
    icon: <FaShoppingBag />,
    label: 'Mercado Livre',
    desc: 'irenocademillus',
    href: 'https://www.mercadolivre.com.br/perfil/irenocademillus',
  },
  {
    icon: <FaShoppingBag />,
    label: 'Shopee',
    desc: 'irenocademillus',
    href: 'https://shopee.com.br/irenocademillus',
  },
];

const Localizacao = () => {
  return (
    <section id="localizacao" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.infoCol} style={{ flex: 1 }}>
          <span className={styles.eyebrow}>Atendimento 100% online</span>
          <h2 className={styles.title}>Como nos Encontrar</h2>

          <div className={styles.infoList}>
            {channels.map(ch => (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoItem}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className={styles.icon}>{ch.icon}</span>
                <div>
                  <strong>{ch.label}</strong>
                  <p>{ch.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Localizacao;
