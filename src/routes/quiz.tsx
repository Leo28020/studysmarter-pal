import { createFileRoute } from '@tanstack/react-router';
import { QuizPage } from '@/components/study/pages';
export const Route = createFileRoute('/quiz')({
 head: () => ({ meta: [
  { title: 'Daily Quiz | StudyPilot AI' },
  { name: 'description', content: 'Practice with demo quizzes and review your answers and scores.' },
  { property: 'og:title', content: 'Daily Quiz | StudyPilot AI' },
  { property: 'og:description', content: 'Practice with demo quizzes and review your answers and scores.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: QuizPage,
});
