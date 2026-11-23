import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { FaSearchPlus, FaSearchMinus, FaArrowsAltH } from 'react-icons/fa';
import styles from './styles.module.css';

export interface Frame360 {
  src: string;
  label: string;
}

interface Props {
  frames: Frame360[];
  alt: string;
  className?: string;
}

const TILT_DEG = 26;
const DRAG_DEG_PER_WIDTH = 330;
const ZOOM = 2.2;

const mod = (a: number, n: number) => ((a % n) + n) % n;
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Viewer360 = ({ frames, alt, className }: Props) => {
  const n = frames.length;
  const step = 360 / n;

  const rootRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef(0);
  const dragRef = useRef<{ lastX: number; lastT: number; moved: number; v: number } | null>(null);
  const reducedRef = useRef(prefersReducedMotion());

  const [angle, setAngleState] = useState(0);
  const [touched, setTouched] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 35%');

  const setAngle = useCallback((a: number) => {
    angleRef.current = a;
    setAngleState(a);
  }, []);

  const stop = useCallback(() => cancelAnimationFrame(rafRef.current), []);

  const animateTo = useCallback((target: number, duration: number, ease = easeOut) => {
    stop();
    const from = angleRef.current;
    if (reducedRef.current) {
      setAngle(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      setAngle(from + (target - from) * ease(k));
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [setAngle, stop]);

  const nearestIndex = Math.round(mod(angle, 360) / step) % n;

  const goTo = useCallback((index: number) => {
    const current = angleRef.current;
    const diff = mod(index * step - current + 180, 360) - 180;
    animateTo(current + diff, 520);
  }, [animateTo, step]);

  useEffect(() => {
    if (reducedRef.current) return;
    const timer = window.setTimeout(() => animateTo(360, 2600, easeInOut), 700);
    return () => {
      window.clearTimeout(timer);
      stop();
    };
  }, [animateTo, stop]);

  const markTouched = () => {
    if (!touched) setTouched(true);
  };

  const updateOrigin = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    markTouched();
    stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    if (zoomed) {
      updateOrigin(e);
      return;
    }
    dragRef.current = { lastX: e.clientX, lastT: performance.now(), moved: 0, v: 0 };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (zoomed) {
      if (e.pointerType === 'mouse' || e.buttons) updateOrigin(e);
      return;
    }
    const drag = dragRef.current;
    if (!drag) return;
    const width = rootRef.current?.clientWidth || 1;
    const now = performance.now();
    const dx = e.clientX - drag.lastX;
    const delta = (-dx / width) * DRAG_DEG_PER_WIDTH;
    drag.v = delta / Math.max(1, now - drag.lastT);
    drag.lastX = e.clientX;
    drag.lastT = now;
    drag.moved += Math.abs(dx);
    setAngle(angleRef.current + delta);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || zoomed) return;
    const projected = angleRef.current + drag.v * 240;
    animateTo(Math.round(projected / step) * step, 520);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      markTouched();
      if (!zoomed) goTo(mod(nearestIndex + (e.key === 'ArrowRight' ? 1 : -1), n));
    } else if (e.key === 'Escape' && zoomed) {
      e.stopPropagation();
      setZoomed(false);
    }
  };

  const toggleZoom = () => {
    markTouched();
    if (!zoomed) {
      stop();
      setAngle(Math.round(angleRef.current / step) * step);
      setOrigin('50% 35%');
    }
    setZoomed(z => !z);
  };

  const pos = mod(angle, 360) / step;
  const base = Math.floor(pos) % n;
  const next = (base + 1) % n;
  const t = pos - Math.floor(pos);
  const fade = smoothstep(0.4, 0.6, t);
  const dip = 1 - 0.035 * Math.sin(Math.PI * t);

  const frameStyle = (index: number): CSSProperties => {
    if (zoomed) {
      return index === nearestIndex
        ? { opacity: 1, transform: `scale(${ZOOM})`, transformOrigin: origin }
        : { opacity: 0 };
    }
    if (index === base) {
      return { opacity: 1 - fade, transform: `rotateY(${-t * TILT_DEG}deg) scale(${dip})` };
    }
    if (index === next) {
      return { opacity: fade, transform: `rotateY(${(1 - t) * TILT_DEG}deg) scale(${dip})` };
    }
    return { opacity: 0 };
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${zoomed ? styles.zoomed : ''} ${className ?? ''}`}
      tabIndex={0}
      role="group"
      aria-roledescription="visualizador giratório"
      aria-label={`${alt}. Arraste para girar a peça ou use as setas do teclado.`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      {frames.map((frame, index) => (
        <img
          key={frame.src}
          src={frame.src}
          alt={index === nearestIndex ? `${alt} — ${frame.label}` : ''}
          aria-hidden={index === nearestIndex ? undefined : true}
          className={styles.frame}
          style={frameStyle(index)}
          draggable={false}
          width={736}
          height={900}
        />
      ))}

      <span className={`${styles.hint} ${touched ? styles.hintHidden : ''}`} aria-hidden="true">
        <FaArrowsAltH /> Arraste para girar a peça
      </span>

      <div className={styles.controls} onPointerDown={e => e.stopPropagation()}>
        {frames.map((frame, index) => (
          <button
            key={frame.src}
            type="button"
            className={`${styles.chip} ${index === nearestIndex ? styles.chipActive : ''}`}
            aria-pressed={index === nearestIndex}
            disabled={zoomed}
            onClick={() => {
              markTouched();
              goTo(index);
            }}
          >
            {frame.label}
          </button>
        ))}
        <button
          type="button"
          className={styles.zoomBtn}
          onClick={toggleZoom}
          aria-pressed={zoomed}
          aria-label={zoomed ? 'Sair do zoom' : 'Ver detalhes com zoom'}
          title={zoomed ? 'Sair do zoom' : 'Ver detalhes com zoom'}
        >
          {zoomed ? <FaSearchMinus /> : <FaSearchPlus />}
        </button>
      </div>

      <span className={styles.srOnly} aria-live="polite">
        {frames[nearestIndex].label}
      </span>
    </div>
  );
};

export default Viewer360;
