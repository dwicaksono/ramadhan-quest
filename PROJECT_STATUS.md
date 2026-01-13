# 🌙 Ramadan Quest - Project Status & Roadmap

![Ramadan Quest Logo](./public/app-icon.jpg)

## 📊 Current Status (Week 2 Complete)

We have successfully completed the **Core Features Phase** (Week 2), deepening the mechanics and interactions across all modules.


### ✅ Completed Features
1.  **Project Architecture**
    *   Set up Mobile-First PWA structure (Max-width 430px).
    *   Integrated **Pinia** for state management with `LocalStorage` persistence.
    *   Configured **Tailwind CSS** with a semantic color palette (Islamic Green, Warm Gray, Gold).

2.  **Core Logic (Stores & Composables)**
    *   **Game Engine:** Tracks XP, Level, Energy (Faidth), Coins, and Streak.
    *   **Wallet:** Logic for THR budgeting and suggested allocations.
    *   **Kitchen:** Recipe filtering (Sahur/Buka) and details from static JSON.
    *   **Habit Tracker:** Daily quest system with checklist logic.

3.  **User Interface (MVP)**
    *   **Home Dashboard:** Bento-grid style layout with Character Status, Daily Quests, and Quick Actions.
    *   **Kitchen Page:** Searchable recipe list with "Cook" action placeholders.
    *   **Wallet Page:** Interactive THR budget input and allocation visualization.
    *   **Profile Page:** User stats (XP/Coins) and settings.
    *   **Global Notifications:** Stacked toast notifications for feedback (via `vue-sonner`).

4.  **Data**
    *   Integrated ~40 static recipes for Sahur and Buka (`recipes.json`).

---

## 🗺️ Next Steps: Week 2 (Core Features)

The focus for the upcoming week is to deepen the mechanics and interactions.

### 1. Habit Tracker (Deep Dive)
*   [x] Expand the Home widget into a full **Habit Page**.
*   [x] Add categories: Spiritual (Sholat, Tilawah) vs Social (Sedekah).
*   [x] Implement **XP Reward Animations** when checking off habits.

### 2. Kitchen & Cooking Mechanism
*   [x] Connect "Masak" (Cook) button to Game State (Restore Energy/Mood).
*   [x] Create a **Recipe Detail Modal** showing ingredients and steps.
*   [x] *Monetization Logic:* Add "Beli Bahan" button (Affiliate link placeholder).

### 3. Wallet & THR Manager
*   [x] Implement **"Pecahan Uang" (Money Breaker)** logic to help users organize physical cash.
*   [x] Add "Tabung" feature: Converting budget savings into Game Coins.

### 4. Game Integration
*   [x] **Level Up System:** Visual feedback when XP threshold is reached.
*   [x] **Streak System:** Logic to reset streak if user is inactive.
*   [x] **Character States:** Dynamic emoji changes based on Energy/Mood (Sleepy, Happy, Energetic).

---

---

## 🗺️ Next Steps: Week 3 (Economy & Polish) - PROPOSED

Now that the core loops (earning XP/Coins) are active, we need to provide ways to **spend** coins and manage user data.

### 1. The Marketplace ("Toko")
*   [ ] **Inventory System:** UI to view purchased items.
*   [ ] **Item Shop:** Buy virtual items (e.g., decorations, new recipe books) with Coins.
*   [ ] **Gacha/Sedekah Box:** Spend coins for random rewards or "spiritual" buffs.

### 2. User Settings & Data
*   [ ] **Profile Edit:** Change name, avatar (if multiple options).
*   [ ] **Data Persistence:** Export/Import JSON data (since we are using LocalStorage).
*   [ ] **Reset Progress:** "Danger Zone" to reset game state.

### 3. Sound & Haptics
*   [ ] **BGM & SFX:** Add subtle background music and sound effects for actions (cooking, level up).
*   [ ] **Haptic Feedback:** Vibrations on mobile devices for tactile feel.

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
