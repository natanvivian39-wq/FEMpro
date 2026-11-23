import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Clock, ArrowRight, TrendingUp, CalendarClock } from 'lucide-react';
import { api } from '../../services/api';
import type { Appointment, AppointmentFilter } from '../../types/domain';
import { SectionHeading } from '../../components/SectionHeading';
const filterLabels: { value: AppointmentFilter; label: string }[] = [{value:'all',label:'Todos'},{value:'confirmed',label:'Confirmados'},{value:'pending',label:'Pendentes'},{value:'cancelled',label:'Cancelados'}];
const statusLabels = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };
export function AppointmentsPage() {
 const [appointments,setAppointments]=useState<Appointment[]>([]); const [filter,setFilter]=useState<AppointmentFilter>('all');
 useEffect(()=>{void api.appointments.list().then(setAppointments)},[]);
 const visible=useMemo(()=>appointments.filter(a=>filter==='all'||a.status===filter),[appointments,filter]);
 const todayCount=appointments.length; const pendingCount=appointments.filter(a=>a.status==='pending').length;
 const dateLabel=(iso:string)=>new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(new Date(iso));
 return <><SectionHeading title="Meus agendamentos" subtitle="Gerencie seus atendimentos em tempo real" icon={<CalendarDays size={35}/>}/>
 <div className="filter-tabs" role="tablist">{filterLabels.map(({value,label})=><button key={value} role="tab" aria-selected={filter===value} className={filter===value?'selected':''} onClick={()=>setFilter(value)}>{label}</button>)}</div>
 <section className="appointments-summary"><div><span>Hoje</span><strong>{todayCount}</strong><small>agendamentos</small></div><div className="summary-divider"/><div className="summary-trend"><TrendingUp/><strong>+{pendingCount}</strong><small>pendentes de confirmação</small></div></section>
 <div className="appointments-list">{visible.length===0?<div className="empty-state">Nenhum agendamento nesta categoria.</div>:visible.map(a=><button className="appointment-card" key={a.id} onClick={()=>{}}><div className="avatar">{a.customerName.split(' ').map(n=>n[0]).slice(0,2).join('')}</div><div className="appointment-main"><strong>{a.customerName}</strong><span>{a.serviceName}</span><small><Clock size={16}/>{dateLabel(a.startsAt)} • Hoje</small></div><span className={`status-badge ${a.status}`}><i/>{statusLabels[a.status]}</span><ArrowRight className="card-chevron" size={20}/></button>)}</div>
 <section className="share-card"><CalendarClock size={43}/><div><h2>Sua agenda sempre cheia!</h2><p>Compartilhe seu link e atraia mais clientes.</p></div><button className="black-button" onClick={()=>void navigator.clipboard?.writeText('https://fempro.com.br/ana-beatriz')}>Ver meu link de agendamento <ArrowRight size={18}/></button></section>
 </>;
}
