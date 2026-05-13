'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  FiSearch, FiUser, FiMail, FiMapPin, FiBriefcase,
  FiMoreHorizontal, FiPlus, FiCalendar,
  FiUsers, FiChevronLeft, FiChevronRight,
  FiGithub, FiLinkedin, FiGlobe, FiStar,
} from 'react-icons/fi';
import { ROUTES } from '@/src/constants/routes';

// Mock data pour les utilisateurs
const USERS = [
  {
    id: 1,
    firstName: 'Marie',
    lastName: 'Design',
    email: 'marie.design@exemple.com',
    title: 'UX/UI Designer Lead',
    department: 'Design',
    team: 'Équipe Design UX',
    location: 'Lyon, France',
    avatar: 'MD',
    joinDate: '10 juin 2023',
    status: 'active',
    role: 'Lead Designer',
    projects: 18,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Design Systems'],
    github: 'mariedesign',
    linkedin: 'marie-design',
    website: 'https://mariedesign.dev',
    rating: 4.8,
  },
  {
    id: 2,
    firstName: 'Jean',
    lastName: 'Développeur',
    email: 'jean.dev@exemple.com',
    title: 'Développeur Full Stack Senior',
    department: 'Technologie',
    team: 'Équipe Alpha',
    location: 'Paris, France',
    avatar: 'JD',
    joinDate: '15 janvier 2023',
    status: 'active',
    role: 'Senior Developer',
    projects: 24,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    github: 'jeandev',
    linkedin: 'jean-developpeur',
    website: 'https://jeandev.dev',
    rating: 4.9,
  },
  {
    id: 3,
    firstName: 'Sophie',
    lastName: 'Marketing',
    email: 'sophie.marketing@exemple.com',
    title: 'Responsable Marketing Digital',
    department: 'Marketing',
    team: 'Équipe Marketing Digital',
    location: 'Marseille, France',
    avatar: 'SM',
    joinDate: '3 mars 2023',
    status: 'active',
    role: 'Marketing Manager',
    projects: 12,
    skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
    github: null,
    linkedin: 'sophie-marketing',
    website: null,
    rating: 4.6,
  },
  {
    id: 4,
    firstName: 'Pierre',
    lastName: 'Backend',
    email: 'pierre.backend@exemple.com',
    title: 'Développeur Backend',
    department: 'Technologie',
    team: 'Équipe Alpha',
    location: 'Lille, France',
    avatar: 'PB',
    joinDate: '20 février 2023',
    status: 'active',
    role: 'Backend Developer',
    projects: 15,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    github: 'pierrebackend',
    linkedin: 'pierre-backend',
    website: null,
    rating: 4.7,
  },
  {
    id: 5,
    firstName: 'Claire',
    lastName: 'Product',
    email: 'claire.product@exemple.com',
    title: 'Product Manager',
    department: 'Produit',
    team: 'Équipe Produit',
    location: 'Bordeaux, France',
    avatar: 'CP',
    joinDate: '5 avril 2023',
    status: 'inactive',
    role: 'Product Manager',
    projects: 8,
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    github: null,
    linkedin: 'claire-product',
    website: null,
    rating: 4.5,
  },
  {
    id: 6,
    firstName: 'Thomas',
    lastName: 'Frontend',
    email: 'thomas.frontend@exemple.com',
    title: 'Développeur Frontend',
    department: 'Technologie',
    team: 'Équipe Alpha',
    location: 'Nantes, France',
    avatar: 'TF',
    joinDate: '12 mai 2023',
    status: 'active',
    role: 'Frontend Developer',
    projects: 10,
    skills: ['Vue.js', 'React', 'CSS', 'JavaScript'],
    github: 'thomasfrontend',
    linkedin: 'thomas-frontend',
    website: 'https://thomasfrontend.dev',
    rating: 4.4,
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

export default function SearchUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 9;

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

  const filteredUsers = USERS.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const stats = {
    total: USERS.length,
    active: USERS.filter(u => u.status === 'active').length,
    inactive: USERS.filter(u => u.status === 'inactive').length,
    departments: [...new Set(USERS.map(u => u.department))].length,
  };

  const departments = [...new Set(USERS.map(u => u.department))];
  const roles = [...new Set(USERS.map(u => u.role))];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 1200, padding: '0 16px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #e8e6e1; border-radius: 2px; }
        
        @media (max-width: 1024px) {
          .users-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
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
          .users-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .user-card {
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
              Recherche d'utilisateurs
            </h2>
            <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
              {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{
                background: '#fff', color: '#1a1a1a', border: '1px solid #e8e6e1',
                borderRadius: 8, padding: '8px 16px', fontSize: 12.5,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { 
                (e.currentTarget as HTMLButtonElement).style.background = '#fafaf9'; 
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#d4d2cc';
              }}
              onMouseLeave={e => { 
                (e.currentTarget as HTMLButtonElement).style.background = '#fff'; 
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e8e6e1';
              }}
            >
              <FiMail size={14} />
              Contacter
            </button>
            <button
              style={{
                background: '#1a1a1a', color: '#fff', border: 'none',
                borderRadius: 8, padding: '8px 16px', fontSize: 12.5,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#333'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a1a1a'; }}
            >
              <FiPlus size={14} />
              Inviter
            </button>
          </div>
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
              {stats.departments}
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="filters-flex" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-container" style={{ position: 'relative', flex: 1, minWidth: 250 }}>
            <FiSearch size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#b0aeaa' }} />
            <input
              type="text"
              placeholder="Rechercher par nom, email, titre..."
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

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            style={{
              padding: '8px 12px', border: '1px solid #e8e6e1',
              borderRadius: 8, fontSize: 12.5, color: '#1a1a1a',
              background: '#fff', cursor: 'pointer',
            }}
          >
            <option value="all">Tous les départements</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: '8px 12px', border: '1px solid #e8e6e1',
              borderRadius: 8, fontSize: 12.5, color: '#1a1a1a',
              background: '#fff', cursor: 'pointer',
            }}
          >
            <option value="all">Tous les rôles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Users grid */}
      <div className="users-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16, marginBottom: 24 }}>
        {currentUsers.map((user, i) => {
          const status = statusConfig[user.status];
          const roleColor = roleConfig[user.role] || '#888580';
          
          return (
            <motion.div
              key={user.id}
              {...fadeUp(i + 1)}
              className="user-card"
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
                      {user.avatar}
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 12, height: 12, borderRadius: '50%',
                      background: status.color, border: '2px solid #fff',
                    }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px' }}>
                      {user.firstName} {user.lastName}
                    </h3>
                    <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
                      {user.title}
                    </p>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === user.id ? null : user.id);
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
                  
                  {activeDropdown === user.id && (
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
                          // Marquer l'origine pour le breadcrumb
                          if (typeof window !== 'undefined') {
                            sessionStorage.setItem('searchUsersOrigin', 'true');
                          }
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
                          console.log('Edit user:', user.id);
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
                    {user.role}
                  </span>
                  <span style={{
                    fontSize: 10.5, padding: '2px 6px', borderRadius: 4,
                    background: '#fafaf9', color: '#888580', fontWeight: 400,
                  }}>
                    {user.department}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#888580', margin: '0 0 8px', lineHeight: 1.4 }}>
                  {user.team}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiMail size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{user.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiMapPin size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{user.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiBriefcase size={12} style={{ color: '#b0aeaa' }} />
                  <span style={{ fontSize: 11.5, color: '#888580' }}>{user.projects} projets</span>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {user.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} style={{
                      fontSize: 10, padding: '2px 6px', borderRadius: 4,
                      background: '#f0efeb', color: '#5f5e5a',
                    }}>
                      {skill}
                    </span>
                  ))}
                  {user.skills.length > 3 && (
                    <span style={{
                      fontSize: 10, padding: '2px 6px', borderRadius: 4,
                      background: '#f0efeb', color: '#888580',
                    }}>
                      +{user.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {user.github && (
                  <a href={`https://github.com/${user.github}`} style={{
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
                {user.linkedin && (
                  <a href={`https://linkedin.com/in/${user.linkedin}`} style={{
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
                {user.website && (
                  <a href={user.website} style={{
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
                  <span style={{ fontSize: 11, color: '#888580' }}>{user.joinDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FiStar size={12} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: 11, color: '#888580', fontFamily: "'DM Mono', monospace" }}>
                    {user.rating}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div {...fadeUp(10)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px', border: '1px solid #e8e6e1',
              borderRadius: 8, fontSize: 12.5, color: currentPage === 1 ? '#c8c6c2' : '#1a1a1a',
              background: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <FiChevronLeft size={14} />
            Précédent
          </button>
          
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    padding: '8px 12px', border: '1px solid #e8e6e1',
                    borderRadius: 8, fontSize: 12.5,
                    background: currentPage === pageNum ? '#1a1a1a' : '#fff',
                    color: currentPage === pageNum ? '#fff' : '#1a1a1a',
                    cursor: 'pointer',
                    minWidth: 32,
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px', border: '1px solid #e8e6e1',
              borderRadius: 8, fontSize: 12.5, color: currentPage === totalPages ? '#c8c6c2' : '#1a1a1a',
              background: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            Suivant
            <FiChevronRight size={14} />
          </button>
        </motion.div>
      )}
    </div>
  );
}