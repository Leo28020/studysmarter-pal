import { createFileRoute } from '@tanstack/react-router';
import { SubjectsPage } from '@/components/study/pages';
export const Route = createFileRoute('/subjects')({
 head: () => ({ meta: [
  { title: 'My Subjects | StudyPilot AI' },
  { name: 'description', content: 'Explore your college subjects, modules, and semester progress.' },
  { property: 'og:title', content: 'My Subjects | StudyPilot AI' },
  { property: 'og:description', content: 'Explore your college subjects, modules, and semester progress.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: SubjectsPage,
});
