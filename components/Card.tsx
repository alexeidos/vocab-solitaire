'use client'

import { useState } from 'react'

interface CardProps {
  card: {
    id: string
    word: string
    definition: string
    category: string
  }
  onClick: () => void
  onInfoClick: (card: any) => void
  isSelected: boolean
  isDragging: boolean
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
}

export default function Card({
  card,
  onClick,
  onInfoClick,
  isSelected,
  isDragging,
  onDragStart,
  onDragEnd,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        w-28 h-40 rounded-xl relative flex flex-col p-3 cursor-grab select-none
        transition-all duration-200
        ${isDragging ? 'card-dragging' : ''}
        ${isSelected ? 'ring-2 ring-yellow-400 shadow-[0_8px_32px_rgba(255,215,0,0.4)]' : ''}
        ${isHovered && !isSelected && !isDragging ? '-translate-y-1 shadow-xl' : 'shadow-lg'}
      `}
      style={{
        background: 'linear-gradient(145deg, #3D5A80, #3D5A80dd)',
        border: isSelected ? '3px solid #FFD700' : '3px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* Info button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onInfoClick(card)
        }}
        draggable={false}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/25 border border-white/50 
                   text-cream text-sm font-bold flex items-center justify-center
                   hover:bg-white/40 hover:scale-110 transition-all z-10 font-serif italic"
      >
        i
      </button>

      {/* Word icon */}
      <div className="text-2xl mb-2 opacity-60">📝</div>

      {/* Word */}
      <div className="font-serif text-base font-semibold text-cream flex-1 flex items-center leading-tight">
        {card.word}
      </div>

      {/* Drag hint */}
      <div className="text-[10px] uppercase tracking-wider text-white/50 mt-auto">
        drag to match
      </div>
    </div>
  )
}
