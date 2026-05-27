import { NextRequest, NextResponse } from "next/server"
import { signIn } from "next-auth/react"

// Cette route est appelée depuis la page /confirm après que Django
// a validé le token d'email et renvoyé les JWT Django.
//
// Elle crée la session NextAuth en passant les tokens via le provider
// "credentials" avec type="confirm-login" — sans re-valider le password.

export async function POST(req: NextRequest) {
  try {
    const { access, refresh, email } = await req.json()

    if (!access || !refresh) {
      return NextResponse.json(
        { error: "Tokens manquants" },
        { status: 400 }
      )
    }

    // On retourne les tokens au client pour qu'il appelle signIn lui-même.
    // NextAuth ne peut pas être appelé server-side depuis une route API,
    // donc on renvoie les infos et le client (page /confirm) fait signIn().
    return NextResponse.json({ access, refresh, email: email ?? "" })

  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}