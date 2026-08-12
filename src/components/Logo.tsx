import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { HeartPulse } from 'lucide-react';

export function Logo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const sizes = {
    sm: { icon: 'h-7 w-7', iconInner: 'h-4 w-4', text: 'text-base' },
    md: { icon: 'h-9 w-9', iconInner: 'h-5 w-5', text: 'text-lg' },
    lg: { icon: 'h-11 w-11', iconInner: 'h-6 w-6', text: 'text-xl' },
=======
import nameImage from '../../images/name_-removebg-preview.png';

export function Logo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const sizes = {
    sm: 'h-5',
    md: 'h-6',
    lg: 'h-7',
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
  };
  const s = sizes[size];
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
<<<<<<< HEAD
      <div className={`flex ${s.icon} items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-sm`}>
        <HeartPulse className={s.iconInner} />
      </div>
      <div className="leading-none">
        <span className={`block ${s.text} font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
          Setu<span className="text-brand-gradient">Health</span>
        </span>
        <span className={`block text-[10px] font-medium uppercase tracking-wider ${light ? 'text-white/70' : 'text-ink-400'}`}>
          Kerala Migrant Health
        </span>
      </div>
=======
      <img src={nameImage} alt="SetuHealth" className={`${s} w-auto`} />
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
    </Link>
  );
}
