'use client';

import Sidebar from '@/src/components/uxComponents/Sidebar';
import Navbar from '@/src/components/uxComponents/Navbar';
import DashboardSkeleton from '@/src/components/uxComponents/DashboardSkeleton';
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirige si non connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }
  }, [status])

  if (status === "loading") return <DashboardSkeleton />
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#f9f8f6',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
