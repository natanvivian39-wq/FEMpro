interface LogoProps { className?: string; alt?: string }
/** Uses the provided brand artwork. Do not redraw, recolor, or substitute this file. */
export function Logo({ className, alt = 'FEMpro' }: LogoProps) {
  return <img className={className ?? 'brand-logo'} src="/assets/fempro-logo.png" alt={alt} />;
}
