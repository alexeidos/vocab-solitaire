import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { allLevels, getTotalWords } from '@/lib/levels'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/game')
  }

  const totalWords = getTotalWords()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Logo/Icon */}
          <div className="text-8xl mb-6">📚</div>
          
          {/* Title */}
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-cream mb-4">
            Vocabulary Solitaire
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-cream/70 mb-8 font-body">
            Master English vocabulary through an addictive card matching game
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-cream">{allLevels.length}</div>
              <div className="text-sm text-cream/60 uppercase tracking-wider">Levels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cream">{totalWords}</div>
              <div className="text-sm text-cream/60 uppercase tracking-wider">Words</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cream">∞</div>
              <div className="text-sm text-cream/60 uppercase tracking-wider">Fun</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-navy-900 font-semibold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Start Learning →
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white/10 border border-white/30 text-cream font-semibold rounded-lg text-lg hover:bg-white/20 transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* How it works */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/5 rounded-xl p-6 text-left">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-serif text-xl text-cream mb-2">Match Cards</h3>
              <p className="text-cream/70">
                Drag cards to match words by their category. Use the definitions to figure out where each word belongs.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-left">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-serif text-xl text-cream mb-2">Learn Definitions</h3>
              <p className="text-cream/70">
                Click the info icon on any card to see its full definition. Learn new words as you play!
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-left">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-serif text-xl text-cream mb-2">Track Progress</h3>
              <p className="text-cream/70">
                Your progress is saved automatically. Complete all 8 levels and master {totalWords} vocabulary words.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-cream/40 text-sm">
        <p>Built with ❤️ for language learners everywhere</p>
      </footer>
    </div>
  )
}
