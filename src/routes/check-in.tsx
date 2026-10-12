import { createFileRoute } from '@tanstack/react-router';
import { CheckInPage } from '@/components/study/checkin';
export const Route = createFileRoute('/check-in')({
 head: () => ({ meta: [
  { title: 'Night Check-in | StudyPilot AI' },
  { name: 'description', content: 'A guided evening check-in to review today and plan tomorrow’s study time.' },
  { property: 'og:title', content: 'Night Check-in | StudyPilot AI' },
  { property: 'og:description', content: 'A guided evening check-in to review today and plan tomorrow’s study time.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: CheckInPage,
});
