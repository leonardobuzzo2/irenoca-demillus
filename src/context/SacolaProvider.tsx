import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { SacolaContext, type ItemSacola, type NovoItem } from './sacola';
import type { Medidas } from '../data/tamanhos';

const CHAVE_ITENS = 'irenoca:sacolinha';
const CHAVE_MEDIDAS = 'irenoca:medidas';

const ler = <T,>(chave: string, padrao: T): T => {
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : padrao;
  } catch {
    return padrao;
  }
};

const gravar = (chave: string, valor: unknown) => {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // armazenamento indisponível (aba anônima, bloqueio de cookies): segue só em memória
  }
};

const idDoItem = (item: NovoItem) => `${item.produtoId}|${item.cor ?? ''}|${item.tamanho}`;

const SacolaProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<ItemSacola[]>(() => ler<ItemSacola[]>(CHAVE_ITENS, []));
  const [medidas, setMedidas] = useState<Medidas>(() => ler<Medidas>(CHAVE_MEDIDAS, {}));
  const [aberta, setAberta] = useState(false);

  useEffect(() => gravar(CHAVE_ITENS, itens), [itens]);
  useEffect(() => gravar(CHAVE_MEDIDAS, medidas), [medidas]);

  const adicionar = useCallback((novo: NovoItem) => {
    const id = idDoItem(novo);
    setItens(atual => {
      const existente = atual.find(i => i.id === id);
      if (existente) return atual.map(i => (i.id === id ? { ...i, qtd: Math.min(20, i.qtd + 1) } : i));
      return [...atual, { ...novo, id, qtd: 1 }];
    });
  }, []);

  const alterarQtd = useCallback((id: string, delta: number) => {
    setItens(atual => atual.map(i => (i.id === id ? { ...i, qtd: Math.min(20, Math.max(1, i.qtd + delta)) } : i)));
  }, []);

  const remover = useCallback((id: string) => setItens(atual => atual.filter(i => i.id !== id)), []);
  const limpar = useCallback(() => setItens([]), []);
  const abrir = useCallback(() => setAberta(true), []);
  const fechar = useCallback(() => setAberta(false), []);
  const salvarMedidas = useCallback((m: Medidas) => setMedidas(m), []);

  const valor = useMemo(() => ({
    itens,
    totalPecas: itens.reduce((soma, i) => soma + i.qtd, 0),
    adicionar,
    alterarQtd,
    remover,
    limpar,
    aberta,
    abrir,
    fechar,
    medidas,
    salvarMedidas,
  }), [itens, adicionar, alterarQtd, remover, limpar, aberta, abrir, fechar, medidas, salvarMedidas]);

  return <SacolaContext.Provider value={valor}>{children}</SacolaContext.Provider>;
};

export default SacolaProvider;
