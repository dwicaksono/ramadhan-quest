# 🌙 Ramadan Quest - Project Status & Roadmap

![Ramadan Quest Logo](./public/app-icon.jpg)

## 📊 Current Status (Week 4 In-Progress)

We have significantly enhanced the app with **Global Theming**, **Prayer Times Utility**, and **Settings Integration**.

### ✅ Completed Features
1.  **Immersive UI & Theming**
    *   **Global Dark Mode:** Full support for "True Black" dark mode across all pages.
    *   **Color Harmonization:** Unified app color scheme to **Lime Primary** (from Emerald/Green).
    *   **Adaptive Components:** All cards and buttons adapt seamlessly to theme changes.

2.  **Core Utilities (Prayer Times)**
    *   **Adzan Engine:** Integrated `adhan` library for offline, accurate calculation.
    *   **Smart Location:** Auto-detects GPS coordinates or falls back to Jakarta defaults.
    *   **Methods:** Support for 10+ calculation standards (Kemenag, MWL, etc.).

3.  **Settings & User Control**
    *   **Profile Dashboard:** Added dedicated settings for Location and Calculation Methods.
    *   **Notifications:** Implemented Web Notification permission request flow.
    *   **Persistence:** All preferences saved to LocalStorage.

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

## 🗺️ Next Steps: Week 5 (Gamification & Engagement)

The foundation is solid. Now we focus on keeping the user engaged long-term.

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
