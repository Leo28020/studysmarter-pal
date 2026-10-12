import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/study/dashboard';
export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'Dashboard | StudyPilot AI' },
  { name: 'description', content: 'Your study dashboard with today’s plan, deadlines, and learning progress.' },
  { property: 'og:title', content: 'Dashboard | StudyPilot AI' },
  { property: 'og:description', content: 'Your study dashboard with today’s plan, deadlines, and learning progress.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: Dashboard,
});
