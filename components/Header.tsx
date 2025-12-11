'use client'

interface HeaderProps {
  username: string
  onSignOut: () => void
  onShowLevels: () => void
  showBackButton: boolean
}

export default function Header({ username, onSignOut, onShowLevels, showBackButton }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onShowLevels}
            className="text-cream/60 hover:text-cream transition-colors"
          >
            ← Levels
          </button>
        )}
        <h1 className="font-serif text-2xl md:text-3xl text-cream">
          📚 Vocabulary Solitaire
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-cream/70 text-sm">
          {username}
        </span>
        <button
          onClick={onSignOut}
          className="text-sm text-cream/50 hover:text-cream transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
