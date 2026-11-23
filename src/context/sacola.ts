import { createContext, useContext } from 'react';
import type { Medidas } from '../data/tamanhos';

export interface ItemSacola {
  id: string;
  produtoId: number;
  nome: string;
  foto: string;
  cor?: string;
  tamanho: string;
  qtd: number;
}

export type NovoItem = Omit<ItemSacola, 'id' | 'qtd'>;

export interface SacolaContexto {
  itens: ItemSacola[];
  totalPecas: number;
  adicionar: (item: NovoItem) => void;
  alterarQtd: (id: string, delta: number) => void;
  remover: (id: string) => void;
  limpar: () => void;
  aberta: boolean;
  abrir: () => void;
  fechar: () => void;
  medidas: Medidas;
  salvarMedidas: (m: Medidas) => void;
}

export const SacolaContext = createContext<SacolaContexto | null>(null);

export const useSacola = () => {
  const ctx = useContext(SacolaContext);
  if (!ctx) throw new Error('useSacola precisa estar dentro de SacolaProvider');
  return ctx;
};

export const WHATSAPP_NUMERO = '5511944669394';

export const linkWhatsApp = (mensagem: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
