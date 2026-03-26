'use client';

import { useState, useRef, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music, Volume2, VolumeX, SkipForward,
  Sun, Moon, Zap, Music2, X, Play, Pause, Disc3, Radio,
} from 'lucide-react';

// SomaFM — 4 ambient channels, curated for a dev/portfolio vibe
const TRACKS = [
  { title: 'Groove Salad',   artist: 'SomaFM', genre: 'Ambient · Chill',      url: 'https://ice6.somafm.com/groovesalad-128-mp3'  },
  { title: 'Deep Space One', artist: 'SomaFM', genre: 'Space · Ambient',       url: 'https://ice6.somafm.com/deepspaceone-128-mp3' },
  { title: 'Vaporwaves',     artist: 'SomaFM', genre: 'Vaporwave · Synthwave', url: 'https://ice6.somafm.com/vaporwaves-128-mp3'   },
  { title: 'Cliqhop idm',   artist: 'SomaFM', genre: 'IDM · Electronic',      url: 'https://ice6.somafm.com/cliqhop-128-mp3'     },
];

const FloatingControls = () => {
  const [isOpen,           setIsOpen]           = useState(false);
  const [isPlaying,        setIsPlaying]        = useState(false);
  const [isMuted,          setIsMuted]          = useState(false);
  const [volume,           setVolume]           = useState(0.4);
  const [trackIndex,       setTrackIndex]       = useState(0);
  const [theme,            setTheme]            = useState<'default' | 'electric'>('default');
  const [streamErr,        setStreamErr]        = useState(false);
  const [loading,          setLoading]          = useState(false);
  const [autoplayBlocked,  setAutoplayBlocked]  = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Always clamp to valid range — guards against HMR stale state when TRACKS length changes
  const safeIndex = Math.min(trackIndex, TRACKS.length - 1);
  const track = TRACKS[safeIndex] ?? TRACKS[0];

  // ── Theme sync ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'default' | 'electric' | null;
    if (saved) setTheme(saved);
    const handler = (e: Event) => setTheme((e as CustomEvent).detail);
    window.addEventListener('themeChange', handler);
    return () => window.removeEventListener('themeChange', handler);
  }, []);

  // Reset index if it ever goes out of bounds (e.g. after TRACKS array changes)
  useEffect(() => {
    if (trackIndex >= TRACKS.length) setTrackIndex(0);
  }, [trackIndex]);

  // ── Bootstrap audio + attempt autoplay ─────────────────────────────────────
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = volume;
    audioRef.current = audio;

    // Load first channel
    audio.src = TRACKS[0].url;

    const tryAutoplay = async () => {
      try {
        setLoading(true);
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setStreamErr(false);
      } catch {
        // Browser blocked autoplay — wait for first user interaction
        setIsPlaying(false);
        setAutoplayBlocked(true);

        const onFirstClick = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            setAutoplayBlocked(false);
          } catch {
            setStreamErr(true);
          }
          document.removeEventListener('click', onFirstClick, true);
        };
        document.addEventListener('click', onFirstClick, true);
      } finally {
        setLoading(false);
      }
    };

    tryAutoplay();

    return () => {
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Volume / mute ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // ── Controls ────────────────────────────────────────────────────────────────
  const playTrack = async (idx: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    setStreamErr(false);
    setLoading(true);
    audio.src = TRACKS[idx].url;
    audio.load();
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setStreamErr(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setLoading(true);
        await audio.play();
        setIsPlaying(true);
      } catch {
        setStreamErr(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNextTrack = async () => {
    const next = (trackIndex + 1) % TRACKS.length;
    setTrackIndex(next);
    if (isPlaying) await playTrack(next);
  };

  const handleSelectTrack = async (idx: number) => {
    setTrackIndex(idx);
    await playTrack(idx);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'default' ? 'electric' : 'default';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme === 'electric' ? 'theme-electric' : '';
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
  };

  // ── Derived styles ──────────────────────────────────────────────────────────
  const iconGlow = theme === 'electric'
    ? '0 0 24px rgba(0, 153, 255, 0.40)'
    : '0 0 24px rgba(140, 0, 255, 0.35)';
  const accentGrad = theme === 'electric'
    ? 'linear-gradient(135deg, #0066ff, #00d4ff)'
    : 'linear-gradient(135deg, #7c3aed, #06b6d4)';
  const panelStyle: CSSProperties = {
    background: theme === 'electric'
      ? 'linear-gradient(180deg, rgba(10,18,40,0.96), rgba(6,10,24,0.96))'
      : 'linear-gradient(180deg, rgba(18,10,36,0.96), rgba(10,10,24,0.96))',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '24px',
    padding: '18px',
    width: '290px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: theme === 'electric'
      ? '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,102,255,0.12)'
      : '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(112,0,255,0.12)',
  };

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Autoplay blocked banner ── */}
      <AnimatePresence>
        {autoplayBlocked && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{
              position: 'fixed',
              top: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 300,
              background: 'rgba(10,10,26,0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '100px',
              padding: '10px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              whiteSpace: 'nowrap',
            } as CSSProperties}
            onClick={async () => {
              const audio = audioRef.current;
              if (!audio) return;
              try { await audio.play(); setIsPlaying(true); setAutoplayBlocked(false); } catch {}
            }}
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Music size={14} style={{ color: theme === 'electric' ? '#00d4ff' : '#a78bfa' }} />
            </motion.div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
              Click to enable background music
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>· SomaFM</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main floating panel ── */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' } as CSSProperties}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={panelStyle}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={isPlaying ? { duration: 5, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
                  style={{ width: '40px', height: '40px', borderRadius: '14px', background: accentGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: iconGlow, flexShrink: 0 }}
                >
                  <Disc3 size={18} color="white" />
                </motion.div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.6px', color: 'rgba(255,255,255,0.50)', fontWeight: 700 }}>
                    🔴 Live Radio
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>SomaFM</div>
                </div>
              </div>

              {/* Now playing card */}
              <div style={{ position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '14px', marginBottom: '12px' }}>
                <div style={{ position: 'absolute', inset: 0, background: theme === 'electric' ? 'radial-gradient(circle at top right, rgba(0,153,255,0.18), transparent 45%)' : 'radial-gradient(circle at top right, rgba(140,0,255,0.18), transparent 45%)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
                  <motion.div
                    animate={isPlaying ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{ width: '48px', height: '48px', borderRadius: '16px', background: accentGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isPlaying ? iconGlow : 'none' }}
                  >
                    {loading
                      ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Music size={18} color="white" /></motion.div>
                      : <Music size={18} color="white" />}
                  </motion.div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', margin: '4px 0 0', fontWeight: 500 }}>{track.artist} · {track.genre}</p>
                  </div>
                </div>
                {/* Shimmer */}
                <div style={{ marginTop: '12px', height: '5px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  {isPlaying && (
                    <motion.div
                      animate={{ x: ['-30%', '130%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: '40%', height: '100%', borderRadius: '999px', background: theme === 'electric' ? 'linear-gradient(90deg, transparent, #00d4ff, transparent)' : 'linear-gradient(90deg, transparent, #7c3aed, #22d3ee, transparent)' }}
                    />
                  )}
                </div>
              </div>

              {/* Channel list — flat, minimal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px' }}>
                {TRACKS.map((t, i) => (
                  <motion.button
                    key={t.title}
                    onClick={() => handleSelectTrack(i)}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 10px',
                      background: trackIndex === i
                        ? (theme === 'electric' ? 'rgba(0,102,255,0.15)' : 'rgba(124,58,237,0.15)')
                        : 'rgba(255,255,255,0.025)',
                      border: trackIndex === i
                        ? (theme === 'electric' ? '1px solid rgba(0,153,255,0.4)' : '1px solid rgba(124,58,237,0.4)')
                        : '1px solid transparent',
                      borderRadius: '10px', cursor: 'pointer', textAlign: 'left', width: '100%',
                    } as CSSProperties}
                  >
                    <Radio size={10} style={{ color: trackIndex === i && isPlaying ? (theme === 'electric' ? '#00d4ff' : '#a78bfa') : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: '12px', fontWeight: trackIndex === i ? 700 : 500, color: trackIndex === i ? 'white' : 'rgba(255,255,255,0.65)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{t.genre}</p>
                    </div>
                    {trackIndex === i && isPlaying && (
                      <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '12px', flexShrink: 0 }}>
                        {[1, 0.6, 0.8, 0.5].map((h, j) => (
                          <motion.div key={j} animate={{ scaleY: [h, 1, h * 0.4, 1, h] }} transition={{ duration: 0.8 + j * 0.15, repeat: Infinity }}
                            style={{ width: '2px', background: theme === 'electric' ? '#00d4ff' : '#a78bfa', borderRadius: '2px', height: '12px', transformOrigin: 'bottom' }} />
                        ))}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Playback controls */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <motion.button onClick={togglePlay} whileTap={{ scale: 0.96 }}
                  style={{ flex: 1, height: '42px', border: 'none', borderRadius: '14px', background: accentGrad, color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: iconGlow } as CSSProperties}
                >
                  {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Music size={15} /></motion.div> : isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  {loading ? 'Connecting…' : isPlaying ? 'Pause' : 'Play'}
                </motion.button>
                <motion.button onClick={handleNextTrack} whileTap={{ scale: 0.94 }} style={{ width: '42px', height: '42px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties}>
                  <SkipForward size={16} />
                </motion.button>
                <motion.button onClick={() => setIsMuted(m => !m)} whileTap={{ scale: 0.94 }} style={{ width: '42px', height: '42px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', color: isMuted ? '#ff5c7a' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties}>
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </motion.button>
              </div>

              {/* Volume */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <Volume2 size={13} style={{ color: 'rgba(255,255,255,0.7)' }} />
                    <span style={{ fontSize: '12px', color: 'white', fontWeight: 600 }}>Volume</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{Math.round(volume * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={volume} onChange={e => setVolume(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: theme === 'electric' ? '#00cfff' : '#7c3aed', cursor: 'pointer' }} />
              </div>

              {/* Theme */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
                  <Sun size={13} style={{ color: 'rgba(255,255,255,0.8)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.50)' }}>Visual Theme</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['default', 'electric'] as const).map(t => (
                    <motion.button key={t} onClick={() => { if (theme !== t) toggleTheme(); }} whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1, height: '48px',
                        background: theme === t
                          ? (t === 'electric' ? 'linear-gradient(135deg,rgba(0,102,255,0.22),rgba(0,242,255,0.18))' : 'linear-gradient(135deg,rgba(124,58,237,0.22),rgba(34,211,238,0.18))')
                          : 'rgba(255,255,255,0.04)',
                        border: theme === t
                          ? (t === 'electric' ? '1px solid rgba(0,153,255,0.7)' : '1px solid rgba(124,58,237,0.7)')
                          : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '14px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'white',
                      } as CSSProperties}
                    >
                      {t === 'default' ? <Moon size={14} /> : <Zap size={14} />}
                      <span style={{ fontSize: '11px', fontWeight: 600 }}>{t === 'default' ? 'Purple' : 'Electric'}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {streamErr && (
                <p style={{ margin: '10px 4px 0', fontSize: '11px', lineHeight: 1.5, color: 'rgba(255,100,100,0.9)' }}>
                  ⚠️ Stream unavailable. Check your connection and try again.
                </p>
              )}
              <p style={{ margin: '10px 4px 0', fontSize: '10px', color: 'rgba(255,255,255,0.22)' }}>
                Music by SomaFM · Free ad-free internet radio
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => setIsOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title="Music & Theme"
          style={{
            width: '56px', height: '56px', borderRadius: '18px',
            background: isPlaying ? accentGrad : 'rgba(15, 15, 35, 0.92)',
            border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
            boxShadow: isPlaying ? iconGlow : '0 10px 30px rgba(0,0,0,0.35)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          } as CSSProperties}
        >
          <AnimatePresence mode="wait">
            {isOpen
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} /></motion.div>
              : isPlaying
                ? <motion.div key="play" animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}><Music size={20} /></motion.div>
                : <motion.div key="idle" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><Music2 size={20} /></motion.div>}
          </AnimatePresence>
        </motion.button>

        {/* Pulse ring */}
        {isPlaying && !isOpen && (
          <motion.div style={{ position: 'absolute', bottom: 0, right: 0, width: '56px', height: '56px', borderRadius: '18px', border: theme === 'electric' ? '2px solid rgba(0,212,255,0.7)' : '2px solid rgba(124,58,237,0.7)', pointerEvents: 'none' } as CSSProperties}
            animate={{ scale: [1, 1.3], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
        )}
      </div>
    </>
  );
};

export default FloatingControls;