'use client';

import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Brain, CheckCircle } from 'lucide-react';
import { CSSProperties } from 'react';
import { Project } from './Projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(3, 0, 20, 0.9)',
        backdropFilter: 'blur(20px)'
      } as CSSProperties}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--glass-border)',
          borderRadius: '32px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
        } as CSSProperties}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            padding: '10px',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s ease'
          } as CSSProperties}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', flex: 1, overflowY: 'auto' }}>
          {/* Left Side: Visuals */}
          <div style={{ background: 'var(--bg-primary)', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {project.type === 'mobile' ? (
              <div className="phone-frame">
                <div className="phone-screen">
                  <img src={project.modalImage || project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ) : project.type === 'research' || project.type === 'app' ? (
              <div className="system-frame">
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {project.type === 'research' ? <Brain size={120} style={{ color: 'var(--accent-secondary)' }} /> : <Cpu size={120} style={{ color: 'var(--accent-primary)' }} />}
                  </div>
                  <div style={{ height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 15px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {project.category} // Running classification inference...
                  </div>
                </div>
              </div>
            ) : (
              <div className="browser-frame">
                <div className="browser-header">
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                  </div>
                </div>
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
                  {project.title === 'Music API' ? (
                    <div style={{ fontSize: '32px', fontWeight: '900', color: 'white', letterSpacing: '4px', textTransform: 'uppercase', textAlign: 'center' }}>
                      groovli <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>api</span>
                    </div>
                  ) : project.title === 'Beatus Engine' ? (
                    <div style={{ fontSize: '32px', fontWeight: '900', color: 'white', letterSpacing: '4px', textTransform: 'uppercase', textAlign: 'center' }}>
                      beatus <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>engine</span>
                    </div>
                  ) : (
                    <img src={project.modalImage || project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                </div>
              </div>
            )}

            {/* Background Decorative Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              background: `radial-gradient(circle, var(--accent-primary)10 0%, transparent 70%)`,
              zIndex: -1
            } as CSSProperties} />
          </div>

          {/* Right Side: Content */}
          <div style={{ padding: '60px 40px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <span style={{
                padding: '4px 12px',
                background: 'rgba(112, 0, 255, 0.1)',
                border: '1px solid var(--accent-primary)',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
                letterSpacing: '1px'
              }}>{project.category}</span>
            </div>

            <h2 style={{ fontSize: '42px', fontWeight: '900', color: 'white', marginBottom: '20px', lineHeight: '1.1' }}>{project.title}</h2>

            <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '40px' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '3px', background: 'var(--accent-primary)', borderRadius: '10px' }} />
                <div>
                  <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>The Problem</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>{project.problem}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '3px', background: 'var(--accent-secondary)', borderRadius: '10px' }} />
                <div>
                  <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>The Solution</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>{project.solution}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' }} />
                <div>
                  <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Key Impact</h4>
                  <p style={{ color: 'white', fontSize: '15px', fontWeight: '500', lineHeight: '1.5' }}>{project.impact}</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Core Capabilities</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {project.features.map(feature => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    <CheckCircle size={14} style={{ color: 'var(--accent-secondary)', flexShrink: 0 }} /> {feature}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Technologies</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: 'white',
                    fontWeight: '500'
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
              <motion.a
                href={project.github}
                target="_blank"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ textDecoration: 'none' }}
              >
                View Repository <Github size={18} />
              </motion.a>
              <motion.a
                href={project.link}
                target="_blank"
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                } as CSSProperties}
                whileHover={{ background: 'var(--glass-bg)', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live System <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .phone-frame {
          width: 239px;
          height: 500px;
          border: 12px solid #1a1a1a;
          border-radius: 40px;
          position: relative;
          background: #000;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        .phone-frame::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 20px;
          background: #1a1a1a;
          border-radius: 20px;
          z-index: 2;
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
        }
        .browser-frame {
          width: 100%;
          max-width: 500px;
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        .browser-header {
          padding: 10px 15px;
          background: #2a2a2a;
          display: flex;
          align-items: center;
        }
        .system-frame {
          width: 100%;
          max-width: 450px;
          height: 320px;
          background: #101010;
          border: 4px solid #333;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
