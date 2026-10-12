// Pure planning helpers for the Night Check-in and Morning Briefing.
// Rule-based only — no AI. Replace with a secure server-side planner later.

export type DatedItem = { title: string; date: string }; // date as YYYY-MM-DD
export type CheckIn = {
  savedAt: string;
  completed: string[];
  unfinished: string[];
  classes: string[];
  deadlines: DatedItem[];
  availableMinutes: number;
  startTime: string; // HH:MM
  extra: string[];
};

export type BriefingItem = { title: string; reason: 'Deadline soon' | 'Carried over' | 'Class / exam prep' | 'Upcoming deadline' | 'Added task'; rank: number };
export type ScheduleSlot = { title: string; start: string; end: string; minutes: number };

const SESSION_MINUTES = 45;
const BREAK_MINUTES = 10;

export function daysUntil(date: string, today: string) {
  return Math.round((Date.parse(date + 'T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86_400_000);
}

/** Most important first: deadlines within 2 days, carried-over tasks, class/exam prep, later deadlines, extra tasks. */
export function prioritize(checkIn: CheckIn, today: string): BriefingItem[] {
  const items: BriefingItem[] = [];
  const sorted = [...checkIn.deadlines].sort((a, b) => a.date.localeCompare(b.date));
  sorted.filter(d => daysUntil(d.date, today) <= 2).forEach(d => items.push({ title: d.title, reason: 'Deadline soon', rank: 1 }));
  checkIn.unfinished.forEach(title => items.push({ title, reason: 'Carried over', rank: 2 }));
  checkIn.classes.forEach(title => items.push({ title: `Prepare: ${title}`, reason: 'Class / exam prep', rank: 3 }));
  sorted.filter(d => daysUntil(d.date, today) > 2).forEach(d => items.push({ title: d.title, reason: 'Upcoming deadline', rank: 4 }));
  checkIn.extra.forEach(title => items.push({ title, reason: 'Added task', rank: 5 }));
  return items;
}

function toMinutes(time: string) { const [h, m] = time.split(':').map(Number); return h * 60 + m; }
function toTime(total: number) { const h = Math.floor(total / 60) % 24; const m = total % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; }

/** Fits prioritized items into the available time as 45-minute sessions with 10-minute breaks. */
export function buildSchedule(items: BriefingItem[], startTime: string, availableMinutes: number): ScheduleSlot[] {
  const slots: ScheduleSlot[] = [];
  let cursor = toMinutes(startTime);
  let remaining = availableMinutes;
  for (const item of items) {
    if (remaining < 15) break;
    const minutes = Math.min(SESSION_MINUTES, remaining);
    slots.push({ title: item.title, start: toTime(cursor), end: toTime(cursor + minutes), minutes });
    cursor += minutes + BREAK_MINUTES;
    remaining -= minutes + BREAK_MINUTES;
  }
  return slots;
}
