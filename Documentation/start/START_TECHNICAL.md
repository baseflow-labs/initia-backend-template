# Getting Started – Technical Guide

This guide is intended for **frontend developers** who want to customize, extend, and maintain the Initia frontend dashboard professionally.

You are expected to be familiar with:

- Git & GitHub
- React + TypeScript
- Modern frontend tooling

---

## 1. Open-Source Usage & Support

This project is **free and open-source**, but actively maintained.

If you plan to:

- use this template in production
- build commercial products on top of it
- extend or fork it long-term

Please support the project:

- ⭐ Star this repository
- ⭐ Star the GitHub organization
- 💖 Donate if possible (one-time or recurring)

This directly impacts maintenance, fixes, and future features.

---

## 2. Prerequisites

Ensure the following are installed:

- **Node.js** (LTS recommended)
- **npm** or **yarn**
- **Git**

Verify:

```bash
node -v
npm -v
git --version
```

## 3. Fork & Clone the Repository

Fork the repository to your GitHub account, then clone it locally:

```bash
git clone <your-fork-url>
cd initia-frontend
npm install
```

## 4. Run the App Locally

Copy .env.example to .env and adjust any necessary environment variables.
Start the development server:

```bash
npm run dev
```

Vite will start a fast dev server with hot module replacement (HMR).

Default URL:
http://localhost:3000

## 5. Project Structure Overview

src/
├─ api/ # API service layers (Axios-based)
├─ assets/ # Static assets & localization files
├─ components/ # Reusable UI components
├─ documentation/ # Internal project docs
├─ layouts/ # Page layouts (auth, public, etc.)
├─ store/ # Redux store & slices
├─ styles/ # Global styles & theme overrides
├─ types/ # Shared TypeScript types
├─ utils/ # Helper utilities
├─ views/ # Route-level views (pages)

This structure is intentional and should be preserved.

## 6. Creating New Features (Recommended Pattern)

Do not start from scratch. Use existing features as templates.

### Recommended workflow:

1. Duplicate an existing view from:

```bash
src/views/auth/templateExamples/datatablePage
```

2. Duplicate its API service from:

```bash
src/api/datatablePageExample.ts
```

3. Register the new route in the router configuration
4. Add the navigation entry if required
5. Add localization keys for all enabled languages

### Forms & Tables

- Forms are schema-driven
- Tables are configuration-driven
- CRUD flows follow consistent patterns

Refer to demo routes inside the app for reference implementations.

## 7. Localization & RTL Support

Localization is handled via i18next.

Locale files are located at:

```bash
src/assets/locales/
  ├─ en.json
  ├─ ar.json
```

When adding new keys:

- Add keys to all enabled locale files
- Keep keys consistent across languages

Optional extraction (if enabled):

```bash
src/assets/locales/
npm run extract-translation
```

RTL (Right-to-Left) support is enabled automatically when Arabic, Urdu or similar languages are active.

## 8. Global Configuration

The application uses a centralized configuration file to control:

- Enabled locales
- Default language
- Application name
- Theme colors
- Navbar layout (vertical / horizontal)
- Fallback assets (logos, language)

Avoid hardcoding these values elsewhere in the codebase.

## 9. State Management

- Redux Toolkit is used for state management
- Slices are organized by domain
- Async logic belongs in service layers, not components

When adding new state:

- Create a new slice
- Register it in the store
- Expose typed selectors

## 10. Commit Convention (Required)

This repository enforces Conventional Commits.

Commits that do not follow the convention will be rejected.

Full guide:

```bash
src/documentation/COMMIT_CONVENTION.md
```

Examples:

```bash
feat(auth): add OTP login
fix(user): resolve avatar upload issue
refactor(table): simplify column renderer
```

## 11. Scripts & Commands

```bash
    npm run dev # Start dev server
    npm run build # Production build
    npm run preview # Preview build locally
    npm run extract-translation
    npm run commit # Commitizen helper
```

## 12. Build for Production

```bash
    npm run build
```

The output will be generated in:

```bash
build/
```

This directory is ready for deployment to static hosting providers.

## 13. Deployment Targets

This frontend can be deployed to:

- [Vercel](../deployments/VERCEL.md) (recommended)
- [Netlify](../deployments/NETLIFY.md)
- [AWS Amplify](../deployments/AMPLIFY.md)
- Any static hosting provider

No server-side rendering is required.

## 14. Updating & Maintaining Your Fork

To keep your fork up to date with upstream changes:

```bash
git remote add upstream <original-repo-url>
git fetch upstream
git merge upstream/main
```

Resolve conflicts carefully, especially in:

- Configuration files
- Localization files
- Shared components

## 15. Contributing Back

Contributions are welcome, especially for:

- Bug fixes
- Documentation improvements
- Accessibility enhancements
- Performance optimizations
- Translations

Open a pull request against the main repository.

### Final Notes

This template is designed to be:

- Opinionated
- Scalable
- Maintainable
- Generator-friendly

Treat it as production code, not a demo.

If you rely on this project, please consider supporting it.

If you want next:

- Arabic technical guide
- auto-generated version of this per project
- split into FE-only vs full-stack
- convert to docs site (Docusaurus / VitePress)

Say the word.
