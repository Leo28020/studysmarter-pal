import { createFileRoute } from '@tanstack/react-router';
import { PlannerPage } from '@/components/study/pages';
export const Route = createFileRoute('/planner')({
 head: () => ({ meta: [
  { title: 'Study Planner | StudyPilot AI' },
  { name: 'description', content: 'Organize demo study tasks, priorities, deadlines, and study time.' },
  { property: 'og:title', content: 'Study Planner | StudyPilot AI' },
  { property: 'og:description', content: 'Organize demo study tasks, priorities, deadlines, and study time.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: PlannerPage,
});
