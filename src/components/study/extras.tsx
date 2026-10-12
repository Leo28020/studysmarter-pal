import { useEffect, useState } from 'react';

/** Current date/time read after hydration so server and client markup match. */
export function useNow() {
 const [now, setNow] = useState<Date | null>(null);
 useEffect(() => { setNow(new Date()); }, []);
 return now;
}
export function greetingFor(now: Date | null) {
 if (!now) return 'Welcome back';
 const h = now.getHours();
 return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}
export function isoDate(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

export function ProgressRing({ value, size = 132, label }: { value: number; size?: number; label?: string }) {
 const [shown, setShown] = useState(0);
 useEffect(() => { const id = requestAnimationFrame(() => setShown(value)); return () => cancelAnimationFrame(id); }, [value]);
 const stroke = 9; const r = (size - stroke) / 2; const c = 2 * Math.PI * r;
 return <div className="ring" style={{ width: size, height: size }} role="img" aria-label={`${value}% ${label ?? 'complete'}`}>
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
   <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" />
   <circle className="ring-value" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (shown / 100) * c} />
  </svg>
  <div className="ring-label"><strong>{value}%</strong>{label && <span>{label}</span>}</div>
 </div>;
}

export function DataTag({ kind }: { kind: 'demo' | 'session' }) {
 return <span className={`data-tag data-tag-${kind}`}>{kind === 'demo' ? 'Demo data' : 'Saved this session'}</span>;
}
