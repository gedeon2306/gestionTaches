import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { ROUTES } from "@/src/constants/routes";
import api from "@/src/constants/api";

const handler = NextAuth({
  providers: [
    // ─── Google ───
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ─── GitHub ───
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // ─── Email / Password (login + confirm-login) ───
    // Le champ `type` permet de distinguer les deux cas :
    //   - "login"         → connexion normale, Django vérifie email + password
    //   - "confirm-login" → appelé depuis /api/confirm-login après confirmation email,
    //                       on reçoit directement les tokens Django (pas de password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" }, // "login" | "confirm-login"
        accessToken: { label: "Access", type: "text" }, // confirm-login only
        refreshToken: { label: "Refresh", type: "text" }, // confirm-login only
      },
      async authorize(credentials) {
        try {
          // ── Cas 1 : confirmation email → les tokens Django arrivent directement ──
          if (credentials?.type === "confirm-login") {
            if (!credentials.accessToken || !credentials.refreshToken)
              return null;
            return {
              id: credentials.email ?? "confirmed-user",
              email: credentials.email ?? "",
              djangoAccessToken: credentials.accessToken,
              djangoRefreshToken: credentials.refreshToken,
            };
          }

          // ── Cas 2 : login classique → Django valide email + password ──
          const res = await api.post("auth/login/", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const data = res.data;
          return {
            id: credentials!.email,
            email: credentials!.email,
            djangoAccessToken: data.access,
            djangoRefreshToken: data.refresh,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // ─── Appelé juste après OAuth Google/GitHub ───
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const res = await api.post("auth/oauth/", {
            provider: account.provider,
            provider_account_id: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token ?? "",
            expires_at: account.expires_at ?? null,
            token_type: account.token_type ?? "",
            scope: account.scope ?? "",
            id_token: account.id_token ?? "",
            email: user.email,
            name: user.name,
            image: user.image,
          });

          const data = res.data;
          (user as any).djangoAccessToken = data.access;
          (user as any).djangoRefreshToken = data.refresh;
        } catch {
          return false;
        }
      }
      return true;
    },

    // ─── Stocke le JWT Django dans le token NextAuth ───
    async jwt({ token, user }) {
      if (user) {
        token.djangoAccessToken = (user as any).djangoAccessToken;
        token.djangoRefreshToken = (user as any).djangoRefreshToken;
      }
      return token;
    },

    // ─── Expose le JWT Django dans la session ───
    async session({ session, token }) {
      (session as any).djangoAccessToken = token.djangoAccessToken;
      return session;
    },
  },

  pages: {
    signIn: ROUTES.AUTH.LOGIN,
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
