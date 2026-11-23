import { useEffect, useRef, useState } from 'react';
import { FaShoppingBag, FaTimes, FaWhatsapp, FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { useSacola, linkWhatsApp } from '../../context/sacola';
import { resumoTamanhos } from '../../data/tamanhos';
import styles from './styles.module.css';

const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

const Sacola = () => {
  const { itens, totalPecas, alterarQtd, remover, limpar, aberta, abrir, fechar, medidas } = useSacola();
  const [nome, setNome] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [confirmarLimpar, setConfirmarLimpar] = useState(false);
  const [pulsar, setPulsar] = useState(false);
  const anterior = useRef(totalPecas);
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (totalPecas > anterior.current) {
      setPulsar(true);
      const t = window.setTimeout(() => setPulsar(false), 700);
      anterior.current = totalPecas;
      return () => window.clearTimeout(t);
    }
    anterior.current = totalPecas;
  }, [totalPecas]);

  useEffect(() => {
    if (!aberta) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    fecharRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener('keydown', onKey);
    };
  }, [aberta, fechar]);

  useEffect(() => {
    if (!aberta) {
      setConfirmarLimpar(false);
    }
  }, [aberta]);

  const mensagem = () => {
    const linhas = itens.map((item, i) => {
      const partes = [item.nome];
      if (item.cor) partes.push(`cor ${item.cor}`);
      partes.push(`tamanho ${item.tamanho}`);
      partes.push(plural(item.qtd, 'unidade', 'unidades'));
      return `${i + 1}) ${partes.join(' — ')}`;
    });
    const tamanhos = resumoTamanhos(medidas);
    const blocos = [
      'Olá, Irene! Montei esta sacolinha no site:',
      linhas.join('\n'),
      `Total: ${plural(totalPecas, 'peça', 'peças')}`,
    ];
    if (tamanhos.length) blocos.push(`Meus tamanhos (calculados no site): ${tamanhos.join('; ')}`);
    if (nome.trim()) blocos.push(`Meu nome: ${nome.trim()}`);
    blocos.push('Pode me confirmar a disponibilidade e os valores?');
    return blocos.join('\n\n');
  };

  const mostrarBotao = totalPecas > 0 && !aberta;

  return (
    <>
      {mostrarBotao && (
        <button
          type="button"
          className={`${styles.fab} ${pulsar ? styles.fabPulse : ''}`}
          onClick={abrir}
          aria-label={`Abrir sacolinha, ${plural(totalPecas, 'peça', 'peças')}`}
        >
          <FaShoppingBag aria-hidden="true" />
          <span>Sacolinha</span>
          <span className={styles.count} aria-hidden="true">{totalPecas}</span>
        </button>
      )}

      {aberta && (
        <div className={styles.backdrop} onClick={fechar}>
          <aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sacolinha-titulo"
            onClick={e => e.stopPropagation()}
          >
            <header className={styles.head}>
              <h2 id="sacolinha-titulo" className={styles.title}>
                <FaShoppingBag aria-hidden="true" /> Sua sacolinha
              </h2>
              <button ref={fecharRef} type="button" className={styles.close} onClick={fechar} aria-label="Fechar sacolinha">
                <FaTimes />
              </button>
            </header>

            {itens.length === 0 ? (
              <div className={styles.empty}>
                <p>Sua sacolinha está vazia.</p>
                <p>Abra uma peça na Galeria, escolha o tamanho e toque em “Adicionar à sacolinha”.</p>
                <a href="#galeria" className={styles.emptyLink} onClick={fechar}>Ver a Galeria</a>
              </div>
            ) : (
              <>
                <ul className={styles.list}>
                  {itens.map(item => (
                    <li key={item.id} className={styles.item}>
                      <img src={item.foto} alt="" className={styles.thumb} width={56} height={68} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.nome}</span>
                        <span className={styles.itemMeta}>
                          {item.cor && <>Cor {item.cor} · </>}Tamanho {item.tamanho}
                        </span>
                        <div className={styles.qty}>
                          <button
                            type="button"
                            onClick={() => alterarQtd(item.id, -1)}
                            disabled={item.qtd <= 1}
                            aria-label={`Diminuir quantidade de ${item.nome}`}
                          >
                            <FaMinus />
                          </button>
                          <span aria-live="polite">{item.qtd}</span>
                          <button
                            type="button"
                            onClick={() => alterarQtd(item.id, 1)}
                            aria-label={`Aumentar quantidade de ${item.nome}`}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => remover(item.id)}
                        aria-label={`Remover ${item.nome} da sacolinha`}
                      >
                        <FaTrashAlt />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className={styles.foot}>
                  <label className={styles.nameField} htmlFor="sacolinha-nome">
                    <span>Seu nome (opcional)</span>
                    <input
                      id="sacolinha-nome"
                      type="text"
                      autoComplete="given-name"
                      value={nome}
                      onChange={e => setNome(e.target.value.slice(0, 60))}
                      placeholder="Como a Irene pode te chamar?"
                    />
                  </label>

                  <p className={styles.total}>
                    Total: <strong>{plural(totalPecas, 'peça', 'peças')}</strong>
                  </p>

                  <a
                    href={linkWhatsApp(mensagem())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.send}
                    onClick={() => setEnviado(true)}
                  >
                    <FaWhatsapp aria-hidden="true" /> Enviar pedido pelo WhatsApp
                  </a>
                  <p className={styles.note}>
                    A Irene confirma a disponibilidade, os valores e a entrega pelo WhatsApp. Nada é cobrado pelo site.
                  </p>

                  {enviado && !confirmarLimpar && (
                    <p className={styles.sent}>
                      Pedido enviado?{' '}
                      <button type="button" className={styles.linkBtn} onClick={() => { limpar(); setEnviado(false); }}>
                        Esvaziar a sacolinha
                      </button>
                    </p>
                  )}

                  {!enviado && (
                    confirmarLimpar ? (
                      <p className={styles.confirm}>
                        Tirar todas as peças?{' '}
                        <button type="button" className={styles.linkBtn} onClick={() => { limpar(); setConfirmarLimpar(false); }}>
                          Sim, esvaziar
                        </button>{' '}
                        <button type="button" className={styles.linkBtnMuted} onClick={() => setConfirmarLimpar(false)}>
                          Cancelar
                        </button>
                      </p>
                    ) : (
                      <button type="button" className={styles.linkBtnMuted} onClick={() => setConfirmarLimpar(true)}>
                        Esvaziar sacolinha
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sacola;
