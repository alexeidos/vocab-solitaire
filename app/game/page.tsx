import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import GameClient from '@/components/GameClient'

export default async function GamePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)

  const username = profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'Player'

  return (
    <GameClient 
      user={{
        id: user.id,
        email: user.email || '',
        username,
      }}
      initialProgress={progress || []}
    />
  )
}
