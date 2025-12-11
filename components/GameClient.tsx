'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { allLevels, Level } from '@/lib/levels'
import { UserProgress } from '@/lib/types'
import Card from './Card'
import InfoModal from './InfoModal'
import LevelSelect from './LevelSelect'
import Header from './Header'

interface CardData {
  id: string
  category: string
  word: string
  definition: string
  color: string
  icon: string
}

interface GameClientProps {
  user: {
    id: string
    email: string
    username: string
  }
  initialProgress: UserProgress[]
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function createDeck(levelData: Level): CardData[] {
  const deck: CardData[] = []
  Object.entries(levelData.categories).forEach(([category, data]) => {
    data.words.forEach((wordData, index) => {
      deck.push({
        id: `${category}-${index}`,
        category,
        ...wordData,
        color: data.color,
        icon: data.icon,
      })
    })
  })
  return deck
}

export default function GameClient({ user, initialProgress }: GameClientProps) {
  const supabase = createClient()
  
  const [currentLevel, setCurrentLevel] = useState(0)
  const [tableau, setTableau] = useState<CardData[][]>([[], [], [], []])
  const [foundations, setFoundations] = useState<Record<string, CardData[]>>({})
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const [selectedSource, setSelectedSource] = useState<{ type: string; index: number } | null>(null)
  const [draggedCard, setDraggedCard] = useState<CardData | null>(null)
  const [dragSource, setDragSource] = useState<{ type: string; index: number } | null>(null)
  const [infoCard, setInfoCard] = useState<CardData | null>(null)
  const [moves, setMoves] = useState(0)
  const [wordsLearned, setWordsLearned] = useState<Set<string>>(new Set())
  const [gameWon, setGameWon] = useState(false)
  const [showLevelSelect, setShowLevelSelect] = useState(true)
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set())
  const [bestMoves, setBestMoves] = useState<Record<number, number>>({})
  const [message, setMessage] = useState(`Welcome, ${user.username}! Select a level to begin.`)
  const [saving, setSaving] = useState(false)

  const levelData = allLevels[currentLevel]
  const categoryKeys = levelData ? Object.keys(levelData.categories) : []

  // Load initial progress
  useEffect(() => {
    const completed = new Set<number>()
    const best: Record<number, number> = {}
    
    initialProgress.forEach((p) => {
      if (p.completed) {
        completed.add(p.level_id)
      }
      if (p.best_moves) {
        best[p.level_id] = p.best_moves
      }
    })
    
    setCompletedLevels(completed)
    setBestMoves(best)
  }, [initialProgress])

  // Initialize game for current level
  const initGame = useCallback((levelIndex: number = currentLevel) => {
    const level = allLevels[levelIndex]
    const newDeck = shuffle(createDeck(level))
    const newTableau: CardData[][] = [[], [], [], []]
    
    newDeck.forEach((card, index) => {
      newTableau[index % 4].push(card)
    })
    
    const newFoundations: Record<string, CardData[]> = {}
    Object.keys(level.categories).forEach(cat => {
      newFoundations[cat] = []
    })
    
    setCurrentLevel(levelIndex)
    setTableau(newTableau)
    setFoundations(newFoundations)
    setSelectedCard(null)
    setSelectedSource(null)
    setDraggedCard(null)
    setDragSource(null)
    setMoves(0)
    setWordsLearned(new Set())
    setGameWon(false)
    setShowLevelSelect(false)
    setMessage(`${level.name}: ${level.theme} - Drag cards to match!`)
  }, [currentLevel])

  // Save progress to Supabase
  const saveProgress = useCallback(async (levelId: number, movesCount: number, learned: string[]) => {
    setSaving(true)
    
    try {
      const { data: existing } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('level_id', levelId)
        .single()

      if (existing) {
        // Update existing record
        const newBestMoves = existing.best_moves 
          ? Math.min(existing.best_moves, movesCount)
          : movesCount
        
        const existingWords = existing.words_learned || []
        const allWords = [...new Set([...existingWords, ...learned])]

        await supabase
          .from('user_progress')
          .update({
            completed: true,
            best_moves: newBestMoves,
            words_learned: allWords,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
        
        setBestMoves(prev => ({ ...prev, [levelId]: newBestMoves }))
      } else {
        // Create new record
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            level_id: levelId,
            completed: true,
            best_moves: movesCount,
            words_learned: learned,
            completed_at: new Date().toISOString(),
          })
        
        setBestMoves(prev => ({ ...prev, [levelId]: movesCount }))
      }
      
      setCompletedLevels(prev => new Set([...prev, levelId]))
    } catch (error) {
      console.error('Error saving progress:', error)
    }
    
    setSaving(false)
  }, [supabase, user.id])

  // Check win condition
  useEffect(() => {
    if (!levelData || showLevelSelect) return
    
    const totalInFoundations = Object.values(foundations).reduce(
      (sum, pile) => sum + pile.length, 0
    )
    
    if (totalInFoundations === 16 && !gameWon) {
      setGameWon(true)
      setMessage('🎉 Level Complete!')
      saveProgress(levelData.id, moves, Array.from(wordsLearned))
    }
  }, [foundations, levelData, showLevelSelect, gameWon, moves, wordsLearned, saveProgress])

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, card: CardData, pileIndex: number) => {
    setDraggedCard(card)
    setDragSource({ type: 'tableau', index: pileIndex })
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', card.id)
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
    setDragSource(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  // Move card to foundation
  const moveToFoundation = (card: CardData, source: { type: string; index: number }) => {
    if (source.type === 'tableau') {
      setTableau(prev => {
        const newTableau = [...prev]
        newTableau[source.index] = newTableau[source.index].filter(c => c.id !== card.id)
        return newTableau
      })
    }
    
    setFoundations(prev => ({
      ...prev,
      [card.category]: [...(prev[card.category] || []), card],
    }))
  }

  // Handle drop on foundation
  const handleFoundationDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault()
    if (!draggedCard || !dragSource) return
    
    if (draggedCard.category === category) {
      moveToFoundation(draggedCard, dragSource)
      setMoves(m => m + 1)
      setMessage(`✓ "${draggedCard.word}" correctly placed!`)
    } else {
      setMessage(`✗ "${draggedCard.word}" doesn't belong in ${category}. Try again!`)
    }
    setDraggedCard(null)
    setDragSource(null)
  }

  // Handle drop on another card
  const handleCardDrop = (e: React.DragEvent, targetCard: CardData, targetPileIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (!draggedCard || !dragSource || draggedCard.id === targetCard.id) return
    
    if (draggedCard.category === targetCard.category) {
      moveToFoundation(draggedCard, dragSource)
      moveToFoundation(targetCard, { type: 'tableau', index: targetPileIndex })
      setMoves(m => m + 1)
      setMessage(`✓ Great match! "${draggedCard.word}" and "${targetCard.word}" paired!`)
    } else {
      setMessage(`✗ "${draggedCard.word}" and "${targetCard.word}" don't match.`)
    }
    setDraggedCard(null)
    setDragSource(null)
  }

  // Handle card click
  const handleCardClick = (card: CardData, pileIndex: number) => {
    if (gameWon) return
    
    if (!selectedCard) {
      setSelectedCard(card)
      setSelectedSource({ type: 'tableau', index: pileIndex })
      setMessage(`Selected "${card.word}" - click another card to match`)
    } else {
      if (selectedCard.category === card.category && selectedCard.id !== card.id) {
        moveToFoundation(selectedCard, selectedSource!)
        moveToFoundation(card, { type: 'tableau', index: pileIndex })
        setMoves(m => m + 1)
        setMessage(`✓ Great match! "${selectedCard.word}" and "${card.word}" paired!`)
      } else if (selectedCard.id === card.id) {
        setMessage('Card deselected.')
      } else {
        setMessage(`✗ "${selectedCard.word}" and "${card.word}" don't match.`)
      }
      setSelectedCard(null)
      setSelectedSource(null)
    }
  }

  // Handle foundation click
  const handleFoundationClick = (category: string) => {
    if (!selectedCard || !selectedSource || gameWon) return
    
    if (selectedCard.category === category) {
      moveToFoundation(selectedCard, selectedSource)
      setMoves(m => m + 1)
      setMessage(`✓ "${selectedCard.word}" correctly placed in ${category}!`)
    } else {
      setMessage(`✗ "${selectedCard.word}" doesn't belong in ${category}.`)
    }
    setSelectedCard(null)
    setSelectedSource(null)
  }

  // Handle info click
  const handleInfoClick = (card: CardData) => {
    setInfoCard(card)
    setWordsLearned(prev => new Set([...prev, card.word]))
  }

  // Handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <Header 
        username={user.username}
        onSignOut={handleSignOut}
        onShowLevels={() => setShowLevelSelect(true)}
        showBackButton={!showLevelSelect}
      />

      {showLevelSelect ? (
        <LevelSelect
          levels={allLevels}
          completedLevels={completedLevels}
          bestMoves={bestMoves}
          onSelectLevel={initGame}
          username={user.username}
        />
      ) : (
        <>
          {/* Stats Bar */}
          <div className="flex justify-center gap-8 mb-5 flex-wrap">
            <div className="text-center text-cream">
              <div className="text-2xl font-bold">{moves}</div>
              <div className="text-xs opacity-70 uppercase tracking-wider">Moves</div>
            </div>
            <div className="text-center text-cream">
              <div className="text-2xl font-bold">{wordsLearned.size}/16</div>
              <div className="text-xs opacity-70 uppercase tracking-wider">Words Learned</div>
            </div>
            <div className="text-center text-cream">
              <div className="text-2xl font-bold">
                {Object.values(foundations).reduce((sum, pile) => sum + pile.length, 0)}/16
              </div>
              <div className="text-xs opacity-70 uppercase tracking-wider">Matched</div>
            </div>
            {bestMoves[levelData.id] && (
              <div className="text-center text-cream">
                <div className="text-2xl font-bold">{bestMoves[levelData.id]}</div>
                <div className="text-xs opacity-70 uppercase tracking-wider">Best</div>
              </div>
            )}
          </div>

          {/* Message */}
          <div className={`
            rounded-lg py-3 px-5 mb-6 text-center max-w-xl mx-auto font-body
            ${message.startsWith('✓') ? 'bg-green-900/30' : message.startsWith('✗') ? 'bg-red-900/30' : 'bg-white/10'}
            text-cream transition-colors
          `}>
            {message}
          </div>

          {/* Foundation Piles */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {categoryKeys.map((category) => {
              const data = levelData.categories[category]
              const count = foundations[category]?.length || 0
              
              return (
                <div
                  key={category}
                  onClick={() => handleFoundationClick(category)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleFoundationDrop(e, category)}
                  className={`
                    w-28 h-40 rounded-xl flex flex-col items-center justify-center cursor-pointer
                    transition-all relative
                    ${count > 0 ? '' : 'bg-white/5'}
                    ${draggedCard ? 'foundation-pulse' : ''}
                  `}
                  style={{
                    background: count > 0 ? `linear-gradient(145deg, ${data.color}, ${data.color}dd)` : undefined,
                    border: draggedCard 
                      ? `3px dashed ${data.color}` 
                      : count > 0 
                        ? `3px solid ${data.color}`
                        : '3px dashed rgba(255,255,255,0.2)',
                  }}
                >
                  <span className="text-3xl mb-2">{data.icon}</span>
                  <span className={`capitalize text-sm font-semibold ${count > 0 ? 'text-cream' : 'text-white/60'}`}>
                    {category}
                  </span>
                  <span className={`text-xs mt-1 ${count > 0 ? 'text-white/80' : 'text-white/30'}`}>
                    {count}/4
                  </span>
                  {draggedCard && (
                    <span className="absolute bottom-2 text-[10px] text-white/50">
                      drop here
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Tableau */}
          <div className="flex justify-center gap-5 flex-wrap max-w-4xl mx-auto">
            {tableau.map((pile, pileIndex) => (
              <div key={pileIndex} className="flex flex-col gap-3 min-w-[120px] items-center">
                {pile.length === 0 ? (
                  <div className="w-28 h-40 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center text-white/30 text-sm">
                    Empty
                  </div>
                ) : (
                  pile.map((card) => (
                    <div
                      key={card.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleCardDrop(e, card, pileIndex)}
                    >
                      <Card
                        card={card}
                        onClick={() => handleCardClick(card, pileIndex)}
                        onInfoClick={handleInfoClick}
                        isSelected={selectedCard?.id === card.id}
                        isDragging={draggedCard?.id === card.id}
                        onDragStart={(e) => handleDragStart(e, card, pileIndex)}
                        onDragEnd={handleDragEnd}
                      />
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>

          {/* Restart Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => initGame(currentLevel)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-navy-900 font-semibold rounded-lg hover:scale-105 transition-transform"
            >
              🔄 Restart Level
            </button>
          </div>
        </>
      )}

      {/* Win Modal */}
      {gameWon && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-cream to-orange-100 rounded-2xl p-8 text-center celebrate max-w-md">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="font-serif text-3xl text-navy-900 mb-2">Level Complete!</h2>
            <p className="text-gray-600 mb-4">{levelData.name}</p>
            <p className="text-lg text-gray-800 mb-1">
              Completed in <strong>{moves}</strong> moves
            </p>
            <p className="text-lg text-gray-800 mb-6">
              Learned <strong>{wordsLearned.size}</strong> word definitions!
            </p>
            {saving && <p className="text-sm text-gray-500 mb-4">Saving progress...</p>}
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => {
                  setGameWon(false)
                  setShowLevelSelect(true)
                }}
                className="px-6 py-3 bg-gray-200 text-navy-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                All Levels
              </button>
              {currentLevel < allLevels.length - 1 && (
                <button
                  onClick={() => {
                    setGameWon(false)
                    initGame(currentLevel + 1)
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
                >
                  Next Level →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      <InfoModal card={infoCard} onClose={() => setInfoCard(null)} />
    </div>
  )
}
