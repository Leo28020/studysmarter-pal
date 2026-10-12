import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Check, Moon, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useStudy } from '@/features/study/study-context';
import type { DatedItem } from '@/features/study/briefing';

const steps = ['Today', 'Tomorrow', 'Your time', 'Review'];

function ListInput({ id, label, placeholder, items, onChange }: { id: string; label: string; placeholder: string; items: string[]; onChange: (v: string[]) => void }) {
 const [value, setValue] = useState('');
 function add() { const v = value.trim(); if (v && !items.includes(v)) onChange([...items, v]); setValue(''); }
 return <div className="field">
  <label htmlFor={id}>{label}</label>
  <div className="inline-add"><input id={id} placeholder={placeholder} value={value} maxLength={120} onChange={e => setValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} /><Button type="button" variant="outline" onClick={add} disabled={!value.trim()} aria-label={`Add to ${label}`}><Plus size={16} /></Button></div>
  {items.length > 0 && <ul className="chips">{items.map(i => <li key={i}>{i}<button type="button" aria-label={`Remove ${i}`} onClick={() => onChange(items.filter(x => x !== i))}><X size={12} /></button></li>)}</ul>}
 </div>;
}

export function CheckInPage() {
 const { tasks, checkIn, saveCheckIn } = useStudy();
 const navigate = useNavigate();
 const [step, setStep] = useState(0);
 const [completed, setCompleted] = useState<string[]>(checkIn?.completed ?? tasks.filter(t => t.done).map(t => t.title));
 const [unfinished, setUnfinished] = useState<string[]>(checkIn?.unfinished ?? tasks.filter(t => !t.done).map(t => t.title));
 const [classes, setClasses] = useState<string[]>(checkIn?.classes ?? []);
 const [deadlines, setDeadlines] = useState<DatedItem[]>(checkIn?.deadlines ?? []);
 const [dlTitle, setDlTitle] = useState(''); const [dlDate, setDlDate] = useState('');
 const [hours, setHours] = useState(checkIn ? checkIn.availableMinutes / 60 : 3);
 const [start, setStart] = useState(checkIn?.startTime ?? '09:00');
 const [extra, setExtra] = useState<string[]>(checkIn?.extra ?? []);

 function moveTask(title: string, toDone: boolean) {
  if (toDone) { setUnfinished(u => u.filter(x => x !== title)); setCompleted(c => [...c, title]); }
  else { setCompleted(c => c.filter(x => x !== title)); setUnfinished(u => [...u, title]); }
 }
 function addDeadline() { if (!dlTitle.trim() || !dlDate) return; setDeadlines(d => [...d, { title: dlTitle.trim(), date: dlDate }]); setDlTitle(''); setDlDate(''); }
 function save() {
  saveCheckIn({ savedAt: new Date().toISOString(), completed, unfinished, classes, deadlines, availableMinutes: Math.round(hours * 60), startTime: start, extra });
  toast.success('Check-in saved for this session', { description: 'It will be cleared if you refresh — permanent saving is not connected yet.' });
  navigate({ to: '/briefing' });
 }
 const todayTitles = [...completed, ...unfinished];

 return <div className="flow">
  <header className="flow-head">
   <span className="flow-icon"><Moon size={22} /></span>
   <div><h1>Night check-in</h1><p>Close the day gently, and hand tomorrow a clear plan.</p></div>
  </header>
  <ol className="stepper" aria-label="Check-in steps">{steps.map((s, i) => <li key={s} data-state={i < step ? 'done' : i === step ? 'current' : 'todo'}><span>{i < step ? <Check size={12} /> : i + 1}</span>{s}</li>)}</ol>

  <section className="panel flow-panel" key={step}>
   {step === 0 && <>
    <h2>How did today go?</h2><p className="flow-hint">Tap a task to switch it between finished and carry-over.</p>
    <ul className="toggle-list">{todayTitles.map(t => { const isDone = completed.includes(t); return <li key={t}><button type="button" aria-pressed={isDone} className={isDone ? 'is-done' : ''} onClick={() => moveTask(t, !isDone)}><span className="toggle-box">{isDone && <Check size={12} />}</span>{t}<em>{isDone ? 'Finished' : 'Carry over'}</em></button></li>; })}</ul>
    <ListInput id="ci-done" label="Anything else you finished?" placeholder="e.g. Watched lecture recording" items={completed.filter(c => !tasks.some(t => t.title === c))} onChange={v => setCompleted([...completed.filter(c => tasks.some(t => t.title === c)), ...v])} />
   </>}
   {step === 1 && <>
    <h2>What’s waiting tomorrow?</h2><p className="flow-hint">Add classes, exams, and any deadlines coming up.</p>
    <ListInput id="ci-classes" label="Tomorrow’s classes or exams" placeholder="e.g. Calculus midterm 10:00" items={classes} onChange={setClasses} />
    <div className="field"><label htmlFor="ci-dl">Upcoming deadlines</label>
     <div className="inline-add"><input id="ci-dl" placeholder="e.g. Lab report" value={dlTitle} maxLength={120} onChange={e => setDlTitle(e.target.value)} /><input type="date" aria-label="Deadline date" value={dlDate} onChange={e => setDlDate(e.target.value)} className="date-input" /><Button type="button" variant="outline" onClick={addDeadline} disabled={!dlTitle.trim() || !dlDate} aria-label="Add deadline"><Plus size={16} /></Button></div>
     {deadlines.length > 0 && <ul className="chips">{deadlines.map(d => <li key={d.title + d.date}>{d.title} · {d.date}<button type="button" aria-label={`Remove ${d.title}`} onClick={() => setDeadlines(deadlines.filter(x => x !== d))}><X size={12} /></button></li>)}</ul>}
    </div>
   </>}
   {step === 2 && <>
    <h2>How much time do you have?</h2><p className="flow-hint">Be realistic — a plan you can keep beats an ambitious one.</p>
    <div className="form-grid">
     <div className="field"><label htmlFor="ci-hours">Available study time: <strong className="gold-text">{hours} h</strong></label><input id="ci-hours" type="range" min={0.5} max={10} step={0.5} value={hours} onChange={e => setHours(Number(e.target.value))} /></div>
     <div className="field"><label htmlFor="ci-start">Start studying at</label><input id="ci-start" type="time" value={start} onChange={e => setStart(e.target.value || '09:00')} /></div>
    </div>
    <ListInput id="ci-extra" label="Additional tasks" placeholder="e.g. Email professor about extension" items={extra} onChange={setExtra} />
   </>}
   {step === 3 && <>
    <h2>Review your plan</h2><p className="flow-hint">Check everything before saving. You can go back to edit.</p>
    <dl className="review">
     <Review label="Finished today" items={completed} />
     <Review label="Carrying over" items={unfinished} />
     <Review label="Classes & exams" items={classes} />
     <Review label="Deadlines" items={deadlines.map(d => `${d.title} — ${d.date}`)} />
     <Review label="Study time" items={[`${hours} hours from ${start}`]} />
     <Review label="Additional tasks" items={extra} />
    </dl>
   </>}
   <div className="flow-nav">
    <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0}><ArrowLeft size={16} />Back</Button>
    {step < 3 ? <Button onClick={() => setStep(s => s + 1)}>Continue <ArrowRight size={16} /></Button> : <Button onClick={save}><Check size={16} />Save plan</Button>}
   </div>
  </section>
  <p className="flow-note">Your check-in is kept only while this page stays open. Permanent saving and reminders are not connected yet.</p>
 </div>;
}

function Review({ label, items }: { label: string; items: string[] }) {
 return <div><dt>{label}</dt><dd>{items.length ? items.join(' · ') : <span className="muted-small">None added</span>}</dd></div>;
}
