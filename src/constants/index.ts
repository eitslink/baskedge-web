// User roles
export const USER_ROLES = {
  LEAGUE_MANAGER: 'league_manager',
  TEAM_MANAGER: 'team_manager',
  EVENT_SCORER: 'event_scorer',
  REFEREE: 'referee',
  PLAYER: 'player',
  VIEWER: 'viewer',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// Game statuses
export const GAME_STATUSES = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type GameStatus = typeof GAME_STATUSES[keyof typeof GAME_STATUSES]

// League statuses
export const LEAGUE_STATUSES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type LeagueStatus = typeof LEAGUE_STATUSES[keyof typeof LEAGUE_STATUSES]

// Team statuses
export const TEAM_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const

export type TeamStatus = typeof TEAM_STATUSES[keyof typeof TEAM_STATUSES]

// Player positions
export const PLAYER_POSITIONS = {
  PG: 'PG', // Point Guard
  SG: 'SG', // Shooting Guard
  SF: 'SF', // Small Forward
  PF: 'PF', // Power Forward
  C: 'C',   // Center
} as const

export type PlayerPosition = typeof PLAYER_POSITIONS[keyof typeof PLAYER_POSITIONS]

// Player statuses
export const PLAYER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  INJURED: 'injured',
} as const

export type PlayerStatus = typeof PLAYER_STATUSES[keyof typeof PLAYER_STATUSES]

// Dominant hands
export const DOMINANT_HANDS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const

export type DominantHand = typeof DOMINANT_HANDS[keyof typeof DOMINANT_HANDS]

// Navigation items
export const NAVIGATION_ITEMS = [
  {
    title: 'ダッシュボード',
    href: '/dashboard',
    icon: 'Home',
  },
  {
    title: 'ゲーム',
    href: '/dashboard/games',
    icon: 'Gamepad2',
  },
  {
    title: 'チーム',
    href: '/dashboard/teams',
    icon: 'Users',
  },
  {
    title: '選手',
    href: '/dashboard/players',
    icon: 'User',
  },
  {
    title: 'スタッフ',
    href: '/dashboard/staff',
    icon: 'UserCheck',
  },
  {
    title: '審判',
    href: '/dashboard/referees',
    icon: 'Gavel',
  },
  {
    title: 'スポンサー',
    href: '/dashboard/sponsors',
    icon: 'Heart',
  },
  {
    title: '設定',
    href: '/dashboard/settings',
    icon: 'Settings',
  },
] as const

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  ORGANIZATIONS: '/api/organizations',
  LEAGUES: '/api/leagues',
  TEAMS: '/api/teams',
  PLAYERS: '/api/players',
  GAMES: '/api/games',
  VENUES: '/api/venues',
} as const

// App configuration
export const APP_CONFIG = {
  NAME: 'BaskEdge',
  DESCRIPTION: 'バスケットボール特化スポーツ運営WEBアプリ',
  VERSION: '1.0.0',
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const
