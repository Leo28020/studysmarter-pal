import { describe, expect, it } from 'vitest';
import { buildSchedule, prioritize, type CheckIn } from '@/features/study/briefing';

const checkIn: CheckIn = {
  savedAt: 'now', completed: ['Read ch. 3'], unfinished: ['Finish problem set'], classes: ['Physics lab 10:00'],
  deadlines: [{ title: 'Essay draft', date: '2026-10-20' }, { title: 'CS assignment', date: '2026-10-14' }],
  availableMinutes: 120, startTime: '09:00', extra: ['Email tutor'],
};

describe('Morning briefing', () => {
  it('puts deadlines within two days first, then carried-over tasks', () => {
    const items = prioritize(checkIn, '2026-10-13');
    expect(items.map(i => i.title)).toEqual(['CS assignment', 'Finish problem set', 'Prepare: Physics lab 10:00', 'Essay draft', 'Email tutor']);
  });
  it('fits 45-minute sessions with 10-minute breaks into the available time', () => {
    const slots = buildSchedule(prioritize(checkIn, '2026-10-13'), '09:00', 120);
    expect(slots.map(s => `${s.start}-${s.end}`)).toEqual(['09:00-09:45', '09:55-10:40']);
  });
  it('schedules nothing when less than 15 minutes are available', () => {
    expect(buildSchedule(prioritize(checkIn, '2026-10-13'), '09:00', 10)).toHaveLength(0);
  });
});
