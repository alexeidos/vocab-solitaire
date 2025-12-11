'use client'

import { Level } from '@/lib/levels'

interface LevelSelectProps {
  levels: Level[]
  completedLevels: Set<number>
  bestMoves: Record<number, number>
  onSelectLevel: (index: number) => void
  username: string
}

export default function LevelSelect({
  levels,
  completedLevels,
  bestMoves,
  onSelectLevel,
  username,
}: LevelSelectProps) {
  const totalCompleted = completedLevels.size
  const totalLevels = levels.length

  return (
    <div className="max-w-4xl mx-auto animate-[fadeIn_0.3s_ease-out]">
      {/* Welcome message */}
      <div className="text-center mb-8">
        <p className="text-cream/70 text-lg">
          Welcome back, <span className="text-yellow-400 font-semibold">{username}</span>!
        </p>
      </div>

      {/* Level Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {levels.map((level, index) => {
          const isCompleted = completedLevels.has(level.id)
          const best = bestMoves[level.id]

          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(index)}
              className={`
                text-left p-5 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl
                ${isCompleted
                  ? 'bg-gradient-to-br from-green-800/80 to-green-900/80'
                  : 'bg-gradient-to-br from-slate-700/80 to-slate-800/80'
                }
                border border-white/10 relative overflow-hidden
              `}
            >
              {isCompleted && (
                <div className="absolute top-3 right-3 text-xl">✓</div>
              )}
              
              <h3 className="font-serif text-lg text-cream mb-1">
                {level.name}
              </h3>
              
              <p className="text-sm text-cream/60 mb-3">
                {level.theme}
              </p>
              
              <div className="flex gap-2 flex-wrap mb-3">
                {Object.values(level.categories).map((cat, i) => (
                  <span key={i} className="text-xl">{cat.icon}</span>
                ))}
              </div>

              {best && (
                <p className="text-xs text-cream/50">
                  Best: {best} moves
                </p>
              )}
            </button>
          )
        })}
      </div>

      {/* Progress Stats */}
      <div className="bg-white/5 rounded-xl p-6 text-center">
        <div className="text-sm text-cream/60 uppercase tracking-wider mb-2">
          Your Progress
        </div>
        <div className="text-3xl font-bold text-cream mb-1">
          {totalCompleted}/{totalLevels} Levels Complete
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mt-4">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(totalCompleted / totalLevels) * 100}%` }}
          />
        </div>
      </div>

      {/* How to Play */}
      <div className="mt-8 bg-white/5 rounded-xl p-6 text-cream/80">
        <h3 className="font-serif text-xl text-cream mb-4">📖 How to Play</h3>
        <div className="space-y-3 font-body">
          <p>
            <strong className="text-cream">Goal:</strong> Sort all 16 vocabulary words into the 4 categories.
          </p>
          <p>
            <strong className="text-cream">To Match:</strong> Drag a card onto a foundation pile, or drag one card onto another of the same category.
          </p>
          <p>
            <strong className="text-cream">To Learn:</strong> Click the{' '}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs font-serif italic">
              i
            </span>{' '}
            icon on any card to see its definition!
          </p>
        </div>
      </div>
    </div>
  )
}
