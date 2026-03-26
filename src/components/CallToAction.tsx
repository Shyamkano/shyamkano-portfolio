'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, Briefcase, Zap } from 'lucide-react';
import { CSSProperties } from 'react';

const CallToAction = () => {
  return (
    <section id="cta" className="section-padding" style={{ position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="glass"
        style={{
          padding: '80px 40px',
          borderRadius: '40px',
          textAlign: 'center',
          border: '1px solid var(--glass-border)',
          background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.05) 0%, rgba(0, 210, 255, 0.05) 100%)',
          position: 'relative',
          overflow: 'hidden'
        } as CSSProperties}
      >
        {/* Decorative Background Icons */}
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', opacity: 0.05, transform: 'rotate(-15deg)' }}>
          <Briefcase size={200} />
        </div>
        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.05, transform: 'rotate(15deg)' }}>
          <Zap size={200} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', boxShadow: '0 0 10px #27c93f' }}></span>
            <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: 'white' }}>Available for new opportunities</span>
          </div>

          <h2 style={{ fontSize: 'clamp(40px, 6vw, 70px)', fontWeight: '900', color: 'white', marginBottom: '30px', lineHeight: '1.1', maxWidth: '800px', margin: '0 auto 30px' }}>
            Ready for the Next <span className="text-gradient">Challenge?</span>
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto 50px' }}>
            I’m currently open to software development opportunities and freelance projects. Let’s build something meaningful together.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              className="btn-primary"
              style={{ padding: '18px 45px', fontSize: '16px', borderRadius: '12px' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent-primary)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Conversation <ArrowRight size={20} />
            </motion.button>

            <motion.a
              href="mailto:kanojiyaghanshyam92@gmail.com"
              className="glass"
              style={{ padding: '18px 45px', fontSize: '16px', borderRadius: '12px', color: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
              whileHover={{ background: 'var(--glass-hover)', scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email Me <Mail size={20} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
