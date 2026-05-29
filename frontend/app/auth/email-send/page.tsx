'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'motion/react';
import { FiMail, FiClock, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthLayout, Spinner } from '@/src/components/auth';
import AuthSkeleton from '@/src/components/uxComponents/AuthSkeleton';
import { ROUTES } from '@/src/constants/routes';

function EmailSentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const email = searchParams.get('email');
  const action = searchParams.get('action');

  useEffect(() => {
    if (!email || !action) {
      toast.error('Page non trouvée');
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [email, action, router]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      if (action === 'register' || action === 'forgot-password') {
        const res = await axios.post('/api/resend-email', { email, action });
        toast.success(res.data.message);
      } else {
        toast.error('Données invalides');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Icône email */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid #e8e6e1',
          background: '#fafaf9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a1a1a',
        }}>
          <FiMail size={18} />
        </div>
      </motion.div>

      {/* Adresse email destinataire */}
      {email && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          style={{
            background: '#fafaf9',
            border: '1px solid #e8e6e1',
            borderRadius: 8,
            padding: '9px 12px',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <FiMail size={12} style={{ color: '#b0aeaa', flexShrink: 0 }} />
          <span style={{
            fontSize: 12.5,
            color: '#1a1a1a',
            fontWeight: 500,
            fontFamily: "'DM Mono', monospace",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {email}
          </span>
        </motion.div>
      )}

      {/* Info durée de validité */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        style={{
          background: '#fafaf9',
          border: '1px solid #e8e6e1',
          borderRadius: 8,
          padding: '9px 12px',
          marginBottom: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <FiClock size={12} style={{ color: '#b0aeaa', flexShrink: 0 }} />
        <span style={{ fontSize: 12.5, color: '#888580', fontFamily: "'DM Sans', sans-serif" }}>
          Lien valable pendant{' '}
          <span style={{ color: '#1a1a1a', fontWeight: 500 }}>10 minutes</span>
        </span>
      </motion.div>

      {/* Bouton renvoyer */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
      >
        <form onSubmit={handleResend}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              width: '100%', height: 38,
              background: '#1a1a1a',
              border: '1px solid #1a1a1a',
              borderRadius: 9,
              fontSize: 12.5, fontWeight: 500, color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
              fontFamily: "'DM Sans', sans-serif",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#333'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a1a1a'; }}
          >
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <>
                <FiRefreshCw size={13} />
                Renvoyer l'email
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Astuce spam */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          textAlign: 'center',
          marginTop: 14,
          fontSize: 12,
          color: '#b0aeaa',
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.5,
        }}
      >
        Vous ne trouvez pas l'email ? Pensez à vérifier vos spams.
      </motion.p>
    </>
  );
}

export default function EmailSendPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(ROUTES.DASHBOARD.ROOT);
    }
  }, [status, router]);

  if (status === "loading") return <AuthSkeleton />;

  return (
    <AuthLayout
      title="Email envoyé"
      subtitle="Vérifiez votre boîte mail pour continuer"
      footerText="Mauvaise adresse ?"
      footerLink={{ text: 'Retour à la connexion', href: '/auth/login' }}
    >
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <Spinner color="#1a1a1a" />
        </div>
      }>
        <EmailSentContent />
      </Suspense>
    </AuthLayout>
  );
}