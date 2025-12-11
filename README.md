# 📚 Vocabulary Solitaire

A beautiful card matching game to learn English vocabulary, built with Next.js and Supabase.

![Vocabulary Solitaire](https://via.placeholder.com/800x400/1a1a2e/FDF6E3?text=Vocabulary+Solitaire)

## Features

- 🎮 **8 Themed Levels** - From basics to psychology, 128 vocabulary words
- 🔐 **User Authentication** - Email/password and Google sign-in
- 💾 **Progress Saving** - Your progress syncs across devices
- 📊 **Track Your Learning** - See words learned and best scores
- 🎯 **Drag & Drop** - Intuitive card matching gameplay
- 📖 **Learn Definitions** - Click info icons to learn word meanings
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth, Database)
- **Deployment:** Vercel (recommended)

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd vocab-solitaire-app
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Settings > API** and copy your keys

### 3. Configure Environment

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Enable Google OAuth (Optional)

1. In Supabase, go to **Authentication > Providers**
2. Enable Google and add your OAuth credentials
3. Set your redirect URL: `https://your-domain.com/auth/callback`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Update Supabase Settings

After deployment, update these in Supabase:

1. **Authentication > URL Configuration:**
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: `https://your-domain.vercel.app/auth/callback`

2. **Authentication > Providers > Google:**
   - Add your production redirect URL

---

## 🗂 Project Structure

```
vocab-solitaire-app/
├── app/
│   ├── auth/
│   │   ├── callback/route.ts    # OAuth callback handler
│   │   ├── login/page.tsx       # Login page
│   │   └── signup/page.tsx      # Signup page
│   ├── game/page.tsx            # Main game (protected)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── Card.tsx                 # Draggable card component
│   ├── GameClient.tsx           # Main game logic
│   ├── Header.tsx               # Navigation header
│   ├── InfoModal.tsx            # Word definition modal
│   └── LevelSelect.tsx          # Level selection screen
├── lib/
│   ├── levels.ts                # All vocabulary data
│   ├── supabase-browser.ts      # Client-side Supabase
│   ├── supabase-server.ts       # Server-side Supabase
│   └── types.ts                 # TypeScript types
├── supabase/
│   └── schema.sql               # Database schema
└── middleware.ts                # Auth middleware
```

---

## 🎮 Game Levels

| Level | Theme | Categories |
|-------|-------|------------|
| 1 | Basics | Animals, Emotions, Nature, Time |
| 2 | Science | Biology, Physics, Chemistry, Astronomy |
| 3 | Arts | Music, Literature, Visual, Theater |
| 4 | Business | Finance, Marketing, Management, Technology |
| 5 | Philosophy | Ethics, Logic, Existence, Knowledge |
| 6 | Medicine | Anatomy, Conditions, Treatment, Symptoms |
| 7 | Law | Court, Crimes, Contracts, Rights |
| 8 | Psychology | Cognitive, Behavior, Personality, Disorders |

---

## 🔧 Customization

### Adding New Levels

Edit `lib/levels.ts`:

```typescript
{
  id: 9,
  name: 'Level 9: Your Theme',
  theme: 'Description',
  categories: {
    category1: {
      color: '#hexcolor',
      icon: '🎯',
      words: [
        { word: 'Word', definition: 'Definition here' },
        // ... 3 more words
      ]
    },
    // ... 3 more categories
  }
}
```

### Changing Colors

Edit `tailwind.config.js` and `app/globals.css`

---

## 📝 License

MIT License - feel free to use for personal or commercial projects.

---

## 🙏 Credits

Built with ❤️ for language learners everywhere.

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
