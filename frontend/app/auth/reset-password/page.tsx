'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthLayout, FormField, Spinner, PasswordStrength } from '@/src/components/auth';
import AuthSkeleton from '@/src/components/uxComponents/AuthSkeleton';
import { ROUTES } from '@/src/constants/routes';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!uid || !token) {
      toast.error('Lien invalide ou expiré');
      router.replace(ROUTES.AUTH.FORGOT_PASSWORD);
    }
  }, [uid, token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!password || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/reset-password', { uid, token, password, confirmPassword });
      toast.success(res.data.message);
      router.replace(ROUTES.AUTH.LOGIN);
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Nouveau mot de passe */}
      <div>
        <FormField
          type="password"
          label="Nouveau mot de passe"
          placeholder="8 caractères minimum"
          value={password}
          onChange={setPassword}
          focused={focused}
          onFocus={setFocused}
          onBlur={() => setFocused(null)}
          fieldName="password"
          showPasswordToggle={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        <PasswordStrength password={password} />
      </div>

      {/* Confirmation */}
      <div>
        <FormField
          type="password"
          label="Confirmer le mot de passe"
          placeholder="Répétez le mot de passe"
          value={confirmPassword}
          onChange={setConfirmPassword}
          focused={focused}
          onFocus={setFocused}
          onBlur={() => setFocused(null)}
          fieldName="confirmPassword"
          showPasswordToggle={true}
          showPassword={showConfirm}
          onTogglePassword={() => setShowConfirm(!showConfirm)}
        />

        {/* Indicateur de correspondance */}
        {confirmPassword.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 11.5,
              marginTop: 5,
              color: password === confirmPassword ? '#4ade80' : '#f87171',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {password === confirmPassword
              ? '✓ Les mots de passe correspondent'
              : '✗ Les mots de passe ne correspondent pas'}
          </motion.p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        style={{
          marginTop: 4,
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
            Réinitialiser le mot de passe
            <FiArrowRight size={13} />
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe sécurisé pour votre compte"
      footerText="Besoin de revenir en arrière ?"
      footerLink={{ text: 'Retour à la connexion', href: '/auth/login' }}
    >
      <Suspense fallback={<AuthSkeleton />}>
        <ResetPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}