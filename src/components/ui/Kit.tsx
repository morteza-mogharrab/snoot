import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { BadgeCheck, X } from 'lucide-react';
import type { Pet } from '../../types';
import { useDb, useUI } from '../../store/AppStore';
import { storyOf, unseen } from '../../store/selectors';
import { speciesEmoji } from '../../utils/format';
import { TreatIcon } from './Brand';

// ------------------------------------------------------------------ Avatar
export function PetAvatar({ pet, size = 40, story = false, link = false, species = false }: {
  pet: Pet; size?: number; story?: boolean; link?: boolean; species?: boolean;
}) {
  const db = useDb();
  const { openStories } = useUI();
  const s = story ? storyOf(db, pet.id) : undefined;
  const img = <img src={pet.avatar} alt={pet.name} width={size} height={size} loading="lazy" draggable={false} />;
  const badge = species ? <span className="av-species" aria-hidden="true">{speciesEmoji[pet.species]}</span> : null;
  if (s) {
    return (
      <button type="button" className={`av ring ${unseen(s) ? '' : 'seen'}`} style={{ width: size + 6, height: size + 6 }}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); openStories({ storyIds: [s.id], startIndex: 0 }); }} aria-label={`${pet.name}'s story`}>
        <span>{img}</span>{badge}
      </button>
    );
  }
  const el = <span className="av" style={{ width: size, height: size }}>{img}{badge}</span>;
  return link ? <Link to={`/pet/${pet.handle}`} aria-label={pet.name}>{el}</Link> : el;
}

export function PetName({ pet, className = '' }: { pet: Pet; className?: string }) {
  return (
    <Link to={`/pet/${pet.handle}`} className={`name-line ${className}`}>
      {pet.name}{pet.verified && <BadgeCheck size={15} className="verified" fill="currentColor" stroke="var(--surface)" />}
    </Link>
  );
}

// ------------------------------------------------------------------ Modal
let open = 0;
export function Modal({ onClose, children, size = '', label, className = '' }: { onClose(): void; children: ReactNode; size?: '' | 'wide' | 'mid'; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onClose);
  cb.current = onClose;
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); cb.current(); } };
    window.addEventListener('keydown', k);
    open++;
    document.body.classList.add('modal-open');
    ref.current?.focus({ preventScroll: true });
    return () => { window.removeEventListener('keydown', k); if (--open === 0) document.body.classList.remove('modal-open'); };
  }, []);
  return createPortal(
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={label} className={`modal ${size} ${className}`}>{children}</div>
    </div>,
    document.body,
  );
}
export function ModalHead({ title, onClose, left }: { title: ReactNode; onClose(): void; left?: ReactNode }) {
  return (
    <div className="modal-head">
      <div className="row">{left}<h2 className="h3">{title}</h2></div>
      <button className="icon-btn sm" onClick={onClose} aria-label="Close"><X size={20} /></button>
    </div>
  );
}

export interface SheetItem { label: string; icon?: ReactNode; danger?: boolean; onClick(): void }
export function ActionSheet({ items, onClose, title = 'Options' }: { items: SheetItem[]; onClose(): void; title?: string }) {
  return (
    <Modal onClose={onClose} label={title}>
      <div className="sheet-list">
        {items.map((i) => <button key={i.label} className={i.danger ? 'danger' : ''} onClick={() => { onClose(); i.onClick(); }}>{i.icon}{i.label}</button>)}
        <button onClick={onClose} className="muted">Cancel</button>
      </div>
    </Modal>
  );
}

// ------------------------------------------------------------------ feedback
export function Toasts() {
  const { toasts } = useUI();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.tone ?? ''}`}>
          <span className="toast-ico">{t.tone === 'treat' ? <TreatIcon size={16} /> : t.tone === 'badge' ? '🏅' : '🐾'}</span>
          <span>{t.text}</span>
          {t.amount ? <span className="toast-amt">+{t.amount}</span> : null}
        </div>
      ))}
    </div>
  );
}

const COLORS = ['#FF5B4A', '#FFB935', '#8F6BFF', '#1FBF94', '#4F7CFF', '#FF5FA8'];
export function Confetti() {
  const { confetti } = useUI();
  if (!confetti) return null;
  return (
    <div className="confetti" key={confetti} aria-hidden="true">
      {Array.from({ length: 70 }, (_, i) => (
        <i key={i} style={{
          left: `${(i * 37) % 100}%`, background: COLORS[i % COLORS.length], animationDuration: `${1.6 + (i % 7) * 0.22}s`,
          animationDelay: `${(i % 10) * 0.04}s`, ['--dx' as string]: `${((i * 53) % 160) - 80}px`, ['--rot' as string]: `${(i * 97) % 720}deg`,
          borderRadius: i % 3 === 0 ? '50%' : '3px',
        }} />
      ))}
    </div>
  );
}

export function Empty({ art = '🐾', title, children }: { art?: string; title: string; children?: ReactNode }) {
  return (
    <div className="empty">
      <span className="empty-art" aria-hidden="true">{art}</span>
      <p className="h3" style={{ color: 'var(--ink)' }}>{title}</p>
      {children}
    </div>
  );
}

/** Circular progress ring. */
export function Ring({ value, size = 84, stroke = 9, color = 'url(#ring-sunset)', children }: { value: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id="ring-sunset" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF5B4A" /><stop offset="1" stopColor="#FFB935" /></linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - v)} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset 0.8s var(--ease)' }} />
      </svg>
      <div className="ring-center">{children}</div>
    </div>
  );
}

/** Simple vertical bar chart in HTML (no library needed). */
export function Bars({ data, unit = 'km', goal }: { data: { label: string; value: number; highlight?: boolean }[]; unit?: string; goal?: number }) {
  const max = Math.max(goal ?? 0, ...data.map((d) => d.value), 0.1);
  return (
    <div className="bars" role="img" aria-label={`Bar chart: ${data.map((d) => `${d.label} ${d.value.toFixed(1)} ${unit}`).join(', ')}`}>
      {goal ? <div className="bars-goal" style={{ bottom: `calc(${(goal / max) * 100}% * 0.82 + 22px)` }}><span>{goal} {unit}</span></div> : null}
      {data.map((d, i) => (
        <div className="bar-col" key={i}>
          <span className="bar-val">{d.value ? d.value.toFixed(1) : ''}</span>
          <div className="bar-track"><div className={`bar ${d.highlight ? 'hi' : ''}`} style={{ height: `${(d.value / max) * 100}%` }} /></div>
          <span className="bar-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function StatTile({ label, value, sub, icon, tone = '' }: { label: string; value: ReactNode; sub?: ReactNode; icon?: ReactNode; tone?: string }) {
  return (
    <div className={`stat-tile ${tone}`}>
      {icon && <span className="stat-ico">{icon}</span>}
      <span className="stat-val">{value}</span>
      <span className="stat-label">{label}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  );
}

/** Renders text with @handles and #tags as links. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/((?<=^|\s)[@#][\w.]*\w)/g);
  return <>{parts.map((p, i) => (p.startsWith('@') ? <Link key={i} to={`/pet/${p.slice(1)}`} className="tag-link">{p}</Link>
    : p.startsWith('#') ? <Link key={i} to={`/discover?q=${encodeURIComponent(p)}`} className="tag-link">{p}</Link> : <span key={i}>{p}</span>))}</>;
}
