'use client'

interface InfoModalProps {
  card: {
    word: string
    definition: string
  } | null
  onClose: () => void
}

export default function InfoModal({ card, onClose }: InfoModalProps) {
  if (!card) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-gray-600 animate-[scaleIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">📖</span>
          <h2 className="font-serif text-3xl text-gray-800">{card.word}</h2>
        </div>
        
        <p className="font-body text-lg leading-relaxed text-gray-700 mb-6">
          {card.definition}
        </p>
        
        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-700 text-cream font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
