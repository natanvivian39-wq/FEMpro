import type { ButtonHTMLAttributes, ReactNode } from 'react';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { icon: ReactNode; label: string }
export function IconButton({ icon, label, ...props }: Props) {
  return <button className="icon-button" type="button" aria-label={label} title={label} {...props}>{icon}</button>;
}
