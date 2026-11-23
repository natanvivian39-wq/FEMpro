import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarCheck, Copy, Eye, Link2, Star, TrendingUp } from 'lucide-react';
import { api } from '../../services/api';
import type { DashboardMetrics, Professional } from '../../types/domain';
import { SectionHeading } from '../../components/SectionHeading';
export function DashboardPage() {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { void Promise.all([api.professional.getCurrent(), api.dashboard.getMetrics()]).then(([p, m]) => { setProfessional(p); setMetrics(m); }); }, []);
  const copyLink = async () => { if (!professional) return; await navigator.clipboard?.writeText(professional.publicPageUrl); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <><SectionHeading title={`Olá, ${professional?.displayName.split(' ')[0] ?? 'profissional'}!`} subtitle="Veja como seu negócio está indo." />
    <section className="public-link-card"><div className="status-pill"><span/> Seu link está ativo</div><h2>Seu link personalizado</h2><div className="url-field"><Link2 size={19}/><span>{professional?.publicPageUrl.replace('https://','') ?? 'fempro.com.br/seu-perfil'}</span><button aria-label="Copiar link" onClick={() => void copyLink()}><Copy size={18}/></button></div><button className="black-button" onClick={() => window.open(professional?.publicPageUrl, '_blank', 'noopener,noreferrer')}>Ver minha página <ArrowUpRight size={18}/></button>{copied && <span className="copied-message">Link copiado!</span>}</section>
    <div className="section-title-row"><TrendingUp className="pink-icon"/><div><h2>Seu negócio em destaque</h2><p>Acompanhe o crescimento do seu link</p></div></div>
    <section className="metrics-grid">{[{icon:Link2,value:metrics?.linkClicks,label:'Cliques no link',change:metrics?.comparisons.linkClicks},{icon:CalendarCheck,value:metrics?.bookings,label:'Agendamentos',change:metrics?.comparisons.bookings},{icon:Eye,value:metrics?.profileViews,label:'Visualizações',change:metrics?.comparisons.profileViews},{icon:Star,value:metrics?.averageRating?.toFixed(1) ?? '—',label:'Avaliação média',change:null}].map(({icon:Icon,value,label,change})=><article className="metric-card" key={label}><Icon size={23}/><div><strong>{value ?? '—'}</strong><span>{label}</span></div>{change!==null&&change!==undefined&&<small>↑ {change}%</small>}</article>)}</section>
    <section className="growth-card"><div><h2>Transforme cliques em <span>clientes.</span></h2><p>Personalize sua página, destaque seus serviços e receba agendamentos com facilidade.</p><a className="light-button" href="/app/perfil">Personalizar agora <ArrowUpRight size={17}/></a></div><div className="growth-visual"><div className="mini-phone"><div className="avatar avatar-large">A</div><strong>Ana Beatriz</strong><small>Manicure & Designer</small><div className="pink-mini-button">Agendar horário</div></div></div></section>
  </>;
}
