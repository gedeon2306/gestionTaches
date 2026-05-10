'use client';

import { useEffect } from 'react';

interface SpinnerProps {
  color?: string;
}

export const Spinner = ({ color = '#1a1a1a' }: SpinnerProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingStyle = document.head.querySelector('style[data-spinner-animation]');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        style.setAttribute('data-spinner-animation', 'true');
        document.head.appendChild(style);
      }
    }
  }, []);

  return (
    <div style={{
      width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${color}25`,
      borderTop: `2px solid ${color}`,
      animation: 'spin 0.7s linear infinite',
    }} />
  );
};
