'use client';

export default function DashboardSkeleton() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#f9f8f6',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Sidebar Skeleton */}
      <div style={{
        width: '250px',
        background: '#fff',
        borderRight: '1px solid #e8e6e1',
        padding: '20px',
      }}>
        {/* Logo skeleton */}
        <div style={{
          width: '120px',
          height: '32px',
          background: '#e8e6e1',
          borderRadius: '6px',
          marginBottom: '32px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }} />

        {/* Navigation items skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              style={{
                height: '40px',
                background: '#e8e6e1',
                borderRadius: '8px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                animationDelay: `${item * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Navbar Skeleton */}
        <div style={{
          height: '64px',
          background: '#fff',
          borderBottom: '1px solid #e8e6e1',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Search bar skeleton */}
          <div style={{
            width: '300px',
            height: '36px',
            background: '#e8e6e1',
            borderRadius: '8px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
          
          {/* User menu skeleton */}
          <div style={{
            width: '40px',
            height: '40px',
            background: '#e8e6e1',
            borderRadius: '50%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
        </div>

        {/* Content skeleton */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}>
          {/* Page title skeleton */}
          <div style={{
            width: '200px',
            height: '32px',
            background: '#e8e6e1',
            borderRadius: '6px',
            marginBottom: '24px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />

          {/* Cards grid skeleton */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}>
            {[1, 2, 3, 4].map((card) => (
              <div
                key={card}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e8e6e1',
                }}
              >
                {/* Card title skeleton */}
                <div style={{
                  width: '60%',
                  height: '20px',
                  background: '#e8e6e1',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: `${card * 0.1}s`,
                }} />
                
                {/* Card value skeleton */}
                <div style={{
                  width: '40%',
                  height: '28px',
                  background: '#e8e6e1',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: `${card * 0.1 + 0.1}s`,
                }} />
                
                {/* Card description skeleton */}
                <div style={{
                  width: '80%',
                  height: '16px',
                  background: '#e8e6e1',
                  borderRadius: '4px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: `${card * 0.1 + 0.2}s`,
                }} />
              </div>
            ))}
          </div>

          {/* Table skeleton */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e8e6e1',
          }}>
            {/* Table header skeleton */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e8e6e1',
            }}>
              {['30%', '25%', '20%', '15%', '10%'].map((width, index) => (
                <div
                  key={index}
                  style={{
                    width,
                    height: '16px',
                    background: '#e8e6e1',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Table rows skeleton */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                {['30%', '25%', '20%', '15%', '10%'].map((width, index) => (
                  <div
                    key={index}
                    style={{
                      width,
                      height: '14px',
                      background: '#e8e6e1',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      animationDelay: `${row * 0.05 + index * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </main>
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
