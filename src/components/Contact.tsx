'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Facebook, ArrowUpRight, FileText, Mail, MapPin } from 'lucide-react';
import { useEffect, useRef, CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const socials = [
    { name: 'Github', href: 'https://github.com/Shyamkano', icon: <Github size={20} /> },
    { name: 'Linkedin', href: 'https://linkedin.com/in/shyamkano', icon: <Linkedin size={20} /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter size={20} /> },
    { name: 'Facebook', href: 'https://facebook.com', icon: <Facebook size={20} /> },
    { name: 'Instagram', href: 'https://instagram.com/shyamkano.dev', icon: <Instagram size={20} /> },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      style={{
        padding: '100px 30px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px'
      } as CSSProperties}
    >
      {/* 1. Name Section */}
      <div className="contact-animate">
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 60px)',
          fontWeight: '950',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          lineHeight: '0.9',
          color: 'white',
          marginBottom: '20px'
        } as CSSProperties}>
          Ghanshyam <br /> Kanojiya
        </h1>
      </div>

      {/* 2. Email Section */}
      <div className="contact-animate" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '700' } as CSSProperties}>
           Ready for the Next Challenge. Open for Jobs &amp; Freelance.
        </h4>
        <a
          href="mailto:kanojiyaghanshyam92@gmail.com"
          style={{
            fontSize: 'clamp(20px, 4vw, 30px)',
            fontWeight: '600',
            color: 'white',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px'
          } as CSSProperties}
          className="email-link"
        >
          kanojiyaghanshyam92@gmail.com <ArrowUpRight size={28} className="arrow" />
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'flex-start'
      } as CSSProperties}>
        {/* 3. Socials */}
        <div className="contact-animate">
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' } as CSSProperties}>Social Media</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' } as CSSProperties}>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  paddingBottom: '4px',
                  transition: 'all 0.3s ease'
                } as CSSProperties}
                className="hover-social"
              >
                {social.icon} {social.name} <ArrowUpRight size={14} className="social-arrow" />
              </a>
            ))}
          </div>
        </div>

        <div className="contact-animate" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
            <MapPin size={18} />
            <span style={{ fontSize: '18px', fontWeight: '500' }}>India</span>
          </div>
          <motion.a
            href="/Ghanshyam_Kanojiya_CV.pdf"
            target="_blank"
            style={{
              padding: '12px 24px',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              width: 'fit-content',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            } as CSSProperties}
            whileHover={{ background: 'var(--glass-bg)', borderColor: 'var(--accent-secondary)' }}
          >
            Download Resume <FileText size={18} />
          </motion.a>
        </div>
      </div>

      {/* 4. Copyright */}
      <div className="contact-animate" style={{
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '20px'
      } as CSSProperties}>
        <div style={{ color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>Designed and Developed by</p>
          <p style={{ color: 'white', fontWeight: '700', fontSize: '18px', letterSpacing: '1px' }}>SHYAMKANO</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>Open to opportunities in software development and applied AI systems</p>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>

      <style jsx>{`
        .email-link { transition: color 0.3s ease; }
        .email-link:hover { color: var(--accent-secondary) !important; }
        .email-link .arrow { transition: transform 0.3s ease; opacity: 0.5; }
        .email-link:hover .arrow { transform: translate(5px, -5px); opacity: 1; color: var(--accent-secondary); }
        .hover-social:hover { color: var(--accent-secondary) !important; border-color: var(--accent-secondary) !important; }
        .hover-social .social-arrow { transition: transform 0.3s ease, opacity 0.3s ease; opacity: 0.4; }
        .hover-social:hover .social-arrow { transform: translate(3px, -3px); opacity: 1; }
      `}</style>
    </section>
  );
};

export default Contact;
