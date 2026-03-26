'use client';

import { motion } from 'framer-motion';
import { Database, Globe, Brain, Cpu, Terminal, Code2, Box } from 'lucide-react';
import { CSSProperties } from 'react';

const Skills = () => {
  const bentoSkills = [
    {
      title: 'Frontend Development',
      icon: <Globe size={28} />,
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux', 'Framer Motion'],
      size: 'large',
      color: '#00d2ff',
      description: 'Building responsive and interactive web interfaces using React, Tailwind CSS, and modern UI practices for a seamless user experience.'
    },
    {
      title: 'Backend Systems',
      icon: <Database size={24} />,
      skills: ['Node.js', 'Express', 'Java', 'MySQL', 'PostgreSQL', 'Docker'],
      size: 'medium',
      color: '#7000ff',
      description: 'Developing REST APIs, handling authentication, and managing databases using Node.js and Express to power reliable web applications.'
    },
    {
      title: 'Applied AI Systems',
      icon: <Brain size={24} />,
      skills: ['Python', 'Scikit-Learn', 'YOLO', 'TensorFlow', 'OpenAI API'],
      size: 'medium',
      color: '#ff0080',
      description: 'Working on applied AI systems including computer vision for object detection and machine learning models for cognitive signal analysis.'
    },
    {
      title: 'IoT & Electronics',
      icon: <Cpu size={24} />,
      skills: ['Arduino', 'IoT Prototyping', 'Sensors', 'ESP32'],
      size: 'small',
      color: '#ffbd2e',
      description: 'Exploring the intersection of software and hardware by building practical IoT prototypes and sensor-based monitoring tools.'
    },
    {
      title: 'Tools & Technologies',
      icon: <Terminal size={24} />,
      skills: ['Git', 'Vercel', 'Postman', 'Linux', 'Figma'],
      size: 'small',
      color: '#b4b4b4',
      description: 'Git, GitHub, Vercel, and modern development workflows.'
    },
    {
      title: 'Problem Solving',
      icon: <Box size={24} />,
      skills: ['Data Structures', 'Algorithms', 'BFS/DFS', 'OOP'],
      size: 'small',
      color: '#27c93f',
      description: 'Applying algorithmic efficiency to complex system-state spaces and pathfinding logic.'
    }
  ];

  const marqueeSkills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Python', 'Docker', 'PostgreSQL', 
    'MySQL', 'Tailwind CSS', 'Redux', 'TensorFlow', 'Scikit-Learn', 'Git', 'Vercel', 'Linux', 
    'Arduino', 'Flutter', 'Java', 'Framer Motion'
  ];

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: '900', marginBottom: '20px' }}>
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
             A practical toolkit focused on building robust full-stack systems and exploring applied AI.
          </p>
        </div>

        <div className="bento-grid">
          {bentoSkills.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bento-item ${item.size}`}
              style={{
                gridColumn: item.size === 'large' ? 'span 2' : item.size === 'medium' ? 'span 1' : 'span 1',
                gridRow: item.size === 'large' ? 'span 2' : 'span 1',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '30px',
                position: 'relative'
              } as CSSProperties}
            >
              <div style={{ zIndex: 2 }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  marginBottom: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                } as CSSProperties}>
                  {item.icon}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                </div>
              </div>

              <div style={{ zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {item.skills.map(skill => (
                    <span key={skill} style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontWeight: '500'
                    }}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Decorative elements for large cards */}
              {item.size === 'large' && (
                <div style={{
                  position: 'absolute',
                  right: '30px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '120px',
                  height: '120px',
                  background: `linear-gradient(45deg, ${item.color}15, transparent)`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.3
                } as CSSProperties}>
                  <Code2 size={60} />
                </div>
              )}

              {/* Background Glow */}
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-20%',
                width: '60%',
                height: '60%',
                background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                zIndex: 1
              } as CSSProperties} />
            </motion.div>
          ))}
        </div>

        {/* Marquee loop */}
        <div style={{ marginTop: '100px', width: '100%', overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
          }} className="marquee-content">
            {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
              <div key={index} style={{
                padding: '0 40px',
                fontSize: 'clamp(24px, 4vw, 40px)',
                fontWeight: '900',
                color: 'white',
                opacity: 0.1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.1')}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-item {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
