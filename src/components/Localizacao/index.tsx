import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from 'react-icons/fa';
import styles from './styles.module.css';

const Localizacao = () => {
  return (
    <section id="localizacao" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.infoCol}>
          <span className={styles.eyebrow}>Venha nos visitar</span>
          <h2 className={styles.title}>Nossa Localização</h2>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <div>
                <strong>Endereço</strong>
                <p>Rua Doze de Outubro, 235, Loja 22<br />Lapa — São Paulo, SP<br />CEP 05073-001</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <FaClock className={styles.icon} />
              <div>
                <strong>Horário de Funcionamento</strong>
                <p>Segunda a Sexta: 9h às 18h<br />Sábado: 9h às 14h<br />Domingo: Fechado</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <FaPhoneAlt className={styles.icon} />
              <div>
                <strong>Telefone / WhatsApp</strong>
                <p>(11) 96572-9586</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mapCol}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.3335919791427!2d-46.70196432485209!3d-23.554847078811074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57f3e9f478e3%3A0x1f7bb4057de95e38!2sR.%20Doze%20de%20Outubro%2C%20235%20-%20Loja%2022%20-%20Lapa%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005073-001%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1712517530093!5m2!1spt-BR!2sbr"
            className={styles.map}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Irenoca Demillus"
          />
        </div>
      </div>
    </section>
  );
};

export default Localizacao;
