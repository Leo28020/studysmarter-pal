import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CalendarDays, Clock3, Moon, Play, Plus, Sunrise, Target, History, Flag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SectionHeading, SubjectIcon, TaskRow } from './shared';
import { DataTag, ProgressRing, greetingFor, useNow } from './extras';
import { useStudy } from '@/features/study/study-context';
import { deadlines, lastStudied, subjects, weeklyHours, yesterdayUnfinished } from '@/features/study/demo';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const rank = { High: 0, Medium: 1, Low: 2 } as const;

export function Dashboard() {
 const { tasks, checkIn } = useStudy();
 const now = useNow();
 const done = tasks.filter(t => t.done).length;
 const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
 const priorities = tasks.filter(t => !t.done).sort((a, b) => rank[a.priority] - rank[b.priority]).slice(0, 3);
 const minutesLeft = tasks.filter(t => !t.done).reduce((s, t) => s + t.minutes, 0);
 const carried = checkIn ? checkIn.unfinished.map(title => ({ title, subject: 'From your check-in', saved: true })) : yesterdayUnfinished.map(i => ({ ...i, saved: false }));
 const maxHours = Math.max(...weeklyHours);

 return <div className="dash">
  <header className="dash-hello">
   <div>
    <p className="dash-date">{now ? now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : '\u00a0'}</p>
    <h1>{greetingFor(now)}, Alex.</h1>
    <p className="dash-sub">One clear mission, a calm pace, and steady progress.</p>
   </div>
   <div className="dash-hello-actions">
    <Button asChild variant="outline"><Link to="/briefing"><Sunrise size={16} />Morning briefing</Link></Button>
    <Button asChild><Link to="/check-in"><Moon size={16} />Night check-in</Link></Button>
   </div>
  </header>

  <section className="mission card-rise" aria-labelledby="mission-title">
   <div className="mission-main">
    <div className="mission-eyebrow"><Target size={14} /><span id="mission-title">YOUR MISSION TODAY</span><DataTag kind="demo" /></div>
    <h2>{priorities.length ? `${priorities.length} priorities between you and a great day.` : 'Every task is done. Beautiful work.'}</h2>
    <ol className="mission-list">{priorities.map((t, i) => <li key={t.id}><span className="mission-num">{i + 1}</span><div><strong>{t.title}</strong><span>{t.subject} · {t.time} · {t.minutes} min</span></div><span className={`priority priority-${t.priority.toLowerCase()}`}>{t.priority}</span></li>)}</ol>
    <div className="mission-meta">
     <span><Clock3 size={14} />{Math.floor(minutesLeft / 60)}h {minutesLeft % 60}m of study left</span>
     <span><CalendarDays size={14} />{tasks.length} sessions planned</span>
     <span className="mission-deadline"><Flag size={14} />{deadlines[0].title} · {deadlines[0].label.toLowerCase()}</span>
    </div>
   </div>
   <div className="mission-side">
    <ProgressRing value={pct} label="complete" />
    <p>{done} of {tasks.length} tasks done</p>
    <Button asChild variant="outline" size="sm"><Link to="/planner">Open planner <ArrowRight size={14} /></Link></Button>
   </div>
  </section>

  <div className="dash-grid">
   <section className="panel continue card-rise">
    <div className="panel-top"><h2>Continue learning</h2><DataTag kind="demo" /></div>
    <div className="continue-body">
     <SubjectIcon subject={lastStudied.subject} tone="lavender" />
     <div className="min-w-0"><h3>{lastStudied.topic}</h3><p>{lastStudied.subject} · {lastStudied.module}</p><p className="muted-small">Last studied {lastStudied.when}</p></div>
    </div>
    <div className="bar"><span style={{ width: `${lastStudied.progress}%` }} /></div>
    <div className="continue-foot"><span>{lastStudied.progress}% of course</span><Button asChild size="sm"><Link to="/subjects"><Play size={14} />Resume</Link></Button></div>
   </section>

   <section className="panel night-card card-rise">
    <Moon size={22} className="night-icon" />
    <h2>Plan tomorrow tonight</h2>
    <p>A five-minute guided check-in: what you finished, what carries over, and the time you have tomorrow.</p>
    <div className="night-foot">
     {checkIn ? <DataTag kind="session" /> : <span className="muted-small">No check-in yet tonight</span>}
     <Button asChild><Link to="/check-in">{checkIn ? 'Edit check-in' : 'Start check-in'} <ArrowRight size={14} /></Link></Button>
    </div>
   </section>

   <QuickAdd />

   <section className="panel card-rise">
    <SectionHeading title="Upcoming deadlines" to="/planner" />
    <DataTag kind="demo" />
    <ul className="deadline-list">{deadlines.map((d, i) => <li key={d.title} className={i === 0 ? 'is-urgent' : ''}><div className="date-chip"><span>{d.month}</span><strong>{d.day}</strong></div><div className="min-w-0"><h3>{d.title}</h3><p>{d.subject}</p></div><span className="deadline-when">{d.label}</span></li>)}</ul>
   </section>

   <section className="panel card-rise">
    <div className="panel-top"><h2><History size={16} />Unfinished from yesterday</h2><DataTag kind={checkIn ? 'session' : 'demo'} /></div>
    {carried.length ? <ul className="carry-list">{carried.map(c => <li key={c.title}><span className="carry-dot" /><div><h3>{c.title}</h3><p>{c.subject}</p></div></li>)}</ul> : <p className="muted-small">Nothing carried over. Clean slate.</p>}
    <Link to="/check-in" className="subtle-link">Move these into tomorrow <ArrowRight size={13} /></Link>
   </section>

   <section className="panel week card-rise">
    <div className="panel-top"><h2>This week</h2><DataTag kind="demo" /></div>
    <div className="week-total"><strong>{weeklyHours.reduce((a, b) => a + b, 0).toFixed(1)}</strong><span>hours studied</span></div>
    <div className="week-bars">{weeklyHours.map((h, i) => <div key={days[i]} className="week-col" title={`${days[i]}: ${h} hours`}><div className="week-bar" style={{ height: `${(h / maxHours) * 100}%`, animationDelay: `${i * 60}ms` }} data-top={h === maxHours} /><span>{days[i][0]}</span></div>)}</div>
   </section>
  </div>

  <section className="panel card-rise">
   <SectionHeading title="Today’s sessions" detail="Tick off sessions as you go — changes last for this visit only." to="/planner" />
   <div className="task-list">{tasks.map(t => <TaskRow key={t.id} task={t} />)}</div>
  </section>
 </div>;
}

function QuickAdd() {
 const { addTask } = useStudy();
 const [title, setTitle] = useState('');
 const [subject, setSubject] = useState(subjects[0].name);
 function submit(e: React.FormEvent) {
  e.preventDefault();
  if (!title.trim()) return;
  addTask({ title: title.trim(), subject, minutes: 30, priority: 'Medium', due: new Date().toISOString().slice(0, 10) });
  toast.success('Task added for this session', { description: 'It is not saved permanently yet.' });
  setTitle('');
 }
 return <form className="panel quick-add card-rise" onSubmit={submit}>
  <h2><Plus size={16} />Quick add task</h2>
  <label className="sr-only" htmlFor="qa-title">Task</label>
  <input id="qa-title" placeholder="e.g. Review lecture 7 notes" value={title} onChange={e => setTitle(e.target.value)} maxLength={120} />
  <div className="quick-add-row">
   <label className="sr-only" htmlFor="qa-subject">Subject</label>
   <select id="qa-subject" value={subject} onChange={e => setSubject(e.target.value)}>{subjects.map(s => <option key={s.name}>{s.name}</option>)}</select>
   <Button type="submit" disabled={!title.trim()}>Add</Button>
  </div>
  <p className="muted-small">Added tasks stay until you refresh the page.</p>
 </form>;
}
