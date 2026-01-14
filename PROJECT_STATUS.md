# 🌙 Ramadan Quest - Project Status & Roadmap

![Ramadan Quest Logo](./public/app-icon.jpg)

## 📊 Current Status (Week 4 Completed)

We have successfully refined the Home Page into a **"Super App" Dashboard**, integrating Ramadhan utilities directly into the game loop.

### ✅ Completed Features
1.  **Immersive UI & Theming**
    *   **Global Dark Mode:** Full support for "True Black" dark mode.
    *   **Color Harmonization:** Unified app color scheme to **Lime Primary**.
    *   **Live Elements:** Added **Prayer Countdown** (e.g., "Isya in 01:23:45") and **Floating XP** animations.

2.  **Ramadhan Utilities (Home Page)**
    *   **Prayer Guide 📖:** Modal with Niat Puasa, Doa Berbuka, and Tarawih (Arabic + Latin).
    *   **Sedekah Logger 🤝:** FAB with "Select & Confirm" chips to log charity.
    *   **Smart Fasting Logic:** "Log Water" locked during fasting hours; unlocks at Maghrib.

3.  **Core Connectivity**
    *   **Adzan Engine:** Integrated `adhan` library for accurate prayer times.
    *   **GPS Detection:** Auto-detects user location for precise Jadwal Sholat.
    *   **Settings:** Persistence for location and calculation methods.

---

## 🎮 Game Mechanics & Context (The "Ramadhan" Logic)

To ensure the app feels authentic to the fasting experience, specific mechanics apply:

### 1. Hydration Logic (The 2-4-2 Rule)
*   **Context:** Muslims fast (no food/drink) from **Subuh** to **Maghrib**.
*   **Mechanic:** The "Log Water" feature is **LOCKED** during the day (Fasting Hours).
*   **Goal:** Users must drink 8 glasses during the **Open Window** (Maghrib to Subuh).
    *   Start: Maghrib (Iftar) - 2 Glasses.
    *   Night: Tarawih/Night - 4 Glasses.
    *   End: Subuh (Sahur) - 2 Glasses.

---

## 🗺️ Next Steps: Week 5 (Gamification Logic)

The Home Page is polished. We now shift focus to **Core Game Loop** and **Progression** to make the app addictive.

### 1. Gamification Deep Dive
*   [ ] **Leveling System:** Define XP thresholds (e.g., Level 1 -> 2 needs 100 XP).
*   [ ] **Badges/Achievements:** Visual rewards for milestones (e.g., "7 Day Streak", "Donator").
*   [ ] **Leaderboard (Mock):** Simple friend ranking to encourage competition.

### 2. Content Expansion
*   [ ] **More Habits:** Expand library for "Ramadhan" specific habits (Tarawih, Sedekah).
*   [ ] **Quran Reading Tracker:** Simple counter for Juz/Halaman read.

### 3. Deployment & Release
*   [ ] **Build Production:** Run final build command.
*   [ ] **Deployment:** Deploy to Vercel/Netlify.


---

## 🛠️ Technical Stack
*   **Framework:** Vue 3 + TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **State:** Pinia
*   **PWA:** vite-plugin-pwa

---

## 📝 Development Guidelines

To maintain code quality and scalability, please adhere to the following rules:

1.  **♻️ Reusable Components**:
    *   Always extract repeated UI patterns into separate components (e.g., `BaseButton`, `BaseCard`).
    *   Keep components focused on presentation; avoid coupling them tightly to specific business logic if possible.

2.  **🧠 Separate Business Logic (Composables)**:
    *   Move complex logic, state management, and API calls into **Composables** (e.g., `useWallet`, `useGameStore`).
    *   Components should primarily handle rendering and user events, delegating actions to composables.

3.  **🛠️ Utils for Global Functions**:
    *   Pure functions that don't rely on Vue state should go into `src/utils/` (e.g., currency formatters, date helpers).
    *   This ensures they are testable and reusable anywhere in the app.

4.  **🛡️ Type Safety (TypeScript)**:
    *   **Strict Typing**: Avoid using `any`. Define interfaces/types for all data structures (e.g., `Recipe`, `GameState`).
    *   **Props & Emits**: Use `defineProps<{...}>()` and typed emits for clear component contracts.
