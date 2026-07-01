# 🚀 Jomphop Frontend

A modern, scalable frontend application built with **Next.js**, powered by a robust stack for state management, form handling, UI, and developer experience.

---

## 🧰 Tech Stack

### Core

- **Next.js** – App framework for SSR, routing, and performance
- **React** – Component-based UI library
- **TypeScript** – Static typing for safer code

### Styling & UI

- **Tailwind CSS v4** – Utility-first styling with custom theme tokens
- **shadcn/ui** – Accessible and customizable UI components
- **Lucide React** – Clean, consistent icon system
- **Motion (Framer Motion)** – Animations and transitions
- **AOS (Animate On Scroll)** – Scroll-based animations

### State & Data Management

- **Redux Toolkit** – Global state management
- **React Redux** – React bindings for Redux
- **Redux Persist** – Persist state across sessions
- **TanStack React Query** – Server state management & caching

### Forms & Validation

- **React Hook Form** – Performant form handling
- **Zod** – Schema-based validation

### Developer Experience

- **pnpm** – Fast, disk-efficient package manager
- **Prettier** – Code formatting
- **Husky** – Git hooks automation
- **lint-staged** – Run linters on staged files

---

## 📦 Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd jomptrade
```

---

### 2. Install dependencies

```bash
pnpm install
```

---

### 3. Run development server

```bash
pnpm dev
```

App will be available at:

```
http://localhost:3000
```

---

## 🛠️ Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Run production server
pnpm lint       # Run ESLint
pnpm lint:fix   # Fix lint issues
pnpm format     # Format code with Prettier
```

---

## 🧪 Git Hooks (Husky)

This project uses **Husky + lint-staged** to enforce code quality.

### On commit:

- ESLint runs on staged files
- Prettier formats code automatically

If hooks fail, the commit is blocked.

---

## 🎨 Styling System

Tailwind v4 with **custom theme tokens**:

```css
@theme {
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
  --color-bermuda: #78dcca;
}
```

Use them via utility classes:

```html
bg-midnight text-tahiti border-bermuda
```

---

## 🧩 Architecture Overview

```
src/
│
├── app/                # Next.js app directory
├── components/         # Reusable UI components
├── features/           # Domain-based modules (auth, shop, admin, etc.)
├── lib/                # Utilities (formatters, helpers)
├── store/              # Redux store setup
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
```

---

## 🔐 State Management

- **Redux Toolkit** for global UI/auth state
- **React Query** for API/server state

👉 Separation ensures:

- Cleaner architecture
- Better caching & performance

---

## 📋 Forms & Validation

Forms are built with:

- `react-hook-form` for handling input state
- `zod` for schema validation

Example:

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

---

## 🎬 Animations

- **Motion** → component-level animations
- **AOS** → scroll-triggered animations

---

## 📦 Icons

Using **Lucide React**:

```tsx
import { ShoppingCart } from 'lucide-react';
```

---

## 🧼 Code Quality

- ESLint for linting
- Prettier for formatting
- Husky for enforcing rules before commits

---

## 🚀 Deployment

Build the app:

```bash
pnpm build
pnpm start
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit (hooks will run)
4. Push and open a PR

---

## 📄 License

This project is private and intended for internal use.

---

## ✨ Notes

- Tailwind v4 uses **@theme tokens**, not config-based colors
- Prefer **React Query for API state**, Redux only for global UI/state
- Keep components **modular and reusable**

---

---

######

Main contains the latest on live

###

Dev contains development staging is in process
