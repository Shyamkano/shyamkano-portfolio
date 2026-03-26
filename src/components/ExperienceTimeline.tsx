'use client';

import { motion } from 'framer-motion';
import { CSSProperties } from 'react';
import { BookOpen, Code2, Brain, Search } from 'lucide-react';

const ExperienceTimeline = () => {
  const experiences = [
    {
      year: '2022 - 2023',
      title: 'The Foundation',
      description: 'Started with core web development - HTML, CSS, and JavaScript - building a strong base in frontend fundamentals.',
      icon: <BookOpen size={18} />,
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      year: '2023 - 2024',
      title: 'Development Phase',
      description: 'Expanded into full stack development using React, backend technologies, and databases to build complete applications.',
      icon: <Code2 size={18} />,
      skills: ['Python', 'React', 'Node.js', 'Flutter']
    },
    {
      year: '2025',
      title: 'Exploration Phase',
      description: 'Building practical systems including IoT prototypes, detection tools, and full-stack applications.',
      icon: <Search size={18} />,
      skills: ['AI/ML', 'IoT', 'Full Stack']
    },
    {
      year: 'Present',
      title: 'Current Focus',
      description: 'Developing full stack software systems with a focus on EEG-based cognitive research and applied AI.',
      icon: <Brain size={18} />,
      skills: ['AI/ML', 'Full Stack', 'Research']
    }
  ];

  return (
    <section id="journey" className="section-padding">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: '900', marginBottom: '20px' }}>
          My Growth as a <span className="text-gradient">Developer</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          A timeline of my progression from coding foundations to full-stack systems and research experiments.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        {/* Central Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)',
          transform: 'translateX(-50%)',
          zIndex: 0
        }} className="timeline-line"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
              paddingRight: index % 2 === 0 ? '50%' : '0',
              paddingLeft: index % 2 === 0 ? '0' : '50%',
              marginBottom: '60px',
              position: 'relative',
              width: '100%'
            } as CSSProperties}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '20px',
              width: '40px',
              height: '40px',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--accent-primary)',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              boxShadow: '0 0 20px var(--accent-primary)'
            } as CSSProperties}>
              {exp.icon}
            </div>

            {/* Content Card */}
            <div className="glass" style={{
              width: '85%',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid var(--glass-border)',
              margin: index % 2 === 0 ? '0 40px 0 0' : '0 0 0 40px',
              textAlign: index % 2 === 0 ? 'right' : 'left'
            } as CSSProperties}>
              <span style={{
                color: 'var(--accent-secondary)',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '2px'
              }}>{exp.year}</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: '10px 0' }}>{exp.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '15px' }}>{exp.description}</p>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'
              }}>
                {exp.skills.map(skill => (
                  <span key={skill} style={{
                    fontSize: '11px',
                    color: 'white',
                    padding: '4px 10px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '4px'
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .timeline-line {
            left: 20px !important;
          }
          .timeline-line + div {
            justify-content: flex-start !important;
            padding-left: 50px !important;
            padding-right: 0 !important;
          }
          .timeline-line + div > div:first-child {
            left: 20px !important;
          }
           .timeline-line + div > div:last-child {
            width: 100% !important;
            margin: 20px 0 0 0 !important;
            text-align: left !important;
          }
          section > div:last-child > div {
             padding-left: 50px !important;
             padding-right: 0 !important;
             justify-content: flex-start !important;
          }
           section > div:last-child > div > .glass {
             margin: 0 !important;
             text-align: left !important;
             width: 100% !important;
           }
           section > div:last-child > div > div:first-child {
             left: 20px !important;
           }
            section > div:last-child > div > div > div {
             justify-content: flex-start !important;
           }
        }
      `}</style>
    </section>
  );
};

export default ExperienceTimeline;
