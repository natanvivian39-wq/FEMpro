import type { ReactNode } from 'react';
interface Props { title: string; subtitle?: string; icon?: ReactNode }
export function SectionHeading({ title, subtitle, icon }: Props) {
  return <div className="section-heading">{icon && <div className="section-icon">{icon}</div>}<div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div></div>;
}
