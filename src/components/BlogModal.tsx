'use client';

import { motion } from 'framer-motion';
import { X, ExternalLink, Calendar, Clock, Eye, Tag, Share2, CheckCircle } from 'lucide-react';
import { CSSProperties, useState } from 'react';

export interface BlogPost {
  id: string | number;
  title: string;
  content?: string;
  html?: string;
  type?: string;
  slug: string;
  cover_image?: string;
  tags?: string[];
  read_time?: number;
  views?: number;
  created_at: string;
}

interface BlogModalProps {
  post: BlogPost;
  onClose: () => void;
}

const BlogModal = ({ post, onClose }: BlogModalProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://lumen-archive.vercel.app/post/${post.slug}`;

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          maxWidth: '900px',
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
        {/* Header Bar */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              padding: '4px 12px',
              background: 'rgba(112, 0, 255, 0.1)',
              border: '1px solid var(--accent-primary)',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
              letterSpacing: '1px'
            }}>
              {post.type || 'Article'}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={copyShareLink}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '8px 14px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              } as CSSProperties}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            >
              {copied ? <><CheckCircle size={14} style={{ color: 'var(--accent-secondary)' }} /> Copied</> : <><Share2 size={14} /> Share</>}
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                padding: '10px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              } as CSSProperties}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '40px 48px', overflowY: 'auto', flex: 1 }}>
          {post.cover_image && (
            <div style={{ width: '100%', height: '320px', borderRadius: '24px', overflow: 'hidden', marginBottom: '36px', border: '1px solid var(--glass-border)' }}>
              <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '900', color: 'white', marginBottom: '20px', lineHeight: '1.2' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid var(--glass-border)' }}>
            {post.read_time && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} style={{ color: 'var(--accent-secondary)' }} /> {post.read_time} min read
              </div>
            )}
            {post.views !== undefined && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={16} style={{ color: 'var(--accent-primary)' }} /> {post.views} views
              </div>
            )}
            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Tag size={16} style={{ color: 'var(--text-secondary)' }} />
                {post.tags.map((tag: string) => (
                  <span key={tag} style={{
                    padding: '2px 10px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: 'var(--text-secondary)'
                  }}>#{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Rendered HTML Content */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html || post.content || '<p>No content available.</p>' }} />

          {/* Footer Action */}
          <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Enjoyed this narrative?</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Join the discussion and explore more on the LUMEN platform.</p>
            </div>
            <motion.a
              href={shareUrl}
              target="_blank"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', padding: '14px 28px', fontSize: '14px' }}
            >
              Read on LUMEN <ExternalLink size={16} />
            </motion.a>
          </div>
        </div>

        <style jsx global>{`
          .blog-content {
            color: var(--text-secondary);
            font-size: 17px;
            line-height: 1.8;
            font-family: 'Inter', sans-serif;
          }
          .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
            color: white;
            margin-top: 2.2em;
            margin-bottom: 0.8em;
            font-weight: 800;
            font-family: 'Outfit', sans-serif;
            line-height: 1.3;
          }
          .blog-content h1 { font-size: 28px; }
          .blog-content h2 { font-size: 24px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px; }
          .blog-content h3 { font-size: 20px; }
          .blog-content p {
            margin-bottom: 1.6em;
          }
          .blog-content a {
            color: var(--accent-secondary);
            text-decoration: underline;
            text-underline-offset: 4px;
            font-weight: 500;
          }
          .blog-content a:hover {
            color: var(--accent-primary);
          }
          .blog-content ul, .blog-content ol {
            margin-left: 1.5em;
            margin-bottom: 1.6em;
          }
          .blog-content li {
            margin-bottom: 0.6em;
          }
          .blog-content blockquote {
            border-left: 4px solid var(--accent-primary);
            padding: 18px 24px;
            background: rgba(112, 0, 255, 0.05);
            border-radius: 0 16px 16px 0;
            margin: 2em 0;
            color: white;
            font-style: italic;
            font-weight: 500;
          }
          .blog-content pre {
            background: rgba(0, 0, 0, 0.6) !important;
            padding: 20px;
            border-radius: 16px;
            overflow-x: auto;
            border: 1px solid var(--glass-border);
            margin: 2em 0;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
          }
          .blog-content code {
            font-family: monospace;
            color: var(--accent-secondary);
            background: rgba(255,255,255,0.05);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 14px;
          }
          .blog-content pre code {
            background: transparent;
            padding: 0;
            color: #e2e8f0;
            font-size: 14px;
            line-height: 1.6;
          }
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 16px;
            margin: 2em 0;
            border: 1px solid var(--glass-border);
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default BlogModal;
