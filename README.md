# Costa de Almería Real Estate Explorer

An interactive property exploration app for the Costa de Almería coast in Spain, featuring an interactive Mapbox map, filtering, and a shortlist feature.

## Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zod** for runtime validation
- **Zustand** for lightweight state management
- **Mapbox GL JS** for interactive mapping

## What it does

- Interactive Mapbox map with property markers for Costa de Almería towns and beach districts
- Filterable property list by budget, best for, beach access, and liveliness
- Shortlist feature to save favorite locations
- Detailed town pages with property overview, living, and investment insights
- Responsive design with mobile support

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create a `.env.local` file with your Mapbox access token:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
```

Get your token at [Mapbox Account](https://account.mapbox.com/access-tokens/).

## Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main explorer page
│   ├── compare/          # Compare tool
│   ├── explorer/         # Full-screen explorer
│   └── town/[slug]/      # Dynamic town detail pages
├── components/           # React components
│   ├── app-shell/       # Layout components
│   ├── filters/        # Filter UI
│   ├── map/           # Map components
│   ├── shortlist/     # Shortlist feature
│   ├── town-list/     # Town list UI
│   ├── town-modal/    # Town detail modal
│   └── ui/           # Shared UI components
├── data/               # Static data (towns.json)
├── lib/                # Utilities
│   ├── map/           # Mapbox helpers
│   ├── schemas/       # Zod validation schemas
│   ├── state/        # Zustand stores
│   └── towns/        # Data loading utilities
└── types/             # TypeScript type definitions
```

## Key features

### Interactive Map
- Custom colored markers by price tier (value, mid-range, upper-mid, premium)
- Click markers for town details
- Zoom, pan, and scale controls

### Filters
- Budget range filter
- Best for filter (retirement, holiday home, investment)
- Beach access filter
- Liveliness filter (quiet, lively, vibrant)

### Shortlist
- Add towns to a shortlist
- View shortlist in a drawer
- Remove from shortlist

### Town Details
- Overview with property prices
- Living section (climate, amenities, expat community)
- Investment section (rental potential, appreciation)