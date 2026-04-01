# Costa de Almería Town Explorer
## Day 0 Technical Design Specification

This document is the engineering execution spec for Day 0.

It translates the Day 0 UI/Data Specification into a concrete technical design that an implementation agent can execute exactly.

This document defines:
- fixed technical stack
- application architecture
- repository structure
- routing
- domain types and schemas
- data loading strategy
- component APIs
- state management
- map implementation
- modal and compare implementation
- mobile behavior
- fallback rules
- performance requirements
- accessibility requirements
- testing requirements
- acceptance criteria
- build order

This document is authoritative for implementation.

---

# 1. Technical Baseline

## 1.1 Chosen Stack

The Day 0 application is built with the following stack:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Mapbox GL JS
- Zustand for client UI state
- Zod for runtime schema validation
- Lucide React for icons

## 1.2 Runtime Model

Day 0 is implemented as a server-rendered React application with client-side interactivity for map, modal, shortlist, filters, and compare.

## 1.3 Data Model Strategy

Day 0 uses curated local town data stored in-repo and loaded through typed server utilities.

Town data is not fetched from third-party business APIs in Day 0.

## 1.4 State Model Strategy

The application uses:
- URL state for shareable explorer filters and selected town page routes
- Zustand for client interaction state
- localStorage for shortlist persistence

## 1.5 Styling Model

The application uses Tailwind CSS only for layout, spacing, typography, sizing, and visual states.

No component library is introduced for Day 0.

---

# 2. Delivery Objective

The delivered system must enable a user to:
- browse towns on a map
- scan towns in a list
- filter towns
- open a town modal
- save towns to a shortlist
- compare 2 to 4 towns
- open a standalone town page
- copy or share a town link

No Day 0 implementation may add data-heavy or directory-style features beyond this scope.

---

# 3. Repository Structure

The project uses the following repository structure.

```text
/src
  /app
    /page.tsx
    /layout.tsx
    /globals.css
    /town
      /[slug]
        /page.tsx
    /compare
      /page.tsx
  /components
    /app-shell
      TopBar.tsx
      ExplorerLayout.tsx
    /filters
      FilterPanel.tsx
      BudgetFilter.tsx
      BestForFilter.tsx
      BeachAccessFilter.tsx
      AccessFilter.tsx
      LivelinessFilter.tsx
    /town-list
      TownList.tsx
      TownListCard.tsx
    /map
      MapPanel.tsx
      MapboxMap.tsx
      TownMarkerLayer.tsx
      TownMarker.tsx
      MapControls.tsx
      MarkerPreviewCard.tsx
    /town-modal
      TownModal.tsx
      TownModalHeader.tsx
      TownHeroSummary.tsx
      TownOverviewSection.tsx
      TownLivingSection.tsx
      TownPropertySection.tsx
      TownExploreSection.tsx
      TownModalActions.tsx
    /compare
      CompareView.tsx
      CompareHeader.tsx
      CompareTable.tsx
    /shortlist
      ShortlistDrawer.tsx
      ShortlistCard.tsx
    /town-page
      TownHero.tsx
      TownSummary.tsx
      TownDetailSections.tsx
      CompareCTA.tsx
    /ui
      Button.tsx
      Chip.tsx
      Badge.tsx
      Section.tsx
      IconLabel.tsx
      EmptyState.tsx
      Modal.tsx
      Drawer.tsx
      BottomSheet.tsx
      Tooltip.tsx
  /data
    towns.json
  /lib
    /towns
      loadTowns.ts
      loadTownBySlug.ts
      selectors.ts
      compare.ts
    /schemas
      town.ts
      filters.ts
      compare.ts
    /map
      mapbox.ts
      markerStyle.ts
    /state
      uiStore.ts
      shortlistStore.ts
    /utils
      format.ts
      storage.ts
      urlState.ts
      a11y.ts
  /types
    town.ts
    compare.ts
    filters.ts
  /tests
    /unit
    /integration
    /e2e
```

This structure is mandatory.

---

# 4. Routing Design

## 4.1 Required Routes

The application implements the following routes:
- `/` Explorer route
- `/town/[slug]` standalone town page
- `/compare` compare route

## 4.2 Explorer Route Behavior

The Explorer route renders:
- top bar
- filter panel
- town list
- map panel
- shortlist drawer
- town modal when a town is selected

## 4.3 Town Route Behavior

The Town route renders the standalone town page for a specific town slug.

If a slug does not exist, the application returns a 404 response.

## 4.4 Compare Route Behavior

The Compare route renders the compare surface using selected town ids from URL query parameters.

Supported query format:
- `/compare?town=adra&town=mojacar-playa`

The compare route supports 2 to 4 valid town slugs.

If fewer than 2 valid towns are provided, the compare page renders an empty compare state.

If more than 4 are provided, only the first 4 valid unique towns are used.

---

# 5. Domain Types

## 5.1 Canonical Town Type

```ts
export type Town = {
  id: string
  slug: string
  name: string
  region: 'west' | 'central' | 'cabo-de-gata' | 'east'
  type: 'city' | 'town' | 'village' | 'beach resort'
  coordinates: {
    lat: number
    lng: number
  }
  hero: {
    imageUrl: string
    alt: string
  }
  summary: {
    oneLiner: string
    shortDescription: string
    bestFor: string[]
    tradeoffs: string[]
  }
  pricing: {
    priceBandLabel: string
    avgPricePerSqm?: number
    marketPosition: 'value' | 'mid' | 'premium'
    typicalPropertyTypes: string[]
    buyerNote: string
  }
  lifestyle: {
    beachAccess: 'excellent' | 'good' | 'okay' | 'limited'
    yearRoundLiveliness: 'high' | 'medium' | 'low'
    internationalFeel: 'high' | 'medium' | 'low'
    walkability: 'high' | 'medium' | 'low'
    familyFit: 'high' | 'medium' | 'low'
    remoteWorkFit: 'high' | 'medium' | 'low'
  }
  access: {
    driveToAlmeriaMins?: number
    driveToAirportMins?: number
    nearestHospitalMins?: number
    beachWalkMins?: number
  }
  facts: {
    population?: number
    climateSummary?: string
    internetQuality?: 'good' | 'okay' | 'variable'
    practicalNotes?: string[]
    healthcareAccessNote?: string
  }
  highlights: Array<{
    title: string
    description: string
    type: 'beach' | 'area' | 'viewpoint' | 'daytrip' | 'food'
  }>
  editorial: {
    vibe: string
    whyChooseIt: string
    whoShouldAvoidIt?: string
    diningNote?: string
    nearbyOutingNote?: string
    topAreaNote?: string
  }
  metadata: {
    lastReviewed: string
    confidence: 'high' | 'medium' | 'low'
    sources: string[]
  }
}
```

## 5.2 Canonical CompareSnapshot Type

```ts
export type CompareSnapshot = {
  townId: string
  slug: string
  name: string
  priceBandLabel: string
  avgPricePerSqm?: number
  bestFor: string[]
  tradeoffs: string[]
  beachAccess: 'excellent' | 'good' | 'okay' | 'limited'
  driveToAirportMins?: number
  yearRoundLiveliness: 'high' | 'medium' | 'low'
  walkability: 'high' | 'medium' | 'low'
  internationalFeel: 'high' | 'medium' | 'low'
  remoteWorkFit: 'high' | 'medium' | 'low'
  marketPosition: 'value' | 'mid' | 'premium'
}
```

## 5.3 Filter State Type

```ts
export type ExplorerFilters = {
  search: string
  budget: 'all' | 'value' | 'mid' | 'premium'
  bestFor: 'all' | 'value-buyers' | 'year-round-living' | 'remote-work' | 'families' | 'beach-lifestyle'
  beachAccess: 'all' | 'excellent' | 'good' | 'okay' | 'limited'
  access: 'all' | 'under-30' | 'under-45' | 'under-60'
  liveliness: 'all' | 'high' | 'medium' | 'low'
}
```

## 5.4 UI Store Type

```ts
export type UIState = {
  selectedTownSlug: string | null
  isTownModalOpen: boolean
  isShortlistOpen: boolean
  hoveredTownSlug: string | null
  isMobileFilterOpen: boolean
}
```

## 5.5 Shortlist Store Type

```ts
export type ShortlistState = {
  townSlugs: string[]
}
```

---

# 6. Runtime Schemas

All town data must be validated at runtime with Zod before the application renders it.

## 6.1 Town Zod Schema

A `TownSchema` must be implemented to validate:
- enum values
- required fields
- optional fields
- max highlight length
- valid date string format for `metadata.lastReviewed`
- non-empty `metadata.sources`

## 6.2 Validation Rules

The following validation rules are mandatory:
- `summary.bestFor.length >= 1`
- `summary.tradeoffs.length >= 1`
- `highlights.length <= 3`
- `pricing.typicalPropertyTypes.length >= 1`
- `metadata.sources.length >= 1`
- `summary.oneLiner` length constrained for compact hero rendering
- `summary.shortDescription` length constrained for short paragraph rendering

## 6.3 Invalid Record Handling

If any town record fails validation during app startup or build, the build must fail.

No invalid town data may be shipped.

---

# 7. Data Storage and Loading

## 7.1 Data File

Town data is stored in `/src/data/towns.json`.

## 7.2 Data Loading Utilities

The following utilities are required:
- `loadTowns()`
- `loadTownBySlug(slug)`
- `getTownCompareSnapshot(town)`
- `getFilteredTowns(towns, filters)`
- `getRelatedTownSlugsForCompare(shortlist)`

## 7.3 Loading Rules

- town data loads on the server
- data is parsed and validated once at load time
- derived structures are built from validated town data only

## 7.4 Sorting Rules

Explorer town list default sort order:
- curated order from data source file

The application does not introduce automated ranking logic in Day 0.

---

# 8. URL State Design

## 8.1 Explorer URL Query Parameters

The Explorer route supports URL query parameters for shareable filter state.

Supported parameters:
- `search`
- `budget`
- `bestFor`
- `beachAccess`
- `access`
- `liveliness`

## 8.2 Town Selection State

Town selection in Explorer is represented in UI state only.

Standalone shareable town detail uses `/town/[slug]`.

## 8.3 Compare URL State

Compare uses repeated `town` query parameters.

Example:
- `/compare?town=adra&town=roquetas-de-mar&town=mojacar-playa`

---

# 9. State Management Design

## 9.1 Zustand Stores

Two stores are required.

### `uiStore`
Responsibilities:
- selected town slug
- modal open/closed state
- shortlist drawer open/closed state
- marker hover state
- mobile filter sheet open/closed state

### `shortlistStore`
Responsibilities:
- add slug to shortlist
- remove slug from shortlist
- check if a slug is shortlisted
- persist shortlist to localStorage
- expose compare-eligible slugs

## 9.2 Store Constraints

- shortlist length is not hard-limited in storage
- compare actions must only use the first 4 selected unique slugs
- shortlist persistence key must be versioned

Example storage key:
- `town-explorer-shortlist-v1`

## 9.3 Persistence Rules

- shortlist is hydrated client-side from localStorage
- UI store is not persisted

---

# 10. Explorer Screen Technical Design

## 10.1 Explorer Composition

`/app/page.tsx` renders:
- `<TopBar />`
- `<ExplorerLayout />`
- `<TownModal />`
- `<ShortlistDrawer />`

## 10.2 ExplorerLayout Responsibilities

`ExplorerLayout` composes:
- `FilterPanel`
- `TownList`
- `MapPanel`

It receives validated town data and current filter state.

## 10.3 FilterPanel Responsibilities

`FilterPanel` renders the five required filters:
- budget
- best for
- beach access
- access
- liveliness

Each filter writes to URL state.

## 10.4 TownList Responsibilities

`TownList` renders filtered towns.

`TownListCard` must:
- display required compact town info
- support click-to-open modal
- support shortlist toggle
- indicate shortlist state

## 10.5 Empty State

If filters return zero towns, the Explorer must render a recoverable empty state with:
- no results message
- reset filters action

---

# 11. Map Technical Design

## 11.1 Map Library

The map is implemented with Mapbox GL JS.

## 11.2 Map Container

`MapboxMap` is a client component and owns:
- Mapbox initialization
- map container lifecycle
- viewport configuration
- resize handling

## 11.3 Marker Rendering Strategy

Town markers are rendered from validated town data.

Each marker maps to a town slug.

## 11.4 Marker Component Contract

`TownMarker` props:

```ts
type TownMarkerProps = {
  town: Town
  isSelected: boolean
  isHovered: boolean
  onClick: (slug: string) => void
  onMouseEnter: (slug: string) => void
  onMouseLeave: () => void
}
```

## 11.5 Marker State Rules

### Default
- visible marker
- market position or category indicator

### Hover
- desktop only
- subtle scale adjustment
- optional preview card rendered via `MarkerPreviewCard`

### Selected
- one clear selected visual state
- no pulse loop
- no glow halo escalation

## 11.6 Marker Preview Card

`MarkerPreviewCard` is implemented for desktop hover support.

This item was optional in the UI spec and is included in Day 0 technical design.

The preview card displays:
- town name
- region
- price band
- one-line summary

The application must still be fully usable without hover.

## 11.7 Density Handling

If marker overlap becomes visually noisy, implement clustering.

This requirement is retained in the technical design.

## 11.8 Map Controls

`MapControls` includes:
- zoom in
- zoom out
- reset viewport

No additional GIS controls are included in Day 0.

---

# 12. Town Modal Technical Design

## 12.1 Modal Container

`TownModal` is a client component controlled by `uiStore`.

On desktop it renders as a centered modal.
On mobile it renders as a bottom sheet.

## 12.2 Modal Data Resolution

The modal resolves selected town data by slug from validated town records.

If selected slug is missing, the modal must close safely.

## 12.3 Modal Structure

`TownModal` composes:
- `TownModalHeader`
- `TownHeroSummary`
- `TownOverviewSection`
- `TownLivingSection`
- `TownPropertySection`
- `TownExploreSection`
- `TownModalActions`

## 12.4 Header Contract

`TownModalHeader` displays:
- town name
- region
- market position badge
- save button
- compare button
- close button

## 12.5 Hero Summary Contract

`TownHeroSummary` displays:
- hero image
- one-line summary
- price band badge
- beach access badge
- airport drive time badge

If airport drive time is absent, the badge must not render.

## 12.6 Overview Section Contract

`TownOverviewSection` displays:
- short description
- best-for chips
- tradeoff chips or bullets
- vibe summary
- four key facts

The four key fact slots are:
- price band
- beach walk time
- airport drive time
- year-round liveliness

Fallback behavior:
- if beach walk time is missing, render `Beach access` using the structured lifestyle value
- if airport drive time is missing, render `Airport access` using text `Check local travel times`

## 12.7 Living Section Contract

`TownLivingSection` displays:
- walkability
- international feel
- family fit
- remote work fit
- healthcare access note
- practical notes
- who should avoid it when present

The `whoShouldAvoidIt` item was optional in the UI/Data spec and is retained in the technical design.

If `whoShouldAvoidIt` is absent, omit the module row.

## 12.8 Property Section Contract

`TownPropertySection` displays:
- price band
- average €/sqm when available
- market position
- typical property types
- buyer note

The `avgPricePerSqm` item was optional in the data spec and is retained in the technical design.

If `avgPricePerSqm` is absent, render `Price per m²: unavailable`.

## 12.9 Explore Section Contract

`TownExploreSection` displays:
- up to 3 curated highlights
- top area note
- dining note
- nearby outing note

The `topAreaNote`, `diningNote`, and `nearbyOutingNote` items were optional editorial enrichments and are retained in the technical design.

Fallback behavior:
- if a note is absent, omit that note row
- highlights remain capped at 3

## 12.10 Modal Actions Contract

`TownModalActions` displays:
- Save to shortlist
- Compare
- Copy link

Copy link uses the standalone town route.

---

# 13. Standalone Town Page Technical Design

## 13.1 Page Composition

`/town/[slug]/page.tsx` renders:
- `TownHero`
- `TownSummary`
- `TownDetailSections`
- `CompareCTA`

## 13.2 Content Parity Rules

The town page must contain the same content categories as the town modal:
- overview
- living here
- property
- explore

## 13.3 Metadata

Each town page must set:
- page title using town name
- description using town summary
- canonical URL using the town slug

---

# 14. Compare Surface Technical Design

## 14.1 Page Composition

`/compare/page.tsx` renders:
- `CompareHeader`
- `CompareTable`

## 14.2 Input Resolution

The page resolves towns from repeated `town` query params.

The page must:
- deduplicate slugs
- retain original order
- ignore invalid slugs
- cap valid slugs at 4

## 14.3 Empty Compare State

If fewer than 2 valid towns are available, render:
- explanatory message
- link back to Explorer
- prompt to shortlist or compare towns

## 14.4 Compare Table Rows

Rows are rendered in this order:
1. price band
2. average €/sqm
3. best for
4. tradeoffs
5. beach access
6. airport access
7. year-round liveliness
8. walkability
9. international feel
10. remote work fit
11. market position

## 14.5 Missing Data Handling

If `avgPricePerSqm` is absent for a town, render `Unavailable`.

If `driveToAirportMins` is absent for a town, render `Check local travel times`.

---

# 15. Shortlist Technical Design

## 15.1 Store API

`shortlistStore` must expose:

```ts
type ShortlistStore = {
  townSlugs: string[]
  addTown: (slug: string) => void
  removeTown: (slug: string) => void
  toggleTown: (slug: string) => void
  hasTown: (slug: string) => boolean
  clear: () => void
  getCompareSlugs: () => string[]
}
```

## 15.2 Drawer Behavior

`ShortlistDrawer` opens from TopBar.

It shows:
- shortlisted towns in stored order
- remove action
- compare action
- empty state when no towns are shortlisted

## 15.3 Compare Action Behavior

The compare action pushes to `/compare` with up to 4 unique shortlisted town slugs.

---

# 16. Filter Algorithm Design

## 16.1 Filtering Pipeline

Filtering is applied in the following order:
1. search
2. budget
3. bestFor
4. beachAccess
5. access
6. liveliness

## 16.2 Search Fields

Search matches against:
- town name
- region
- summary.oneLiner
- summary.shortDescription
- editorial.vibe
- summary.bestFor values

Search is case-insensitive.

## 16.3 Budget Mapping

Budget filter maps to `pricing.marketPosition`.

## 16.4 Best For Mapping

Best for filter matches normalized `summary.bestFor` tag content.

A normalization utility is required.

## 16.5 Access Mapping

Access filter uses `access.driveToAirportMins`.

Thresholds:
- `under-30` => <= 30
- `under-45` => <= 45
- `under-60` => <= 60

If airport access is absent, the town does not match constrained access filters.

---

# 17. Mobile Technical Design

## 17.1 Mobile Layout Breakpoint

Use a single breakpoint strategy:
- mobile below 1024px
- desktop at 1024px and above

## 17.2 Mobile Explorer Behavior

On mobile:
- the map occupies the primary viewport
- the town list is rendered in a bottom drawer or sheet
- filters open in a dedicated sheet
- town detail renders as a bottom sheet

## 17.3 Bottom Sheet Requirements

The bottom sheet implementation must support:
- drag or explicit close action
- keyboard accessibility
- scrollable content area
- fixed action area for save and compare

---

# 18. Styling and Layout Rules

## 18.1 Visual Standard

The UI must be:
- clean
- low-noise
- spacing-led
- typography-driven
- calm in motion

## 18.2 Mandatory Layout Rules

- text must not crowd the map
- compare rows must remain scannable
- chips must wrap cleanly
- primary actions must remain visible on mobile
- hero image must not exceed the vertical footprint required for decision-first content

## 18.3 Motion Rules

Day 0 motion is minimal.

Allowed motion:
- subtle marker hover scale on desktop
- modal open/close transitions
- bottom sheet transitions

Disallowed motion:
- looping pulse states
- large glow animations
- noisy marker motion

---

# 19. Fallback and Degradation Rules

These rules are mandatory and are part of the shipped design.

## 19.1 Missing Optional Data

The technical design retains all optional items mentioned in the Day 0 spec and defines required fallback behavior for each.

### `pricing.avgPricePerSqm`
- show numeric value when present
- render `Unavailable` in compare
- render `Price per m²: unavailable` in town property section when absent

### `editorial.whoShouldAvoidIt`
- render when present
- omit row when absent

### `access.driveToAlmeriaMins`
- render when present on town page or future support surfaces
- omit when absent

### `access.driveToAirportMins`
- render when present
- render `Check local travel times` when absent in overview or compare fallback slot

### `access.nearestHospitalMins`
- render when present inside living facts context
- omit when absent

### `access.beachWalkMins`
- render numeric time when present
- fallback to structured `beachAccess` value when absent

### `facts.population`
- render when present in town page fact context
- omit when absent

### `facts.climateSummary`
- render when present in town page fact context
- omit when absent

### `facts.internetQuality`
- render when present in living context
- omit when absent

### `facts.practicalNotes`
- render list when present
- omit module when absent

### `facts.healthcareAccessNote`
- render when present
- render `Healthcare access varies by needs` when absent

### `editorial.topAreaNote`
- render when present in Explore section
- omit when absent

### `editorial.diningNote`
- render when present in Explore section
- omit when absent

### `editorial.nearbyOutingNote`
- render when present in Explore section
- omit when absent

### Desktop hover preview card
- implement for desktop
- do not rely on it for product comprehension
- omit entirely on mobile

### Marker clustering
- implement when density threshold is exceeded
- clustering does not alter data semantics

---

# 20. Accessibility Technical Design

## 20.1 Required Accessibility Behaviors

The application must provide:
- semantic buttons for interactive actions
- semantic headings in modal and page sections
- focus trapping inside modal and mobile bottom sheet
- keyboard-operable close actions
- keyboard-operable shortlist and compare actions
- visible focus rings
- aria labels on icon-only buttons
- alt text for hero imagery

## 20.2 Keyboard Flow Requirements

Users must be able to:
- tab through top bar controls
- tab through filters
- open a town from the list
- operate shortlist actions
- close the modal by keyboard
- operate compare controls by keyboard

---

# 21. Performance Technical Design

## 21.1 Core Requirements

The application must:
- avoid repeated parsing of town data on every render
- keep client stores small
- avoid expensive map reinitialization
- render markers efficiently
- keep modal content lightweight

## 21.2 Image Handling

Hero images must be optimized using Next image handling or equivalent.

Only one hero image is rendered in primary town detail UI.

## 21.3 Data Constraints

Hard content limits:
- max 3 highlights per town
- concise best-for tag set
- concise tradeoff set
- compare cap of 4 towns

## 21.4 Routing Constraints

Town modal open actions must not block on network fetches.

---

# 22. Testing Specification

## 22.1 Unit Tests

The following unit tests are required:
- town schema validation
- filter pipeline behavior
- compare snapshot generation
- shortlist store add/remove/toggle behavior
- URL query parsing utilities
- fallback formatter behavior

## 22.2 Integration Tests

The following integration tests are required:
- Explorer renders with validated town data
- filter changes update list results
- clicking a town list card opens modal
- clicking a marker opens modal
- shortlist state updates from modal and list card
- compare route resolves slugs correctly
- town page resolves from slug

## 22.3 End-to-End Tests

The following E2E scenarios are required:
1. user filters towns and opens a modal
2. user saves multiple towns to shortlist and opens compare
3. user opens standalone town page and copies the link
4. user uses mobile viewport and opens town bottom sheet
5. user compares towns with one missing optional field and sees correct fallback text

---

# 23. Acceptance Criteria

## 23.1 Explorer Acceptance Criteria

- Explorer renders all validated towns
- filters produce deterministic filtered output
- town list and map stay in sync
- no hover behavior is required for core usage

## 23.2 Modal Acceptance Criteria

- clicking a town from list or map opens modal
- modal renders all required Day 0 sections
- optional data fields use specified fallback behavior
- save, compare, and copy link actions work

## 23.3 Compare Acceptance Criteria

- compare supports 2 to 4 towns only
- invalid or duplicate slugs are ignored
- missing optional fields render required fallback copy

## 23.4 Town Page Acceptance Criteria

- each valid slug renders a standalone town page
- invalid slugs return 404
- page contains same core content categories as modal

## 23.5 Mobile Acceptance Criteria

- town detail opens in a bottom sheet on mobile
- primary actions remain visible and accessible
- the product is fully usable without hover

---

# 24. Build Order

Implementation proceeds in the following sequence.

## 24.1 Step 1: Types and Schemas

Implement:
- TypeScript domain types
- Zod schemas
- sample town data validation

## 24.2 Step 2: Data Utilities

Implement:
- load utilities
- compare snapshot utility
- filter utility
- query parsing utilities

## 24.3 Step 3: App Shell and Routing

Implement:
- Next app structure
- Explorer route
- Town route
- Compare route

## 24.4 Step 4: Explorer Surface

Implement:
- top bar
- filters
- town list
- shortlist trigger

## 24.5 Step 5: Map Surface

Implement:
- Mapbox map
- markers
- selection state
- desktop preview card
- clustering support when needed

## 24.6 Step 6: Town Detail

Implement:
- modal
- mobile bottom sheet
- all four detail sections
- fallback behavior

## 24.7 Step 7: Shortlist and Compare

Implement:
- shortlist store
- shortlist drawer
- compare route
- compare table

## 24.8 Step 8: Town Page

Implement:
- standalone town page
- metadata
- compare CTA

## 24.9 Step 9: Tests and Hardening

Implement:
- unit tests
- integration tests
- e2e tests
- accessibility checks
- performance review

---

# 25. Engineering Guardrails

The implementation agent must follow these guardrails.

## 25.1 No Scope Drift

Do not add:
- business directories
- live ratings
- animated pin theatrics
- data-heavy widgets
- history tabs
- map features not specified here

## 25.2 No Schema Drift

Do not rename or reshape core domain fields without updating:
- types
- Zod schemas
- loaders
- UI components
- tests

## 25.3 No Silent Fallback Drift

All optional items retained in this technical design must either:
- render their specified value
- render their specified fallback
- omit their specified row only where omission is explicitly required

## 25.4 No Unvalidated Data

All town data must pass runtime schema validation before use.

---

# 26. Final Technical Standard

The Day 0 implementation must ship a comparison-led, map-first town explorer with:
- typed validated town data
- a calm and reliable Explorer
- a stripped-down but complete Town Modal
- a standalone Town Page
- shortlist persistence
- normalized Compare support
- all retained optional items implemented with explicit fallback behavior

This technical design is the execution contract for implementation.

