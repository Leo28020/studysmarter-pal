import { createFileRoute } from '@tanstack/react-router';
import { NotesPage } from '@/components/study/pages';
export const Route = createFileRoute('/notes')({
 head: () => ({ meta: [
  { title: 'AI Notes | StudyPilot AI' },
  { name: 'description', content: 'Prepare a syllabus and topic for future AI study notes.' },
  { property: 'og:title', content: 'AI Notes | StudyPilot AI' },
  { property: 'og:description', content: 'Prepare a syllabus and topic for future AI study notes.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: NotesPage,
});
