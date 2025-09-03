// Re-export Supabase types
export type { Database } from '@/lib/supabase/types'

// App-specific types
export interface User {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  role: 'league_manager' | 'team_manager' | 'event_scorer' | 'referee' | 'player' | 'viewer'
  organization_id: string | null
  team_id: string | null
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  website_url: string | null
  created_at: string
  updated_at: string
}

export interface League {
  id: string
  organization_id: string
  name: string
  slug: string
  description: string | null
  season: string
  start_date: string
  end_date: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Team {
  id: string
  organization_id: string
  league_id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  primary_color: string | null
  secondary_color: string | null
  founded_year: number | null
  home_town: string | null
  status: 'active' | 'inactive' | 'pending'
  created_at: string
  updated_at: string
}

export interface Player {
  id: string
  team_id: string
  person_id: string
  jersey_number: number | null
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C' | null
  status: 'active' | 'inactive' | 'injured'
  created_at: string
  updated_at: string
}

export interface Person {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string | null
  nationality: string | null
  height: number | null // in cm
  weight: number | null // in kg
  dominant_hand: 'left' | 'right' | null
  photo_url: string | null
  created_at: string
  updated_at: string
}

export interface Game {
  id: string
  league_id: string
  home_team_id: string
  away_team_id: string
  venue_id: string | null
  scheduled_at: string
  status: 'scheduled' | 'live' | 'completed' | 'cancelled'
  home_score: number | null
  away_score: number | null
  quarters: GameQuarter[]
  created_at: string
  updated_at: string
}

export interface GameQuarter {
  quarter: number
  home_score: number
  away_score: number
}

export interface GameStats {
  id: string
  game_id: string
  player_id: string
  team_id: string
  minutes_played: number | null
  points: number
  field_goals_made: number
  field_goals_attempted: number
  three_pointers_made: number
  three_pointers_attempted: number
  free_throws_made: number
  free_throws_attempted: number
  rebounds_offensive: number
  rebounds_defensive: number
  assists: number
  steals: number
  blocks: number
  turnovers: number
  personal_fouls: number
  created_at: string
  updated_at: string
}

export interface Venue {
  id: string
  organization_id: string
  name: string
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  postal_code: string | null
  latitude: number | null
  longitude: number | null
  capacity: number | null
  created_at: string
  updated_at: string
}
