'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import axios from 'axios';
import { ROUTES } from '@/src/constants/routes';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { AuthLayout } from '@/src/components/auth';
import { Spinner } from '@/src/components/auth';

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const action = searchParams.get('action');

    if (!uid || !token || !action) {
      toast.error('Page non trouvée');
      router.replace(ROUTES.HOME);
      return;
    }

    const saveTokensAndRedirect = async () => {
      try {
        if (action === 'register') {
          const confirmRes = await axios.post('/api/confirm', { uid, token, action });
          const { message, access, refresh } = confirmRes.data;
          await axios.post('/api/confirm-login', { access, refresh });
          toast.success(message);
          router.replace(ROUTES.DASHBOARD.ROOT);
        } else if (action === 'forgot-password') {
          await axios.post('/api/confirm', { uid, token, action });
          router.replace(
            `${ROUTES.AUTH.RESET_PASSWORD}?uid=${encodeURIComponent(uid)}&token=${encodeURIComponent(token)}`
          );
        } else {
          toast.error('Données invalides');
          router.replace(ROUTES.HOME);
        }
        router.refresh();
      } catch (error: any) {
        const email = error?.response?.data?.email || '';
        toast.error(error?.response?.data?.error ?? 'Une erreur est survenue');
        router.replace(
          `${ROUTES.AUTH.EMAIL_SEND}${
            email
              ? `?email=${encodeURIComponent(email)}&action=${encodeURIComponent(action!)}`
              : ''
          }`
        );
      }
    };

    saveTokensAndRedirect();
  }, [router, searchParams]);

  return null;
}

export default function ConfirmPage() {
  return (
    <AuthLayout
      title="Confirmation en cours"
      subtitle="Veuillez patienter quelques instants…"
      footerText="Un problème ?"
      footerLink={{ text: 'Retour à l\'accueil', href: '/' }}
    >
      {/* Spinner centré */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        padding: '20px 0 12px',
      }}>
        {/* Spinner animé avec le style du projet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1.5px solid #e8e6e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafaf9',
          }}
        >
          <Spinner color="#1a1a1a" />
        </motion.div>

        {/* Message d'état */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontSize: 12.5,
            color: '#888580',
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
          }}>
            Vérification de votre lien en cours.
            <br />
            Vous serez redirigé automatiquement.
          </p>
        </motion.div>

        {/* Barre de progression indéterminée */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            width: '100%',
            height: 2,
            background: '#e8e6e1',
            borderRadius: 99,
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '40%',
              height: '100%',
              background: '#1a1a1a',
              borderRadius: 99,
            }}
          />
        </motion.div>
      </div>

      <Suspense fallback={null}>
        <ConfirmContent />
      </Suspense>
    </AuthLayout>
  );
}