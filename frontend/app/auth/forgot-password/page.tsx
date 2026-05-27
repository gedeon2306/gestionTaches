'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthLayout, FormField, Spinner } from '@/src/components/auth';
import { ROUTES } from '@/src/constants/routes';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email) {
      toast.error('Veuillez entrer votre email');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/forgot-password', { email });
      toast.success(res.data.message);
      router.push(
        `${ROUTES.AUTH.EMAIL_SEND}?email=${encodeURIComponent(email)}&action=forgot-password`
      );
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Recevez un lien pour réinitialiser votre mot de passe"
      footerText="Vous vous souvenez ?"
      footerLink={{ text: 'Retour à la connexion', href: '/auth/login' }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <FormField
          type="email"
          label="Email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={setEmail}
          focused={focused}
          onFocus={setFocused}
          onBlur={() => setFocused(null)}
          fieldName="email"
        />

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
              Envoyer le lien
              <FiArrowRight size={13} />
            </>
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}