'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { CSSProperties, useState } from 'react';

const SocialSidebar = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const socials = [
    { icon: <Github size={18} />, href: 'https://github.com/Shyamkano', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/shyamkano', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: 'https://instagram.com/shyamkano.dev', label: 'Instagram' },
  ];

  return (
    <div className="social-sidebar" style={{
      position: 'fixed',
      left: '30px',
      bottom: '50%',
      transform: 'translateY(50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
    } as CSSProperties}>
      {socials.map((social, index) => (
        <div key={social.label} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {hovered === social.label && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                position: 'absolute',
                left: '36px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px',
                pointerEvents: 'none',
              }}
            >
              {social.label}
            </motion.span>
          )}
          <motion.a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.25 }}
            onHoverStart={() => setHovered(social.label)}
            onHoverEnd={() => setHovered(null)}
            style={{
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              transition: 'color 0.3s ease',
            } as CSSProperties}
          >
            {social.icon}
          </motion.a>
        </div>
      ))}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '80px' }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          width: '1px',
          background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
          margin: '0 auto'
        } as CSSProperties}
      />
    </div>
  );
};

export default SocialSidebar;
