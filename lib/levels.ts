export interface Word {
  word: string
  definition: string
}

export interface Category {
  color: string
  icon: string
  words: Word[]
}

export interface Level {
  id: number
  name: string
  theme: string
  categories: Record<string, Category>
}

export const allLevels: Level[] = [
  {
    id: 1,
    name: 'Level 1: Basics',
    theme: 'Foundation Words',
    categories: {
      animals: {
        color: '#2D5A27',
        icon: '🦁',
        words: [
          { word: 'Feline', definition: 'Relating to cats or the cat family; having cat-like qualities such as grace or stealth.' },
          { word: 'Canine', definition: 'Relating to dogs or the dog family; having dog-like characteristics.' },
          { word: 'Avian', definition: 'Relating to birds; having bird-like features or characteristics.' },
          { word: 'Aquatic', definition: 'Living or growing in, on, or near water; relating to water environments.' },
        ]
      },
      emotions: {
        color: '#8B2942',
        icon: '💭',
        words: [
          { word: 'Euphoria', definition: 'An intense feeling of happiness, excitement, and well-being; extreme joy.' },
          { word: 'Melancholy', definition: 'A deep, persistent sadness; a pensive mood often without obvious cause.' },
          { word: 'Serenity', definition: 'A state of calm, peace, and tranquility; being untroubled.' },
          { word: 'Anxiety', definition: 'A feeling of worry, nervousness, or unease about something uncertain.' },
        ]
      },
      nature: {
        color: '#1E4D6B',
        icon: '🌿',
        words: [
          { word: 'Verdant', definition: 'Green with grass or rich vegetation; lush and flourishing.' },
          { word: 'Arid', definition: 'Having little or no rain; extremely dry and barren.' },
          { word: 'Pristine', definition: 'In its original condition; unspoiled and uncorrupted.' },
          { word: 'Tempest', definition: 'A violent windstorm; also used metaphorically for tumultuous situations.' },
        ]
      },
      time: {
        color: '#5C4033',
        icon: '⏳',
        words: [
          { word: 'Ephemeral', definition: 'Lasting for a very short time; transitory and fleeting.' },
          { word: 'Perpetual', definition: 'Never ending or changing; occurring repeatedly without interruption.' },
          { word: 'Ancient', definition: 'Belonging to the very distant past; very old.' },
          { word: 'Imminent', definition: 'About to happen; impending and close at hand.' },
        ]
      },
    }
  },
  {
    id: 2,
    name: 'Level 2: Science',
    theme: 'Scientific Terms',
    categories: {
      biology: {
        color: '#228B22',
        icon: '🧬',
        words: [
          { word: 'Mitosis', definition: 'Cell division resulting in two identical daughter cells with the same number of chromosomes.' },
          { word: 'Osmosis', definition: 'Movement of water molecules through a semipermeable membrane from low to high concentration.' },
          { word: 'Photosynthesis', definition: 'Process by which plants convert sunlight, water, and CO2 into glucose and oxygen.' },
          { word: 'Metabolism', definition: 'Chemical processes in organisms that maintain life, including breaking down food for energy.' },
        ]
      },
      physics: {
        color: '#4169E1',
        icon: '⚡',
        words: [
          { word: 'Velocity', definition: 'Speed of an object in a specific direction; rate of change of position.' },
          { word: 'Momentum', definition: 'Product of mass and velocity; tendency of a moving object to keep moving.' },
          { word: 'Friction', definition: 'Force that opposes motion between two surfaces in contact.' },
          { word: 'Inertia', definition: 'Tendency of an object to resist changes in its state of motion.' },
        ]
      },
      chemistry: {
        color: '#9932CC',
        icon: '⚗️',
        words: [
          { word: 'Catalyst', definition: 'Substance that speeds up a chemical reaction without being consumed.' },
          { word: 'Isotope', definition: 'Atoms of the same element with different numbers of neutrons.' },
          { word: 'Solvent', definition: 'Liquid substance capable of dissolving other substances.' },
          { word: 'Oxidation', definition: 'Chemical reaction involving loss of electrons or gain of oxygen.' },
        ]
      },
      astronomy: {
        color: '#191970',
        icon: '🌌',
        words: [
          { word: 'Nebula', definition: 'Giant cloud of dust and gas in space, often where stars are born.' },
          { word: 'Quasar', definition: 'Extremely luminous active galactic nucleus powered by a supermassive black hole.' },
          { word: 'Eclipse', definition: 'Event where one celestial body moves into the shadow of another.' },
          { word: 'Orbit', definition: 'Curved path of an object around a star, planet, or moon due to gravity.' },
        ]
      },
    }
  },
  {
    id: 3,
    name: 'Level 3: Arts',
    theme: 'Creative Expression',
    categories: {
      music: {
        color: '#DC143C',
        icon: '🎵',
        words: [
          { word: 'Crescendo', definition: 'Gradual increase in loudness or intensity in music.' },
          { word: 'Harmony', definition: 'Combination of simultaneously sounded musical notes to produce chords.' },
          { word: 'Tempo', definition: 'Speed at which a piece of music is played.' },
          { word: 'Melody', definition: 'Sequence of single notes that form a recognizable musical phrase.' },
        ]
      },
      literature: {
        color: '#8B4513',
        icon: '📚',
        words: [
          { word: 'Metaphor', definition: 'Figure of speech comparing two unlike things without using like or as.' },
          { word: 'Protagonist', definition: 'Main character in a story, often the hero or central figure.' },
          { word: 'Allegory', definition: 'Story with a hidden meaning, often moral or political.' },
          { word: 'Narrative', definition: 'Spoken or written account of connected events; a story.' },
        ]
      },
      visual: {
        color: '#FF6347',
        icon: '🎨',
        words: [
          { word: 'Perspective', definition: 'Technique for representing 3D objects on a 2D surface.' },
          { word: 'Contrast', definition: 'Difference between light and dark areas, or opposing elements.' },
          { word: 'Composition', definition: 'Arrangement of visual elements in a work of art.' },
          { word: 'Texture', definition: 'Surface quality or feel of an object, real or implied in art.' },
        ]
      },
      theater: {
        color: '#800080',
        icon: '🎭',
        words: [
          { word: 'Monologue', definition: 'Long speech by one actor, often revealing inner thoughts.' },
          { word: 'Ensemble', definition: 'Group of performers working together as a unit.' },
          { word: 'Improvise', definition: 'Perform without preparation, creating spontaneously.' },
          { word: 'Dialogue', definition: 'Conversation between two or more characters in a play.' },
        ]
      },
    }
  },
  {
    id: 4,
    name: 'Level 4: Business',
    theme: 'Professional World',
    categories: {
      finance: {
        color: '#006400',
        icon: '💰',
        words: [
          { word: 'Equity', definition: 'Ownership interest in a company; value of shares minus liabilities.' },
          { word: 'Dividend', definition: 'Portion of profits distributed to shareholders.' },
          { word: 'Liability', definition: 'Financial obligation or debt owed by a company.' },
          { word: 'Portfolio', definition: 'Collection of investments held by an individual or organization.' },
        ]
      },
      marketing: {
        color: '#FF4500',
        icon: '📢',
        words: [
          { word: 'Demographic', definition: 'Statistical characteristics of a population, used for targeting.' },
          { word: 'Branding', definition: 'Creating a unique identity and image for a product or company.' },
          { word: 'Conversion', definition: 'When a prospect takes a desired action, like making a purchase.' },
          { word: 'Engagement', definition: 'Interaction and involvement between a brand and its audience.' },
        ]
      },
      management: {
        color: '#4682B4',
        icon: '👔',
        words: [
          { word: 'Delegate', definition: 'Assign responsibility or authority to another person.' },
          { word: 'Synergy', definition: 'Combined effort producing greater results than individual parts.' },
          { word: 'Stakeholder', definition: 'Person or group with interest in an organization\'s success.' },
          { word: 'Benchmark', definition: 'Standard or reference point for measuring performance.' },
        ]
      },
      technology: {
        color: '#20B2AA',
        icon: '💻',
        words: [
          { word: 'Algorithm', definition: 'Step-by-step procedure for solving a problem or completing a task.' },
          { word: 'Bandwidth', definition: 'Data transfer capacity of a network; also means capacity for work.' },
          { word: 'Interface', definition: 'Point of interaction between components, systems, or users.' },
          { word: 'Scalable', definition: 'Able to handle growth or increased demand without losing performance.' },
        ]
      },
    }
  },
  {
    id: 5,
    name: 'Level 5: Philosophy',
    theme: 'Deep Thinking',
    categories: {
      ethics: {
        color: '#8B0000',
        icon: '⚖️',
        words: [
          { word: 'Altruism', definition: 'Selfless concern for the well-being of others.' },
          { word: 'Integrity', definition: 'Quality of being honest and having strong moral principles.' },
          { word: 'Virtue', definition: 'Behavior showing high moral standards; a good quality.' },
          { word: 'Conscience', definition: 'Inner sense of right and wrong that guides behavior.' },
        ]
      },
      logic: {
        color: '#2F4F4F',
        icon: '🧠',
        words: [
          { word: 'Paradox', definition: 'Statement that contradicts itself but may contain truth.' },
          { word: 'Fallacy', definition: 'Error in reasoning that undermines the logic of an argument.' },
          { word: 'Premise', definition: 'Statement assumed to be true as basis for argument.' },
          { word: 'Inference', definition: 'Conclusion reached through reasoning from evidence.' },
        ]
      },
      existence: {
        color: '#483D8B',
        icon: '🌟',
        words: [
          { word: 'Essence', definition: 'Core nature or most important quality of something.' },
          { word: 'Nihilism', definition: 'Belief that life lacks objective meaning or purpose.' },
          { word: 'Transcend', definition: 'Go beyond the limits of; surpass ordinary experience.' },
          { word: 'Existential', definition: 'Relating to existence and the nature of human being.' },
        ]
      },
      knowledge: {
        color: '#556B2F',
        icon: '📖',
        words: [
          { word: 'Empirical', definition: 'Based on observation or experience rather than theory.' },
          { word: 'Intuition', definition: 'Understanding something instinctively without conscious reasoning.' },
          { word: 'Skepticism', definition: 'Attitude of doubt toward claims accepted as true.' },
          { word: 'Wisdom', definition: 'Quality of having experience, knowledge, and good judgment.' },
        ]
      },
    }
  },
  {
    id: 6,
    name: 'Level 6: Medicine',
    theme: 'Health & Body',
    categories: {
      anatomy: {
        color: '#B22222',
        icon: '🫀',
        words: [
          { word: 'Cardiac', definition: 'Relating to the heart.' },
          { word: 'Neural', definition: 'Relating to nerves or the nervous system.' },
          { word: 'Hepatic', definition: 'Relating to the liver.' },
          { word: 'Renal', definition: 'Relating to the kidneys.' },
        ]
      },
      conditions: {
        color: '#CD853F',
        icon: '🩺',
        words: [
          { word: 'Chronic', definition: 'Persisting for a long time or constantly recurring.' },
          { word: 'Acute', definition: 'Severe and sudden in onset; short-term.' },
          { word: 'Benign', definition: 'Not harmful; not cancerous.' },
          { word: 'Malignant', definition: 'Very dangerous; cancerous and likely to spread.' },
        ]
      },
      treatment: {
        color: '#4169E1',
        icon: '💊',
        words: [
          { word: 'Prognosis', definition: 'Likely course or outcome of a disease.' },
          { word: 'Therapeutic', definition: 'Relating to healing or treatment of disease.' },
          { word: 'Palliative', definition: 'Relieving symptoms without curing the underlying cause.' },
          { word: 'Prophylactic', definition: 'Intended to prevent disease.' },
        ]
      },
      symptoms: {
        color: '#9370DB',
        icon: '🤒',
        words: [
          { word: 'Fatigue', definition: 'Extreme tiredness resulting from mental or physical exertion.' },
          { word: 'Inflammation', definition: 'Body\'s response to injury or infection, causing redness and swelling.' },
          { word: 'Vertigo', definition: 'Sensation of spinning or loss of balance.' },
          { word: 'Nausea', definition: 'Feeling of sickness with urge to vomit.' },
        ]
      },
    }
  },
  {
    id: 7,
    name: 'Level 7: Law',
    theme: 'Legal Terms',
    categories: {
      court: {
        color: '#2F4F4F',
        icon: '⚖️',
        words: [
          { word: 'Verdict', definition: 'Decision made by a jury or judge in a trial.' },
          { word: 'Testimony', definition: 'Formal statement given under oath in court.' },
          { word: 'Plaintiff', definition: 'Person who brings a case against another in court.' },
          { word: 'Defendant', definition: 'Person accused or sued in a court of law.' },
        ]
      },
      crimes: {
        color: '#8B0000',
        icon: '🚨',
        words: [
          { word: 'Felony', definition: 'Serious crime typically punishable by imprisonment over one year.' },
          { word: 'Perjury', definition: 'Crime of lying under oath in court.' },
          { word: 'Fraud', definition: 'Wrongful deception intended for financial or personal gain.' },
          { word: 'Embezzle', definition: 'Steal money entrusted to one\'s care.' },
        ]
      },
      contracts: {
        color: '#4682B4',
        icon: '📜',
        words: [
          { word: 'Breach', definition: 'Violation of a law, agreement, or code of conduct.' },
          { word: 'Clause', definition: 'Distinct section or provision in a legal document.' },
          { word: 'Stipulate', definition: 'Demand or specify as part of an agreement.' },
          { word: 'Indemnity', definition: 'Security against loss or damage; compensation for loss.' },
        ]
      },
      rights: {
        color: '#DAA520',
        icon: '🗽',
        words: [
          { word: 'Amnesty', definition: 'Official pardon for people convicted of political offenses.' },
          { word: 'Asylum', definition: 'Protection granted to refugees from another country.' },
          { word: 'Sovereignty', definition: 'Supreme power or authority of a state to govern itself.' },
          { word: 'Jurisdiction', definition: 'Official power to make legal decisions within an area.' },
        ]
      },
    }
  },
  {
    id: 8,
    name: 'Level 8: Psychology',
    theme: 'Mind & Behavior',
    categories: {
      cognitive: {
        color: '#6A5ACD',
        icon: '🧠',
        words: [
          { word: 'Cognition', definition: 'Mental process of acquiring knowledge through thought and senses.' },
          { word: 'Perception', definition: 'Way of interpreting sensory information to understand environment.' },
          { word: 'Bias', definition: 'Tendency to favor one perspective over others.' },
          { word: 'Heuristic', definition: 'Mental shortcut that allows quick problem-solving and judgments.' },
        ]
      },
      behavior: {
        color: '#20B2AA',
        icon: '🎯',
        words: [
          { word: 'Stimulus', definition: 'Thing that causes a reaction or response.' },
          { word: 'Conditioning', definition: 'Learning process where behavior is modified through association.' },
          { word: 'Reinforcement', definition: 'Consequence that strengthens or increases a behavior.' },
          { word: 'Inhibition', definition: 'Restraint of an impulse or behavior.' },
        ]
      },
      personality: {
        color: '#DB7093',
        icon: '🪞',
        words: [
          { word: 'Introvert', definition: 'Person who gains energy from solitary activities.' },
          { word: 'Extrovert', definition: 'Person who gains energy from social interaction.' },
          { word: 'Narcissism', definition: 'Excessive self-love and need for admiration.' },
          { word: 'Empathy', definition: 'Ability to understand and share feelings of another.' },
        ]
      },
      disorders: {
        color: '#778899',
        icon: '💭',
        words: [
          { word: 'Phobia', definition: 'Extreme irrational fear of something specific.' },
          { word: 'Trauma', definition: 'Deeply distressing experience causing lasting psychological damage.' },
          { word: 'Delusion', definition: 'False belief held despite evidence to the contrary.' },
          { word: 'Compulsion', definition: 'Irresistible urge to perform certain behaviors.' },
        ]
      },
    }
  },
]

export function getTotalWords(): number {
  return allLevels.reduce((total, level) => {
    return total + Object.values(level.categories).reduce((catTotal, cat) => catTotal + cat.words.length, 0)
  }, 0)
}
