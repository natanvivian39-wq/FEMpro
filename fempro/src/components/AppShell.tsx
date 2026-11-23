import { NavLink, Outlet } from 'react-router-dom';
import { CalendarDays, House, Settings, UserRound } from 'lucide-react';
import { Logo } from './Logo';
const navigation = [
  { to: '/app', label: 'Início', icon: House, end: true },
  { to: '/app/agendamentos', label: 'Agendamentos', icon: CalendarDays },
  { to: '/app/perfil', label: 'Perfil', icon: UserRound },
  { to: '/app/configuracoes', label: 'Configurações', icon: Settings },
];
export function AppShell() {
  return <div className="app-shell"><header className="app-header"><Logo /><button className="notification-button" aria-label="Notificações"><span className="notification-dot" /></button></header>
    <main className="app-content"><Outlet /></main>
    <nav className="bottom-nav" aria-label="Navegação principal">{navigation.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><Icon size={25} strokeWidth={2.1} /><span>{label}</span></NavLink>)}</nav>
  </div>;
}
