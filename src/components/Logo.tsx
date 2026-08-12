import { Link } from 'react-router-dom';
import nameImage from '../../images/name_-removebg-preview.png';

export function Logo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const sizes = {
    sm: 'h-5',
    md: 'h-6',
    lg: 'h-7',
  };
  const s = sizes[size];
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <img src={nameImage} alt="SetuHealth" className={`${s} w-auto`} />
    </Link>
  );
}
