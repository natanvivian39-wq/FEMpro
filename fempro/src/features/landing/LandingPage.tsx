import { ArrowRight, CalendarCheck, Link2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';
export function LandingPage() {
  return <div className="landing-page"><header className="landing-header"><Logo /><Link className="login-link" to="/entrar">Entrar</Link></header>
    <main className="landing-main"><div className="landing-copy"><span className="eyebrow"><Sparkles size={15}/> SUA BELEZA, SEU NEGÓCIO</span><h1>Seu talento merece uma agenda <span>cheia.</span></h1><p>Organize seus atendimentos e tenha seu próprio link para suas clientes agendarem quando quiserem.</p><Link to="/criar-conta" className="primary-button">Começar gratuitamente <ArrowRight size={19}/></Link><span className="landing-footnote">Sem complicação. Feito para profissionais da beleza.</span></div>
      <div className="landing-preview" aria-label="Prévia do perfil público"><div className="preview-profile"><div className="avatar avatar-large">A</div><strong>Ana Beatriz</strong><span>Manicure & Designer</span></div><div className="preview-button"><CalendarCheck size={18}/> Agendar horário</div><div className="preview-button secondary"><Link2 size={18}/> WhatsApp</div><div className="preview-service"><span>Manicure</span><b>R$ 45</b></div><div className="preview-service"><span>Design de sobrancelhas</span><b>R$ 35</b></div></div></main>
    <section className="landing-benefits"><article><Link2/><h3>Seu link personalizado</h3><p>Uma página com seus serviços, informações e agenda.</p></article><article><CalendarCheck/><h3>Agenda organizada</h3><p>Receba os pedidos e acompanhe seus atendimentos.</p></article></section>
  </div>;
}
