'use client';

import Link from 'next/link';
import { ROUTES } from '@/src/constants/routes';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export default function Breadcrumb({ items, currentPage }: BreadcrumbProps) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      {items.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: '#888580', textDecoration: 'none',
                fontSize: 12.5, transition: 'color 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#888580'; }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: '#1a1a1a', fontSize: 12.5, fontWeight: 500 }}>
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span style={{ color: '#b0aeaa', fontSize: 12 }}>/</span>
          )}
        </div>
      ))}
      <span style={{ color: '#b0aeaa', fontSize: 12 }}>/</span>
      <span style={{ color: '#1a1a1a', fontSize: 12.5, fontWeight: 500 }}>
        {currentPage}
      </span>
    </nav>
  );
}

// Helper function pour générer les breadcrumbs selon le contexte
export const getBreadcrumb = (originPage?: string | null, teamName?: string ): BreadcrumbItem[] => {
  if(originPage === "Projets") {
    return [
      { label: originPage, href: ROUTES.DASHBOARD.PROJECTS }
    ];
  } else if(originPage === "Équipes") {
    return [
      { label: originPage, href: ROUTES.DASHBOARD.TEAMS }
    ];
  } else if(originPage === "Recherche") {
    return [
      { label: originPage, href: ROUTES.DASHBOARD.SEARCH_USERS }
    ];
  }
  return [
    { label: 'Équipes', href: ROUTES.DASHBOARD.TEAMS },
    ...(teamName ? [{ label: teamName, href: ROUTES.DASHBOARD.VIEWTEAM } as BreadcrumbItem] : []),
  ];
};
