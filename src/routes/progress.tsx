import { createFileRoute } from '@tanstack/react-router';
import { ProgressPage } from '@/components/study/pages';
export const Route = createFileRoute('/progress')({
 head: () => ({ meta: [
  { title: 'Progress | StudyPilot AI' },
  { name: 'description', content: 'Review demo quiz scores, completed study tasks, and weak topics.' },
  { property: 'og:title', content: 'Progress | StudyPilot AI' },
  { property: 'og:description', content: 'Review demo quiz scores, completed study tasks, and weak topics.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: ProgressPage,
});
