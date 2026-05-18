'use client';

import { motion } from 'framer-motion';
import { Sparkles, FileText, ArrowDown } from 'lucide-react';
import { useEffect, useRef, CSSProperties } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.to('.hero-glow', {
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  const techStack = ['Next.js', 'React', 'GSAP', 'Framer Motion', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'];

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      padding: '120px 20px 60px',
      overflow: 'hidden'
    } as CSSProperties}>
      <div className="hero-glow" style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
        filter: 'blur(200px)',
        opacity: 0.12,
        zIndex: -1
      } as CSSProperties}></div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'var(--accent-secondary)',
        filter: 'blur(160px)',
        opacity: 0.05,
        zIndex: -1
      } as CSSProperties}></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: '8px 22px',
            background: 'rgba(112, 0, 255, 0.08)',
            border: '1px solid var(--accent-primary)',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--accent-primary)',
            marginBottom: '40px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            boxShadow: '0 0 30px rgba(112, 0, 255, 0.15)',
          } as CSSProperties}
        >
          <Sparkles size={14} /> Building practical software systems using modern web technologies and applied AI
        </motion.span>

        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(50px, 12vw, 120px)',
            fontWeight: '950',
            lineHeight: '0.85',
            marginBottom: '40px',
            textTransform: 'uppercase',
            letterSpacing: '-0.06em',
            color: 'white'
          } as CSSProperties}
        >
          Ghanshyam <br />
          <span className="text-gradient" style={{ display: 'inline-block' }}>Kanojiya</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          style={{
            fontSize: 'clamp(16px, 1.2vw, 20px)',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 60px',
            lineHeight: '1.6',
            fontWeight: '400',
            letterSpacing: '0.01em'
          } as CSSProperties}
        >
          I design and develop scalable web applications and AI-powered systems focused on solving real-world challenges and delivering practical impact.
        </motion.p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' } as CSSProperties}>
          <motion.button
            className="btn-primary"
            style={{ fontSize: '15px', padding: '16px 38px', borderRadius: '12px', letterSpacing: '0.5px' } as CSSProperties}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--accent-primary)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </motion.button>

          <motion.button
            className="glass"
            style={{
              fontSize: '15px',
              padding: '16px 38px',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              color: 'white',
              letterSpacing: '0.5px'
            } as CSSProperties}
            whileHover={{ background: 'var(--glass-hover)', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </motion.button>

          <motion.a
            href="/Ghanshyam_Kanojiya_Resume.pdf"
            target="_blank"
            className="glass"
            style={{
              fontSize: '15px',
              padding: '16px 38px',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              color: 'white',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none'
            } as CSSProperties}
            whileHover={{ background: 'rgba(255,255,255,0.1)', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume <FileText size={18} />
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            cursor: 'pointer',
            marginBottom: '20px',
          } as CSSProperties}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={18} />
          </motion.div>
          Scroll
        </motion.div>
      </motion.div>

      {/* Tech Stack */}
      <div style={{
        marginTop: '20px',
        width: '100%',
        maxWidth: '1200px',
        padding: '24px 0',
        borderTop: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      } as CSSProperties}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.35, fontWeight: '600' }}>Expertise</span>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', opacity: 0.5 } as CSSProperties}>
          {techStack.map(tech => (
            <motion.span
              key={tech}
              style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-secondary)' }}
              whileHover={{ opacity: 1, color: 'var(--accent-secondary)', scale: 1.1 }}
            >{tech}</motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
