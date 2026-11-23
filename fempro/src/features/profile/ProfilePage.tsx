import { useEffect, useState } from 'react';
import { ArrowRight, Camera, ChevronRight, Link2, Palette, Pencil, Plus, Scissors, UserRound } from 'lucide-react';
import { api } from '../../services/api';
import type { PublicProfileDraft, ServiceItem } from '../../types/domain';
import { SectionHeading } from '../../components/SectionHeading';
export function ProfilePage() {
 const [profile,setProfile]=useState<PublicProfileDraft|null>(null); const [services,setServices]=useState<ServiceItem[]>([]);
 useEffect(()=>{void Promise.all([api.profile.get(),api.profile.services()]).then(([p,s])=>{setProfile(p);setServices(s)})},[]);
 const rows=[{icon:UserRound,title:'Informações pessoais',desc:'Nome, foto, descrição e contato'},{icon:Scissors,title:'Serviços e preços',desc:`${services.length} serviços cadastrados`},{icon:Link2,title:'Meu link de agendamento',desc:`fempro.com.br/${profile?.slug ?? 'seu-perfil'}`},{icon:Palette,title:'Aparência da página',desc:'Cores e estilo da sua página'}];
 return <><SectionHeading title="Meu perfil" subtitle="Personalize sua página e deixe-a com a sua cara." icon={<UserRound size={35}/>}/>
 <section className="profile-preview-card"><div className="profile-preview-head"><div className="avatar avatar-large">{profile?.displayName.split(' ').map(n=>n[0]).slice(0,2).join('')??'A'}</div><div><strong>{profile?.displayName??'Seu nome'}</strong><span>{profile?.profession??'Sua profissão'}</span></div><button className="edit-round" aria-label="Editar perfil"><Pencil size={17}/></button></div><div className="profile-link-row"><Link2 size={17}/><span>fempro.com.br/{profile?.slug??'seu-perfil'}</span><button aria-label="Copiar link" onClick={()=>void navigator.clipboard?.writeText(`https://fempro.com.br/${profile?.slug??''}`)}>Copiar</button></div><button className="black-button">Visualizar página pública <ArrowRight size={18}/></button></section>
 <h2 className="subsection-title">Personalização</h2><div className="settings-list">{rows.map(({icon:Icon,title,desc})=><button className="settings-row" key={title}><span className="settings-icon"><Icon size={22}/></span><span className="settings-text"><strong>{title}</strong><small>{desc}</small></span><ChevronRight size={19}/></button>)}</div>
 <button className="add-service-button"><Plus size={18}/> Adicionar serviço</button>
 <section className="portfolio-card"><Camera size={24}/><div><strong>Seu portfólio</strong><p>Mostre seus trabalhos e encante novas clientes.</p></div><button aria-label="Adicionar fotos"><Plus/></button></section>
 </>;
}
