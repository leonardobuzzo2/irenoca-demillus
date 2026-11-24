import type { GrupoTamanho } from './tamanhos';

/**
 * Peças que formam conjunto com as peças da Galeria. Na maioria das fotos da
 * DeMillus a modelo já veste o conjunto, então a peça que combina é a que
 * aparece na própria foto. As duas peças vêm nas mesmas cores, por isso a
 * peça do conjunto sempre segue a cor escolhida na peça principal.
 */
export interface PecaDoConjunto {
  /** Id usado na sacolinha. Peças fora da Galeria usam 101 em diante. */
  id: number;
  nome: string;
  /** Como a peça é chamada no texto: "Levar o biquíni também". */
  tipo: string;
  descricao: string;
  grupo: GrupoTamanho;
  /** Quando a peça também está na Galeria: slug da foto, para abrir a janela dela. */
  slugNaGaleria?: string;
}

export interface Conjunto {
  /** Explica de onde vem a combinação. */
  texto: string;
  peca: PecaDoConjunto;
}

export const conjuntoPorProduto: Record<string, Conjunto> = {
  'sutia-joli-demillus': {
    texto: 'Na foto, o sutiã está com este biquíni, que é da mesma linha.',
    peca: {
      id: 101,
      nome: 'Biquíni Joli DeMillus',
      tipo: 'biquíni',
      descricao: 'Com detalhes laterais em tule bordado forrado.',
      grupo: 'inferior',
    },
  },
  'sutia-louco-amor': {
    texto: 'Na foto, o sutiã está com este fio-dental, que é da mesma linha.',
    peca: {
      id: 102,
      nome: 'Fio-dental Louco Amor',
      tipo: 'fio-dental',
      descricao: 'Todo em renda elástica, com frente forrada em tom contrastante e costas com leve transparência.',
      grupo: 'inferior',
    },
  },
  'sutia-demillus-miracle': {
    texto: 'Na foto, o sutiã está com este biquíni, que é da mesma linha.',
    peca: {
      id: 103,
      nome: 'Biquíni DeMillus Miracle',
      tipo: 'biquíni',
      descricao: 'Todo em renda elástica com leve transparência.',
      grupo: 'inferior',
    },
  },
  'sutia-basico-plus-ultraleve': {
    texto: 'Combina com este biquíni, da mesma coleção Ultraleve e nas mesmas cores.',
    peca: {
      id: 7,
      nome: 'Biquíni Básico Ultraleve',
      tipo: 'biquíni',
      descricao: 'Sem costura, com cintura levemente baixa e elástico suave nas cavas.',
      grupo: 'inferior',
      slugNaGaleria: 'biquini-basico-ultraleve',
    },
  },
  'biquini-bicolor': {
    texto: 'Na foto, o biquíni está com este sutiã, que é da mesma linha.',
    peca: {
      id: 104,
      nome: 'Sutiã Bicolor',
      tipo: 'sutiã',
      descricao: 'Em elastano power levemente transparente, com aro e sem espuma.',
      grupo: 'superior',
    },
  },
  'biquini-basico-ultraleve': {
    texto: 'Na foto, o biquíni está com este sutiã, que é da mesma coleção.',
    peca: {
      id: 105,
      nome: 'Sutiã Básico Ultraleve',
      tipo: 'sutiã',
      descricao: 'Da coleção Ultraleve, feito sem costura.',
      grupo: 'superior',
    },
  },
  'legging-voragem-ultraleve': {
    texto: 'Na foto, a legging está com este top, que é da mesma linha.',
    peca: {
      id: 106,
      nome: 'Top Voragem Ultraleve',
      tipo: 'top',
      descricao: 'Sem espuma, sem aro e sem fecho, com alças em elástico largo e macio.',
      grupo: 'superior',
    },
  },
};
