import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#problem', label: 'The Problem' },
    { href: '#solution', label: 'Solution' },
    { href: '#features', label: 'Features' },
    { href: '#sdg', label: 'SDG Impact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-card border-b border-ink-200' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Logo size="md" />
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors ${
                scrolled ? 'text-ink-600 hover:text-primary-700' : 'text-ink-600 hover:text-primary-700'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = '#demo')}>
            How It Works
          </Button>
          <Link to="/role">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
        <button className="md:hidden text-ink-700" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-ink-200 px-4 py-4 space-y-3 animate-slide-up">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-ink-700 py-2"
            >
              {l.label}
            </a>
          ))}
          <Link to="/role" onClick={() => setMobileOpen(false)}>
            <Button size="sm" className="w-full">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
