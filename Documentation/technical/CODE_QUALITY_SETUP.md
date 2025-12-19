# Code Quality Setup Guide

This document explains the automated code quality system implemented in the project.

## 📋 Overview

The project uses a **3-layer validation system** to ensure code quality:

1. **Pre-commit hooks** - Fast checks on staged files only
2. **Pre-push hooks** - Full TypeScript validation before pushing
3. **GitHub Actions** - CI/CD checks on pull requests

## 🛠 Tools Used

### ESLint

- Lints JavaScript and TypeScript code
- Enforces React best practices
- Configuration: `.eslintrc.json`
- Rules: Recommended React + TypeScript rules, warnings for `any` types

### Prettier

- Enforces consistent code formatting
- Configuration: `.prettierrc`
- Settings: 2 spaces, 100 char line width, single quotes, semicolons

### TypeScript

- Static type checking
- Configuration: `tsconfig.json`
- Ensures type safety across the codebase

### Husky + lint-staged

- Git hooks for automated validation
- `lint-staged` runs checks only on staged files (fast)
- Configuration in `package.json`

## 📦 Installation

### Initial Setup

```bash
# Install dependencies
yarn install

# Initialize Husky (one-time setup)
yarn husky install

# Make hooks executable (if needed on Unix-based systems)
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Verify Setup

```bash
# Check that hooks are in place
ls -la .husky/

# You should see:
# - pre-commit
# - pre-push
# - _/husky.sh (created by Husky)
```

## 🔄 Workflow

### 1. Pre-Commit Hook (Fast)

**Triggered:** When you run `git commit`

**What it does:**

- Runs ESLint on staged `.ts` and `.tsx` files
- Runs Prettier on staged files
- Only checks files you're committing (fast!)

**Configuration** (`package.json`):

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix"],
    "*.{ts,tsx,js,jsx,json,css,scss,md}": ["prettier --write"]
  }
}
```

**If checks fail:**

- Commit is aborted
- Fix issues and try again
- Auto-fix available for most issues

### 2. Pre-Push Hook (Comprehensive)

**Triggered:** When you run `git push`

**What it does:**

- Runs full TypeScript type check across entire project
- Catches type errors before pushing to remote

**If checks fail:**

- Push is aborted
- Fix TypeScript errors
- Try pushing again

### 3. GitHub Actions (Safety Net)

**Triggered:** When a PR is opened/updated targeting `main`, `dev`, or `stg`

**What it does:**

1. Checks out code
2. Installs dependencies
3. Runs ESLint
4. Runs Prettier format check
5. Runs TypeScript type check
6. Comments results on PR
7. Fails workflow if any check fails

**Workflow file:** `.github/workflows/pr-quality-check.yml`

## 📜 Available Scripts

```bash
# Lint code
yarn lint              # Check for linting issues
yarn lint --fix        # Auto-fix linting issues

# Format code
yarn format            # Format all files with Prettier
yarn format:check      # Check if files are formatted (CI)

# Type checking
yarn typecheck         # Run TypeScript compiler checks

# Run all checks
yarn validate          # Run lint + format:check + typecheck
```

## 🚨 Common Issues & Solutions

### Issue: Pre-commit hook not running

**Solution:**

```bash
# Reinitialize Husky
yarn husky install

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Issue: ESLint errors on commit

**Solution:**

```bash
# Run lint with auto-fix
yarn lint --fix

# If issues remain, fix manually and commit
```

### Issue: Prettier formatting conflicts

**Solution:**

```bash
# Format all files
yarn format

# Add formatted files
git add .

# Try commit again
git commit -m "your message"
```

### Issue: TypeScript errors on push

**Solution:**

```bash
# Run typecheck to see all errors
yarn typecheck

# Fix errors in your editor
# Common fixes:
# - Add proper types
# - Fix type mismatches
# - Add type assertions where safe

# Try push again
git push
```

### Issue: Want to bypass hooks temporarily

**⚠️ Not recommended, but available:**

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook
git push --no-verify
```

**Note:** Bypassing hooks means code quality checks are skipped. GitHub Actions will still run on PRs.

## 🎯 Best Practices

### 1. Fix Issues Early

- Don't wait for hooks to fail
- Run `yarn lint` and `yarn typecheck` during development
- Use editor extensions (ESLint, Prettier) for real-time feedback

### 2. Commit Often

- Small, focused commits are easier to validate
- Pre-commit hooks are faster on fewer files

### 3. Keep Dependencies Updated

```bash
# Update ESLint, Prettier, TypeScript regularly
yarn upgrade-interactive --latest
```

### 4. Configure Your Editor

**VS Code** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "typescriptreact"]
}
```

## 🔧 Customization

### Adding New ESLint Rules

Edit `.eslintrc.json`:

```json
{
  "rules": {
    "your-rule-name": "error"
  }
}
```

### Changing Prettier Settings

Edit `.prettierrc`:

```json
{
  "printWidth": 120, // Example: increase line width
  "semi": false // Example: remove semicolons
}
```

### Modifying Lint-Staged

Edit `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.css": ["prettier --write"]
  }
}
```

## 📊 Metrics & Monitoring

### Check Code Quality Locally

```bash
# See ESLint report
yarn lint

# See formatting issues
yarn format:check

# See TypeScript errors
yarn typecheck
```

### GitHub Actions Results

- Check the "Actions" tab in GitHub
- Each PR shows quality check results
- Failed checks block merging (if branch protection enabled)

## 🆘 Getting Help

- **ESLint Errors:** Check [ESLint Rules](https://eslint.org/docs/rules/)
- **Prettier Issues:** See [Prettier Options](https://prettier.io/docs/en/options.html)
- **TypeScript Errors:** Read [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- **Husky Problems:** Visit [Husky Documentation](https://typicode.github.io/husky/)

## 📝 Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Review and update ESLint rules
- [ ] Check for new Prettier options
- [ ] Update TypeScript version
- [ ] Test hooks after major updates

### After Major Dependency Updates

```bash
# Reinstall and reinitialize
yarn install
yarn husky install

# Test the setup
git add .
git commit -m "test: verify hooks work"
```

---

**Last Updated:** Sprint 16  
**Maintained By:** Development Team
