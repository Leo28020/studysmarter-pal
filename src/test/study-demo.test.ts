import { describe, expect, it } from 'vitest';
import { initialTasks, quizzes, scoreAnswers, toggleTask } from '@/features/study/demo';

describe('Study demo interactions', () => {
  it('scores all three correct calculus answers at 100 percent', () => {
    expect(scoreAnswers(quizzes['Limits & continuity'], [2, 1, 3])).toBe(100);
  });
  it('scores one correct answer out of three at 33 percent', () => {
    expect(scoreAnswers(quizzes['Limits & continuity'], [2, 0, 0])).toBe(33);
  });
  it('marks a study task complete without mutating sample data', () => {
    const tasks = toggleTask(initialTasks, '2');
    expect(tasks.find(task => task.id === '2')?.done).toBe(true);
    expect(initialTasks.find(task => task.id === '2')?.done).toBe(false);
    expect(tasks.filter(task => task.done)).toHaveLength(2);
  });
  it('allows a completed task to be marked incomplete', () => {
    expect(toggleTask(initialTasks, '1').find(task => task.id === '1')?.done).toBe(false);
  });
});