import { useState, type CSSProperties } from 'react';
import { FaWhatsapp, FaRedo, FaRulerHorizontal, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { products } from '../Galeria';
import { slugDe, categoryLabels } from '../Galeria/tipos';
import { coresPorProduto } from '../../data/cores';
import { resumoTamanhos } from '../../data/tamanhos';
import { useSacola, linkWhatsApp } from '../../context/sacola';
import styles from './styles.module.css';

type Ocasiao = 'diaadia' | 'sensual' | 'dormir' | 'treino' | 'praia';
type Vibe = 'conforto' | 'charme' | 'modelar';

const OCASIOES: { key: Ocasiao; emoji: string; titulo: string; desc: string }[] = [
  { key: 'diaadia', emoji: '☀️', titulo: 'Dia a dia', desc: 'Conforto pra usar o dia todo' },
  { key: 'sensual', emoji: '🌹', titulo: 'Momento especial', desc: 'Pra se sentir poderosa' },
  { key: 'dormir',  emoji: '🌙', titulo: 'Hora de dormir', desc: 'Pijamas e camisolas' },
  { key: 'treino',  emoji: '💪', titulo: 'Treino', desc: 'Fitness com conforto' },
  { key: 'praia',   emoji: '🏖️', titulo: 'Praia & verão', desc: 'Biquínis e moda praia' },
];

const VIBES: { key: Vibe; emoji: string; titulo: string; desc: string }[] = [
  { key: 'conforto', emoji: '🤍', titulo: 'Conforto acima de tudo', desc: 'Leveza, sem costura, sem aperto' },
  { key: 'charme',   emoji: '✨', titulo: 'Charme e beleza', desc: 'Renda, detalhes e novidades' },
  { key: 'modelar',  emoji: '⏳', titulo: 'Modelar o corpo', desc: 'Realça a silhueta' },
];

const RECS: Record<Ocasiao, Record<Vibe, string[]>> = {
  diaadia: {
    conforto: ['sutia-basico-plus-ultraleve', 'biquini-basico-ultraleve', 'blusa-ermitage'],
    charme:   ['sutia-joli-demillus', 'fio-dental-xamego', 'biquini-bicolor'],
    modelar:  ['body-vectra-ultraleve', 'bermuda-alta-modellare', 'sutia-basico-plus-ultraleve'],
  },
  sensual: {
    conforto: ['sutia-demillus-miracle', 'biquini-basico-ultraleve', 'body-ternesse'],
    charme:   ['sutia-louco-amor', 'fio-dental-xamego', 'shortdoll-demillus-touch'],
    modelar:  ['body-ternesse', 'body-vectra-ultraleve', 'sutia-louco-amor'],
  },
  dormir: {
    conforto: ['pijama-feminino-legging', 'pijama-longo-purisme', 'biquini-basico-ultraleve'],
    charme:   ['shortdoll-demillus-touch', 'pijama-longo-purisme', 'sutia-demillus-miracle'],
    modelar:  ['pijama-feminino-legging', 'body-vectra-ultraleve', 'pijama-longo-purisme'],
  },
  treino: {
    conforto: ['bermuda-velvette-ultraleve', 'legging-voragem-ultraleve', 'blusa-ermitage'],
    charme:   ['legging-voragem-ultraleve', 'blusa-ermitage', 'bermuda-velvette-ultraleve'],
    modelar:  ['legging-voragem-ultraleve', 'bermuda-alta-modellare', 'body-vectra-ultraleve'],
  },
  praia: {
    conforto: ['biquini-basico-ultraleve', 'biquini-bicolor', 'fio-dental-xamego'],
    charme:   ['biquini-bicolor', 'biquini-basico-ultraleve', 'fio-dental-xamego'],
    modelar:  ['bermuda-alta-modellare', 'biquini-basico-ultraleve', 'body-vectra-ultraleve'],
  },
};

const MAX_DOTS = 5;

const Quiz = () => {
  const { medidas } = useSacola();
  const [ocasiao, setOcasiao] = useState<Ocasiao | null>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);

  const passo = !ocasiao ? 1 : !vibe ? 2 : 3;

  const recomendados =
    ocasiao && vibe
      ? RECS[ocasiao][vibe]
          .map(slug => products.find(p => slugDe(p) === slug))
          .filter((p): p is (typeof products)[number] => !!p)
      : [];

  const tamanhos = resumoTamanhos(medidas);

  const reiniciar = () => { setOcasiao(null); setVibe(null); };
  const voltar = () => { if (vibe) setVibe(null); else setOcasiao(null); };

  const mensagem = () => {
    const oc = OCASIOES.find(o => o.key === ocasiao)?.titulo ?? '';
    const vb = VIBES.find(v => v.key === vibe)?.titulo ?? '';
    const look = recomendados.map(p => `• ${p.name}`).join('\n');
    return [
      'Olá, Irene! Montei meu look no quiz do site 💕',
      `Ocasião: ${oc} · estilo: ${vb}.`,
      'Gostei destas peças:',
      look,
      tamanhos.length ? `Meu tamanho: ${tamanhos.join('; ')}.` : '',
      'Pode me ajudar a escolher as cores e fechar o pedido?',
    ].filter(Boolean).join('\n');
  };

  return (
    <section id="quiz" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Não sabe por onde começar?</span>
          <h2 className={styles.title}>Monte seu look íntimo</h2>
          <p className={styles.subtitle}>
            Responda duas perguntinhas rápidas e a gente sugere as peças DeMillus com a sua cara.
          </p>
        </div>

        <div className={styles.card}>
          {/* progresso */}
          <div className={styles.steps} aria-hidden="true">
            {[1, 2, 3].map(n => (
              <span key={n} className={`${styles.step} ${passo >= n ? styles.stepOn : ''}`} />
            ))}
          </div>

          {passo > 1 && passo < 3 && (
            <button type="button" className={styles.back} onClick={voltar}>
              <FaArrowLeft aria-hidden="true" /> Voltar
            </button>
          )}

          {/* passo 1 */}
          {passo === 1 && (
            <div className={styles.question}>
              <h3 className={styles.qTitle}>1. Pra qual momento?</h3>
              <div className={styles.options}>
                {OCASIOES.map(o => (
                  <button key={o.key} type="button" className={styles.option} onClick={() => setOcasiao(o.key)}>
                    <span className={styles.optEmoji}>{o.emoji}</span>
                    <span className={styles.optTitle}>{o.titulo}</span>
                    <span className={styles.optDesc}>{o.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* passo 2 */}
          {passo === 2 && (
            <div className={styles.question}>
              <h3 className={styles.qTitle}>2. O que é mais importante pra você?</h3>
              <div className={styles.options}>
                {VIBES.map(v => (
                  <button key={v.key} type="button" className={styles.option} onClick={() => setVibe(v.key)}>
                    <span className={styles.optEmoji}>{v.emoji}</span>
                    <span className={styles.optTitle}>{v.titulo}</span>
                    <span className={styles.optDesc}>{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* resultado */}
          {passo === 3 && (
            <div className={styles.result}>
              <h3 className={styles.resultTitle}>O seu look combina com estas peças 💕</h3>
              <p className={styles.resultHint}>
                Toque em uma peça pra ver cores e tamanhos na Galeria, ou já chame a Irene no WhatsApp com o look montado.
              </p>

              <div className={styles.grid}>
                {recomendados.map(p => {
                  const cores = coresPorProduto[slugDe(p)]?.cores ?? [];
                  return (
                    <a key={p.id} href="#galeria" className={styles.pecaCard}>
                      <div className={styles.pecaImgWrap}>
                        <img src={p.src} alt={p.name} className={styles.pecaImg} loading="lazy" width={736} height={900} />
                        {p.novidade && <span className={styles.badge}>Novidade</span>}
                      </div>
                      <div className={styles.pecaInfo}>
                        <span className={styles.pecaTag}>{categoryLabels[p.category]}</span>
                        <span className={styles.pecaNome}>{p.name}</span>
                        {cores.length > 1 && (
                          <span className={styles.dots} role="img" aria-label={`${cores.length} cores`}>
                            {cores.slice(0, MAX_DOTS).map(c => (
                              <span key={c.codigo} className={styles.dot} style={{ '--swatch': c.hex } as CSSProperties} title={c.nome} aria-hidden="true" />
                            ))}
                            {cores.length > MAX_DOTS && <span className={styles.dotMore}>+{cores.length - MAX_DOTS}</span>}
                          </span>
                        )}
                        <span className={styles.pecaCta}><FaShoppingBag aria-hidden="true" /> Ver na Galeria</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {tamanhos.length > 0 ? (
                <p className={styles.tamanho}>
                  <FaRulerHorizontal aria-hidden="true" /> Já sei o seu tamanho: <strong>{tamanhos.join(' · ')}</strong> — vai junto no pedido.
                </p>
              ) : (
                <p className={styles.tamanho}>
                  <FaRulerHorizontal aria-hidden="true" /> Dica: use a <a href="#tamanho">calculadora “Descubra seu tamanho”</a> pra já sair com o tamanho certo.
                </p>
              )}

              <div className={styles.actions}>
                <a href={linkWhatsApp(mensagem())} target="_blank" rel="noopener noreferrer" className={styles.btnWhatsapp}>
                  <FaWhatsapp aria-hidden="true" /> Pedir meu look no WhatsApp
                </a>
                <button type="button" className={styles.btnOutline} onClick={reiniciar}>
                  <FaRedo aria-hidden="true" /> Refazer o quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
