import { Link } from '@tanstack/react-router';
import { ArrowRight, Moon, Sunrise } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudy } from '@/features/study/study-context';
import { buildSchedule, prioritize } from '@/features/study/briefing';
import { DataTag, greetingFor, isoDate, useNow } from './extras';

export function BriefingPage() {
 const { checkIn, tasks } = useStudy();
 const now = useNow();
 const sessionTasks = tasks.filter(t => t.source === 'session' && !t.done).map(t => t.title);

 if (!checkIn) return <div className="flow">
  <header className="flow-head"><span className="flow-icon"><Sunrise size={22} /></span><div><h1>Morning briefing</h1><p>Your day, ordered by what matters most.</p></div></header>
  <section className="panel empty-brief">
   <Moon size={28} className="night-icon" />
   <h2>Nothing to brief yet</h2>
   <p>Your briefing is built from your own night check-in — we won’t invent tasks or deadlines for you. Take five minutes to add what’s on your plate.</p>
   <Button asChild><Link to="/check-in">Start night check-in <ArrowRight size={16} /></Link></Button>
  </section>
 </div>;

 const items = prioritize({ ...checkIn, extra: [...checkIn.extra, ...sessionTasks.filter(t => !checkIn.extra.includes(t) && !checkIn.unfinished.includes(t))] }, now ? isoDate(now) : checkIn.savedAt.slice(0, 10));
 const schedule = buildSchedule(items, checkIn.startTime, checkIn.availableMinutes);
 const unscheduled = items.slice(schedule.length);

 return <div className="flow">
  <header className="flow-head"><span className="flow-icon"><Sunrise size={22} /></span><div><h1>{greetingFor(now)}, Alex.</h1><p>Here’s your briefing, built from last night’s check-in. <DataTag kind="session" /></p></div></header>
  <div className="brief-grid">
   <section className="panel brief-priorities">
    <h2>Most important first</h2>
    {items.length ? <ol className="mission-list">{items.map((it, i) => <li key={it.title + i} className={it.rank === 1 ? 'is-urgent' : ''}><span className="mission-num">{i + 1}</span><div><strong>{it.title}</strong><span>{it.reason}</span></div></li>)}</ol> : <p className="muted-small">Your check-in has no open tasks. Enjoy a lighter day.</p>}
   </section>
   <section className="panel">
    <h2>Suggested schedule</h2>
    <p className="flow-hint">{checkIn.availableMinutes / 60} hours from {checkIn.startTime}, in 45-minute sessions with 10-minute breaks. Rule-based — not AI.</p>
    {schedule.length ? <ul className="timeline">{schedule.map(s => <li key={s.start}><time>{s.start}</time><div><strong>{s.title}</strong><span>{s.start} – {s.end} · {s.minutes} min</span></div></li>)}</ul> : <p className="muted-small">Not enough time set aside to schedule a session.</p>}
    {unscheduled.length > 0 && <p className="muted-small">Didn’t fit today: {unscheduled.map(u => u.title).join(', ')}.</p>}
   </section>
  </div>
  {checkIn.classes.length > 0 && <section className="panel"><h2>On your timetable</h2><ul className="chips">{checkIn.classes.map(c => <li key={c}>{c}</li>)}</ul></section>}
  <div className="flow-nav"><Button asChild variant="outline"><Link to="/check-in">Edit check-in</Link></Button><Button asChild><Link to="/">Back to dashboard <ArrowRight size={16} /></Link></Button></div>
 </div>;
}
