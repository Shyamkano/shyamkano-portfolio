'use client';

import { motion } from 'framer-motion';
import { CSSProperties } from 'react';
import { Brain, Activity, Database, FileText } from 'lucide-react';

const ResearchSection = () => {
  return (
    <section id="research" className="section-padding">
      <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '80px',
          padding: '20px 0'
        } as CSSProperties}>
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div style={{ color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', fontWeight: '800', marginBottom: '20px' }}>
            Innovation & Discovery
          </div>
          <h2 style={{ fontSize: 'clamp(35px, 5vw, 55px)', fontWeight: '900', color: 'white', marginBottom: '30px', lineHeight: '1.1' }}>
            Applied Research & <span className="text-gradient">Cognitive Data</span>
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1.7', marginBottom: '35px' }}>
            I am working on EEG-based signal analysis using machine learning to understand cognitive patterns and mental states. I also explore personalized binaural beat generation based on these brainwave-related patterns to improve focus and relaxation.
          </p>

            <div style={{ display: 'grid', gap: '25px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 210, 255, 0.1)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
                  <Activity size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Signal Processing (FFT Analysis)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>Decomposing raw EEG data into frequency bands to extract features related to user focus and mental clarity.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(112, 0, 255, 0.1)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Database size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>ML-Based Cognitive Classification</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>Training machine learning models to classify mental states using time-series data from non-invasive hardware.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 0, 128, 0.1)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff0080' }}>
                  <Brain size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Personalized Binaural Generation</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>Exploring the creation of specialized audio frequencies designed to sync with user-detected cognitive states.</p>
                </div>
              </div>
            </div>

            <motion.a
              href="#"
              target="_blank"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '12px 28px', fontSize: '15px' }}
            >
              Read Published Paper <FileText size={18} />
            </motion.a>
        </motion.div>

        {/* Right Side: Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ position: 'relative' }}
        >
          <div className="glass" style={{ 
            height: '100%', 
            minHeight: '400px', 
            borderRadius: '40px', 
            border: '1px solid var(--glass-border)',
            padding: '40px',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
            overflow: 'hidden'
          } as CSSProperties}>
            <div className="wave-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, zIndex: 0 }}>
               {/* Decorative research background */}
               <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, var(--accent-secondary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>
            
            <div style={{ zIndex: 1, textAlign: 'center' }}>
              <Brain size={120} style={{ color: 'var(--accent-secondary)', marginBottom: '30px', filter: 'drop-shadow(0 0 20px rgba(0,210,255,0.4))' }} />
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Cognitive Pattern Research</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                <span key="1" style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '8px', color: 'white' }}>92% Classification Accuracy</span>
                <span key="2" style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '8px', color: 'white' }}>Real-time Signal Analysis</span>
              </div>
              
              <div style={{ marginTop: '40px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ height: '3px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                   <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 2 }} style={{ height: '100%', background: 'var(--accent-secondary)' }} />
                </div>
                <div style={{ height: '3px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '70%' }} transition={{ duration: 2, delay: 0.5 }} style={{ height: '100%', background: 'var(--accent-primary)' }} />
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            position: 'absolute', 
            top: '-20px', 
            right: '-20px', 
            padding: '12px 20px', 
            background: 'var(--accent-primary)', 
            borderRadius: '12px',
            fontSize: '12px', 
            fontWeight: '700',
            color: 'white',
            boxShadow: '0 10px 30px rgba(112,0,255,0.4)',
            zIndex: 3
          }}>
            Academic Exploration + Practical Impact
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;
