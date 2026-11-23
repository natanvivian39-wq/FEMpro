import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { LandingPage } from '../features/landing/LandingPage';
import { AuthPage } from '../features/auth/AuthPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { AppointmentsPage } from '../features/appointments/AppointmentsPage';
import { ProfilePage } from '../features/profile/ProfilePage';
import { SettingsPage } from '../features/settings/SettingsPage';
export default function App(){return <Routes><Route path="/" element={<LandingPage/>}/><Route path="/entrar" element={<AuthPage/>}/><Route path="/criar-conta" element={<AuthPage/>}/><Route path="/app" element={<AppShell/>}><Route index element={<DashboardPage/>}/><Route path="agendamentos" element={<AppointmentsPage/>}/><Route path="perfil" element={<ProfilePage/>}/><Route path="configuracoes" element={<SettingsPage/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
