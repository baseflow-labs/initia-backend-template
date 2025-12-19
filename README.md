# initia-backend-template

A backend application for initia-backend-template, auto generated with Raven Nest tool, with modern TypeScript and React-based tooling.

## 🚀 Getting Started

### 1. Clone & Install

```bash
  git clone <repo-url>
  cd <repo-directory>
  yarn   # or npm install
```

### 2. Environment Setup

- Copy .env.example to .env
- Fill in required environment variables

### 3. Run the App in dev Mode

```bash
  yarn start:dev
```

### 4. Build for Production

```bash
  npm run build
  npm run start:prod
```

## 🛠 Development Notes

### 📦 Project Structure

src/
documentation/
dto/
entities/
enums/
helpers/
pipes/
schemas/
types/

### 💬 Commit Message Convention

We follow the Conventional Commits format with enforced scope per service/module.

📘 See full guide here: [COMMIT_CONVENTION.md](./src/documentation/COMMIT_CONVENTION.md)

Example:

feat(auth): implement login via OTP
fix(user): fix avatar cropping on mobile

### ✅ Git Hooks & Code Quality

- ✅ Prettier formatting (npm run format)
- ✅ ESLint for linting (npm run lint)
- ✅ Git hooks (optionally with Husky)
- ✅ Commit messages follow Conventional Commits

### 💬 [ChangeLog](./src/documentation/CHANGELOG.md)

### 🧪 Optional Scripts

```bash
  yarn start:dev           # Start dev server
  yarn build               # Build for production
  yarn commit              # Use Commitizen to write formatted commits

```

### 🔐 Environment Profiles

| Profile | Description               |
| ------- | ------------------------- |
| `.env`  | Default/local development |

### 📤 Deployment

- To deploy: push to your prod branch or follow your CI/CD pipeline.

### 🧰 Tooling & Stack

#### 🖥 Frameworks & Libraries

- NestJS v11
- TypeORM v0.3
- Postgres support
- JWT Auth
- Swagger for API docs

#### 🖥 Developer Tools

- TypeScript
- ESLint
- Prettier
- Commitlint + Conventional Commits

### 🧠 Maintainers

- [Mustafa](https://github.com/MustafaHasanat) — RavenNest Owner & Lead Developer
- [Makkahwi](https://github.com/makkahwi) — RavenNest Co-Owner & Lead Developer
