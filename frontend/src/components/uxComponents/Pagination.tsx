'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '…')[] = [1];

  if (current > 3) pages.push('…');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('…');

  pages.push(total);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const from = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalCount);
  const pages = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div style={{
      marginTop: 16,
      paddingTop: 16,
      borderTop: '1px solid #e8e6e1',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <p style={{
        fontSize: 11,
        color: '#b0aeaa',
        order: 2,
      }}>
        Affichage{' '}
        <span style={{ color: '#888580' }}>
          {from}–{to}
        </span>{' '}
        sur <span style={{ color: '#888580' }}>{totalCount}</span> éléments
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        order: 1,
      }}>
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            background: 'none',
            border: '1px solid #e8e6e1',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 6,
            color: '#888580',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 0.15s',
            opacity: currentPage === 1 ? 0.4 : 1,
            pointerEvents: currentPage === 1 ? 'none' : 'auto',
          }}
          onMouseEnter={e => {
            if (currentPage !== 1) {
              (e.currentTarget as HTMLButtonElement).style.background = '#f5f4f1';
              (e.currentTarget as HTMLButtonElement).style.color = '#1a1a1a';
            }
          }}
          onMouseLeave={e => {
            if (currentPage !== 1) {
              (e.currentTarget as HTMLButtonElement).style.background = 'none';
              (e.currentTarget as HTMLButtonElement).style.color = '#888580';
            }
          }}
        >
          <FiChevronLeft size={14} />
          <span style={{ display: 'none' }}>Précédent</span>
        </button>

        {/* Page numbers */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {pages.map((page, idx) =>
            page === '…' ? (
              <button
                key={`ellipsis-${idx}`}
                type="button"
                disabled
                aria-hidden
                style={{
                  background: 'none',
                  border: '1px solid #e8e6e1',
                  cursor: 'default',
                  padding: '6px 8px',
                  borderRadius: 6,
                  color: '#b0aeaa',
                  fontSize: 12,
                  minWidth: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                …
              </button>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page as number)}
                style={{
                  background: page === currentPage ? '#1a1a1a' : 'none',
                  border: '1px solid #e8e6e1',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 6,
                  color: page === currentPage ? '#fff' : '#888580',
                  fontSize: 12,
                  minWidth: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (page !== currentPage) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#f5f4f1';
                    (e.currentTarget as HTMLButtonElement).style.color = '#1a1a1a';
                  }
                }}
                onMouseLeave={e => {
                  if (page !== currentPage) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'none';
                    (e.currentTarget as HTMLButtonElement).style.color = '#888580';
                  }
                }}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            background: 'none',
            border: '1px solid #e8e6e1',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 6,
            color: '#888580',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 0.15s',
            opacity: currentPage === totalPages ? 0.4 : 1,
            pointerEvents: currentPage === totalPages ? 'none' : 'auto',
          }}
          onMouseEnter={e => {
            if (currentPage !== totalPages) {
              (e.currentTarget as HTMLButtonElement).style.background = '#f5f4f1';
              (e.currentTarget as HTMLButtonElement).style.color = '#1a1a1a';
            }
          }}
          onMouseLeave={e => {
            if (currentPage !== totalPages) {
              (e.currentTarget as HTMLButtonElement).style.background = 'none';
              (e.currentTarget as HTMLButtonElement).style.color = '#888580';
            }
          }}
        >
          <span style={{ display: 'none' }}>Suivant</span>
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
