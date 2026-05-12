'use client';

export default function AuthSkeleton() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9f8f6',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#fff',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid #e8e6e1',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}>
        {/* Title skeleton */}
        <div style={{
          width: '140px',
          height: '32px',
          background: '#e8e6e1',
          borderRadius: '6px',
          marginBottom: '8px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }} />

        {/* Subtitle skeleton */}
        <div style={{
          width: '220px',
          height: '16px',
          background: '#e8e6e1',
          borderRadius: '4px',
          marginBottom: '32px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          animationDelay: '0.1s',
        }} />

        {/* OAuth buttons skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {/* Google button skeleton */}
          <div style={{
            width: '100%',
            height: '44px',
            background: '#e8e6e1',
            borderRadius: '9px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '0.2s',
          }} />
          
          {/* GitHub button skeleton */}
          <div style={{
            width: '100%',
            height: '44px',
            background: '#e8e6e1',
            borderRadius: '9px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '0.3s',
          }} />
        </div>

        {/* Divider skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '24px 0' }}>
          <div style={{
            flex: 1,
            height: 1,
            background: '#e8e6e1',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '0.4s',
          }} />
          <div style={{
            width: '20px',
            height: '12px',
            background: '#e8e6e1',
            borderRadius: '2px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '0.5s',
          }} />
          <div style={{
            flex: 1,
            height: 1,
            background: '#e8e6e1',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '0.4s',
          }} />
        </div>

        {/* Form fields skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {/* Email field skeleton */}
          <div>
            <div style={{
              width: '40px',
              height: '12px',
              background: '#e8e6e1',
              borderRadius: '2px',
              marginBottom: '8px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: '0.6s',
            }} />
            <div style={{
              width: '100%',
              height: '44px',
              background: '#e8e6e1',
              borderRadius: '9px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: '0.7s',
            }} />
          </div>

          {/* Password field skeleton */}
          <div>
            <div style={{
              width: '70px',
              height: '12px',
              background: '#e8e6e1',
              borderRadius: '2px',
              marginBottom: '8px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: '0.8s',
            }} />
            <div style={{
              width: '100%',
              height: '44px',
              background: '#e8e6e1',
              borderRadius: '9px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: '0.9s',
            }} />
          </div>
        </div>

        {/* Submit button skeleton */}
        <div style={{
          width: '100%',
          height: '44px',
          background: '#e8e6e1',
          borderRadius: '9px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          animationDelay: '1.0s',
        }} />

        {/* Footer link skeleton */}
        <div style={{
          width: '160px',
          height: '14px',
          background: '#e8e6e1',
          borderRadius: '2px',
          margin: '24px auto 0',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          animationDelay: '1.1s',
        }} />
      </div>

      {/* Pulse animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
