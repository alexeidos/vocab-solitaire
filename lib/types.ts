export interface UserProfile {
  id: string
  username: string
  email: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  level_id: number
  completed: boolean
  best_moves: number | null
  words_learned: string[] // Array of word strings
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface LeaderboardEntry {
  id: string
  user_id: string
  username: string
  avatar_url?: string
  total_levels_completed: number
  total_words_learned: number
  total_moves: number
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id' | 'created_at'>>
      }
      user_progress: {
        Row: UserProgress
        Insert: Omit<UserProgress, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProgress, 'id' | 'user_id' | 'created_at'>>
      }
      leaderboard: {
        Row: LeaderboardEntry
        Insert: Omit<LeaderboardEntry, 'id' | 'updated_at'>
        Update: Partial<Omit<LeaderboardEntry, 'id' | 'user_id'>>
      }
    }
  }
}
