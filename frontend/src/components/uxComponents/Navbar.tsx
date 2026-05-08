'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiBell, FiX, FiMaximize, FiMinimize, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';


const NOTIFS = [
  { text: 'Marie a commenté une tâche', time: 'il y a 5 min', dot: true },
  { text: 'Tâche "API auth" marquée terminée', time: 'il y a 1h', dot: false },
  { text: 'Rappel : deadline projet demain', time: 'il y a 2h', dot: true },
];

const IconBtn = ({
  onClick, children, title,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  title?: string;
}) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      width: 32, height: 32, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'none', border: '1px solid #e8e6e1',
      borderRadius: 8, cursor: 'pointer', color: '#888580', position: 'relative',
      transition: 'all 0.15s', flexShrink: 0,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.background = '#f5f4f1';
      (e.currentTarget as HTMLButtonElement).style.color = '#1a1a1a';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.background = 'none';
      (e.currentTarget as HTMLButtonElement).style.color = '#888580';
    }}
  >
    {children}
  </button>
);

export default function Navbar({ title = "Vue d'ensemble" }: { title?: string }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  return (
    <header style={{
      height: 56,
      background: '#fff',
      borderBottom: '1px solid #e8e6e1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      zIndex: 10,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <h1 style={{ fontSize: 13.5, fontWeight: 500, color: '#1a1a1a', margin: 0, letterSpacing: '-0.01em' }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

        {/* Theme Toggle */}
        <IconBtn onClick={toggleTheme} title={isDarkMode ? 'Mode clair' : 'Mode sombre'}>
          {isDarkMode ? <FiSun size={13} /> : <FiMoon size={13} />}
        </IconBtn>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <IconBtn onClick={() => setNotifOpen(!notifOpen)} title="Notifications">
            <FiBell size={13} />
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 5, height: 5, borderRadius: '50%',
              background: '#1a1a1a', border: '1.5px solid #fff',
              pointerEvents: 'none',
            }} />
          </IconBtn>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', top: 40, right: 0,
                  width: 280, background: '#fff',
                  border: '1px solid #e8e6e1', borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid #f0efeb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a' }}>Notifications</span>
                  <span style={{ fontSize: 11, color: '#b0aeaa', cursor: 'pointer' }}>Tout lire</span>
                </div>
                {NOTIFS.map((n, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start',
                    borderBottom: i < NOTIFS.length - 1 ? '1px solid #f5f4f1' : 'none',
                    transition: 'background 0.12s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fafaf9'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', marginTop: 5, flexShrink: 0, background: n.dot ? '#1a1a1a' : '#e8e6e1' }} />
                    <div>
                      <p style={{ fontSize: 12.5, color: '#1a1a1a', margin: '0 0 2px', lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: '#b0aeaa', margin: 0 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 18, background: '#e8e6e1', margin: '0 2px' }} />

        {/* Fullscreen */}
        <IconBtn onClick={toggleFullscreen} title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}>
          {isFullscreen ? <FiMinimize size={13} /> : <FiMaximize size={13} />}
        </IconBtn>

        {/* Logout */}
        <button
          title="Se déconnecter"
          onClick={() => { /* handle logout */ }}
          style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'none', border: '1px solid #e8e6e1',
            borderRadius: 8, cursor: 'pointer', color: '#888580',
            transition: 'all 0.15s', flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#fff0f0';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#fcd0d0';
            (e.currentTarget as HTMLButtonElement).style.color = '#c0392b';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#e8e6e1';
            (e.currentTarget as HTMLButtonElement).style.color = '#888580';
          }}
        >
          <FiLogOut size={13} />
        </button>
      </div>
    </header>
  );
}