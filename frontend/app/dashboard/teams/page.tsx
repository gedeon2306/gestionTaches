'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  FiPlus, FiSearch, FiUsers, FiCalendar, FiBriefcase,
  FiMoreHorizontal, FiEdit, FiTrash2, FiEye,
} from 'react-icons/fi';
import { ROUTES } from '@/src/constants/routes';

const TEAMS = [
  {
    id: 1,
    name: 'Équipe Alpha',
    description: 'Développement de notre application mobile',
    membersCount: 4,
    projectsCount: 3,
    leader: 'Vous',
    creationDate: '15 janvier 2023',
    status: 'active',
    department: 'Technologie',
    projects: ['App iOS', 'App Android', 'Dashboard'],
    isOwner: true,
  },
  {
    id: 2,
    name: 'Équipe Marketing Digital',
    description: 'Campagnes marketing et réseaux sociaux',
    membersCount: 2,
    projectsCount: 2,
    leader: 'Vous',
    creationDate: '3 mars 2023',
    status: 'active',
    department: 'Marketing',
    projects: ['Site web', 'Réseaux sociaux'],
    isOwner: true,
  },
  {
    id: 3,
    name: 'Équipe Design UX',
    description: 'Design interface et expérience utilisateur',
    membersCount: 3,
    projectsCount: 1,
    leader: 'Marie Design',
    creationDate: '10 juin 2023',
    status: 'active',
    department: 'Design',
    projects: ['Refonte UI'],
    isOwner: false,
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: '#1d9e75' },
  inactive: { label: 'Inactive', color: '#f59e0b' },
  archived: { label: 'Archivée', color: '#6b7280' },
};

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' } as const,
});

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [activeDropdown]);

  const filteredTeams = TEAMS.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.leader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  
  const stats = {
    total: TEAMS.length,
    active: TEAMS.filter(t => t.status === 'active').length,
    inactive: TEAMS.filter(t => t.status === 'inactive').length,
    archived: TEAMS.filter(t => t.status === 'archived').length,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 1200, padding: '0 16px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #e8e6e1; border-radius: 2px; }
        
        @media (max-width: 768px) {
          .header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .filters-flex {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .search-container {
            max-width: 100% !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .team-card {
            padding: 16px !important;
          }
          .container {
            padding: 0 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .header-text {
            font-size: 18px !important;
          }
          .button-text {
            font-size: 11px !important;
            padding: 6px 12px !important;
          }
        }
      `}</style>

      {/* Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
        <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <h2 className="header-text" style={{ fontSize: 20, fontWeight: 500, color: '#1a1a1a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Équipe
            </h2>
            <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
              {filteredTeams.length} équipe{filteredTeams.length > 1 ? 's' : ''}
            </p>
          </div>
          <button className="button-text" style={{
            background: '#1a1a1a', color: '#fff', border: 'none',
            borderRadius: 8, padding: '8px 16px', fontSize: 12.5,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#333'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a1a1a'; }}>
            <FiPlus size={14} />
            Nouvelle équipe
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 12, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <FiUsers size={14} style={{ color: '#c8c6c2' }} />
              <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>Total</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {stats.total}
            </p>
          </div>
          
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 12, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1d9e75' }} />
              <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>Actives</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {stats.active}
            </p>
          </div>
          
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 12, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>Inactives</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {stats.inactive}
            </p>
          </div>
          
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 12, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6b7280' }} />
              <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>Archivées</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {stats.archived}
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="filters-flex" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="search-container" style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
            <FiSearch size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#b0aeaa' }} />
            <input
              type="text"
              placeholder="Rechercher vos équipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '8px 12px 8px 36px',
                border: '1px solid #e8e6e1', borderRadius: 8,
                fontSize: 12.5, color: '#1a1a1a',
                background: '#fff',
                outline: 'none',
              }}
            />
          </div>
          

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px', border: '1px solid #e8e6e1',
              borderRadius: 8, fontSize: 12.5, color: '#1a1a1a',
              background: '#fff', cursor: 'pointer',
            }}
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actives</option>
            <option value="inactive">Inactives</option>
            <option value="archived">Archivées</option>
          </select>

          <select
            value="all"
            onChange={() => {}}
            style={{
              padding: '8px 12px', border: '1px solid #e8e6e1',
              borderRadius: 8, fontSize: 12.5, color: '#1a1a1a',
              background: '#fff', cursor: 'pointer',
            }}
          >
            <option value="all">Mes équipes</option>
            <option value="owned">Créées par moi</option>
            <option value="member">Membre</option>
          </select>
        </div>
      </motion.div>

      {/* Teams grid */}
      <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {filteredTeams.map((team, i) => {
          const status = statusConfig[team.status];
          return (
            <motion.div
              key={team.id}
              {...fadeUp(i + 1)}
              className="team-card"
              style={{
                background: '#fff', border: '1px solid #e8e6e1',
                borderRadius: 12, padding: '20px',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fafaf9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: '#1a1a1a', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 14, fontWeight: 500, color: '#fff',
                    }}>
                      <FiUsers size={20} />
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 12, height: 12, borderRadius: '50%',
                      background: status.color, border: '2px solid #fff',
                    }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px' }}>
                      {team.name}
                    </h3>
                    <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
                      {team.department}
                    </p>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === team.id ? null : team.id);
                    }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#c8c6c2', padding: 4, borderRadius: 4,
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#1a1a1a'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#c8c6c2'; }}
                  >
                    <FiMoreHorizontal size={14} />
                  </button>
                  
                  {activeDropdown === team.id && (
                    <div style={{
                      position: 'absolute', right: 0, top: '100%',
                      background: '#fff', border: '1px solid #e8e6e1',
                      borderRadius: 8, padding: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 10, minWidth: 150,
                    }}>
                      <Link
                        href={ROUTES.DASHBOARD.VIEWTEAM}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(null);
                        }}
                        style={{
                          width: '100%', padding: '8px 12px', border: 'none',
                          background: 'none', textAlign: 'left', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: 12.5, color: '#1a1a1a',
                          borderRadius: 4, textDecoration: 'none',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f5f4f1'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'none'; }}
                      >
                        <FiEye size={12} />
                        Voir l'équipe
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement edit functionality
                          console.log('Edit team:', team.id);
                        }}
                        style={{
                          width: '100%', padding: '8px 12px', border: 'none',
                          background: 'none', textAlign: 'left', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: 12.5, color: '#1a1a1a',
                          borderRadius: 4,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f5f4f1'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
                      >
                        <FiEdit size={12} />
                        Modifier
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement delete functionality
                          console.log('Delete team:', team.id);
                        }}
                        style={{
                          width: '100%', padding: '8px 12px', border: 'none',
                          background: 'none', textAlign: 'left', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: 12.5, color: '#dc2626',
                          borderRadius: 4,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fef2f2'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
                      >
                        <FiTrash2 size={12} />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#888580', margin: '0 0 8px', lineHeight: 1.4 }}>
                  {team.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiUsers size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{team.membersCount} membres</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiBriefcase size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{team.projectsCount} projets</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiUsers size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>Responsable: {team.leader}</span>
                </div>
              </div>


              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f0efeb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FiCalendar size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11, color: '#888580' }}>{team.creationDate}</span>
                </div>
                <span style={{
                  fontSize: 10.5, padding: '2px 6px', borderRadius: 4,
                  background: '#fafaf9', color: status.color, fontWeight: 400,
                }}>
                  {status.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
