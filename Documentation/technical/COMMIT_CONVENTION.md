# 🧾 Commit Message Convention

To maintain a clean, readable Git history and support automated tools like versioning, changelogs, and CI workflows, we follow the **Conventional Commits** standard.

## ✅ Format

(type)(scope): (description)

- **type**: the category of change (required)
- **scope**: the affected module or feature (required)
- **description**: a brief, imperative summary of the change (required)

---

## 🎯 Allowed Commit Types

| Type       | Description                               |
| ---------- | ----------------------------------------- |
| `feat`     | A new feature                             |
| `fix`      | A bug fix                                 |
| `build`    | Build system or dependency changes        |
| `chore`    | General maintenance (e.g., config tweaks) |
| `docs`     | Documentation-only changes                |
| `style`    | Code style, formatting (no logic changes) |
| `refactor` | Code refactoring (no new features/fixes)  |
| `perf`     | Performance improvements                  |
| `test`     | Adding or updating tests                  |
| `revert`   | Reverting a previous commit               |

---

## 📝 Examples

feat(auth): add password reset functionality

fix(dashboard): resolve NaN chart bug

docs(code): update README with env setup instructions

style(code): format utils.ts using Prettier

build(aids): upgrade Node.js to v18 in CI pipeline

---

## 📦 Scoped Commit Messages

Every commit must specify a **service/module name** in parentheses after the type.

### 🎯 Allowed Scopes

- `auth`
- `users`
- `dashboard`
- `settings`
- `notifications`
- `common`
- `code`

### ✅ Examples

feat(auth): add OTP login flow

fix(aids): prevent double application

chore(code): update docker image name

---

## ❌ Common Mistakes to Avoid

- ⛔ `Updated code` → Not valid (missing type and format)
- ⛔ `Bug fixes` → Should be: `fix(module): describe the fix`
- ⛔ `Fix login` → Better: `fix(auth): fix login redirect issue`

---

## 💡 Tips

- Keep the summary short (under 72 characters).
- Use **imperative tone** (e.g., “add” not “added”).
- Use `yarn commit` (Commitizen) to follow the format easily.

---

## 🔒 Enforced By

This format is **automatically validated** on commit using:

- `Husky` Git hook: `.husky/commit-msg`
- `Commitlint` config: `commitlint.config.js`

Badly formatted commits will be blocked.

---
