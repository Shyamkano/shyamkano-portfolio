'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Zap, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, CSSProperties, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<'default' | 'electric'>('default');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'default' | 'electric';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme === 'electric' ? 'theme-electric' : '';
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const handleThemeChange = (e: Event) => setTheme((e as CustomEvent).detail as 'default' | 'electric');
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'default' ? 'electric' : 'default';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme === 'electric' ? 'theme-electric' : '';
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Research', href: '/research' },
    { name: 'Skills', href: '/skills' },
    { name: 'Journey', href: '/journey' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, { y: -100, opacity: 0, duration: 1, ease: 'power4.out' });
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          zIndex: 100,
          padding: scrolled ? '10px 16px' : '16px',
          transition: 'padding 0.3s ease',
        } as CSSProperties}
      >
        <div className="glass" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: scrolled ? '0 8px 32px 0 rgba(0,0,0,0.5)' : '0 8px 32px 0 rgba(0,0,0,0.37)',
          transition: 'box-shadow 0.3s ease',
        } as CSSProperties}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.05 }} style={{ fontSize: '22px', fontWeight: '800', cursor: 'pointer' } as CSSProperties} className="text-gradient">
              Shyamkano.
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', height: '20px', overflow: 'hidden', cursor: 'pointer' }} className="nav-link-item">
                  <div style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)' } as CSSProperties} className="nav-link-inner">
                    <span style={{ height: '20px', display: 'flex', alignItems: 'center', color: pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{link.name}</span>
                    <span style={{ height: '20px', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center' }}>{link.name}</span>
                  </div>
                </div>
              </Link>
            ))}
            <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }}></div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <motion.button onClick={toggleTheme} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--accent-secondary)', padding: '0' } as CSSProperties} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Toggle theme">
                {theme === 'default' ? <Moon size={15} /> : <Zap size={15} />}
              </motion.button>
              <motion.a href="/Ghanshyam_Kanojiya_CV.pdf" target="_blank" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '8px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' } as CSSProperties} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Resume <FileText size={14} />
              </motion.a>
            </div>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="nav-mobile" style={{ display: 'none', gap: '8px', alignItems: 'center' }}>
            <motion.button onClick={toggleTheme} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--accent-secondary)', padding: '0' } as CSSProperties} whileTap={{ scale: 0.9 }}>
              {theme === 'default' ? <Moon size={15} /> : <Zap size={15} />}
            </motion.button>
            <motion.button onClick={() => setMenuOpen(o => !o)} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', padding: '0' } as CSSProperties} whileTap={{ scale: 0.9 }}>
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>

        <style jsx>{`
          .nav-link-item:hover .nav-link-inner { transform: translateY(-20px); }
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: 'rgba(3, 0, 20, 0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            } as CSSProperties}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 8vw, 48px)',
                    fontWeight: '900',
                    textDecoration: 'none',
                    color: pathname === link.href ? 'var(--accent-secondary)' : 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    display: 'block',
                    padding: '8px 0',
                    textAlign: 'center',
                    transition: 'color 0.2s ease',
                  } as CSSProperties}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="/Ghanshyam_Kanojiya_CV.pdf"
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
              className="btn-primary"
              style={{ marginTop: '24px', padding: '14px 40px', fontSize: '16px', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' } as CSSProperties}
            >
              Download Resume <FileText size={18} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
