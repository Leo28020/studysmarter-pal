import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialTasks, quizHistory, toggleTask, type Task } from './demo';
import type { CheckIn } from './briefing';
type QuizResult = { topic: string; date: string; score: number };
type StudyState = {
 tasks: Task[]; toggle: (id: string) => void; addTask: (task: Omit<Task, 'id' | 'done' | 'time' | 'tone'>) => void;
 results: QuizResult[]; addResult: (result: QuizResult) => void;
 reminders: boolean; setReminders: (value: boolean) => void; weeklySummary: boolean; setWeeklySummary: (value: boolean) => void;
 /** Night check-in kept in memory for this browser session only (no persistent storage yet). */
 checkIn: CheckIn | null; saveCheckIn: (value: CheckIn) => void;
};
const StudyContext = createContext<StudyState | null>(null);
export function StudyProvider({ children }: { children: ReactNode }) {
 const [tasks, setTasks] = useState(initialTasks);
 const [results, setResults] = useState(quizHistory);
 const [reminders, setReminders] = useState(true);
 const [weeklySummary, setWeeklySummary] = useState(false);
 const [checkIn, saveCheckIn] = useState<CheckIn | null>(null);
 return <StudyContext.Provider value={{ tasks, toggle: id => setTasks(prev => toggleTask(prev, id)), addTask: task => setTasks(prev => [...prev, { ...task, id: crypto.randomUUID(), done: false, time: 'Unscheduled', tone: 'blue', source: 'session' }]), results, addResult: result => setResults(prev => [result, ...prev]), reminders, setReminders, weeklySummary, setWeeklySummary, checkIn, saveCheckIn }}>{children}</StudyContext.Provider>;
}
export function useStudy() { const context = useContext(StudyContext); if (!context) throw new Error('StudyProvider is required'); return context; }
