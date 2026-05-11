export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    EMAIL_SEND: '/auth/email-send',
    CONFIRM: '/auth/confirm',
    CONFIRM_CODE: '/auth/confirm-code',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    TASKS: '/dashboard/tasks',
    PROJECTS: '/dashboard/projects',
    PROJECT_TASKS: '/dashboard/projects/projectTasks',
    CALENDAR: '/dashboard/calendar',
    TEAMS: '/dashboard/teams',
    VIEWTEAM: '/dashboard/teams/viewTeam',
    VIEWMEMBER: '/dashboard/teams/viewTeam/viewMember',
    SETTINGS: '/dashboard/settings',
    PROFIL: '/dashboard/profil',
  },
} as const;