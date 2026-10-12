export type Task = { id: string; title: string; subject: string; time: string; minutes: number; priority: 'High' | 'Medium' | 'Low'; done: boolean; tone: string; due: string; source?: 'session' };
export const initialTasks: Task[] = [
  { id: '1', title: 'Review limits & continuity', subject: 'Mathematics', time: '09:00 – 09:45', minutes: 45, priority: 'High', done: true, tone: 'lavender', due: '2026-10-12' },
  { id: '2', title: 'Practice data structures', subject: 'Computer Science', time: '11:00 – 12:00', minutes: 60, priority: 'High', done: false, tone: 'blue', due: '2026-10-12' },
  { id: '3', title: 'Read chapter 4: Thermodynamics', subject: 'Physics', time: '14:00 – 14:45', minutes: 45, priority: 'Medium', done: false, tone: 'peach', due: '2026-10-12' },
  { id: '4', title: 'Take a calculus practice quiz', subject: 'Mathematics', time: '16:00 – 16:30', minutes: 30, priority: 'Low', done: false, tone: 'lavender', due: '2026-10-12' },
];
export const subjects = [
 { name: 'Mathematics', code: 'MATH 201', teacher: 'Dr. Emily Carter', progress: 68, tone: 'lavender', modules: ['Limits & continuity', 'Differentiation', 'Integration', 'Sequences & series'], completed: 2 },
 { name: 'Computer Science', code: 'CS 204', teacher: 'Prof. James Wilson', progress: 54, tone: 'blue', modules: ['Arrays & linked lists', 'Stacks & queues', 'Trees & graphs', 'Sorting algorithms'], completed: 1 },
 { name: 'Physics', code: 'PHY 102', teacher: 'Dr. Sarah Mitchell', progress: 42, tone: 'peach', modules: ['Mechanics', 'Waves & oscillations', 'Thermodynamics', 'Electromagnetism'], completed: 1 },
 { name: 'English Literature', code: 'ENG 110', teacher: 'Prof. Olivia Bennett', progress: 76, tone: 'mint', modules: ['Literary analysis', 'Poetry & form', 'Modern fiction', 'Critical writing'], completed: 3 },
];
export const deadlines = [
 { title: 'Data Structures Assignment', subject: 'Computer Science', date: 'Oct 14', day: '14', month: 'OCT', label: 'In 2 days', tone: 'blue' },
 { title: 'Calculus Midterm Exam', subject: 'Mathematics', date: 'Oct 16', day: '16', month: 'OCT', label: 'In 4 days', tone: 'lavender' },
 { title: 'Physics Lab Report', subject: 'Physics', date: 'Oct 18', day: '18', month: 'OCT', label: 'In 6 days', tone: 'peach' },
];
export const quizHistory = [ { topic: 'Limits & continuity', date: 'Oct 11', score: 80 }, { topic: 'Arrays & linked lists', date: 'Oct 10', score: 90 }, { topic: 'Thermodynamics', date: 'Oct 9', score: 60 }, { topic: 'Differentiation', date: 'Oct 8', score: 85 } ];
export type Question = { prompt: string; options: string[]; answer: number; explanation: string };
export const quizzes: Record<string, Question[]> = {
 'Limits & continuity': [
 { prompt: 'What is the limit of (x² − 1) / (x − 1) as x approaches 1?', options: ['0', '1', '2', 'The limit does not exist'], answer: 2, explanation: 'Factor x² − 1 as (x − 1)(x + 1). For x ≠ 1 the expression equals x + 1, which approaches 2.' },
 { prompt: 'A function is continuous at x = a when…', options: ['Only f(a) is defined', 'The limit equals f(a)', 'Its derivative is zero', 'It is increasing'], answer: 1, explanation: 'Continuity requires that f(a) is defined and the limit as x approaches a exists and equals f(a).' },
 { prompt: 'What is the limit of sin(x) / x as x approaches 0 (in radians)?', options: ['0', 'Infinity', '−1', '1'], answer: 3, explanation: 'The standard trigonometric limit sin(x) / x is 1 as x approaches 0 in radians.' },
 ],
 'Arrays & linked lists': [
 { prompt: 'What is the time complexity of accessing an array element by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 0, explanation: 'An array stores elements contiguously, allowing direct access to an index in constant time.' },
 { prompt: 'A singly linked list node typically stores…', options: ['Only an index', 'Data and a next pointer', 'Two arrays', 'A parent and all children'], answer: 1, explanation: 'Each node contains its data and a reference to the next node.' },
 { prompt: 'Inserting at the head of a linked list takes…', options: ['O(n²)', 'O(n)', 'O(1)', 'O(log n)'], answer: 2, explanation: 'Only the new node and head references change, so the operation takes constant time.' },
 ],
 'Thermodynamics': [
 { prompt: 'The first law of thermodynamics expresses conservation of…', options: ['Mass only', 'Temperature', 'Energy', 'Entropy'], answer: 2, explanation: 'The first law states that energy is conserved; heat and work can change internal energy.' },
 { prompt: 'In an isothermal process, what stays constant?', options: ['Temperature', 'Volume', 'Pressure', 'Heat'], answer: 0, explanation: 'An isothermal process occurs at a constant temperature.' },
 { prompt: 'Heat naturally flows from…', options: ['Cold to hot', 'Hot to cold', 'Low pressure to high pressure', 'Low volume to high volume'], answer: 1, explanation: 'Spontaneous heat transfer occurs from higher temperature to lower temperature.' },
 ],
};
export function scoreAnswers(questions: Question[], answers: number[]) {
 if (!questions.length) return 0;
 return Math.round(questions.filter((q, i) => q.answer === answers[i]).length / questions.length * 100);
}
export function toggleTask(tasks: Task[], id: string) { return tasks.map(task => task.id === id ? { ...task, done: !task.done } : task); }

// Demo-only dashboard content. Replace with saved user data once storage exists.
export const yesterdayUnfinished = [
 { title: 'Summarize Physics lecture 6', subject: 'Physics' },
 { title: 'Outline literature essay', subject: 'English Literature' },
];
export const lastStudied = { subject: 'Mathematics', topic: 'Limits & continuity', module: 'Module 1 of 4', progress: 68, when: 'Yesterday, 8:40 PM' };
export const weeklyHours = [1.2, 1.8, 1.5, 2.2, 1.7, 2.6, 1.5];
