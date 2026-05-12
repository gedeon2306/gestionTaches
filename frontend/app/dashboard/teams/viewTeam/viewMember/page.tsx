'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiBriefcase, FiAward, FiTrendingUp, FiClock,
  FiCheckCircle, FiStar, FiBook, FiCode, FiUsers,
  FiMessageSquare, FiEdit, FiGithub,
  FiLinkedin, FiTwitter, FiGlobe, FiTarget,
  FiActivity, FiBarChart2, FiZap,
} from 'react-icons/fi';
import { ROUTES } from '@/src/constants/routes';

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

export default function ViewMemberPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock member data
  const member = {
    id: 1,
    firstName: 'Marie',
    lastName: 'Design',
    title: 'UX/UI Designer Lead',
    email: 'marie.design@exemple.com',
    phone: '+33 6 23 45 67 89',
    location: 'Lyon, France',
    avatar: 'MD',
    bio: 'Designer passionnée avec 7 ans d\'expérience dans la création d\'expériences utilisateur exceptionnelles. Spécialisée en design thinking, prototypage et design systems.',
    joinDate: '10 juin 2023',
    status: 'active',
    role: 'Lead Designer',
    department: 'Design',
    team: 'Équipe Design UX',
    projects: 18,
    rating: 4.8,
    github: 'mariedesign',
    linkedin: 'marie-design',
    website: 'https://mariedesign.dev',
  };

  const stats = [
    { label: 'Projets complétés', value: '18', icon: FiCheckCircle, color: '#1d9e75' },
    { label: 'Années d\'expérience', value: '7', icon: FiBriefcase, color: '#1a1a1a' },
    { label: 'Compétences', value: '15', icon: FiCode, color: '#888580' },
    { label: 'Satisfaction', value: '96%', icon: FiStar, color: '#f59e0b' },
  ];

  const skills = [
    { name: 'Figma', level: 95, category: 'Design' },
    { name: 'Adobe XD', level: 88, category: 'Design' },
    { name: 'Sketch', level: 82, category: 'Design' },
    { name: 'Design Systems', level: 90, category: 'Design' },
    { name: 'Prototyping', level: 85, category: 'Design' },
    { name: 'User Research', level: 78, category: 'Research' },
    { name: 'HTML/CSS', level: 70, category: 'Frontend' },
    { name: 'JavaScript', level: 65, category: 'Frontend' },
  ];

  const projects = [
    {
      title: 'Refonte UI Application',
      role: 'Lead Designer',
      period: 'Jan 2024 - Avr 2024',
      status: 'completed',
      description: 'Refonte complète de l\'interface utilisateur de notre application principale',
      team: 'Équipe Design UX',
    },
    {
      title: 'Design System v2.0',
      role: 'UX Designer',
      period: 'Mar 2024 - En cours',
      status: 'active',
      description: 'Création d\'un design system cohérent pour tous nos produits',
      team: 'Équipe Design UX',
    },
    {
      title: 'App Mobile Banking',
      role: 'UI Designer',
      period: 'Fév 2024 - Mai 2024',
      status: 'active',
      description: 'Design de l\'application mobile bancaire',
      team: 'Équipe FinTech',
    },
  ];

  const achievements = [
    { title: 'Best UX Design 2023', organization: 'Design Awards', date: 'Déc 2023' },
    { title: 'Design System Excellence', organization: 'Tech Summit', date: 'Juin 2023' },
    { title: 'User Advocacy Award', organization: 'UX Conference', date: 'Mars 2023' },
  ];

  const activities = [
    { type: 'project', title: 'A complété le projet Refonte UI', date: 'Il y a 2 jours', icon: FiCheckCircle },
    { type: 'skill', title: 'A ajouté la compétence Figma', date: 'Il y a 5 jours', icon: FiZap },
    { type: 'achievement', title: 'A reçu l\'award Best UX Design', date: 'Il y a 1 semaine', icon: FiAward },
    { type: 'project', title: 'A démarré Design System v2.0', date: 'Il y a 2 semaines', icon: FiActivity },
  ];

  const performance = [
    { metric: 'Productivité', value: 92, target: 85 },
    { metric: 'Qualité', value: 96, target: 90 },
    { metric: 'Collaboration', value: 88, target: 80 },
    { metric: 'Innovation', value: 85, target: 75 },
  ];

  return (
    <div className="container" style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 1200, padding: '0 16px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #e8e6e1; border-radius: 2px; }
        
        @media (max-width: 1024px) {
          .member-grid {
            grid-template-columns: 280px 1fr !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .member-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .member-sidebar {
            order: -1 !important;
            margin-bottom: 16px !important;
          }
          .member-main {
            order: 0 !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .skills-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .container {
            padding: 0 12px !important;
          }
          .basic-info-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .tabs {
            flex-wrap: wrap !important;
            gap: 4px !important;
          }
          .performance-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
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
          .member-avatar {
            width: 64px !important;
            height: 64px !important;
            font-size: 20px !important;
          }
          .header-actions {
            flex-direction: column !important;
            gap: 8px !important;
            align-items: flex-start !important;
          }
          .member-card {
            padding: 16px !important;
          }
          .content-card {
            padding: 16px !important;
          }
          .social-links {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
        }
        
        @media (max-width: 360px) {
          .container {
            padding: 0 8px !important;
          }
          .member-avatar {
            width: 56px !important;
            height: 56px !important;
            font-size: 18px !important;
          }
          .header-text {
            font-size: 16px !important;
          }
          .button-text {
            font-size: 10px !important;
            padding: 5px 10px !important;
          }
        }
      `}</style>

      {/* Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Link 
            href={ROUTES.DASHBOARD.ROOT}
            style={{
              color: '#888580', textDecoration: 'none',
              fontSize: 12.5, transition: 'color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#888580'; }}
          >
            Dashboard
          </Link>
          <span style={{ color: '#b0aeaa', fontSize: 12 }}>/</span>
          <Link 
            href={ROUTES.DASHBOARD.TEAMS}
            style={{
              color: '#888580', textDecoration: 'none',
              fontSize: 12.5, transition: 'color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#888580'; }}
          >
            Équipes
          </Link>
          <span style={{ color: '#b0aeaa', fontSize: 12 }}>/</span>
          <Link 
            href={ROUTES.DASHBOARD.VIEWTEAM}
            style={{
              color: '#888580', textDecoration: 'none',
              fontSize: 12.5, transition: 'color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#888580'; }}
          >
            {member.team}
          </Link>
          <span style={{ color: '#b0aeaa', fontSize: 12 }}>/</span>
          <span style={{ color: '#1a1a1a', fontSize: 12.5, fontWeight: 500 }}>
            {member.firstName} {member.lastName}
          </span>
        </nav>

        <div>
          <h2 className="header-text" style={{ fontSize: 20, fontWeight: 500, color: '#1a1a1a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Profil de {member.firstName} {member.lastName}
          </h2>
          <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
            {member.title} • {member.team}
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ display: 'flex', gap: 2, borderBottom: '1px solid #e8e6e1' }}>
          {[
            { id: 'overview', label: 'Aperçu', icon: FiUser },
            { id: 'projects', label: 'Projets', icon: FiBriefcase },
            { id: 'skills', label: 'Compétences', icon: FiCode },
            { id: 'performance', label: 'Performance', icon: FiBarChart2 },
            { id: 'activity', label: 'Activité', icon: FiActivity },
          ].map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px', border: 'none', background: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #1a1a1a' : '2px solid transparent',
                color: activeTab === tab.id ? '#1a1a1a' : '#888580',
                fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s', fontWeight: activeTab === tab.id ? 500 : 400,
              }}
              onMouseEnter={e => { 
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLButtonElement).style.color = '#1a1a1a'; 
                }
              }}
              onMouseLeave={e => { 
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLButtonElement).style.color = '#888580'; 
                }
              }}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="member-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
        {/* Left sidebar */}
        <div className="member-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Profile card */}
          <motion.div {...fadeUp(1)} className="member-card" style={{
            background: '#fff', border: '1px solid #e8e6e1',
            borderRadius: 12, padding: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <div className="member-avatar" style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: '#1a1a1a', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 14, fontWeight: 500, color: '#fff',
                  }}>
                    {member.avatar}
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 12, height: 12, borderRadius: '50%',
                    background: statusConfig[member.status].color, border: '2px solid #fff',
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
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  fontSize: 10.5, padding: '2px 6px', borderRadius: 4,
                  background: '#fafaf9', color: roleConfig[member.role], fontWeight: 400,
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
                background: '#fafaf9', color: statusConfig[member.status].color, fontWeight: 400,
              }}>
                {statusConfig[member.status].label}
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(2)} className="content-card" style={{
            background: '#fff', border: '1px solid #e8e6e1',
            borderRadius: 12, padding: '16px',
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 12px' }}>
              Statistiques
            </h4>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <stat.icon size={16} style={{ color: stat.color, marginBottom: 4 }} />
                  <p style={{ fontSize: 18, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px', fontFamily: "'DM Mono', monospace" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 10, color: '#b0aeaa', margin: 0 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div {...fadeUp(3)} className="content-card" style={{
            background: '#fff', border: '1px solid #e8e6e1',
            borderRadius: 12, padding: '16px',
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 12px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiMail size={14} style={{ color: '#b0aeaa' }} />
                <span style={{ fontSize: 11.5, color: '#888580' }}>{member.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiPhone size={14} style={{ color: '#b0aeaa' }} />
                <span style={{ fontSize: 11.5, color: '#888580' }}>{member.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiMapPin size={14} style={{ color: '#b0aeaa' }} />
                <span style={{ fontSize: 11.5, color: '#888580' }}>{member.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiCalendar size={14} style={{ color: '#b0aeaa' }} />
                <span style={{ fontSize: 11.5, color: '#888580' }}>Rejoint le {member.joinDate}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="member-main" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {activeTab === 'overview' && (
            <>
              {/* Bio */}
              <motion.div {...fadeUp(3)} className="content-card" style={{
                background: '#fff', border: '1px solid #e8e6e1',
                borderRadius: 12, padding: '20px',
              }}>
                <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 12px' }}>
                  Biographie
                </h3>
                <p style={{ fontSize: 12.5, color: '#888580', margin: 0, lineHeight: 1.6 }}>
                  {member.bio}
                </p>
              </motion.div>

              {/* Recent projects */}
              <motion.div {...fadeUp(4)} className="content-card" style={{
                background: '#fff', border: '1px solid #e8e6e1',
                borderRadius: 12, padding: '20px',
              }}>
                <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                  Projets récents
                </h3>
                <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                  {projects.slice(0, 3).map((project, i) => (
                    <div key={i} style={{
                      padding: '12px', border: '1px solid #f0efeb',
                      borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fafaf9'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px' }}>
                          {project.title}
                        </h4>
                        <span style={{
                          fontSize: 10, padding: '2px 6px', borderRadius: 4,
                          background: project.status === 'completed' ? '#f0faf5' : '#fafaf9',
                          color: project.status === 'completed' ? '#0f6e56' : '#5f5e5a',
                          fontWeight: 400,
                        }}>
                          {project.status === 'completed' ? 'Terminé' : 'En cours'}
                        </span>
                      </div>
                      <p style={{ fontSize: 11.5, color: '#888580', margin: '0 0 6px' }}>
                        {project.role}
                      </p>
                      <p style={{ fontSize: 11.5, color: '#888580', margin: '0 0 6px', lineHeight: 1.4 }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FiCalendar size={11} style={{ color: '#b0aeaa' }} />
                        <span style={{ fontSize: 11, color: '#b0aeaa' }}>{project.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div {...fadeUp(5)} className="content-card" style={{
                background: '#fff', border: '1px solid #e8e6e1',
                borderRadius: 12, padding: '20px',
              }}>
                <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                  Réalisations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {achievements.map((achievement, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 6,
                        background: '#f5f4f1', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0,
                      }}>
                        <FiAward size={14} style={{ color: '#f59e0b' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px' }}>
                          {achievement.title}
                        </h4>
                        <p style={{ fontSize: 11.5, color: '#888580', margin: '0 0 2px' }}>
                          {achievement.organization}
                        </p>
                        <p style={{ fontSize: 11, color: '#b0aeaa', margin: 0 }}>
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {activeTab === 'projects' && (
            <motion.div {...fadeUp(3)} className="content-card" style={{
              background: '#fff', border: '1px solid #e8e6e1',
              borderRadius: 12, padding: '20px',
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                Tous les projets
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {projects.map((project, i) => (
                  <div key={i} style={{
                    padding: '16px', border: '1px solid #f0efeb',
                    borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fafaf9'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 4px' }}>
                          {project.title}
                        </h4>
                        <p style={{ fontSize: 12, color: '#888580', margin: '0 0 4px' }}>
                          {project.role} • {project.team}
                        </p>
                      </div>
                      <span style={{
                        fontSize: 10, padding: '2px 6px', borderRadius: 4,
                        background: project.status === 'completed' ? '#f0faf5' : '#fafaf9',
                        color: project.status === 'completed' ? '#0f6e56' : '#5f5e5a',
                        fontWeight: 400,
                      }}>
                        {project.status === 'completed' ? 'Terminé' : 'En cours'}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#888580', margin: '0 0 8px', lineHeight: 1.5 }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FiCalendar size={12} style={{ color: '#b0aeaa' }} />
                      <span style={{ fontSize: 11.5, color: '#b0aeaa' }}>{project.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div {...fadeUp(3)} className="content-card" style={{
              background: '#fff', border: '1px solid #e8e6e1',
              borderRadius: 12, padding: '20px',
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                Compétences techniques
              </h3>
              <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a' }}>
                          {skill.name}
                        </span>
                        <span style={{ fontSize: 10.5, color: '#b0aeaa', marginLeft: 6 }}>
                          {skill.category}
                        </span>
                      </div>
                      <span style={{ fontSize: 11.5, color: '#1a1a1a', fontFamily: "'DM Mono', monospace" }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{ height: 4, background: '#f0efeb', borderRadius: 2 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: '100%', background: '#1a1a1a', borderRadius: 2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <>
              <motion.div {...fadeUp(3)} className="content-card" style={{
                background: '#fff', border: '1px solid #e8e6e1',
                borderRadius: 12, padding: '20px',
              }}>
                <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                  Indicateurs de performance
                </h3>
                <div className="performance-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {performance.map((item, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a' }}>
                          {item.metric}
                        </span>
                        <span style={{ fontSize: 11.5, color: '#1a1a1a', fontFamily: "'DM Mono', monospace" }}>
                          {item.value}%
                        </span>
                      </div>
                      <div style={{ height: 6, background: '#f0efeb', borderRadius: 3, marginBottom: 4 }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          style={{ 
                            height: '100%', 
                            background: item.value >= item.target ? '#1d9e75' : '#f59e0b', 
                            borderRadius: 3 
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 10, color: '#b0aeaa' }}>Objectif: {item.target}%</span>
                        <span style={{ 
                          fontSize: 10, 
                          color: item.value >= item.target ? '#1d9e75' : '#f59e0b',
                          fontWeight: 500,
                        }}>
                          {item.value >= item.target ? '✓ Atteint' : 'En progression'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(4)} className="content-card" style={{
                background: '#fff', border: '1px solid #e8e6e1',
                borderRadius: 12, padding: '20px',
              }}>
                <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                  Objectifs trimestriels
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { title: 'Compléter la certification UX Design', progress: 75, due: '30 Juin' },
                    { title: 'Former 2 juniors en design systems', progress: 40, due: '15 Juillet' },
                    { title: 'Lancer le nouveau design system', progress: 90, due: '30 Juin' },
                  ].map((goal, i) => (
                    <div key={i} style={{ padding: '12px', border: '1px solid #f0efeb', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <h4 style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>
                          {goal.title}
                        </h4>
                        <span style={{ fontSize: 11, color: '#b0aeaa' }}>
                          <FiTarget size={10} style={{ marginRight: 4 }} />
                          {goal.due}
                        </span>
                      </div>
                      <div style={{ height: 4, background: '#f0efeb', borderRadius: 2 }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          style={{ height: '100%', background: '#1d9e75', borderRadius: 2 }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: '#b0aeaa' }}>Progression</span>
                        <span style={{ fontSize: 10, color: '#1d9e75', fontFamily: "'DM Mono', monospace" }}>
                          {goal.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {activeTab === 'activity' && (
            <motion.div {...fadeUp(3)} className="content-card" style={{
              background: '#fff', border: '1px solid #e8e6e1',
              borderRadius: 12, padding: '20px',
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                Activité récente
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {activities.map((activity, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 6,
                      background: activity.type === 'project' ? '#f0faf5' : 
                                 activity.type === 'skill' ? '#fafaf9' : '#fef7e0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <activity.icon size={14} style={{ 
                        color: activity.type === 'project' ? '#0f6e56' : 
                               activity.type === 'skill' ? '#5f5e5a' : '#f59e0b'
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12.5, color: '#1a1a1a', margin: '0 0 2px' }}>
                        {activity.title}
                      </p>
                      <p style={{ fontSize: 11, color: '#b0aeaa', margin: 0 }}>
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}