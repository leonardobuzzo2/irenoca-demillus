import { FaWhatsapp, FaInstagram, FaShoppingBag, FaEnvelope, FaHeadset, FaShareAlt } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import styles from './styles.module.css';

const groups = [
  {
    headerIcon: <FaHeadset />,
    label: 'Contato Direto',
    channels: [
      {
        icon: <FaWhatsapp />,
        label: 'WhatsApp',
        desc: '(11) 94466-9394',
        href: 'https://wa.me/5511944669394?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Irenoca%20Demillus.',
      },
      {
        icon: <FaEnvelope />,
        label: 'E-mail',
        desc: 'irenocaprontaentrega@gmail.com',
        href: 'mailto:irenocaprontaentrega@gmail.com',
      },
    ],
  },
  {
    headerIcon: <FaShareAlt />,
    label: 'Redes Sociais',
    channels: [
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
    ],
  },
  {
    headerIcon: <FaShoppingBag />,
    label: 'Compre Online',
    channels: [
      {
        icon: <FaShoppingBag />,
        label: 'Mercado Livre',
        desc: 'irenocademillus',
        href: 'https://lista.mercadolivre.com.br/_CustId_226992186_PrCategId_AD',
      },
      {
        icon: <FaShoppingBag />,
        label: 'Shopee',
        desc: 'irenocademillus',
        href: 'https://shopee.com.br/irenoca_demillus10?entryPoint=ShopBySearch&searchKeyword=irenocademillus',
      },
    ],
  },
];

const Localizacao = () => {
  return (
    <section id="localizacao" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Atendimento 100% online</span>
        <h2 className={styles.title}>Como nos Encontrar</h2>
        <p className={styles.lead}>
          Seu espaço DeMillus continua com você! Agora nosso atendimento é 100% online, com todo o carinho e atendimento personalizado que você merece. Produtos à pronta entrega e pedidos semanais — é só chamar no WhatsApp!
        </p>

        <div className={styles.groups}>
          {groups.map(group => (
            <div key={group.label} className={styles.group}>
              <div className={styles.groupHeader}>
                <span className={styles.groupHeaderIcon}>{group.headerIcon}</span>
                <span className={styles.groupHeaderLabel}>{group.label}</span>
              </div>
              <div className={styles.groupBody}>
                {group.channels.map((ch, idx) => (
                  <div key={ch.label}>
                    {idx > 0 && <div className={styles.groupDivider} />}
                    <a
                      href={ch.href}
                      target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className={styles.groupItem}
                    >
                      <span className={styles.groupItemIcon}>{ch.icon}</span>
                      <div>
                        <strong className={styles.groupItemStrong}>{ch.label}</strong>
                        <small className={styles.groupItemSmall}>{ch.desc}</small>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Localizacao;
