export interface EdicaoRevista {
  id: string;
  rotulo: string;
  titulo: string;
  subtitulo: string;
  pdf: string;
  capa: string;
  folhearUrl: string;
}

export const REVISTA_TODAS_EDICOES_URL = 'https://demillus.vestemuitomelhor.com.br/revista-digital/';

export const edicaoAtual: EdicaoRevista = {
  id: 'c19-01-2027',
  rotulo: 'Edição atual',
  titulo: 'Réveillon 2026/27',
  subtitulo: 'Campanhas 19/2026 e 01/2027',
  pdf: '/revista-c19-01-2027.pdf',
  capa: '/images/revista-c19-01-2027.jpg',
  folhearUrl: 'https://demillus.vestemuitomelhor.com.br/revista-virtual-c-19-01-2027/',
};

export const proximaEdicao: EdicaoRevista = {
  id: 'c02-03-04-2027',
  rotulo: 'Próxima edição',
  titulo: 'Alto Verão 2027',
  subtitulo: 'Campanhas 02, 03 e 04/2027',
  pdf: '/revista-c02-03-04-2027.pdf',
  capa: '/images/revista-c02-03-04-2027.jpg',
  folhearUrl: 'https://demillus.vestemuitomelhor.com.br/revista-virtual-c-02-03-04-2027/',
};

export const edicoesRevista: EdicaoRevista[] = [edicaoAtual, proximaEdicao];
