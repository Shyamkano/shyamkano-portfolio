'use client';

import { motion } from 'framer-motion';
import { CSSProperties } from 'react';
import { Target, Lightbulb, Ship, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Projects Built', value: '5+', sub: 'Completed' },
    { label: 'Technologies Used', value: '12+', sub: 'Stack' },
    { label: 'Research Areas', value: '2', sub: 'Active' },
  ];

  return (
    <section id="about" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '60px',
        alignItems: 'center'
      } as CSSProperties}>
        
        {/* Left: Content Area */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div style={{ color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', fontWeight: '800', marginBottom: '20px' }}>
            Beyond the Code
          </div>
          <h2 style={{ fontSize: 'clamp(35px, 5vw, 55px)', fontWeight: '900', color: 'white', marginBottom: '30px', lineHeight: '1.1' }}>
            How I Approach <span className="text-gradient">Problem Solving</span>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-secondary)', fontSize: '17px', lineHeight: '1.7' }}>
            <p>
              I combine logical thinking with a practical understanding of real-world problems to build efficient and scalable systems. My focus is on creating software that is well-structured, easy to maintain, and truly useful for the user.
            </p>
            <p>
              Currently based in <span style={{ color: 'white', fontWeight: '600' }}>Mumbai</span>, I specialize in building full-stack applications and exploring applied AI systems—from computer vision tools to EEG-based neurological research.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '30px', marginTop: '50px' }}>
             {stats.map(stat => (
               <div key={stat.label}>
                 <h4 style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '5px' }}>{stat.value}</h4>
                 <p style={{ fontSize: '12px', color: 'var(--accent-secondary)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>{stat.label}</p>
                 <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{stat.sub}</p>
               </div>
             ))}
          </div>
          {/* New content added here */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '40px', color: 'white', fontSize: '16px', fontWeight: '600' }}
          >
            <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} /> Building practical software systems using modern web technologies and applied AI
          </motion.span>
        </motion.div>

        {/* Right: Modern Visual Grid */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="bento-grid"
           style={{ gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '20px', height: '450px' } as CSSProperties}
        >
          <div className="bento-item" style={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Target size={40} style={{ color: 'var(--accent-primary)', marginBottom: '15px' }} />
            <h4 style={{ color: 'white', fontWeight: '700' }}>Development Approach</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Focused on practical implementation</p>
          </div>
          <div className="bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Lightbulb size={30} style={{ color: 'var(--accent-secondary)', marginBottom: '10px' }} />
            <p style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Applied AI Systems</p>
          </div>
          <div className="bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Ship size={30} style={{ color: 'white', marginBottom: '10px' }} />
            <p style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Data-Driven Thinking</p>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-10%', 
        right: '-10%', 
        width: '400px', 
        height: '400px', 
        background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        opacity: 0.1,
        zIndex: -1
      } as CSSProperties} />
    </section>
  );
};

export default About;
