import type { Frame360 } from '../Viewer360';
import type { GrupoTamanho } from '../../data/tamanhos';

export type Category = 'sutias' | 'calcinhas' | 'noite' | 'fitness' | 'bodies' | 'masculino';

export interface Product {
  id: number;
  src: string;
  name: string;
  description: string;
  category: Category;
  novidade?: boolean;
  giro?: Frame360[];
  grupoTamanho?: GrupoTamanho;
}

export const categoryLabels: Record<Category, string> = {
  sutias:    'Sutiãs',
  calcinhas: 'Calcinhas',
  noite:     'Noite & Pijamas',
  fitness:   'Fitness',
  bodies:    'Bodies & Modeladores',
  masculino: 'Masculino',
};

const GRUPO_POR_CATEGORIA: Record<Category, GrupoTamanho> = {
  sutias:    'superior',
  calcinhas: 'inferior',
  noite:     'inteiro',
  fitness:   'inferior',
  bodies:    'inteiro',
  masculino: 'masculino',
};

export const grupoDe = (p: Product): GrupoTamanho => p.grupoTamanho ?? GRUPO_POR_CATEGORIA[p.category];

export const slugDe = (p: Product) => (p.src.split('/').pop() ?? '').replace(/\.jpg$/, '');
