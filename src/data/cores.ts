export interface CorProduto {
  nome: string;
  codigo: string;
  hex: string;
  src?: string;
}

const foto = (arquivo: string) => `/images/produtos/cores/${arquivo}.jpg`;
const card = (slug: string) => `/images/produtos/${slug}.jpg`;

export const coresPorProduto: Record<string, { padrao: string; cores: CorProduto[] }> = {
  'sutia-joli-demillus': {
    padrao: '21',
    cores: [
      { nome: 'Azul-Frozen', codigo: '21', hex: '#a9c4e4', src: card('sutia-joli-demillus') },
      { nome: 'Rosa Bebê', codigo: '89', hex: '#f2c4cf', src: foto('sutia-joli-demillus-89') },
    ],
  },
  'sutia-louco-amor': {
    padrao: '27',
    cores: [
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f', src: card('sutia-louco-amor') },
    ],
  },
  'sutia-demillus-miracle': {
    padrao: '14',
    cores: [
      { nome: 'Pérola', codigo: '14', hex: '#efe6d4', src: card('sutia-demillus-miracle') },
    ],
  },
  'sutia-basico-plus-ultraleve': {
    padrao: '27',
    cores: [
      { nome: 'Bege-Rosado', codigo: '55', hex: '#c9a38f' },
      { nome: 'Branco', codigo: '20', hex: '#f5f3ef' },
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f', src: card('sutia-basico-plus-ultraleve') },
    ],
  },
  'fio-dental-xamego': {
    padrao: '70',
    cores: [
      { nome: 'Amarelo-Ouro', codigo: '70', hex: '#e9c21c', src: card('fio-dental-xamego') },
      { nome: 'Amora', codigo: '79', hex: '#5a2340' },
      { nome: 'Azul-Atalaia', codigo: '57', hex: '#3f6fb5', src: foto('fio-dental-xamego-57') },
      { nome: 'Branco', codigo: '20', hex: '#f5f3ef', src: foto('fio-dental-xamego-20') },
      { nome: 'Carmim', codigo: '06', hex: '#b0172e', src: foto('fio-dental-xamego-06') },
      { nome: 'Goiaba', codigo: '36', hex: '#e8707a' },
      { nome: 'Páprica', codigo: '48', hex: '#c4512b' },
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f' },
    ],
  },
  'biquini-bicolor': {
    padrao: '56',
    cores: [
      { nome: 'Roxo', codigo: '53', hex: '#6b2f6b', src: foto('biquini-bicolor-53') },
      { nome: 'Terra', codigo: '56', hex: '#cf5532', src: card('biquini-bicolor') },
    ],
  },
  'biquini-basico-ultraleve': {
    padrao: '20',
    cores: [
      { nome: 'Bege-Rosado', codigo: '55', hex: '#c9a38f', src: foto('biquini-basico-ultraleve-55') },
      { nome: 'Branco', codigo: '20', hex: '#f5f3ef', src: card('biquini-basico-ultraleve') },
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f' },
    ],
  },
  'pijama-longo-purisme': {
    padrao: '03',
    cores: [
      { nome: 'Rosa-Verano', codigo: '03', hex: '#f1c3d8', src: card('pijama-longo-purisme') },
    ],
  },
  'shortdoll-demillus-touch': {
    padrao: '27',
    cores: [
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f', src: card('shortdoll-demillus-touch') },
      { nome: 'Rosa-Blush', codigo: '98', hex: '#e3aaa6', src: foto('shortdoll-demillus-touch-98') },
    ],
  },
  'pijama-feminino-legging': {
    padrao: '03',
    cores: [
      { nome: 'Rosa-Verano', codigo: '03', hex: '#f1c3d8', src: card('pijama-feminino-legging') },
    ],
  },
  'blusa-ermitage': {
    padrao: '20',
    cores: [
      { nome: 'Branco', codigo: '20', hex: '#f5f3ef', src: card('blusa-ermitage') },
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f' },
      { nome: 'Rosa Bebê', codigo: '89', hex: '#f2c4cf', src: foto('blusa-ermitage-89') },
    ],
  },
  'bermuda-velvette-ultraleve': {
    padrao: '25',
    cores: [
      { nome: 'Bronze', codigo: '25', hex: '#8a5a45', src: card('bermuda-velvette-ultraleve') },
    ],
  },
  'legging-voragem-ultraleve': {
    padrao: '56',
    cores: [
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f', src: foto('legging-voragem-ultraleve-27') },
      { nome: 'Terra', codigo: '56', hex: '#b33a2c', src: card('legging-voragem-ultraleve') },
    ],
  },
  'body-vectra-ultraleve': {
    padrao: '23',
    cores: [
      { nome: 'Amarelo-Ouro', codigo: '70', hex: '#e2b33c' },
      { nome: 'Bronze', codigo: '25', hex: '#8a5a45' },
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f', src: foto('body-vectra-ultraleve-27') },
      { nome: 'Verde-Esmeralda', codigo: '23', hex: '#1d5c3f', src: card('body-vectra-ultraleve') },
    ],
  },
  'body-ternesse': {
    padrao: '27',
    cores: [
      { nome: 'Chocolate', codigo: '22', hex: '#4a2e25' },
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f', src: card('body-ternesse') },
    ],
  },
  'bermuda-alta-modellare': {
    padrao: '55',
    cores: [
      { nome: 'Bege-Rosado', codigo: '55', hex: '#c9a38f', src: card('bermuda-alta-modellare') },
      { nome: 'Preto', codigo: '27', hex: '#1c1b1f', src: foto('bermuda-alta-modellare-27') },
    ],
  },
  'bermuda-estampada-zeus': {
    padrao: 'FH',
    cores: [
      { nome: 'Degradê', codigo: 'DG', hex: '#9aa39c', src: foto('bermuda-estampada-zeus-DG') },
      { nome: 'Folhagem', codigo: 'FH', hex: '#4a3322', src: card('bermuda-estampada-zeus') },
    ],
  },
  'boxer-linhas-ultraleve': {
    padrao: '01',
    cores: [
      { nome: 'Azul-Capri', codigo: '01', hex: '#138a8f', src: card('boxer-linhas-ultraleve') },
      { nome: 'Cinza-Aço', codigo: '28', hex: '#6f7680' },
    ],
  },
};
