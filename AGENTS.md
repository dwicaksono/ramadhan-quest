# 🤖 AGENTS.md - Context & Standards

> **Read this first.** This document serves as the "Source of Truth" for all AI Agents working on **Ramadhan Quest**. It defines the tech stack, design system, game mechanics, and working standards.

---

## 1. Project Identity 🌙
**Ramadhan Quest** is a "Super App" PWA for Ramadhan that gamifies worship and productivity.
*   **Vibe:** Modern Islamic, Minimalist, "Bento Grid", Premium, immersive.
*   **Core Loop:** Users track habits (Ibadah) & hydration -> Earn XP -> Level Up Tamagotchi-style character.
*   **Platform:** Mobile-First PWA (Installable).

---

## 2. Tech Stack 🛠️

### Core Framework
*   **Vue 3** (Composition API, `<script setup>`)
*   **Vite** (Build Tool)
*   **TypeScript** (Strict Mode)

### State & Logic
*   **Pinia**: Store for global state (Game, Wallet, Market).
*   **VueUse**: `@vueuse/core` for reactive primitives (`useStorage`, `useNow`, `useDark`).
*   **Adhan**: `adhan` library for offline Prayer Times calculation.

### Styling & UI
*   **Tailwind CSS**: Core utility-first framework.
*   **Lucide / Heroicons**: Iconography (via SVG or components).
*   **Sonner**: Toast notifications (`vue-sonner`).
*   **CSS Variables**: Used for theming (`:root` in `style.css`).

### PWA
*   **vite-plugin-pwa**: Handles Service Worker and Manifest generation.

---

## 3. Design System 🎨

### Color Palette (Tailwind)
We use a **Lime** primary palette for a fresh, energetic Islamic feel, paired with a **True Black** dark mode.

| Token | Class | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `primary-500` | `#84cc16` (Lime-500) | Main actions, highlights, active states. |
| **Surface** | `white` | `#ffffff` | Card backgrounds (Light Mode). |
| **Dark BG** | `bg-[#050505]` | `#050505` | Global Background (Dark Mode). |
| **Dark Card** | `bg-[#121212]` | `#121212` | Card/Panel Backgrounds (Dark Mode). |
| **Text** | `secondary-900` | `gray-900` | Primary Text. |

### UI Components (Bento Style)
*   **BaseCard**: Glass-morphism support (`backdrop-blur`), rounded-xl.
*   **Buttons**: Adaptive variants (Primary, Secondary, Ghost).
*   **Typography**: Clean sans-serif (Inter/Outfit).

---

## 4. Game Mechanics 🎮

### Hydration System (The "2-4-2" Rule)
*   **Concept**: Users must drink 8 glasses of water between Maghrib and Subuh.
*   **Fasting Window (Subuh - Maghrib)**:
    *   State: **LOCKED**.
    *   Action: Disable logging, show "Sedang Puasa".
*   **Open Window (Maghrib - Subuh)**:
    *   State: **UNLOCKED**.
    *   Action: Allow logging w/ XP Reward (+5 XP/glass).

### Prayer Integration
*   **Engine**: Client-side calculation (privacy-first, battery-efficient).
*   **Defaults**: "Jakarta", "Singapore Method".
*   **User Override**: Manual Location Name + GPS Coordinate update.

---

## 5. Agent Standards (MCP Usage) 🤖

### Working Principles
1.  **Mobile First**: Always assume the user is on a phone.
2.  **Offline First**: Prefer local logic (Adhan lib) over APIs.
3.  **Strict Typing**: No `any`. Use interfaces in `src/types/`.

### Recommended MCPs
*   **Filesystem**: Essential for reading/writing code.
*   **Browser**: For verifying UI responsiveness (if available).
*   **Postgres/Neon**: (Future) If backend sync is implemented.

### File Structure
```
src/
├── components/
│   ├── base/       # Reusable atoms (BaseButton, BaseCard)
│   ├── home/       # Home-specific widgets (QuickActions, DateHeader)
│   └── ...
├── composables/    # Business logic (useAudio, usePrayerTimes)
├── stores/         # Global State (game.ts)
└── types/          # TS Interfaces
```

Update this file when major architectural decisions are made.
