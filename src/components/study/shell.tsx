import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, BookOpen, Sparkles, CircleHelp, CalendarDays, ChartNoAxesCombined, Settings, ChevronDown, Menu, X, GraduationCap, ArrowUpRight, Moon, Sunrise } from 'lucide-react';
import { Button } from '@/components/ui/button';
const navItems = [ { to: '/', label: 'Dashboard', icon: LayoutDashboard }, { to: '/briefing', label: 'Morning Briefing', icon: Sunrise }, { to: '/check-in', label: 'Night Check-in', icon: Moon }, { to: '/subjects', label: 'My Subjects', icon: BookOpen }, { to: '/notes', label: 'AI Notes', icon: Sparkles }, { to: '/quiz', label: 'Daily Quiz', icon: CircleHelp }, { to: '/planner', label: 'Study Planner', icon: CalendarDays }, { to: '/progress', label: 'Progress', icon: ChartNoAxesCombined } ] as const;
export function StudyShell({ children }: { children: React.ReactNode }) {
 const [open, setOpen] = useState(false);
 const pathname = useRouterState({ select: state => state.location.pathname });
 const title = navItems.find(item => item.to === pathname)?.label ?? 'Settings';
 return <div className="app-shell">
 {open && <div className="mobile-scrim" onClick={() => setOpen(false)} />}
 <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
  <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-symbol"><GraduationCap size={25} /></span><span>StudyPilot<span className="brand-ai">AI</span></span></Link>
  <Button variant="ghost" size="icon" className="sidebar-close" aria-label="Close navigation" onClick={() => setOpen(false)}><X /></Button>
  <div className="workspace-label">YOUR WORKSPACE</div>
  <nav aria-label="Main navigation">{navItems.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} className="nav-item" onClick={() => setOpen(false)}><item.icon size={19} strokeWidth={1.8} /><span>{item.label}</span>{item.to === '/notes' && <span className="nav-mini">AI</span>}</Link>)}</nav>
  <div className="sidebar-bottom"><div className="sidebar-encouragement"><span className="encouragement-icon"><Moon size={20} /></span><h3>Plan tomorrow tonight.</h3><p>Five calm minutes now, a clear morning later.</p><Link to="/check-in" onClick={() => setOpen(false)}>Start night check-in <ArrowUpRight size={14} /></Link></div><Link to="/settings" className="nav-item settings-link" onClick={() => setOpen(false)}><Settings size={19} strokeWidth={1.8} /><span>Settings</span></Link><div className="sidebar-user"><span className="avatar">AJ</span><div><strong>Alex Johnson</strong><span>College student · Demo</span></div><span className="online-dot" /></div></div>
 </aside>
 <div className="main-shell"><header className="topbar"><div className="topbar-location"><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu /></Button><span className="breadcrumb-app">Workspace</span><span className="breadcrumb-separator">/</span><span>{title}</span></div><div className="topbar-actions"><span className="semester-label"><span />Fall semester 2026</span><div className="header-divider" /><Link to="/settings" className="profile-link" aria-label="Profile and settings"><span className="avatar avatar-small">AJ</span><span className="profile-name">Alex Johnson</span><ChevronDown size={14} /></Link></div></header><main className="page-content"><div className="page-enter" key={pathname}>{children}</div></main><footer className="app-footer"><span>Small steps. Big possibilities.</span><span>StudyPilot AI <span className="footer-dot">·</span> Frontend demo</span></footer></div>
 </div>;
}
