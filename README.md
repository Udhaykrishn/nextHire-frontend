<p align="center">
  <a href="https://nexthire.shop" target="blank"><img src="https://nextjs.org/static/favicon/next-logo.svg" width="120" alt="NextHire Logo" /></a>
</p>

# NextHire Frontend

The high-performance, visually stunning frontend for the NextHire recruitment platform. Built with **Next.js 14 (App Router)** and following the **Kraken Design System**, it delivers a premium, fintech-inspired user experience.

## ✨ Features

- **Fintech Identity**: Authoritative, "Wise-inspired" aesthetics using the Kraken Design System.
- **Micro-Interactions**: Fluid animations powered by **Framer Motion** and **Animate UI**.
- **Modern Data Fetching**: Optimized state management with **TanStack Query** and **Zustand**.
- **Strict Quality**: Automated linting and formatting via **Biome** with a **zero-error** policy.
- **Accessibility**: WCAG-compliant interactive components.

## 🚀 Teck Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS (Modern CSS Modules & Layout Primitives)
- **Animations**: [Animate UI](https://animate-ui.com/) & [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Language**: TypeScript (Strict Mode)
- **Runtime**: [Bun](https://bun.sh/)
- **Linting**: [Biome](https://biomejs.dev/)

## 🧱 Directory Structure

- **src/app**: Next.js App Router pages and layouts.
- **src/modules**: Feature-specific modules (auth, profile, jobs, etc.) containing localized logic and components.
- **src/components**: Shared, reusable UI components (common, navbar, footer).
- **src/ui**: Low-level, high-performance UI primitives (locked for modification).
- **src/services**: API communication layer.
- **src/stores**: Global state definitions.
- **src/types**: Centralized TypeScript definitions.

## 🛠️ Project Setup

### Installation
```bash
$ bun install
```

### Development
```bash
$ bun run dev
```

### Production Build
```bash
$ bun run build
$ bun run start
```

## 🛡️ Guidelines & Quality

- **Zero `any`**: TypeScript strictness is enforced. All `any` usage is prohibited.
- **No Linter Suppression**: `biome-ignore` is banned. All code quality issues must be refactored.
- **UI Lockdown**: Files in `src/ui` and `src/components/animate-ui` are core libraries and must not be modified locally.
- Refer to [AGENTS.md](./AGENTS.md) for full compliance details.

## 📄 License

NextHire Frontend is [MIT licensed](./LICENSE).
