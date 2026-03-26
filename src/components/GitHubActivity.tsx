'use client';

import { motion } from 'framer-motion';
import { CSSProperties, useState, useEffect } from 'react';
import { Github, TrendingUp, BookOpen } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

const GitHubActivity = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const githubTheme = {
    light: ['rgba(255, 255, 255, 0.05)', '#7000ff'],
    dark: ['rgba(255, 255, 255, 0.05)', '#7000ff'], // Custom theme using accent-primary
  };

  return (
    <section id="activity" className="section-padding">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: '900', marginBottom: '20px' }}>
          GitHub <span className="text-gradient">Activity</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          I consistently build and experiment with real-world projects, focusing on practical implementation and continuous learning.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      } as CSSProperties}>

        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ padding: '40px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginBottom: '20px'
          }}>
            <TrendingUp size={24} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Consistency & Commitment</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
            I maintain a consistency-first approach, treating documentation and modular architecture as first-class citizens in every commit.
          </p>
        </motion.div>

        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ padding: '40px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginBottom: '20px'
          }}>
            <BookOpen size={24} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Always-Building Mindset</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
            From 3 AM research scripts to open-source contributions, I leverage GitHub as a dynamic laboratory for experimenting with New Stack technologies.
          </p>
        </motion.div>

        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ padding: '40px', borderRadius: '24px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
        >
          <Github size={60} style={{ color: 'white', marginBottom: '20px', opacity: 0.4 }} />
          <motion.a
            href="https://github.com/Shyamkano"
            target="_blank"
            className="btn-primary"
            style={{ padding: '10px 40px', borderRadius: '8px', fontSize: '14px', textDecoration: 'none' }}
          >
            View GitHub Profile <Github size={16} />
          </motion.a>
        </motion.div>
      </div>

      {/* Real GitHub Calendar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginTop: '60px',
          padding: '40px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '32px',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        } as CSSProperties}
      >
        <div style={{ fontSize: '14px', color: 'white', marginBottom: '30px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Github size={20} /> Contributions in the last year
        </div>
        
        <div style={{ width: '100%', maxWidth: '900px', minHeight: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {mounted ? (
            <GitHubCalendar 
              username="Shyamkano" 
              blockSize={12}
              blockMargin={5}
              colorScheme='dark'
              theme={githubTheme}
              fontSize={12}
            />
          ) : (
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading contribution data...</div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default GitHubActivity;
