'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { FiHome, FiArrowLeft, FiSearch, FiFile } from 'react-icons/fi';
import { ROUTES } from '@/src/constants/routes';

export default function NotFound() {
  return (
    <div style={{ 
      fontFamily: "'DM Sans', sans-serif", 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#fafaf9',
      padding: '20px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        
        @media (max-width: 768px) {
          .container {
            padding: 40px 20px !important;
            text-align: center !important;
          }
          .button-group {
            flex-direction: column !important;
            gap: 12px !important;
            width: 100% !important;
          }
          .illustration {
            width: 200px !important;
            height: 200px !important;
            margin-bottom: 24px !important;
          }
          .title {
            font-size: 24px !important;
            margin-bottom: 12px !important;
          }
          .subtitle {
            font-size: 14px !important;
            margin-bottom: 24px !important;
          }
        }
        
        @media (max-width: 480px) {
          .illustration {
            width: 160px !important;
            height: 160px !important;
          }
          .title {
            font-size: 20px !important;
          }
          .subtitle {
            font-size: 13px !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="container"
        style={{ 
          textAlign: 'center', 
          maxWidth: 500,
          width: '100%'
        }}
      >
        {/* Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className="illustration"
          style={{
            width: 240,
            height: 240,
            margin: '0 auto 32px',
            background: '#fff',
            border: '2px solid #e8e6e1',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div style={{
            fontSize: 72,
            fontWeight: 500,
            color: '#1a1a1a',
            fontFamily: "'DM Mono', monospace"
          }}>
            404
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280,
            height: 280,
            border: '1px dashed #e8e6e1',
            borderRadius: '50%',
            animation: 'spin 20s linear infinite'
          }} />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="title" style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#1a1a1a',
            margin: '0 0 16px',
            letterSpacing: '-0.02em'
          }}>
            Page introuvable
          </h1>
          
          <p className="subtitle" style={{
            fontSize: 16,
            color: '#888580',
            margin: '0 0 32px',
            lineHeight: 1.5
          }}>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          {/* Buttons */}
          <div className="button-group" style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: '#fff',
                border: '1px solid #e8e6e1',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#1a1a1a',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textDecoration: 'none'
              }}
              onMouseEnter={e => { 
                (e.currentTarget as HTMLButtonElement).style.background = '#fafaf9'; 
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#1a1a1a'; 
              }}
              onMouseLeave={e => { 
                (e.currentTarget as HTMLButtonElement).style.background = '#fff'; 
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e8e6e1'; 
              }}
            >
              <FiArrowLeft size={16} />
              Retour
            </motion.button>

            <Link
              href={ROUTES.DASHBOARD.ROOT}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: '#1a1a1a',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textDecoration: 'none'
              }}
              onMouseEnter={e => { 
                (e.currentTarget as HTMLAnchorElement).style.background = '#333'; 
              }}
              onMouseLeave={e => { 
                (e.currentTarget as HTMLAnchorElement).style.background = '#1a1a1a'; 
              }}
            >
              <FiHome size={16} />
              Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Help section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            marginTop: 48,
            padding: '24px',
            background: '#fff',
            border: '1px solid #e8e6e1',
            borderRadius: 12
          }}
        >
          <h3 style={{
            fontSize: 16,
            fontWeight: 500,
            color: '#1a1a1a',
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <FiSearch size={16} style={{ color: '#888580' }} />
            Besoin d'aide ?
          </h3>
          <p style={{
            fontSize: 14,
            color: '#888580',
            margin: 0,
            lineHeight: 1.5
          }}>
            Vous pouvez utiliser la barre de recherche pour trouver ce que vous cherchez, 
            ou naviguer vers le dashboard pour accéder à toutes les fonctionnalités.
          </p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}