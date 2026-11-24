import type { ReactNode } from 'react';
import { CONTATO } from '../../data/contato';

export type TipoLegal = 'termos' | 'privacidade';

type PaginaLegal = {
  titulo: string;
  atualizadoEm: string;
  conteudo: ReactNode;
};

const Contato = () => (
  <ul>
    <li>
      WhatsApp:{' '}
      <a href={CONTATO.whatsappUrl} target="_blank" rel="noopener noreferrer">
        {CONTATO.telefone}
      </a>
    </li>
    <li>
      E-mail: <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>
    </li>
    <li>CNPJ: {CONTATO.cnpj}</li>
  </ul>
);

const termos: ReactNode = (
  <>
    <p>
      Bem-vinda ao site da <strong>Irenoca Demillus</strong>, inscrita no CNPJ {CONTATO.cnpj}. Ao navegar
      por este site, você concorda com os termos abaixo. Se não concordar com algum ponto, pedimos que
      não utilize o site e fale com a gente pelos canais de contato.
    </p>

    <h2>1. Quem somos</h2>
    <p>
      A Irenoca Demillus é uma <strong>revendedora independente</strong> de produtos DeMillus, fundada em
      2015 por Irene dos Santos Buzzo. Não somos a loja oficial da marca DeMillus, e a marca, os logotipos
      e as imagens oficiais dos produtos pertencem aos seus respectivos titulares.
    </p>

    <h2>2. Finalidade do site</h2>
    <p>
      Este site é uma vitrine para apresentar nossa história, nossos produtos e nossos canais de
      atendimento. <strong>Não realizamos vendas nem pagamentos diretamente pelo site.</strong> Pedidos,
      orçamentos, formas de pagamento e entrega são combinados pelo WhatsApp ou pelos demais canais
      indicados.
    </p>

    <h2>3. Produtos, preços e disponibilidade</h2>
    <ul>
      <li>As fotos são ilustrativas. Cores e detalhes podem variar conforme a tela do seu aparelho.</li>
      <li>Preços, tamanhos e disponibilidade são confirmados no momento do atendimento.</li>
      <li>
        Produtos à pronta entrega estão sujeitos ao estoque. Itens por encomenda seguem o calendário de
        pedidos semanais informado no atendimento.
      </li>
    </ul>

    <h2>4. Sacolinha e indicação de tamanho</h2>
    <p>
      A sacolinha e a ferramenta para descobrir seu tamanho são recursos para facilitar o seu pedido. A
      sacolinha apenas organiza os itens e monta uma mensagem para o WhatsApp; ela não representa uma
      compra concluída. A indicação de tamanho é uma estimativa baseada nas medidas informadas e nas
      tabelas da marca, e pode ser confirmada com a gente no atendimento.
    </p>

    <h2>5. Trocas e devoluções</h2>
    <p>
      Seguimos o Código de Defesa do Consumidor. Em compras feitas fora de loja física (por exemplo, pelo
      WhatsApp), você pode desistir da compra em até 7 dias a partir do recebimento do produto. Por
      questões de higiene, peças íntimas devem ser devolvidas sem uso, com etiquetas e embalagem
      original. Para solicitar troca ou devolução, fale com a gente pelos canais de contato.
    </p>

    <h2>6. Propriedade intelectual</h2>
    <p>
      Os textos, o layout e os demais conteúdos próprios deste site pertencem à Irenoca Demillus e não
      podem ser copiados ou reproduzidos sem autorização. Marcas e imagens de terceiros pertencem aos seus
      respectivos titulares.
    </p>

    <h2>7. Links para outros sites</h2>
    <p>
      O site contém links para serviços de terceiros, como WhatsApp, Instagram, Facebook, TikTok, Mercado
      Livre e YouTube. Esses serviços têm seus próprios termos e políticas, pelos quais não somos
      responsáveis.
    </p>

    <h2>8. Alterações destes termos</h2>
    <p>
      Podemos atualizar estes termos a qualquer momento. A data da última atualização fica sempre indicada
      no topo desta página.
    </p>

    <h2>9. Legislação aplicável</h2>
    <p>Estes termos são regidos pelas leis da República Federativa do Brasil.</p>

    <h2>10. Contato</h2>
    <p>Para dúvidas sobre estes termos, fale com a gente:</p>
    <Contato />
  </>
);

const privacidade: ReactNode = (
  <>
    <p>
      A <strong>Irenoca Demillus</strong>, inscrita no CNPJ {CONTATO.cnpj}, respeita a sua privacidade.
      Esta política explica quais dados pessoais tratamos, para que os usamos e quais são os seus direitos,
      de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
    </p>

    <h2>1. Dados que você nos envia</h2>
    <p>
      Quando você fala com a gente pelo WhatsApp, por e-mail ou pelas redes sociais, podemos receber dados
      como nome, telefone, e-mail, endereço de entrega, medidas e os produtos de interesse. Esses dados são
      usados apenas para atender você, fechar e entregar o seu pedido e prestar suporte.
    </p>

    <h2>2. Dados guardados no seu aparelho</h2>
    <p>
      A sacolinha e as medidas que você informa na ferramenta de tamanho ficam salvas{' '}
      <strong>somente no navegador do seu aparelho</strong> (armazenamento local), para que você não perca
      sua seleção ao voltar ao site. Esses dados não são enviados para nós, a menos que você mesma envie a
      mensagem da sacolinha pelo WhatsApp. Você pode apagá-los a qualquer momento limpando os dados de
      navegação do site.
    </p>

    <h2>3. Estatísticas e anúncios</h2>
    <ul>
      <li>
        <strong>Vercel Web Analytics:</strong> usamos para contar visitas e entender quais páginas são mais
        acessadas. Os dados são agregados e não identificam você pessoalmente.
      </li>
      <li>
        <strong>Google Ads (tag do Google):</strong> usamos para medir o resultado dos nossos anúncios. O
        Google pode usar cookies e identificadores do seu navegador para isso, conforme a política de
        privacidade do Google.
      </li>
      <li>
        <strong>Vídeos do YouTube:</strong> os vídeos usam o modo de privacidade aprimorada e só são
        carregados quando você clica para assistir.
      </li>
    </ul>

    <h2>4. Para que usamos os dados</h2>
    <ul>
      <li>Responder suas mensagens e dúvidas;</li>
      <li>Separar, cobrar e entregar seus pedidos;</li>
      <li>Avisar sobre novidades e promoções, apenas se você pedir ou concordar;</li>
      <li>Melhorar o site e medir o alcance dos nossos anúncios;</li>
      <li>Cumprir obrigações legais e fiscais.</li>
    </ul>

    <h2>5. Compartilhamento</h2>
    <p>
      <strong>Não vendemos seus dados.</strong> Eles só são compartilhados quando necessário para atender
      você, por exemplo com serviços de entrega (Correios ou transportadoras), com as plataformas que usamos
      para conversar e vender (como WhatsApp, Instagram, Facebook, TikTok e Mercado Livre) e com os
      serviços de estatística citados acima, ou quando exigido por lei.
    </p>

    <h2>6. Por quanto tempo guardamos</h2>
    <p>
      Guardamos os dados apenas pelo tempo necessário para atender você e cumprir obrigações legais. Depois
      disso, eles são excluídos ou anonimizados.
    </p>

    <h2>7. Seus direitos</h2>
    <p>Pela LGPD, você pode, a qualquer momento:</p>
    <ul>
      <li>Saber se tratamos seus dados e ter acesso a eles;</li>
      <li>Corrigir dados incompletos ou desatualizados;</li>
      <li>Pedir a exclusão dos seus dados ou revogar o seu consentimento;</li>
      <li>Deixar de receber mensagens de novidades e promoções;</li>
      <li>Obter informações sobre com quem compartilhamos seus dados.</li>
    </ul>
    <p>Para exercer qualquer desses direitos, basta falar com a gente pelos canais abaixo.</p>

    <h2>8. Cookies</h2>
    <p>
      Você pode bloquear ou apagar cookies e dados do site nas configurações do seu navegador. Isso não
      impede o uso do site, mas a sacolinha pode deixar de ser lembrada entre visitas.
    </p>

    <h2>9. Alterações desta política</h2>
    <p>
      Podemos atualizar esta política sempre que necessário. A data da última atualização fica indicada no
      topo desta página.
    </p>

    <h2>10. Contato</h2>
    <p>Para dúvidas sobre privacidade ou sobre os seus dados, fale com a gente:</p>
    <Contato />
  </>
);

export const PAGINAS_LEGAIS: Record<TipoLegal, PaginaLegal> = {
  termos: {
    titulo: 'Termos de Uso',
    atualizadoEm: '24 de novembro de 2026',
    conteudo: termos,
  },
  privacidade: {
    titulo: 'Política de Privacidade',
    atualizadoEm: '24 de novembro de 2026',
    conteudo: privacidade,
  },
};
