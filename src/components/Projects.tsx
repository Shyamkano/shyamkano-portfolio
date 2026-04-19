'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, CSSProperties } from 'react';
import { Github, ExternalLink, ArrowRight, Brain, Cpu, Layout, Smartphone } from 'lucide-react';
import ProjectModal from './ProjectModal';

export type ProjectType = 'mobile' | 'web' | 'app' | 'research';

export interface Project {
  id: number;
  title: string;
  category: string;
  type: ProjectType;
  image: string;
  modalImage?: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  features: string[];
  tags: string[];
  link: string;
  github: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 12,
      title: "LUMEN",
      category: "Narrative Engine",
      type: "web",
      image: "/images/lumen_banner.png",
      description: "A professional writing and archiving platform built for high-quality stories and code.",
      problem: "Online articles are easily lost, and it is hard to keep track of who originally created an idea when it gets shared or edited by others.",
      solution: "Created a smart writing tool with an AI assistant and a 'Life-tree' system that tracks every version and edit of a post to keep the history clear.",
      impact: "Allows writers to publish and save their work in a clean, professional space where original ideas are protected and tracked forever.",
      features: [
        "Smart AI helper to help you write better articles",
        "Version tracking to see how stories change over time",
        "Clear credit system for original and shared ideas",
        "Clean, easy-to-read dark and white modes"
      ],
      tags: ["Next.js", "React", "Supabase", "Mistral AI", "TipTap", "Tailwind"],
      link: "https://lumen-archive.vercel.app/",
      github: "https://github.com/Shyamkano/LUMEN"
    },
    {
      id: 6,
      title: "Groovli",
      category: "Music Streaming",
      type: "mobile",
      image: "/images/groovli_landing.png",
      modalImage: "/images/groovli3.png",
      description: "A premium, high-performance music streaming application built with React Native & Expo.",
      problem: "Mainstream music apps are often cluttered with ads and heavy interfaces that distract from the pure listening experience.",
      solution: "Engineered a minimalist 'Cherry-themed' audio engine optimized for <0.4s response times, focusing on core discovery and seamless playback.",
      impact: "Developed a high-fidelity platform offering instant access to millions of tracks with zero interruptions and integrated smart lyrics.",
      features: [
        "API integration for global discovery",
        "Real-time synchronized smart lyrics engine",
        "Optimized network layer for <0.4s response",
        "Custom premium 'Cherry' design system"
      ],
      tags: ["React Native", "Expo", "Node.js", "JioSaavn API"],
      link: "https://groovli-stage.vercel.app/",
      github: "https://github.com/Shyamkano/groovli-app"
    },
    {
      id: 7,
      title: "Music API",
      category: "Backend",
      type: "web",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "High-performance Node.js engine powering the Groovli ecosystem with seamless metadata and streaming.",
      problem: "Fragmented data sources and regional restrictions for high-fidelity audio discovery.",
      solution: "Express REST API with Redis caching and Geo-Bypass logic for unified access.",
      impact: "Powering Groovli with sub-200ms latency while managing auth and playlists.",
      features: [
        "Redis-powered caching",
        "Geo-Bypass logic",
        "320kbps audio generation",
        "Drizzle & Neon DB"
      ],
      tags: ["Node.js", "Express", "Drizzle", "Redis"],
      link: "https://musicapi-s1ci.onrender.com/api/health",
      github: "https://github.com/Shyamkano/musicApi"
    },
    {
      id: 8,
      title: "Beatus",
      category: "Health Tech & AI",
      type: "mobile",
      image: "/images/banner.png",
      modalImage: "/images/SvaDhvani.png",
      description: "AI-driven wellness platform synchronizing physiological states with adaptive auditory therapy.",
      problem: "Stress and fatigue often occur dynamically, while traditional management tools remain static.",
      solution: "Engineered a closed-loop system using Google Fit SDK and a custom Flask ML engine for adaptive binaural audio.",
      impact: "Developed a biometric platform that translates real-time HR and sleep data into mental wellness interventions.",
      features: [
        "Google Fit SDK sensor fusion",
        "ML-powered mood prediction",
        "Dynamic binaural generation",
        "Real-time health analytics"
      ],
      tags: ["React Native", "Flask", "ML", "Google Fit SDK"],
      link: "https://github.com/Shyamkano/SvaDhvani",
      github: "https://github.com/Shyamkano/SvaDhvani"
    },
    {
      id: 9,
      title: "Beatus Engine",
      category: "AI Infrastructure",
      type: "web",
      image: "/images/beatus_engine_banner.png",
      description: "Multi-modal AI engine fusing NLP, Computer Vision, and Sensor data for cognitive state detection.",
      problem: "Traditional emotion detection lacks multi-dimensional context, leading to inaccurate state predictions.",
      solution: "Architected a weighted fusion engine using BART (NLP), VGG-Face (CV), and Scikit-learn for sensor data processing.",
      impact: "Orchestrates high-accuracy AI models to deliver real-time .wav audio synthesis with sub-second inference times.",
      features: [
        "Multi-modal fusion (NLP + CV + IoT)",
        "Real-time .WAV binaural synthesis",
        "Weighted state probability engine",
        "Integrated Swagger documentation"
      ],
      tags: ["Python", "Flask", "NLP", "VGG-Face", "Scikit"],
      link: "https://shyamkano-ai-cognitive-api.hf.space/apidocs/",
      github: "https://github.com/Shyamkano/ai-cognitive-api"
    },
    {
      id: 11,
      title: "Brief",
      category: "AI News Intelligence",
      type: "mobile",
      image: "/images/brief_banner.png",
      modalImage: "/images/image.png",
      description: "Next-gen AI news platform that analyzes, fact-checks, and summarizes global news in real-time.",
      problem: "Misinformation and information overload make it impossible to stay objectively informed.",
      solution: "Multi-layered AI analysis (Groq, Gemini, Mistral) with built-in fact-verification and interactive Q&A.",
      impact: "Provides users with a clean, bias-free understanding of global events with instant summarized intelligence.",
      features: [
        "Quad-AI Analysis Chain (Groq/Gemini/Mistral/HF)",
        "Real-time Live Fact-Checking & Trust Scores",
        "Interactive 'Chat with News' Interface",
        "Privacy-First: On-device storage & No data harvesting"
      ],
      tags: ["React Native", "Expo", "AI", "TypeScript", "LLM"],
      link: "https://brief-stage.vercel.app/",
      github: "https://github.com/Shyamkano/Brief"
    },
    {
      id: 10,
      title: "VisionCart Pro",
      category: "E-Commerce",
      type: "web",
      image: "/images/visioncart_banner.png",
      description: "A premium, dark-themed e-commerce platform for high-end eyewear with real-time management.",
      problem: "Traditional eyewear shopping lacks an immersive digital experience that bridges clinical needs and fashion.",
      solution: "Built a high-performance React storefront with Supabase integration and a glassmorphic dual-navigation system.",
      impact: "Delivers a state-of-the-art shopping experience with integrated vision health booking and secure auth.",
      features: [
        "Glassmorphic UI with custom design tokens",
        "Secure passwordless Magic Link Auth",
        "Integrated vision health booking system",
        "Real-time Supabase inventory & management"
      ],
      tags: ["React", "Vite", "Supabase", "Lucide"],
      link: "https://visioncart-eta.vercel.app/",
      github: "https://github.com/Shyamkano/visioncart"
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: '900', marginBottom: '20px' }}>
            Featured <span className="text-gradient">Systems</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A deep dive into my work across Intelligent Systems, Backend Architecture, and Hardware-Software integration.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px'
        } as CSSProperties}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid var(--glass-border)'
              } as CSSProperties}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="project-image"
                />
                <div className="glass" style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  {project.category}
                </div>
              </div>

              <div style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>{project.title}</h3>
                  <div style={{ color: 'var(--accent-secondary)' }}>
                    {project.type === 'mobile' && <Smartphone size={18} />}
                    {project.type === 'web' && <Layout size={18} />}
                    {project.type === 'research' && <Brain size={18} />}
                    {project.type === 'app' && <Cpu size={18} />}
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '15px', lineHeight: '1.6' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '6px'
                    }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-secondary)', fontWeight: '600', fontSize: '14px' }}>
                  Explore System <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .project-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-primary);
          box-shadow: 0 0 40px rgba(112, 0, 255, 0.2);
        }
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default Projects;
