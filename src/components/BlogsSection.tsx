'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, CSSProperties } from 'react';
import { FileText, ArrowRight, Clock, Eye, RefreshCw, AlertCircle, User, ExternalLink, Sparkles } from 'lucide-react';
import BlogModal, { BlogPost } from './BlogModal';

interface AuthorProfile {
  id?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}

// Elegant TipTap JSON to HTML parser for direct Supabase REST API fallback
const renderTipTapJson = (content: any): string => {
  if (!content) return '<p>No content available.</p>';
  if (typeof content === 'string') return content;
  
  if (content.type === 'doc' && Array.isArray(content.content)) {
    return content.content.map((node: any) => {
      if (!node) return '';
      if (node.type === 'paragraph') {
        const text = node.content ? node.content.map((n: any) => n.text || '').join('') : '';
        return `<p>${text}</p>`;
      }
      if (node.type === 'heading') {
        const level = node.attrs?.level || 2;
        const text = node.content ? node.content.map((n: any) => n.text || '').join('') : '';
        return `<h${level}>${text}</h${level}>`;
      }
      if (node.type === 'codeBlock') {
        const text = node.content ? node.content.map((n: any) => n.text || '').join('') : '';
        return `<pre><code>${text}</code></pre>`;
      }
      if (node.type === 'blockquote') {
        const text = node.content ? node.content.map((n: any) => {
          if (n.type === 'paragraph') return n.content ? n.content.map((sub: any) => sub.text || '').join('') : '';
          return n.text || '';
        }).join('<br/>') : '';
        return `<blockquote>${text}</blockquote>`;
      }
      if (node.type === 'bulletList' || node.type === 'orderedList') {
        const tag = node.type === 'bulletList' ? 'ul' : 'ol';
        const items = node.content ? node.content.map((li: any) => {
          const text = li.content ? li.content.map((p: any) => p.content ? p.content.map((n: any) => n.text || '').join('') : (p.text || '')).join('') : '';
          return `<li>${text}</li>`;
        }).join('') : '';
        return `<${tag}>${items}</${tag}>`;
      }
      if (node.text) return `<p>${node.text}</p>`;
      return '';
    }).join('');
  }
  
  return '<p>Unsupported content format.</p>';
};

const BlogsSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [profile, setProfile] = useState<AuthorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const fetchBlogsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiKey = 'lm_8db1980e5dff8f0432acf78427e2c35bcc8dc3e69f0f8c5834d391edeb5bf9a6';
      const prodUrl = 'https://lumen-archive.vercel.app/api/external/posts/shyamkano';
      const devUrl = 'http://localhost:3000/api/external/posts/shyamkano';

      let res: Response | null = null;

      // Try production Vercel deployment first
      try {
        res = await fetch(prodUrl, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
      } catch (e) {
        console.warn('Production fetch failed, trying local dev server...', e);
      }

      // Fallback to localhost if production fetch failed or returned non-200
      if (!res || !res.ok) {
        try {
          const localRes = await fetch(devUrl, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
          });
          if (localRes.ok) {
            res = localRes;
          }
        } catch (localErr) {
          console.warn('Local dev fetch also failed.', localErr);
        }
      }

      // If both external API endpoints failed (e.g. Vercel backend has RLS issue or local dev server is inactive),
      // we execute a direct Supabase REST API fallback query to guarantee 100% uptime for the portfolio.
      if (!res || !res.ok) {
        console.warn('External API endpoints unavailable. Engaging direct Supabase REST API fallback protocol...');
        
        const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZmhrcWJqY3F0dXVkcHFhY25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3OTI2NDUsImV4cCI6MjA5MTM2ODY0NX0.K9j4g_5NjjhDbUr_GgtxmBJNiP3v_8rVouSfd2kMB8I';
        const supabaseHeaders = {
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        };

        // 1. Fetch Author Profile
        const profileRes = await fetch('https://eqfhkqbjcqtuudpqacne.supabase.co/rest/v1/profiles?select=*&username=eq.shyamkano', {
          headers: supabaseHeaders
        });
        
        if (!profileRes.ok) {
          throw new Error('Failed to synchronize with LUMEN archival engine.');
        }

        const profilesData = await profileRes.json();
        const authorProfile = profilesData[0] || {
          id: 'f47533b5-4df5-44a7-a856-692cd805324e',
          full_name: 'Ghanshyam Kanojiya',
          avatar_url: 'https://eqfhkqbjcqtuudpqacne.supabase.co/storage/v1/object/public/post-images/f47533b5-4df5-44a7-a856-692cd805324e/1776101570126.jpg',
          bio: 'Software architect & AI researcher publishing high-fidelity technical documentation.'
        };

        // 2. Fetch Published Posts
        const postsRes = await fetch(`https://eqfhkqbjcqtuudpqacne.supabase.co/rest/v1/posts?select=*&author_id=eq.${authorProfile.id}&status=eq.published&order=created_at.desc`, {
          headers: supabaseHeaders
        });

        if (!postsRes.ok) {
          throw new Error('Failed to retrieve digital narratives from database.');
        }

        const postsRaw = await postsRes.json();
        
        // Map content to HTML
        const postsProcessed = postsRaw.map((p: any) => ({
          ...p,
          html: p.html || renderTipTapJson(p.content)
        }));

        setProfile(authorProfile);
        setPosts(postsProcessed);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setProfile(data.profile);
      setPosts(data.posts || []);
    } catch (err: unknown) {
      console.error('Error fetching blogs:', err);
      if (err instanceof Error) {
        setError(err.message || 'Unable to connect to LUMEN narrative engine.');
      } else {
        setError('Unable to connect to LUMEN narrative engine.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const getExcerpt = (post: BlogPost) => {
    if (post.html) {
      const text = post.html.replace(/<[^>]+>/g, ' ');
      if (text.trim().length > 0) {
        return text.trim().substring(0, 150) + '...';
      }
    }
    if (post.content && typeof post.content === 'string') {
      return post.content.substring(0, 150) + '...';
    }
    return 'Explore this digital narrative to read the full architectural breakdown and insights.';
  };

  return (
    <section id="blogs" className="section-padding" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: '8px 22px',
              background: 'rgba(0, 210, 255, 0.08)',
              border: '1px solid var(--accent-secondary)',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--accent-secondary)',
              marginBottom: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              boxShadow: '0 0 30px rgba(0, 210, 255, 0.15)',
            } as CSSProperties}
          >
            <Sparkles size={14} /> LUMEN Publishing Network Protocol
          </motion.span>

          <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: '950', marginBottom: '20px', lineHeight: '1.05', textTransform: 'uppercase', letterSpacing: '-0.04em' }}>
            Digital <span className="text-gradient">Narratives</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '18px', lineHeight: '1.6' }}>
            Directly synchronized from my LUMEN archival engine. Thoughts on applied AI, distributed backend systems, and modern software design.
          </p>
        </div>

        {/* Author Profile Header */}
        {profile && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass profile-card"
            style={{
              padding: '32px',
              borderRadius: '24px',
              marginBottom: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
              border: '1px solid var(--glass-border)'
            } as CSSProperties}
          >
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)', flexShrink: 0, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.full_name || 'Author'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={36} style={{ color: 'var(--accent-secondary)' }} />
              )}
            </div>
            
            <div style={{ flex: 1 }} className="profile-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'white' }}>{profile.full_name || '@shyamkano'}</h3>
                <span style={{ padding: '2px 10px', background: 'rgba(112, 0, 255, 0.2)', border: '1px solid var(--accent-primary)', borderRadius: '100px', fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)' }}>Verified Resident</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', maxWidth: '600px' }}>
                {profile.bio || 'Software architect & AI researcher publishing high-fidelity technical documentation.'}
              </p>
            </div>

            <motion.a 
              href="https://lumen-archive.vercel.app/feed" 
              target="_blank" 
              className="glass lumen-btn"
              whileHover={{ scale: 1.05, background: 'var(--glass-hover)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: '1px solid var(--glass-border)', cursor: 'pointer' } as CSSProperties}
            >
              LUMEN Network <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: '20px' }}>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-primary)' }}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Synchronizing with LUMEN Narrative Engine...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', borderColor: 'rgba(255, 68, 68, 0.3)', background: 'rgba(255, 68, 68, 0.05)', maxWidth: '600px', margin: '0 auto' }}
          >
            <AlertCircle size={48} style={{ color: '#ff4444', margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Connection Interrupted</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '28px', lineHeight: '1.6' }}>{error}</p>
            <motion.button 
              onClick={fetchBlogsData}
              className="btn-primary" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              <RefreshCw size={16} /> Retry Protocol
            </motion.button>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && posts.length === 0 && (
          <div className="glass" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '24px' }}>
            <FileText size={48} style={{ color: 'var(--text-secondary)', opacity: 0.4, margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>No Published Narratives Found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Check back soon for new architectural breakdowns and research papers.</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          } as CSSProperties}>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="glass blog-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  flexDirection: 'column'
                } as CSSProperties}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      className="blog-image"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                      <Sparkles size={48} style={{ color: 'var(--accent-primary)', opacity: 0.2 }} />
                    </div>
                  )}
                  <div className="glass" style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '6px 16px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0,0,0,0.6)'
                  }}>
                    {post.type || 'Article'}
                  </div>
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} style={{ color: 'var(--accent-secondary)' }} /> {post.read_time || 5} min read
                      </span>
                      {post.views !== undefined && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={14} style={{ color: 'var(--accent-primary)' }} /> {post.views} views
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '16px', lineHeight: '1.3' }} className="blog-title">
                      {post.title}
                    </h3>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px', lineHeight: '1.6' }}>
                      {getExcerpt(post)}
                    </p>
                  </div>

                  <div>
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} style={{
                            fontSize: '11px',
                            color: 'var(--text-secondary)',
                            padding: '4px 10px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '6px'
                          }}>#{tag}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-secondary)', fontWeight: '600', fontSize: '14px' }} className="explore-link">
                      Read Narrative <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedPost && (
          <BlogModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .blog-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-secondary);
          box-shadow: 0 0 40px rgba(0, 210, 255, 0.2);
        }
        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }
        .blog-card:hover .blog-title {
          color: var(--accent-secondary);
        }
        @media (max-width: 768px) {
          .profile-card {
            flex-direction: column !important;
            text-align: center !important;
          }
          .profile-info {
            text-align: center !important;
          }
          .profile-info div {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogsSection;
