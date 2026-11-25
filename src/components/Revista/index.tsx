import { useEffect, useRef, useState, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload, FaWhatsapp } from 'react-icons/fa';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { EdicaoRevista } from '../../data/revista';
import { linkWhatsApp } from '../../context/sacola';
import styles from './styles.module.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

interface Props {
  edicao: EdicaoRevista | null;
  onClose: () => void;
}

const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

const RevistaFlip = ({ edicao, onClose }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [doc, setDoc] = useState<any>(null);
  const [numPaginas, setNumPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTask = useRef<any>(null);

  // Carrega o PDF quando a edição muda (páginas sob demanda: disableAutoFetch).
  useEffect(() => {
    if (!edicao) return;
    let cancelado = false;
    setDoc(null); setNumPaginas(0); setPagina(1); setErro(false);
    const task = pdfjsLib.getDocument({ url: edicao.pdf, disableAutoFetch: true });
    task.promise
      .then(d => { if (!cancelado) { setDoc(d); setNumPaginas(d.numPages); } })
      .catch(e => { if (!cancelado) { console.error('Erro ao abrir a revista', e); setErro(true); } });
    return () => { cancelado = true; task.destroy().catch(() => {}); };
  }, [edicao]);

  const desenhar = useCallback(async () => {
    if (!doc || !canvasRef.current || !stageRef.current) return;
    setCarregando(true);
    try {
      renderTask.current?.cancel();
      const page = await doc.getPage(pagina);
      const stage = stageRef.current;
      const margem = 24;
      const maxW = stage.clientWidth - margem * 2;
      const maxH = stage.clientHeight - margem * 2;
      const base = page.getViewport({ scale: 1 });
      const escala = Math.min(maxW / base.width, maxH / base.height);
      const ratio = dpr();
      const viewport = page.getViewport({ scale: escala * ratio });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width / ratio)}px`;
      canvas.style.height = `${Math.floor(viewport.height / ratio)}px`;
      renderTask.current = page.render({ canvasContext: ctx, viewport });
      await renderTask.current.promise;
    } catch (e) {
      if ((e as { name?: string })?.name !== 'RenderingCancelledException') console.error(e);
    } finally {
      setCarregando(false);
    }
  }, [doc, pagina]);

  useEffect(() => { desenhar(); }, [desenhar]);

  // Re-renderiza ao redimensionar a janela.
  useEffect(() => {
    if (!edicao) return;
    let t: number;
    const onResize = () => { window.clearTimeout(t); t = window.setTimeout(() => desenhar(), 150); };
    window.addEventListener('resize', onResize);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, [edicao, desenhar]);

  const ir = useCallback(
    (delta: number) => setPagina(p => Math.min(numPaginas || 1, Math.max(1, p + delta))),
    [numPaginas],
  );

  // Teclado + trava a rolagem do fundo.
  useEffect(() => {
    if (!edicao) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') ir(1);
      if (e.key === 'ArrowLeft') ir(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [edicao, onClose, ir]);

  const toqueX = useRef(0);

  if (!edicao) return null;

  const mensagemWa = linkWhatsApp(
    `Olá, Irene! Folheei a revista "${edicao.titulo}" no site e quero fazer um pedido. 💕`,
  );

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={`Revista ${edicao.titulo}`}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <header className={styles.top}>
          <div className={styles.titleWrap}>
            <span className={styles.rotulo}>{edicao.rotulo}</span>
            <strong className={styles.titulo}>{edicao.titulo}</strong>
          </div>
          <div className={styles.topActions}>
            <a href={edicao.pdf} download className={styles.iconBtn} title="Baixar PDF" aria-label="Baixar PDF">
              <FaDownload aria-hidden="true" />
            </a>
            <a href={mensagemWa} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
              <FaWhatsapp aria-hidden="true" /> <span className={styles.waLabel}>Pedir</span>
            </a>
            <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Fechar">
              <FaTimes aria-hidden="true" />
            </button>
          </div>
        </header>

        <div
          className={styles.stage}
          ref={stageRef}
          onTouchStart={e => { toqueX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - toqueX.current;
            if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
          }}
        >
          <button
            type="button"
            className={`${styles.nav} ${styles.navLeft}`}
            onClick={() => ir(-1)}
            disabled={pagina <= 1}
            aria-label="Página anterior"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div className={styles.pageWrap}>
            {erro ? (
              <div className={styles.aviso}>
                Não foi possível abrir a revista agora.{' '}
                <a href={edicao.pdf} target="_blank" rel="noopener noreferrer">Abrir o PDF</a>
              </div>
            ) : (
              <canvas key={edicao.id} ref={canvasRef} className={styles.canvas} />
            )}
            {carregando && !erro && <div className={styles.spinner} aria-label="Carregando página" />}
          </div>

          <button
            type="button"
            className={`${styles.nav} ${styles.navRight}`}
            onClick={() => ir(1)}
            disabled={numPaginas > 0 && pagina >= numPaginas}
            aria-label="Próxima página"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>

        <footer className={styles.bottom}>
          {numPaginas ? (
            <span>Página <strong>{pagina}</strong> de {numPaginas} · arraste ou use as setas</span>
          ) : erro ? (
            <span>Revista indisponível</span>
          ) : (
            <span>Abrindo a revista…</span>
          )}
        </footer>
      </div>
    </div>
  );
};

export default RevistaFlip;
