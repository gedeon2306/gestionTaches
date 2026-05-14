'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FiUser, FiPhone, FiMapPin, FiCalendar,
  FiBriefcase, FiEdit2, FiCamera, FiGithub, FiLinkedin,
  FiTwitter, FiGlobe, FiAward, FiCheckCircle, FiStar, FiCode,
  FiActivity, FiBarChart2, FiZap, FiTarget, FiPlus, FiTrash2, FiX,
} from 'react-icons/fi';

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' } as const,
});

const statusConfig: Record<string, { label: string; color: string }> = {
  active:   { label: 'Actif',    color: '#1d9e75' },
  inactive: { label: 'Inactif',  color: '#f59e0b' },
  archived: { label: 'Archivé', color: '#6b7280' },
};

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: 'Jean',
    lastName:  'Dupont',
    title:     'Lead Full-Stack Developer',
    phone:     '+33 6 12 34 56 78',
    location:  'Paris, France',
    bio:       "Développeur passionné avec 5 ans d'expérience dans la création d'applications web modernes. Spécialisé en React, Node.js et les architectures cloud.",
    website:   'https://jeandupont.dev',
    github:    'jeandupont',
    linkedin:  'jean-dupont',
    twitter:   '@jeandupont',
  });

  const [draft, setDraft] = useState({ ...formData });

  const stats = [
    { label: 'Projets complétés',   value: '24',  icon: FiCheckCircle, color: '#1d9e75' },
    { label: "Années d'expérience", value: '5',   icon: FiBriefcase,   color: '#1a1a1a' },
    { label: 'Technologies',        value: '12',  icon: FiCode,        color: '#888580' },
    { label: 'Satisfaction client', value: '98%', icon: FiStar,        color: '#f59e0b' },
  ];

  const [skills, setSkills] = useState([
    { id: 1, name: 'React',      level: 90, category: 'Frontend'  },
    { id: 2, name: 'TypeScript', level: 85, category: 'Language'  },
    { id: 3, name: 'Node.js',    level: 88, category: 'Backend'   },
    { id: 4, name: 'Python',     level: 75, category: 'Backend'   },
    { id: 5, name: 'PostgreSQL', level: 80, category: 'Database'  },
    { id: 6, name: 'Docker',     level: 70, category: 'DevOps'    },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: 'Site vitrine', role: 'Lead Developer',    period: 'Jan 2024 - Mai 2024',  status: 'completed', description: 'Refonte complète du site corporate avec React et Next.js' },
    { id: 2, title: 'API v2',       role: 'Backend Developer', period: 'Mar 2024 - En cours',  status: 'active',    description: "Nouvelle version de l'API REST avec Node.js et PostgreSQL" },
    { id: 3, title: 'App mobile',   role: 'Full-Stack Developer', period: 'Fév 2024 - En cours', status: 'active', description: "Application iOS/Android de gestion de projet" },
  ]);

  const achievements = [
    { title: 'Developer of the Year 2023', organization: 'Tech Awards',  date: 'Déc 2023' },
    { title: 'Best React Project',         organization: 'React Summit',  date: 'Juin 2023' },
    { title: 'Open Source Contributor',    organization: 'GitHub',        date: 'Mars 2023' },
  ];

  const activities = [
    { type: 'project',     title: 'A complété le projet Site vitrine',   date: 'Il y a 2 jours',    icon: FiCheckCircle },
    { type: 'skill',       title: 'A mis à jour la compétence Docker',    date: 'Il y a 5 jours',    icon: FiZap         },
    { type: 'achievement', title: 'A reçu Developer of the Year 2023',   date: 'Il y a 1 semaine',  icon: FiAward       },
    { type: 'project',     title: 'A démarré le projet API v2',           date: 'Il y a 2 semaines', icon: FiActivity    },
  ];

  const performance = [
    { metric: 'Productivité',  value: 90, target: 85 },
    { metric: 'Qualité',       value: 94, target: 90 },
    { metric: 'Collaboration', value: 85, target: 80 },
    { metric: 'Innovation',    value: 80, target: 75 },
  ];

  const goals = [
    { title: 'Certification AWS Solutions Architect', progress: 60, due: '30 Juin'    },
    { title: 'Contribuer à 3 projets open source',   progress: 33, due: '31 Juillet'  },
    { title: 'Migrer infra vers Kubernetes',          progress: 80, due: '30 Juin'    },
  ];

  /* ── helpers ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDraft({ ...draft, [e.target.name]: e.target.value });

  const handleSave = () => { setFormData({ ...draft }); setIsEditing(false); };
  const handleCancel = () => { setDraft({ ...formData }); setIsEditing(false); };

  const inputStyle = (editing: boolean): React.CSSProperties => ({
    width: '100%', padding: '8px 10px',
    border: `1px solid ${editing ? '#d0cec9' : 'transparent'}`,
    borderRadius: 6, fontSize: 12.5, color: '#1a1a1a',
    background: editing ? '#fff' : 'transparent',
    outline: 'none', transition: 'all .15s',
    fontFamily: "'DM Sans', sans-serif",
  });

  const textareaStyle = (editing: boolean): React.CSSProperties => ({
    ...inputStyle(editing),
    resize: 'vertical' as const,
    lineHeight: 1.6,
  });

  /* ── shared card style ── */
  const card: React.CSSProperties = {
    background: '#fff', border: '1px solid #e8e6e1',
    borderRadius: 12, padding: '20px',
  };

  const TABS = [
    { id: 'overview',     label: 'Aperçu',       icon: FiUser       },
    { id: 'projects',     label: 'Projets',      icon: FiBriefcase  },
    { id: 'skills',       label: 'Compétences',  icon: FiCode       },
    { id: 'performance',  label: 'Performance',  icon: FiBarChart2  },
    { id: 'activity',     label: 'Activité',     icon: FiActivity   },
  ];

  return (
    <div className="container" style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 1100, padding: '0 16px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #e8e6e1; border-radius: 2px; }

        .profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: 24px; }
        .tabs { display: flex; gap: 2px; border-bottom: 1px solid #e8e6e1; margin-top: 20px; }
        .skills-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .perf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @media (max-width: 900px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .skills-grid-2, .perf-grid { grid-template-columns: 1fr !important; }
          .tabs { flex-wrap: wrap; }
        }

        input:focus, textarea:focus { border-color: #1a1a1a !important; box-shadow: 0 0 0 2px rgba(26,26,26,.06); }
      `}</style>

      {/* ── Header ── */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 500, color: '#1a1a1a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Mon profil
            </h2>
            <p style={{ fontSize: 12.5, color: '#888580', margin: 0 }}>
              {formData.title}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {isEditing ? (
              <>
                <button onClick={handleCancel} style={{
                  background: '#f5f4f1', color: '#5f5e5a', border: '1px solid #e8e6e1',
                  borderRadius: 8, padding: '8px 14px', fontSize: 12.5, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <FiX size={13} /> Annuler
                </button>
                <button onClick={handleSave} style={{
                  background: '#1d9e75', color: '#fff', border: 'none',
                  borderRadius: 8, padding: '8px 16px', fontSize: 12.5, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <FiCheckCircle size={13} /> Enregistrer
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} style={{
                background: '#1a1a1a', color: '#fff', border: 'none',
                borderRadius: 8, padding: '8px 16px', fontSize: 12.5, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <FiEdit2 size={13} /> Modifier le profil
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '10px 16px', border: 'none', background: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #1a1a1a' : '2px solid transparent',
              color: activeTab === tab.id ? '#1a1a1a' : '#888580',
              fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              fontWeight: activeTab === tab.id ? 500 : 400, transition: 'all .15s',
            }}>
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Grid ── */}
      <div className="profile-grid">

        {/* ═══ LEFT SIDEBAR ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Profile card */}
          <motion.div {...fadeUp(1)} style={card}>
            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: '#1a1a1a', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 22, fontWeight: 500, color: '#fff',
                  margin: '0 auto',
                }}>
                  {draft.firstName[0]}{draft.lastName[0]}
                </div>
                {isEditing && (
                  <button style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#1a1a1a', border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff',
                  }}>
                    <FiCamera size={10} />
                  </button>
                )}
              </div>

              {/* Status badge */}
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
                <span style={{
                  fontSize: 10.5, padding: '2px 8px', borderRadius: 20,
                  background: '#f0faf5', color: '#0f6e56', fontWeight: 400,
                }}>
                  ● {statusConfig.active.label}
                </span>
              </div>
            </div>

            {/* Editable name + title */}
            <div style={{ marginBottom: 14 }}>
              {isEditing ? (
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input name="firstName" value={draft.firstName} onChange={handleChange}
                    style={{ ...inputStyle(true), fontWeight: 500 }} placeholder="Prénom" />
                  <input name="lastName" value={draft.lastName} onChange={handleChange}
                    style={{ ...inputStyle(true), fontWeight: 500 }} placeholder="Nom" />
                </div>
              ) : (
                <p style={{ textAlign: 'center', fontSize: 15, fontWeight: 500, color: '#1a1a1a', margin: '0 0 4px' }}>
                  {formData.firstName} {formData.lastName}
                </p>
              )}
              <input name="title" value={isEditing ? draft.title : formData.title}
                onChange={handleChange} disabled={!isEditing}
                style={{ ...inputStyle(isEditing), textAlign: isEditing ? 'left' : 'center', fontSize: 12, color: '#888580' }} />
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {[
                { icon: FiPhone,  name: 'phone',    placeholder: 'Téléphone' },
                { icon: FiMapPin, name: 'location', placeholder: 'Localisation' },
              ].map(({ icon: Icon, name, placeholder }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={13} style={{ color: '#b0aeaa', flexShrink: 0 }} />
                  <input
                    name={name}
                    value={isEditing ? (draft as any)[name] : (formData as any)[name]}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder={placeholder}
                    style={{ ...inputStyle(isEditing), padding: isEditing ? '6px 8px' : '0', fontSize: 12, color: '#888580' }}
                  />
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ borderTop: '1px solid #f0efeb', paddingTop: 14 }}>
              <p style={{ fontSize: 11, color: '#b0aeaa', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Réseaux
              </p>
              {[
                { icon: FiGithub,   name: 'github',   label: 'GitHub',   prefix: 'github.com/' },
                { icon: FiLinkedin, name: 'linkedin', label: 'LinkedIn', prefix: 'in/'          },
                { icon: FiTwitter,  name: 'twitter',  label: 'Twitter',  prefix: ''             },
                { icon: FiGlobe,    name: 'website',  label: 'Site web', prefix: ''             },
              ].map(({ icon: Icon, name, label, prefix }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Icon size={13} style={{ color: '#b0aeaa', flexShrink: 0 }} />
                  {isEditing ? (
                    <input name={name} value={(draft as any)[name]} onChange={handleChange}
                      placeholder={label}
                      style={{ ...inputStyle(true), padding: '5px 8px', fontSize: 12 }} />
                  ) : (
                    <span style={{ fontSize: 12, color: '#888580' }}>
                      {(formData as any)[name] || <span style={{ color: '#c8c6c0' }}>—</span>}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(2)} style={card}>
            <p style={{ fontSize: 11, color: '#b0aeaa', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Statistiques
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '10px 0' }}>
                  <s.icon size={15} style={{ color: s.color, marginBottom: 4 }} />
                  <p style={{ fontSize: 20, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px', fontFamily: "'DM Mono', monospace" }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 10, color: '#b0aeaa', margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Join date */}
          <motion.div {...fadeUp(3)} style={{ ...card, padding: '14px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiCalendar size={13} style={{ color: '#b0aeaa' }} />
              <span style={{ fontSize: 12, color: '#888580' }}>Membre depuis <strong style={{ color: '#1a1a1a', fontWeight: 500 }}>10 juin 2023</strong></span>
            </div>
          </motion.div>
        </div>

        {/* ═══ MAIN CONTENT ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Overview ── */}
          {activeTab === 'overview' && (
            <>
              {/* Bio */}
              <motion.div {...fadeUp(3)} style={card}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 12px' }}>
                  Biographie
                </h3>
                <textarea name="bio" value={isEditing ? draft.bio : formData.bio}
                  onChange={handleChange} rows={4} disabled={!isEditing}
                  style={textareaStyle(isEditing)}
                />
              </motion.div>

              {/* Recent projects (preview) */}
              <motion.div {...fadeUp(4)} style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>Projets récents</h3>
                  <button onClick={() => setActiveTab('projects')} style={{
                    background: 'none', border: 'none', color: '#888580', fontSize: 11.5,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                  }}>Voir tout →</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {projects.slice(0, 3).map((p, i) => (
                    <ProjectCard key={p.id} project={p} editing={false} />
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div {...fadeUp(5)} style={card}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 14px' }}>Réalisations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {achievements.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, background: '#fef7e0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <FiAward size={14} style={{ color: '#f59e0b' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px' }}>{a.title}</p>
                        <p style={{ fontSize: 11.5, color: '#888580', margin: '0 0 1px' }}>{a.organization}</p>
                        <p style={{ fontSize: 11, color: '#b0aeaa', margin: 0 }}>{a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* ── Projects ── */}
          {activeTab === 'projects' && (
            <motion.div {...fadeUp(3)} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>Mes projets</h3>
                {isEditing && (
                  <button onClick={() => setProjects([...projects, {
                    id: Date.now(), title: 'Nouveau projet', role: 'Développeur',
                    period: '2024 - En cours', status: 'active', description: '',
                  }])} style={{
                    background: '#f0faf5', color: '#0f6e56', border: '1px solid #d0efe3',
                    borderRadius: 6, padding: '5px 12px', fontSize: 11.5, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <FiPlus size={12} /> Ajouter
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {projects.map(p => (
                  <ProjectCard key={p.id} project={p} editing={isEditing}
                    onChange={(field, val) => setProjects(projects.map(x => x.id === p.id ? { ...x, [field]: val } : x))}
                    onDelete={() => setProjects(projects.filter(x => x.id !== p.id))}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Skills ── */}
          {activeTab === 'skills' && (
            <motion.div {...fadeUp(3)} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>Compétences</h3>
                {isEditing && (
                  <button onClick={() => setSkills([...skills, {
                    id: Date.now(), name: 'Nouvelle compétence', level: 50, category: 'Other',
                  }])} style={{
                    background: '#f0faf5', color: '#0f6e56', border: '1px solid #d0efe3',
                    borderRadius: 6, padding: '5px 12px', fontSize: 11.5, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <FiPlus size={12} /> Ajouter
                  </button>
                )}
              </div>
              <div className="skills-grid-2">
                {skills.map((skill, i) => (
                  <div key={skill.id}>
                    {isEditing ? (
                      <div style={{ marginBottom: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                        <input value={skill.name} onChange={e => setSkills(skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s))}
                          style={{ ...inputStyle(true), padding: '5px 8px', fontSize: 12, flex: 1 }} />
                        <input value={skill.category} onChange={e => setSkills(skills.map(s => s.id === skill.id ? { ...s, category: e.target.value } : s))}
                          style={{ ...inputStyle(true), padding: '5px 8px', fontSize: 11, width: 80 }} placeholder="Catégorie" />
                        <button onClick={() => setSkills(skills.filter(s => s.id !== skill.id))}
                          style={{ background: 'none', border: 'none', color: '#d04040', cursor: 'pointer', padding: 2 }}>
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <div>
                          <span style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a' }}>{skill.name}</span>
                          <span style={{ fontSize: 10.5, color: '#b0aeaa', marginLeft: 6 }}>{skill.category}</span>
                        </div>
                        <span style={{ fontSize: 11.5, color: '#1a1a1a', fontFamily: "'DM Mono', monospace" }}>{skill.level}%</span>
                      </div>
                    )}
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="range" min={0} max={100} value={skill.level}
                          onChange={e => setSkills(skills.map(s => s.id === skill.id ? { ...s, level: +e.target.value } : s))}
                          style={{ flex: 1, accentColor: '#1a1a1a' }} />
                        <span style={{ fontSize: 11, color: '#888580', fontFamily: "'DM Mono', monospace", minWidth: 30 }}>{skill.level}%</span>
                      </div>
                    ) : (
                      <div style={{ height: 4, background: '#f0efeb', borderRadius: 2 }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }}
                          transition={{ delay: .3 + i * .07, duration: .5, ease: [.22,1,.36,1] }}
                          style={{ height: '100%', background: '#1a1a1a', borderRadius: 2 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Performance ── */}
          {activeTab === 'performance' && (
            <>
              <motion.div {...fadeUp(3)} style={card}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>
                  Indicateurs de performance
                </h3>
                <div className="perf-grid">
                  {performance.map((item, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a' }}>{item.metric}</span>
                        <span style={{ fontSize: 11.5, fontFamily: "'DM Mono', monospace", color: '#1a1a1a' }}>{item.value}%</span>
                      </div>
                      <div style={{ height: 6, background: '#f0efeb', borderRadius: 3, marginBottom: 4 }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }}
                          transition={{ delay: .3 + i * .1, duration: .5, ease: [.22,1,.36,1] }}
                          style={{ height: '100%', background: item.value >= item.target ? '#1d9e75' : '#f59e0b', borderRadius: 3 }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 10, color: '#b0aeaa' }}>Objectif : {item.target}%</span>
                        <span style={{ fontSize: 10, fontWeight: 500, color: item.value >= item.target ? '#1d9e75' : '#f59e0b' }}>
                          {item.value >= item.target ? '✓ Atteint' : 'En progression'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(4)} style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>Objectifs trimestriels</h3>
                  {isEditing && (
                    <button style={{
                      background: '#f0faf5', color: '#0f6e56', border: '1px solid #d0efe3',
                      borderRadius: 6, padding: '5px 12px', fontSize: 11.5, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <FiPlus size={12} /> Ajouter
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {goals.map((goal, i) => (
                    <div key={i} style={{ padding: '12px', border: '1px solid #f0efeb', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <h4 style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>{goal.title}</h4>
                        <span style={{ fontSize: 11, color: '#b0aeaa', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <FiTarget size={10} /> {goal.due}
                        </span>
                      </div>
                      <div style={{ height: 4, background: '#f0efeb', borderRadius: 2, marginBottom: 4 }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${goal.progress}%` }}
                          transition={{ delay: .3 + i * .1, duration: .5, ease: [.22,1,.36,1] }}
                          style={{ height: '100%', background: '#1d9e75', borderRadius: 2 }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 10, color: '#b0aeaa' }}>Progression</span>
                        <span style={{ fontSize: 10, color: '#1d9e75', fontFamily: "'DM Mono', monospace" }}>{goal.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* ── Activity ── */}
          {activeTab === 'activity' && (
            <motion.div {...fadeUp(3)} style={card}>
              <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 16px' }}>Activité récente</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {activities.map((act, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: act.type === 'project' ? '#f0faf5' : act.type === 'skill' ? '#f5f4f1' : '#fef7e0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <act.icon size={14} style={{
                        color: act.type === 'project' ? '#0f6e56' : act.type === 'skill' ? '#5f5e5a' : '#f59e0b'
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12.5, color: '#1a1a1a', margin: '0 0 2px' }}>{act.title}</p>
                      <p style={{ fontSize: 11, color: '#b0aeaa', margin: 0 }}>{act.date}</p>
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

/* ── ProjectCard sub-component ── */
function ProjectCard({
  project, editing = false, onChange, onDelete,
}: {
  project: any;
  editing?: boolean;
  onChange?: (field: string, val: string) => void;
  onDelete?: () => void;
}) {
  const inputSt: React.CSSProperties = {
    width: '100%', padding: '5px 8px',
    border: '1px solid #d0cec9', borderRadius: 5,
    fontSize: 12, color: '#1a1a1a', background: '#fff', outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
  };

  if (editing) {
    return (
      <div style={{ padding: '12px', border: '1px solid #e8e6e1', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input value={project.title} onChange={e => onChange?.('title', e.target.value)}
            style={{ ...inputSt, flex: 1, fontWeight: 500 }} placeholder="Titre" />
          <select value={project.status} onChange={e => onChange?.('status', e.target.value)}
            style={{ ...inputSt, width: 110 }}>
            <option value="active">En cours</option>
            <option value="completed">Terminé</option>
          </select>
          <button onClick={onDelete} style={{ background: 'none', border: 'none', color: '#d04040', cursor: 'pointer', padding: 2 }}>
            <FiTrash2 size={13} />
          </button>
        </div>
        <input value={project.role} onChange={e => onChange?.('role', e.target.value)}
          style={inputSt} placeholder="Rôle" />
        <input value={project.period} onChange={e => onChange?.('period', e.target.value)}
          style={inputSt} placeholder="Période" />
        <textarea value={project.description} onChange={e => onChange?.('description', e.target.value)}
          rows={2} style={{ ...inputSt, resize: 'vertical' }} placeholder="Description" />
      </div>
    );
  }

  return (
    <div style={{ padding: '12px 14px', border: '1px solid #f0efeb', borderRadius: 8, transition: 'background .15s', cursor: 'default' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fafaf9'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px' }}>{project.title}</h4>
          <p style={{ fontSize: 11.5, color: '#888580', margin: 0 }}>{project.role}</p>
        </div>
        <span style={{
          fontSize: 10, padding: '2px 7px', borderRadius: 4,
          background: project.status === 'completed' ? '#f0faf5' : '#f9f8f7',
          color: project.status === 'completed' ? '#0f6e56' : '#5f5e5a',
        }}>
          {project.status === 'completed' ? 'Terminé' : 'En cours'}
        </span>
      </div>
      <p style={{ fontSize: 11.5, color: '#888580', margin: '0 0 6px', lineHeight: 1.4 }}>{project.description}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <FiCalendar size={11} style={{ color: '#b0aeaa' }} />
        <span style={{ fontSize: 11, color: '#b0aeaa' }}>{project.period}</span>
      </div>
    </div>
  );
}