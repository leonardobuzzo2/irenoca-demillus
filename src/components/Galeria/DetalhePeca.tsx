import { useState, type CSSProperties } from 'react';
import { FaWhatsapp, FaSyncAlt, FaShoppingBag, FaCheckCircle } from 'react-icons/fa';
import Viewer360 from '../Viewer360';
import { useSacola, linkWhatsApp } from '../../context/sacola';
import { calcularTamanho, TAMANHOS_FEMININOS, TAMANHOS_MASCULINOS } from '../../data/tamanhos';
import { coresPorProduto } from '../../data/cores';
import { categoryLabels, grupoDe, slugDe, type Product } from './tipos';
import styles from './styles.module.css';

const NAO_SEI = 'a confirmar';

const angulos = (labels: string[]) =>
  labels.map(l => `de ${l.toLowerCase()}`).join(', ').replace(/, ([^,]*)$/, ' e $1');

interface Props {
  produto: Product;
  onClose: () => void;
}

const DetalhePeca = ({ produto, onClose }: Props) => {
  const { adicionar, abrir, medidas } = useSacola();
  const variacoes = coresPorProduto[slugDe(produto)];
  const [corCodigo, setCorCodigo] = useState(variacoes?.padrao);
  const cor = variacoes?.cores.find(c => c.codigo === corCodigo);
  const corPadrao = variacoes?.cores.find(c => c.codigo === variacoes.padrao);

  const grupo = grupoDe(produto);
  const tamanhos = grupo === 'masculino' ? TAMANHOS_MASCULINOS : TAMANHOS_FEMININOS;
  const sugestao = calcularTamanho(medidas, grupo);
  const sugerido = sugestao?.tipo === 'ok' ? sugestao.tamanho : undefined;
  const [tamanho, setTamanho] = useState<string | undefined>(sugerido);
  const [faltaTamanho, setFaltaTamanho] = useState(false);
  const [adicionado, setAdicionado] = useState<string | null>(null);

  const naCorPadrao = !variacoes || corCodigo === variacoes.padrao;
  const giro = naCorPadrao ? produto.giro : undefined;
  const foto = cor?.src ?? produto.src;
  const semFotoDaCor = !!cor && !cor.src;

  const escolherCor = (codigo: string) => {
    setCorCodigo(codigo);
    setAdicionado(null);
  };

  const escolherTamanho = (t: string) => {
    setTamanho(t);
    setFaltaTamanho(false);
    setAdicionado(null);
  };

  const adicionarNaSacola = () => {
    if (!tamanho) {
      setFaltaTamanho(true);
      return;
    }
    adicionar({ produtoId: produto.id, nome: produto.name, foto, cor: cor?.nome, tamanho });
    setAdicionado(`${produto.name}${cor ? ` ${cor.nome}` : ''}, tamanho ${tamanho},`);
  };

  const mensagemDuvida = [
    `Olá, Irene! Tenho interesse em: ${produto.name}`,
    cor ? `Cor: ${cor.nome}` : '',
    tamanho ? `Tamanho: ${tamanho}` : '',
  ].filter(Boolean).join('\n');

  return (
    <>
      <div className={styles.lbImageCol}>
        {giro ? (
          <Viewer360 frames={giro} alt={produto.name} className={styles.lbViewer} />
        ) : (
          <div className={styles.lbPhoto}>
            <img
              key={foto}
              src={foto}
              alt={`${produto.name}${cor ? ` na cor ${semFotoDaCor && corPadrao ? corPadrao.nome : cor.nome}` : ''}`}
              className={styles.lbImage}
              width={736}
              height={900}
            />
            {semFotoDaCor && corPadrao && (
              <span className={styles.lbPhotoNote}>
                Ainda não temos foto na cor {cor.nome}. A foto mostra a cor {corPadrao.nome}.
              </span>
            )}
          </div>
        )}
      </div>

      <div className={styles.lbInfo}>
        <span className={styles.lbTag}>
          {categoryLabels[produto.category]}
          {produto.novidade && ' · Novidade'}
        </span>
        <h3 className={styles.lbName}>{produto.name}</h3>
        <p className={styles.lbDesc}>{produto.description}</p>

        {giro && (
          <p className={styles.lbGiroTip}>
            <FaSyncAlt aria-hidden="true" />
            Arraste a foto para ver a peça {angulos(giro.map(f => f.label))}. Toque na lupa para ver os detalhes de perto.
          </p>
        )}

        {variacoes && (
          <div className={styles.option}>
            <span className={styles.optionLabel} id={`cor-${produto.id}`}>
              Cor: <strong>{cor?.nome}</strong>
            </span>
            <div className={styles.swatches} role="group" aria-labelledby={`cor-${produto.id}`}>
              {variacoes.cores.map(c => (
                <button
                  key={c.codigo}
                  type="button"
                  className={`${styles.swatch} ${c.codigo === corCodigo ? styles.swatchActive : ''}`}
                  style={{ '--swatch': c.hex } as CSSProperties}
                  aria-pressed={c.codigo === corCodigo}
                  aria-label={c.nome}
                  title={c.nome}
                  onClick={() => escolherCor(c.codigo)}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.option}>
          <span className={styles.optionLabel} id={`tam-${produto.id}`}>
            Tamanho{tamanho && <>: <strong>{tamanho}</strong></>}
          </span>
          <div className={styles.sizes} role="group" aria-labelledby={`tam-${produto.id}`}>
            {tamanhos.map(t => (
              <button
                key={t}
                type="button"
                className={`${styles.size} ${t === tamanho ? styles.sizeActive : ''} ${t === sugerido ? styles.sizeSuggested : ''}`}
                aria-pressed={t === tamanho}
                title={t === sugerido ? 'Seu tamanho, pelas medidas que você informou' : undefined}
                onClick={() => escolherTamanho(t)}
              >
                {t}
                {t === sugerido && <span className={styles.srOnly}> (seu tamanho)</span>}
              </button>
            ))}
            <button
              type="button"
              className={`${styles.size} ${styles.sizeUnknown} ${tamanho === NAO_SEI ? styles.sizeActive : ''}`}
              aria-pressed={tamanho === NAO_SEI}
              onClick={() => escolherTamanho(NAO_SEI)}
            >
              Não sei
            </button>
          </div>
          <p className={styles.sizeHelp}>
            {sugerido && <>O tamanho com bolinha é o seu, pelas medidas que você informou. </>}
            <a href="#tamanho" onClick={onClose}>
              {sugerido ? 'Refazer minhas medidas' : 'Não sabe seu tamanho? Descubra aqui'}
            </a>
          </p>
          {faltaTamanho && (
            <p className={styles.sizeError} role="alert">
              Escolha um tamanho ou toque em “Não sei”.
            </p>
          )}
        </div>

        {adicionado ? (
          <div className={styles.added} role="status">
            <p>
              <FaCheckCircle aria-hidden="true" /> {adicionado} foi para a sacolinha.
            </p>
            <div className={styles.addedActions}>
              <button
                type="button"
                className={styles.lbAdd}
                onClick={() => {
                  onClose();
                  abrir();
                }}
              >
                <FaShoppingBag aria-hidden="true" /> Ver sacolinha
              </button>
              <button type="button" className={styles.lbCancel} onClick={onClose}>
                Continuar escolhendo
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className={styles.lbAdd} onClick={adicionarNaSacola}>
            <FaShoppingBag aria-hidden="true" /> Adicionar à sacolinha
          </button>
        )}

        <a
          href={linkWhatsApp(mensagemDuvida)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.lbWhatsappLink}
        >
          <FaWhatsapp aria-hidden="true" /> Tirar dúvida no WhatsApp
        </a>
      </div>
    </>
  );
};

export default DetalhePeca;
