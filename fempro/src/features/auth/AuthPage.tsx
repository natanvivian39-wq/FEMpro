import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../../components/Logo';
export function AuthPage() {
  const isSignup = useLocation().pathname === '/criar-conta';
  return <main className="auth-page"><Link to="/" className="auth-brand"><Logo/></Link><section className="auth-card"><h1>{isSignup ? 'Crie sua conta' : 'Bem-vinda de volta'}</h1><p>{isSignup ? 'Comece a organizar seu negócio com o FEMpro.' : 'Entre para acessar sua agenda.'}</p><form onSubmit={(event) => event.preventDefault()}><label>Seu e-mail<input type="email" placeholder="voce@email.com" required /></label>{isSignup && <label>Seu nome<input placeholder="Nome profissional" required /></label>}<label>Senha<input type="password" placeholder="Sua senha" required minLength={8}/></label><button className="primary-button" type="submit">{isSignup ? 'Criar conta' : 'Entrar'}</button></form><p className="auth-switch">{isSignup ? 'Já tem conta?' : 'Ainda não tem conta?'} <Link to={isSignup ? '/entrar' : '/criar-conta'}>{isSignup ? 'Entrar' : 'Criar conta'}</Link></p><p className="mock-note">Formulário visual — autenticação será conectada pelo backend.</p></section></main>;
}
