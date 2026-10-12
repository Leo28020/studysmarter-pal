import { createFileRoute } from '@tanstack/react-router';
import { BriefingPage } from '@/components/study/briefing';
export const Route = createFileRoute('/briefing')({
 head: () => ({ meta: [
  { title: 'Morning Briefing | StudyPilot AI' },
  { name: 'description', content: 'Your priorities and a realistic study schedule, built from your night check-in.' },
  { property: 'og:title', content: 'Morning Briefing | StudyPilot AI' },
  { property: 'og:description', content: 'Your priorities and a realistic study schedule, built from your night check-in.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: BriefingPage,
});
