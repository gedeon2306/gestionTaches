"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { ROUTES } from "@/src/constants/routes";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { AuthLayout, Spinner } from '@/src/components/auth';
import AuthSkeleton from '@/src/components/uxComponents/AuthSkeleton';

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    const action = searchParams.get("action");

    if (!uid || !token || !action) {
      toast.error("Page non trouvée");
      router.replace(ROUTES.HOME);
      return;
    }

    const confirm = async () => {
      try {
        if (action === "register") {
          // 1. Django valide le token email et renvoie les JWT
          const confirmRes = await axios.post("/api/confirm", {
            uid,
            token,
            action,
          });
          const { message, access, refresh, email } = confirmRes.data;

          // 2. Création de la session NextAuth avec les tokens Django
          //    On passe type="confirm-login" pour bypasser la vérification password
          const result = await signIn("credentials", {
            redirect: false,
            type: "confirm-login",
            accessToken: access,
            refreshToken: refresh,
            email: email ?? "",
          });

          if (result?.ok) {
            toast.success(message);
            router.replace(ROUTES.DASHBOARD.ROOT);
          } else {
            toast.error("Connexion échouée après confirmation.");
            router.replace(ROUTES.AUTH.LOGIN);
          }
        } else if (action === "forgot-password") {
          await axios.post("/api/confirm", { uid, token, action });
          router.replace(
            `${ROUTES.AUTH.RESET_PASSWORD}?uid=${encodeURIComponent(uid)}&token=${encodeURIComponent(token)}`,
          );
        } else {
          toast.error("Données invalides");
          router.replace(ROUTES.HOME);
        }

        router.refresh();
      } catch (error: any) {
        const email = error?.response?.data?.email ?? "";
        toast.error(error?.response?.data?.error ?? "Une erreur est survenue");
        router.replace(`${ROUTES.AUTH.EMAIL_SEND}${email ? `?email=${encodeURIComponent(email)}&action=${encodeURIComponent(action)}` : ''}`);
      }
    };

    confirm();
  }, [router, searchParams]);

  return null;
}

export default function ConfirmPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(ROUTES.DASHBOARD.ROOT);
    }
  }, [status]);

  if (status === "loading") return <AuthSkeleton />;

  return (
    <AuthLayout
      title="Confirmation en cours"
      subtitle="Veuillez patienter quelques instants…"
      footerText="Un problème ?"
      footerLink={{ text: "Retour à l'accueil", href: "/" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "20px 0 12px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1.5px solid #e8e6e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fafaf9",
          }}
        >
          <Spinner color="#1a1a1a" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{
            textAlign: "center",
            fontSize: 12.5,
            color: "#888580",
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
          }}
        >
          Vérification de votre lien en cours.
          <br />
          Vous serez redirigé automatiquement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            width: "100%",
            height: 2,
            background: "#e8e6e1",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "40%",
              height: "100%",
              background: "#1a1a1a",
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
