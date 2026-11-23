type Faixa = readonly [number, number];

interface LinhaFeminina {
  tamanho: string;
  busto: Faixa;
  abaixoBusto: Faixa;
  cintura: Faixa;
  quadril: Faixa;
}

export const TABELA_FEMININA: readonly LinhaFeminina[] = [
  { tamanho: '40/PP', busto: [77, 82],   abaixoBusto: [62, 67],   cintura: [54, 61],   quadril: [76, 86] },
  { tamanho: '42/PE', busto: [83, 87],   abaixoBusto: [68, 72],   cintura: [62, 69],   quadril: [87, 94] },
  { tamanho: '44/ME', busto: [88, 92],   abaixoBusto: [73, 77],   cintura: [70, 77],   quadril: [95, 102] },
  { tamanho: '46/GR', busto: [93, 97],   abaixoBusto: [78, 82],   cintura: [78, 85],   quadril: [103, 110] },
  { tamanho: '48/EG', busto: [98, 102],  abaixoBusto: [83, 87],   cintura: [86, 93],   quadril: [111, 118] },
  { tamanho: '50/XG', busto: [103, 107], abaixoBusto: [88, 92],   cintura: [94, 101],  quadril: [119, 126] },
  { tamanho: '52/XX', busto: [108, 112], abaixoBusto: [93, 97],   cintura: [102, 109], quadril: [127, 134] },
  { tamanho: '54/3X', busto: [113, 117], abaixoBusto: [98, 102],  cintura: [110, 117], quadril: [135, 142] },
  { tamanho: '56/4X', busto: [118, 122], abaixoBusto: [103, 107], cintura: [118, 125], quadril: [143, 150] },
];

export const TABELA_MASCULINA: readonly { tamanho: string; cintura: Faixa }[] = [
  { tamanho: 'PE', cintura: [66, 77] },
  { tamanho: 'ME', cintura: [78, 90] },
  { tamanho: 'GR', cintura: [91, 103] },
  { tamanho: 'EG', cintura: [104, 116] },
];

export const TAMANHOS_FEMININOS = TABELA_FEMININA.map(l => l.tamanho);
export const TAMANHOS_MASCULINOS = TABELA_MASCULINA.map(l => l.tamanho);

export type MedidaFeminina = 'busto' | 'abaixoBusto' | 'cintura' | 'quadril';

export const NOMES_MEDIDAS: Record<MedidaFeminina | 'cinturaMasc', string> = {
  busto: 'busto',
  abaixoBusto: 'abaixo do busto',
  cintura: 'cintura',
  quadril: 'quadril',
  cinturaMasc: 'cintura',
};

export interface Medidas {
  busto?: number;
  abaixoBusto?: number;
  cintura?: number;
  quadril?: number;
  cinturaMasc?: number;
}

export type Resultado =
  | { tipo: 'ok'; indice: number; tamanho: string; porMedida: { medida: keyof Medidas; valor: number; tamanho: string }[] }
  | { tipo: 'fora'; lado: 'abaixo' | 'acima'; medida: keyof Medidas; valor: number };

export type GrupoTamanho = 'superior' | 'inferior' | 'inteiro' | 'masculino';

const indicePara = (valor: number, faixas: readonly Faixa[]): number | 'abaixo' | 'acima' => {
  if (valor < faixas[0][0]) return 'abaixo';
  const i = faixas.findIndex(([, max]) => valor <= max);
  return i === -1 ? 'acima' : i;
};

const combinar = (
  medidas: Medidas,
  chaves: (keyof Medidas)[],
  faixasDe: (chave: keyof Medidas) => readonly Faixa[],
  rotulos: readonly string[],
): Resultado | null => {
  const porMedida: { medida: keyof Medidas; valor: number; tamanho: string; indice: number }[] = [];
  for (const chave of chaves) {
    const valor = medidas[chave];
    if (valor === undefined || !Number.isFinite(valor) || valor <= 0) continue;
    const r = indicePara(valor, faixasDe(chave));
    if (r === 'abaixo' || r === 'acima') return { tipo: 'fora', lado: r, medida: chave, valor };
    porMedida.push({ medida: chave, valor, tamanho: rotulos[r], indice: r });
  }
  if (!porMedida.length) return null;
  const indice = Math.max(...porMedida.map(p => p.indice));
  return {
    tipo: 'ok',
    indice,
    tamanho: rotulos[indice],
    porMedida: porMedida.map(({ medida, valor, tamanho }) => ({ medida, valor, tamanho })),
  };
};

const faixasFemininas = (chave: keyof Medidas) =>
  TABELA_FEMININA.map(l => l[chave as MedidaFeminina]);

export const calcularTamanho = (medidas: Medidas, grupo: GrupoTamanho): Resultado | null => {
  switch (grupo) {
    case 'superior':
      return combinar(medidas, ['busto', 'abaixoBusto'], faixasFemininas, TAMANHOS_FEMININOS);
    case 'inferior':
      return combinar(medidas, ['cintura', 'quadril'], faixasFemininas, TAMANHOS_FEMININOS);
    case 'inteiro':
      return combinar(medidas, ['busto', 'abaixoBusto', 'cintura', 'quadril'], faixasFemininas, TAMANHOS_FEMININOS);
    case 'masculino':
      return combinar(medidas, ['cinturaMasc'], () => TABELA_MASCULINA.map(l => l.cintura), TAMANHOS_MASCULINOS);
  }
};

export const resumoTamanhos = (medidas: Medidas): string[] => {
  const linhas: string[] = [];
  const add = (rotulo: string, grupo: GrupoTamanho) => {
    const r = calcularTamanho(medidas, grupo);
    if (r?.tipo === 'ok') linhas.push(`${rotulo}: ${r.tamanho}`);
  };
  add('Sutiãs e tops', 'superior');
  add('Calcinhas, leggings e bermudas', 'inferior');
  add('Bodies, pijamas e modeladores', 'inteiro');
  add('Masculino', 'masculino');
  return linhas;
};
