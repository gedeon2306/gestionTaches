'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  FiPlus, FiSearch, FiMail, FiPhone, FiMapPin,
  FiMoreHorizontal, FiCalendar, FiBriefcase,
  FiUser, FiGithub, FiLinkedin,
  FiGlobe, FiStar, FiUsers,
} from 'react-icons/fi';
import { ROUTES } from '@/src/constants/routes';
import Breadcrumb, { getTeamsBreadcrumb } from '@/src/components/uxComponents/Breadcrumb';

const TEAM_MEMBERS = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    name: 'Jean Dupont',
    title: 'Développeur Full Stack Senior',
    role: 'Senior Developer',
    email: 'jean.dupont@exemple.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    avatar: 'JD',
    status: 'active',
    department: 'Technologie',
    team: 'Équipe Alpha',
    joinDate: '15 janvier 2023',
    projects: 24,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    github: 'jeandev',
    linkedin: 'jean-developpeur',
    website: 'https://jeandev.dev',
    rating: 4.9,
    performance: 92,
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Robert',
    name: 'Marie Robert',
    title: 'UX/UI Designer Lead',
    role: 'Lead Designer',
    email: 'marie.robert@exemple.com',
    phone: '+33 6 23 45 67 89',
    location: 'Lyon, France',
    avatar: 'MR',
    status: 'active',
    department: 'Design',
    team: 'Équipe Design UX',
    joinDate: '3 mars 2023',
    projects: 18,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Design Systems'],
    github: 'marierobert',
    linkedin: 'marie-robert',
    website: 'https://marierobert.dev',
    rating: 4.8,
    performance: 88,
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Laurent',
    name: 'Alice Laurent',
    title: 'Développeur Frontend',
    role: 'Frontend Developer',
    email: 'alice.laurent@exemple.com',
    phone: '+33 6 34 56 78 90',
    location: 'Marseille, France',
    avatar: 'AL',
    status: 'inactive',
    department: 'Technologie',
    team: 'Équipe Alpha',
    joinDate: '10 juin 2023',
    projects: 10,
    skills: ['Vue.js', 'React', 'CSS', 'JavaScript'],
    github: 'alicelaurent',
    linkedin: 'alice-laurent',
    website: null,
    rating: 4.4,
    performance: 85,
  },
  {
    id: 4,
    firstName: 'Thomas',
    lastName: 'Bernard',
    name: 'Thomas Bernard',
    title: 'Développeur Backend',
    role: 'Backend Developer',
    email: 'thomas.bernard@exemple.com',
    phone: '+33 6 45 67 89 01',
    location: 'Toulouse, France',
    avatar: 'TB',
    status: 'active',
    department: 'Technologie',
    team: 'Équipe Alpha',
    joinDate: '22 août 2023',
    projects: 15,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    github: 'thomasbernard',
    linkedin: 'thomas-bernard',
    website: null,
    rating: 4.7,
    performance: 90,
  },
  {
    id: 5,
    firstName: 'Sophie',
    lastName: 'Martin',
    name: 'Sophie Martin',
    title: 'Product Manager',
    role: 'Product Manager',
    email: 'sophie.martin@exemple.com',
    phone: '+33 6 56 78 90 12',
    location: 'Bordeaux, France',
    avatar: 'SM',
    status: 'active',
    department: 'Produit',
    team: 'Équipe Produit',
    joinDate: '5 février 2023',
    projects: 8,
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    github: null,
    linkedin: 'sophie-martin',
    website: null,
    rating: 4.5,
    performance: 94,
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Actif', color: '#1d9e75' },
  inactive: { label: 'Inactif', color: '#f59e0b' },
  archived: { label: 'Archivé', color: '#6b7280' },
};

const roleConfig: Record<string, string> = {
  'Lead Designer': '#f59e0b',
  'Senior Developer': '#1d9e75',
  'Marketing Manager': '#8b5cf6',
  'Backend Developer': '#3b82f6',
  'Product Manager': '#ec4899',
  'Frontend Developer': '#10b981',
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
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const filteredMembers = TEAM_MEMBERS.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null) {
        const dropdown = dropdownRefs.current[activeDropdown];
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  
  const stats = {
    total: TEAM_MEMBERS.length,
    active: TEAM_MEMBERS.filter(m => m.status === 'active').length,
    inactive: TEAM_MEMBERS.filter(m => m.status === 'inactive').length,
    archived: TEAM_MEMBERS.filter(m => m.status === 'archived').length,
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
        {/* Breadcrumb */}
        <Breadcrumb 
          items={getTeamsBreadcrumb()}
          currentPage="Équipe Design UX"
        />

        <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <h2 className="header-text" style={{ fontSize: 20, fontWeight: 500, color: '#1a1a1a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Équipe
            </h2>
            <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
              {filteredMembers.length} membres trouvés
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
            Inviter un membre
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
              <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>Actifs</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {stats.active}
            </p>
          </div>
          
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 12, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>Inactifs</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {stats.inactive}
            </p>
          </div>
          
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 12, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <FiBriefcase size={14} style={{ color: '#c8c6c2' }} />
              <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>Départements</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {[...new Set(TEAM_MEMBERS.map(m => m.department))].length}
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="filters-flex" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="search-container" style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
            <FiSearch size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#b0aeaa' }} />
            <input
              type="text"
              placeholder="Rechercher un membre..."
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
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
            <option value="archived">Archivés</option>
          </select>
        </div>
      </motion.div>

      {/* Team members grid */}
      <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {filteredMembers.map((member, i) => {
          const status = statusConfig[member.status];
          const roleColor = roleConfig[member.role] || '#888580';
          
          return (
            <motion.div
              key={member.id}
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
                      {member.avatar}
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 12, height: 12, borderRadius: '50%',
                      background: status.color, border: '2px solid #fff',
                    }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px' }}>
                      {member.firstName} {member.lastName}
                    </h3>
                    <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
                      {member.title}
                    </p>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === member.id ? null : member.id);
                    }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#c8c6c2', padding: 4, borderRadius: 4,
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#1a1a1a'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#c8c6c2'; }}>
                    <FiMoreHorizontal size={14} />
                  </button>
                  
                  {activeDropdown === member.id && (
                    <div style={{
                      position: 'absolute', right: 0, top: '100%',
                      background: '#fff', border: '1px solid #e8e6e1',
                      borderRadius: 8, padding: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 10, minWidth: 150,
                    }}>
                      <Link
                        href={`${ROUTES.DASHBOARD.TEAMS}/viewTeam/viewMember/`}
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
                        <FiUser size={12} />
                        Voir le profil
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
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
                        <FiPlus size={12} />
                        Inviter
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 10.5, padding: '2px 6px', borderRadius: 4,
                    background: '#fafaf9', color: roleColor, fontWeight: 400,
                  }}>
                    {member.role}
                  </span>
                  <span style={{
                    fontSize: 10.5, padding: '2px 6px', borderRadius: 4,
                    background: '#fafaf9', color: '#888580', fontWeight: 400,
                  }}>
                    {member.department}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#888580', margin: '0 0 8px', lineHeight: 1.4 }}>
                  {member.team}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiMail size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{member.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiMapPin size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{member.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiBriefcase size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{member.projects} projets</span>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} style={{
                      fontSize: 10, padding: '2px 6px', borderRadius: 4,
                      background: '#f0efeb', color: '#5f5e5a',
                    }}>
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span style={{
                      fontSize: 10, padding: '2px 6px', borderRadius: 4,
                      background: '#f0efeb', color: '#888580',
                    }}>
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {member.github && (
                  <a href={`https://github.com/${member.github}`} style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: '#f5f4f1', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#888580',
                    textDecoration: 'none', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e8e6e1'; (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f5f4f1'; (e.currentTarget as HTMLAnchorElement).style.color = '#888580'; }}>
                    <FiGithub size={12} />
                  </a>
                )}
                {member.linkedin && (
                  <a href={`https://linkedin.com/in/${member.linkedin}`} style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: '#f5f4f1', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#888580',
                    textDecoration: 'none', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e8e6e1'; (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f5f4f1'; (e.currentTarget as HTMLAnchorElement).style.color = '#888580'; }}>
                    <FiLinkedin size={12} />
                  </a>
                )}
                {member.website && (
                  <a href={member.website} style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: '#f5f4f1', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#888580',
                    textDecoration: 'none', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e8e6e1'; (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f5f4f1'; (e.currentTarget as HTMLAnchorElement).style.color = '#888580'; }}>
                    <FiGlobe size={12} />
                  </a>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f0efeb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FiCalendar size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11, color: '#888580' }}>{member.joinDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FiStar size={12} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: 11, color: '#888580', fontFamily: "'DM Mono', monospace" }}>
                    {member.rating}
                  </span>
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
