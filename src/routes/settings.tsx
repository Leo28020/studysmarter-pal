import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/components/study/pages';
export const Route = createFileRoute('/settings')({
 head: () => ({ meta: [
  { title: 'Settings | StudyPilot AI' },
  { name: 'description', content: 'Customize your demo study reminder preferences.' },
  { property: 'og:title', content: 'Settings | StudyPilot AI' },
  { property: 'og:description', content: 'Customize your demo study reminder preferences.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: SettingsPage,
});
