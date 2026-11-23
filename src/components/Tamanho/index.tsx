import { useState } from 'react';
import { FaRulerHorizontal, FaWhatsapp, FaPlayCircle } from 'react-icons/fa';
import { useSacola, linkWhatsApp } from '../../context/sacola';
import {
  calcularTamanho,
  resumoTamanhos,
  NOMES_MEDIDAS,
  TABELA_FEMININA,
  TABELA_MASCULINA,
  type GrupoTamanho,
  type Medidas,
  type Resultado,
} from '../../data/tamanhos';
import styles from './styles.module.css';

type Aba = 'feminino' | 'masculino';
type Campo = keyof Medidas;

const CAMPOS: Record<Campo, { rotulo: string; dica: string }> = {
  busto:       { rotulo: 'Busto',           dica: 'Na parte mais alta do busto, com a fita reta nas costas.' },
  abaixoBusto: { rotulo: 'Abaixo do busto', dica: 'Logo abaixo dos seios, onde fica o elástico do sutiã.' },
  cintura:     { rotulo: 'Cintura',         dica: 'Na parte mais fina da cintura.' },
  quadril:     { rotulo: 'Quadril',         dica: 'Na parte mais larga do quadril, passando pelo bumbum.' },
  cinturaMasc: { rotulo: 'Cintura',         dica: 'Na altura em que você usa o cós da cueca ou da bermuda.' },
};

const GRUPOS_FEMININOS: { titulo: string; para: string; campos: Campo[] }[] = [
  { titulo: 'Parte de cima', para: 'sutiãs, tops e bodies', campos: ['busto', 'abaixoBusto'] },
  { titulo: 'Parte de baixo', para: 'calcinhas, leggings, bermudas e modeladores', campos: ['cintura', 'quadril'] },
];

const RESULTADOS: Record<Aba, { grupo: GrupoTamanho; rotulo: string; vazio: string }[]> = {
  feminino: [
    { grupo: 'superior', rotulo: 'Sutiãs e tops', vazio: 'Preencha o busto ou o abaixo do busto.' },
    { grupo: 'inferior', rotulo: 'Calcinhas, leggings e bermudas', vazio: 'Preencha a cintura ou o quadril.' },
    { grupo: 'inteiro', rotulo: 'Bodies, pijamas e modeladores', vazio: 'Preencha suas medidas acima.' },
  ],
  masculino: [
    { grupo: 'masculino', rotulo: 'Cuecas e bermudas Zeus', vazio: 'Preencha a cintura.' },
  ],
};

const cm = (n: number) => `${n.toLocaleString('pt-BR')} cm`;

const paraTexto = (m: Medidas): Record<Campo, string> => ({
  busto: m.busto ? String(m.busto).replace('.', ',') : '',
  abaixoBusto: m.abaixoBusto ? String(m.abaixoBusto).replace('.', ',') : '',
  cintura: m.cintura ? String(m.cintura).replace('.', ',') : '',
  quadril: m.quadril ? String(m.quadril).replace('.', ',') : '',
  cinturaMasc: m.cinturaMasc ? String(m.cinturaMasc).replace('.', ',') : '',
});

const ARTIGO: Record<Campo, string> = {
  busto: 'o',
  abaixoBusto: 'o',
  cintura: 'a',
  quadril: 'o',
  cinturaMasc: 'a',
};

const juntar = (partes: string[]) =>
  partes.length <= 1 ? partes.join('') : `${partes.slice(0, -1).join(', ')} e ${partes[partes.length - 1]}`;

const explicar = (r: Resultado) => {
  if (r.tipo === 'fora') {
    return `Sua medida de ${NOMES_MEDIDAS[r.medida]} (${cm(r.valor)}) está ${r.lado === 'acima' ? 'acima' : 'abaixo'} da tabela. Fale com a Irene que ela ajuda você a escolher.`;
  }
  const distintos = new Set(r.porMedida.map(p => p.tamanho));
  if (distintos.size > 1) {
    const decisivas = r.porMedida.filter(p => p.tamanho === r.tamanho);
    const sujeito = juntar(decisivas.map(p => `${ARTIGO[p.medida]} ${NOMES_MEDIDAS[p.medida]} (${cm(p.valor)})`));
    return `${sujeito.charAt(0).toUpperCase()}${sujeito.slice(1)} ${decisivas.length > 1 ? 'pedem' : 'pede'} ${r.tamanho}, o maior entre as suas medidas. Para não apertar, use esse tamanho.`;
  }
  return `Medidas usadas: ${juntar(r.porMedida.map(p => `${NOMES_MEDIDAS[p.medida]} ${cm(p.valor)}`))}.`;
};

const Tamanho = () => {
  const { medidas, salvarMedidas } = useSacola();
  const [aba, setAba] = useState<Aba>(() =>
    medidas.cinturaMasc && !medidas.busto && !medidas.cintura ? 'masculino' : 'feminino',
  );
  const [textos, setTextos] = useState<Record<Campo, string>>(() => paraTexto(medidas));

  const alterar = (campo: Campo, texto: string) => {
    const limpo = texto.replace(/[^\d,.]/g, '').slice(0, 6);
    setTextos(t => ({ ...t, [campo]: limpo }));
    const numero = Number(limpo.replace(',', '.'));
    salvarMedidas({ ...medidas, [campo]: limpo && Number.isFinite(numero) && numero > 0 ? numero : undefined });
  };

  const limparMedidas = () => {
    setTextos(paraTexto({}));
    salvarMedidas({});
  };

  const resultados = RESULTADOS[aba].map(r => ({ ...r, resultado: calcularTamanho(medidas, r.grupo) }));
  const algumResultado = resultados.some(r => r.resultado?.tipo === 'ok');
  const temMedida = Object.values(medidas).some(v => v !== undefined);

  const mensagem = () => {
    const camposUsados = (aba === 'feminino' ? ['busto', 'abaixoBusto', 'cintura', 'quadril'] : ['cinturaMasc']) as Campo[];
    const lista = camposUsados
      .filter(c => medidas[c])
      .map(c => `${CAMPOS[c].rotulo.toLowerCase()} ${cm(medidas[c] as number)}`)
      .join(', ');
    const tamanhos = resumoTamanhos(aba === 'feminino' ? { ...medidas, cinturaMasc: undefined } : { cinturaMasc: medidas.cinturaMasc });
    return [
      'Olá, Irene! Usei o "Descubra seu tamanho" no site.',
      `Minhas medidas: ${lista}.`,
      tamanhos.length ? `Meus tamanhos: ${tamanhos.join('; ')}.` : '',
      'Pode me ajudar a escolher minhas peças?',
    ].filter(Boolean).join('\n');
  };

  const campoInput = (campo: Campo) => (
    <label key={campo} className={styles.field} htmlFor={`medida-${campo}`}>
      <span className={styles.fieldLabel}>{CAMPOS[campo].rotulo}</span>
      <span className={styles.inputWrap}>
        <input
          id={`medida-${campo}`}
          className={styles.input}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={textos[campo]}
          onChange={e => alterar(campo, e.target.value)}
          aria-describedby={`dica-${campo}`}
        />
        <span className={styles.unit} aria-hidden="true">cm</span>
      </span>
      <span id={`dica-${campo}`} className={styles.fieldHint}>{CAMPOS[campo].dica}</span>
    </label>
  );

  return (
    <section id="tamanho" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Acerte na primeira compra</span>
          <h2 className={styles.title}>Descubra seu tamanho</h2>
          <p className={styles.subtitle}>
            Com uma fita métrica, meça sem apertar e digite em centímetros. O cálculo usa a tabela oficial de medidas da DeMillus.
          </p>
          <a href="#videos" className={styles.videoLink}>
            <FaPlayCircle aria-hidden="true" /> Veja no vídeo como tirar as medidas
          </a>
        </div>

        <div className={styles.card}>
          <div className={styles.tabs} role="tablist" aria-label="Tipo de tabela">
            {(['feminino', 'masculino'] as Aba[]).map(a => (
              <button
                key={a}
                type="button"
                role="tab"
                id={`aba-${a}`}
                aria-selected={aba === a}
                aria-controls="painel-tamanho"
                className={`${styles.tab} ${aba === a ? styles.tabActive : ''}`}
                onClick={() => setAba(a)}
              >
                {a === 'feminino' ? 'Feminino' : 'Masculino'}
              </button>
            ))}
          </div>

          <div id="painel-tamanho" role="tabpanel" aria-labelledby={`aba-${aba}`} className={styles.panel}>
            <div className={styles.form}>
              {aba === 'feminino' ? (
                GRUPOS_FEMININOS.map(g => (
                  <fieldset key={g.titulo} className={styles.group}>
                    <legend className={styles.groupTitle}>
                      {g.titulo} <span>para {g.para}</span>
                    </legend>
                    <div className={styles.fields}>{g.campos.map(campoInput)}</div>
                  </fieldset>
                ))
              ) : (
                <fieldset className={styles.group}>
                  <legend className={styles.groupTitle}>
                    Linha masculina Zeus <span>para cuecas, bermudas e pijamas</span>
                  </legend>
                  <div className={styles.fields}>{campoInput('cinturaMasc')}</div>
                </fieldset>
              )}
            </div>

            <div className={styles.results} aria-live="polite">
              <h3 className={styles.resultsTitle}>
                <FaRulerHorizontal aria-hidden="true" /> Seu tamanho
              </h3>
              {resultados.map(({ grupo, rotulo, vazio, resultado }) => (
                <div key={grupo} className={`${styles.result} ${resultado?.tipo === 'ok' ? styles.resultOk : ''}`}>
                  <span className={styles.resultLabel}>{rotulo}</span>
                  {resultado?.tipo === 'ok' ? (
                    <span className={styles.resultSize}>{resultado.tamanho}</span>
                  ) : (
                    <span className={styles.resultSizeEmpty}>—</span>
                  )}
                  <span className={styles.resultNote}>{resultado ? explicar(resultado) : vazio}</span>
                </div>
              ))}

              <a
                href={algumResultado ? linkWhatsApp(mensagem()) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btnWhatsapp} ${algumResultado ? '' : styles.btnDisabled}`}
                aria-disabled={!algumResultado}
                onClick={e => { if (!algumResultado) e.preventDefault(); }}
              >
                <FaWhatsapp aria-hidden="true" /> Pedir ajuda no WhatsApp com meu tamanho
              </a>
              <p className={styles.saved}>
                Seu tamanho fica salvo neste aparelho e já aparece marcado quando você escolhe peças na Galeria.
                {temMedida && (
                  <>
                    {' '}
                    <button type="button" className={styles.clear} onClick={limparMedidas}>
                      Apagar minhas medidas
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          <details className={styles.table}>
            <summary>Ver a tabela oficial de medidas DeMillus</summary>
            <div className={styles.tableScroll}>
              {aba === 'feminino' ? (
                <table>
                  <caption>Medidas em centímetros</caption>
                  <thead>
                    <tr>
                      <th scope="col">Tamanho</th>
                      <th scope="col">Busto</th>
                      <th scope="col">Abaixo do busto</th>
                      <th scope="col">Cintura</th>
                      <th scope="col">Quadril</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABELA_FEMININA.map(l => (
                      <tr key={l.tamanho}>
                        <th scope="row">{l.tamanho}</th>
                        <td>{l.busto[0]} a {l.busto[1]}</td>
                        <td>{l.abaixoBusto[0]} a {l.abaixoBusto[1]}</td>
                        <td>{l.cintura[0]} a {l.cintura[1]}</td>
                        <td>{l.quadril[0]} a {l.quadril[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table>
                  <caption>Medidas em centímetros</caption>
                  <thead>
                    <tr>
                      <th scope="col">Tamanho</th>
                      <th scope="col">Cintura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABELA_MASCULINA.map(l => (
                      <tr key={l.tamanho}>
                        <th scope="row">{l.tamanho}</th>
                        <td>{l.cintura[0]} a {l.cintura[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Tamanho;
