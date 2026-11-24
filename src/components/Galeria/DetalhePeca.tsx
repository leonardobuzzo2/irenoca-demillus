import { useState, type CSSProperties } from 'react';
import { FaWhatsapp, FaSyncAlt, FaShoppingBag, FaCheckCircle } from 'react-icons/fa';
import Viewer360 from '../Viewer360';
import { useSacola, linkWhatsApp } from '../../context/sacola';
import {
  calcularTamanho,
  TAMANHOS_FEMININOS,
  TAMANHOS_MASCULINOS,
  type GrupoTamanho,
  type Medidas,
} from '../../data/tamanhos';
import { coresPorProduto } from '../../data/cores';
import { conjuntoPorProduto } from '../../data/conjuntos';
import { categoryLabels, grupoDe, slugDe, type Product } from './tipos';
import styles from './styles.module.css';

const NAO_SEI = 'a confirmar';

const angulos = (labels: string[]) =>
  labels.map(l => `de ${l.toLowerCase()}`).join(', ').replace(/, ([^,]*)$/, ' e $1');

const tamanhosDo = (grupo: GrupoTamanho) => (grupo === 'masculino' ? TAMANHOS_MASCULINOS : TAMANHOS_FEMININOS);

const sugestaoPara = (medidas: Medidas, grupo: GrupoTamanho) => {
  const r = calcularTamanho(medidas, grupo);
  return r?.tipo === 'ok' ? r.tamanho : undefined;
};

interface EscolhaTamanhoProps {
  id: string;
  rotulo: string;
  tamanhos: string[];
  sugerido?: string;
  valor?: string;
  onChange: (t: string) => void;
}

const EscolhaTamanho = ({ id, rotulo, tamanhos, sugerido, valor, onChange }: EscolhaTamanhoProps) => (
  <>
    <span className={styles.optionLabel} id={id}>
      {rotulo}{valor && <>: <strong>{valor}</strong></>}
    </span>
    <div className={styles.sizes} role="group" aria-labelledby={id}>
      {tamanhos.map(t => (
        <button
          key={t}
          type="button"
          className={`${styles.size} ${t === valor ? styles.sizeActive : ''} ${t === sugerido ? styles.sizeSuggested : ''}`}
          aria-pressed={t === valor}
          title={t === sugerido ? 'Seu tamanho, pelas medidas que você informou' : undefined}
          onClick={() => onChange(t)}
        >
          {t}
          {t === sugerido && <span className={styles.srOnly}> (seu tamanho)</span>}
        </button>
      ))}
      <button
        type="button"
        className={`${styles.size} ${styles.sizeUnknown} ${valor === NAO_SEI ? styles.sizeActive : ''}`}
        aria-pressed={valor === NAO_SEI}
        onClick={() => onChange(NAO_SEI)}
      >
        Não sei
      </button>
    </div>
  </>
);

interface Props {
  produto: Product;
  onClose: () => void;
  /** Abre outra peça da Galeria na mesma janela (peça do conjunto). */
  onAbrirPeca?: (slug: string) => void;
}

const DetalhePeca = ({ produto, onClose, onAbrirPeca }: Props) => {
  const { adicionar, abrir, medidas } = useSacola();
  const slug = slugDe(produto);
  const variacoes = coresPorProduto[slug];
  const [corCodigo, setCorCodigo] = useState(variacoes?.padrao);
  const cor = variacoes?.cores.find(c => c.codigo === corCodigo);
  const corPadrao = variacoes?.cores.find(c => c.codigo === variacoes.padrao);

  const grupo = grupoDe(produto);
  const sugerido = sugestaoPara(medidas, grupo);
  const [tamanho, setTamanho] = useState<string | undefined>(sugerido);
  const [faltaTamanho, setFaltaTamanho] = useState(false);
  const [adicionado, setAdicionado] = useState<string | null>(null);

  const conjunto = conjuntoPorProduto[slug];
  const peca = conjunto?.peca;
  const sugeridoPeca = peca ? sugestaoPara(medidas, peca.grupo) : undefined;
  const [levarConjunto, setLevarConjunto] = useState(false);
  const [tamanhoPeca, setTamanhoPeca] = useState<string | undefined>(sugeridoPeca);
  const [faltaTamanhoPeca, setFaltaTamanhoPeca] = useState(false);
  const pecaJunto = levarConjunto ? peca : undefined;

  const naCorPadrao = !variacoes || corCodigo === variacoes.padrao;
  const giro = naCorPadrao ? produto.giro : undefined;
  const foto = cor?.src ?? produto.src;
  const semFotoDaCor = !!cor && !cor.src;

  // Na maioria das fotos a peça do conjunto já aparece junto. Quando ela também
  // está na Galeria, a sacolinha usa a foto dela na mesma cor, se houver.
  const slugDaPeca = peca?.slugNaGaleria;
  const fotoDaPeca = (slugDaPeca
    && coresPorProduto[slugDaPeca]?.cores.find(c => c.codigo === corCodigo)?.src)
    || foto;

  const escolherCor = (codigo: string) => {
    setCorCodigo(codigo);
    setAdicionado(null);
  };

  const escolherTamanho = (t: string) => {
    setTamanho(t);
    setFaltaTamanho(false);
    setAdicionado(null);
  };

  const escolherTamanhoPeca = (t: string) => {
    setTamanhoPeca(t);
    setFaltaTamanhoPeca(false);
    setAdicionado(null);
  };

  const alternarConjunto = (levar: boolean) => {
    setLevarConjunto(levar);
    setFaltaTamanhoPeca(false);
    setAdicionado(null);
  };

  const nomeComCor = (nome: string) => `${nome}${cor ? ` ${cor.nome}` : ''}`;

  const adicionarNaSacola = () => {
    const faltaPeca = !!pecaJunto && !tamanhoPeca;
    if (!tamanho || faltaPeca) {
      setFaltaTamanho(!tamanho);
      setFaltaTamanhoPeca(faltaPeca);
      return;
    }
    adicionar({ produtoId: produto.id, nome: produto.name, foto, cor: cor?.nome, tamanho });
    const principal = `${nomeComCor(produto.name)}, tamanho ${tamanho}`;
    if (pecaJunto && tamanhoPeca) {
      adicionar({ produtoId: pecaJunto.id, nome: pecaJunto.nome, foto: fotoDaPeca, cor: cor?.nome, tamanho: tamanhoPeca });
      setAdicionado(`O conjunto foi para a sacolinha: ${principal}, e ${nomeComCor(pecaJunto.nome)}, tamanho ${tamanhoPeca}.`);
    } else {
      setAdicionado(`${principal}, foi para a sacolinha.`);
    }
  };

  const mensagemDuvida = [
    `Olá, Irene! Tenho interesse em: ${produto.name}`,
    cor ? `Cor: ${cor.nome}` : '',
    tamanho ? `Tamanho: ${tamanho}` : '',
    pecaJunto ? `Também quero o ${pecaJunto.nome}${tamanhoPeca ? `, tamanho ${tamanhoPeca}` : ''}` : '',
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
          <EscolhaTamanho
            id={`tam-${produto.id}`}
            rotulo="Tamanho"
            tamanhos={tamanhosDo(grupo)}
            sugerido={sugerido}
            valor={tamanho}
            onChange={escolherTamanho}
          />
          <p className={styles.sizeHelp}>
            {(sugerido || sugeridoPeca) && <>O tamanho com bolinha é o seu, pelas medidas que você informou. </>}
            <a href="#tamanho" onClick={onClose}>
              {sugerido || sugeridoPeca ? 'Refazer minhas medidas' : 'Não sabe seu tamanho? Descubra aqui'}
            </a>
          </p>
          {faltaTamanho && (
            <p className={styles.sizeError} role="alert">
              Escolha um tamanho ou toque em “Não sei”.
            </p>
          )}
        </div>

        {conjunto && peca && (
          <div className={`${styles.conjunto} ${levarConjunto ? styles.conjuntoOn : ''}`}>
            <span className={styles.conjuntoEyebrow}>Compre o conjunto</span>
            <div className={styles.conjuntoPeca}>
              <strong className={styles.conjuntoNome}>{peca.nome}</strong>
              <p className={styles.conjuntoTexto}>
                {conjunto.texto} {peca.descricao}
              </p>
              {slugDaPeca && onAbrirPeca && (
                <button
                  type="button"
                  className={styles.conjuntoVer}
                  onClick={() => onAbrirPeca(slugDaPeca)}
                >
                  Ver o {peca.tipo}
                </button>
              )}
            </div>
            <label className={styles.conjuntoToggle}>
              <input
                type="checkbox"
                checked={levarConjunto}
                onChange={e => alternarConjunto(e.target.checked)}
              />
              <span>
                Levar o {peca.tipo} também
                {cor && <span className={styles.conjuntoCor}>Na mesma cor: {cor.nome}</span>}
              </span>
            </label>
            {levarConjunto && (
              <div className={styles.option}>
                <EscolhaTamanho
                  id={`tam-conjunto-${produto.id}`}
                  rotulo={`Tamanho do ${peca.tipo}`}
                  tamanhos={tamanhosDo(peca.grupo)}
                  sugerido={sugeridoPeca}
                  valor={tamanhoPeca}
                  onChange={escolherTamanhoPeca}
                />
                {faltaTamanhoPeca && (
                  <p className={styles.sizeError} role="alert">
                    Escolha o tamanho do {peca.tipo} ou toque em “Não sei”.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {adicionado ? (
          <div className={styles.added} role="status">
            <p>
              <FaCheckCircle aria-hidden="true" /> {adicionado}
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
            <FaShoppingBag aria-hidden="true" />
            {pecaJunto ? 'Adicionar o conjunto à sacolinha' : 'Adicionar à sacolinha'}
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
