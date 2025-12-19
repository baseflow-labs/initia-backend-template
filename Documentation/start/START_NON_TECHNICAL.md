# Getting Started (Non-Technical Guide)

This guide is for:

- Founders
- Students
- Product managers
- Anyone without a strong programming background

## You do **not** need to be a developer to follow this.

---

## Step 1: Create a GitHub Account

If you don’t already have one:

1. Go to https://github.com
2. Sign up for a free account
3. Verify your email

GitHub is where your app’s code will be stored, and will be linked to the servers where your app will be deployed.

---

## Step 2: Support the Project ❤️

Before using the template:

1. ⭐ [Star this repository](https://github.com/your-repo-url)
2. ⭐ [Star the GitHub organization](https://github.com/your-organization-url)
3. 💖 [Donate](https://github.com/sponsors/your-repo-url) Optional but encouraged

Why this matters:

- This template is maintained by real people
- Donations keep it updated and secure
- Stars help others discover it
- It would help us to execute our [roadmap](../plan/ROAD_MAP.md)

---

## Step 3: Fork the Repository

Forking creates **your own copy** of the project.

1. Click the **Fork** button (top-right)
2. Choose your GitHub account
3. Name it `initia-frontend` (or any name you like)
4. Wait for GitHub to finish

You now have your own version of the app, which later you could customize however you see fit.

---

## Step 4: Run the App Locally (Simple)

### What you need installed:

- Node.js (LTS version)
- Git
- A code editor (optional, e.g. VS Code)

Then you are to access terminal/command prompt of your operation system,

- For **Windows**: Use 'Command Prompt' or 'PowerShell' by searching "cmd" or "PowerShell"
- For **Mac/Linux**: Use 'Terminal' which you can access via Spotlight Search (Cmd + Space) or from Applications > Utilities

and run the following commands:

```bash
git clone <your-fork-url>
cd initia-frontend
npm install
npm run dev
```

Open your browser at:
👉 http://localhost:3000

You should see the dashboard running.

## Step 5: Basic Configuration (No Coding Required)

This dashboard is designed so you can customize the most important things **without writing real code**.

Open the custom [configuration file](.../src/config/appConfig.ts) in your code editor.

You can configure the following:

### 🌍 Language & Localization

- Choose from the languages already provided (for example: English, Arabic)
- Set the **default language** of the app
- Enable or disable languages from the available list

#### Add a New Language (Optional)

1. Go to `src/assets/locales/`
2. Copy an existing language file (for example `en.json`)
3. Rename it using the language code you want (for example `fr.json`)
4. Translate the values (do not change the keys)
5. Go to file `appConfig.ts` and add the new language to the list

The app will automatically pick it up once enabled in the config.

---

### 🏷 App Identity

You can customize:

- Application name
- Logo path
- Fallback logo (used if the main logo fails to load)
- Fonts (per lang)

This helps brand the dashboard for your project or organization.

---

### 🎨 Theme & Appearance

You can choose:

- Primary theme color
- Secondary colors (if available for your brand, or use a neutral color)
- Light or dark default mode

These settings apply globally across the app.

---

### 🧭 Navigation Layout

You can choose how the navigation appears:

- **Vertical layout** (sidebar – the most common for dashboards)
- **Horizontal layout** (top navigation)

This is controlled by a single config value.

---

## Step 6: Creating New Pages & Features (Guided Process)

You do not need to create pages from scratch.

Instead, you will **copy and adjust existing examples**.

### Recommended Process

1. Copy an existing **View** folder / directory from:

```bash
src/views/auth/templateExamples/datatablePage
```

2. Copy its related **API service** from:

```bash
src/api/datatablePageExample.ts
```

3. Rename the files to match your new feature

4. Update:

- Field names
- Labels
- Form inputs

---

### 📍 Live Examples Inside the App

The dashboard includes **example routes** that demonstrate:

- Forms
- Tables
- Create / Update / Delete flows
- Localization behavior

You can visit these routes in the running app and use them as references.

---

## Step 7: Translating Your New Features

Whenever you add a new page or form:

1. Add its labels to the locale files
2. Translate the values for each language you support
3. Refresh the page to see changes immediately

---

## Step 8: Run the App Locally (Recap)

If the app is not already running:

```bash
npm run dev
```

Open your web browser at:

```bash
http://localhost:3000
```

---

## Step 9: Deploy Your Frontend (Free Hosting Options)

You can publish your dashboard to the internet **for free** using popular hosting services.  
You do **not** need to manage servers.

All options below connect directly to GitHub and redeploy automatically when you update your code. You may ask around / chatGPT / google to choose the best option for you.

---

### ✅ [Option 1: Deploy to Vercel](../deployment/VERCEL.md) (Recommended)

### ✅ [Option 2: Deploy to Netlify](../deployment/NETLIFY.md)

### ✅ [Option 3: Deploy to AWS Amplify](../deployment/AMPLIFY.md)

---

## Step 10: Updating Your App After Deployment

Whenever you want to update your app:

1. Make changes in your code editor (e.g. VS Code)
2. Save your files
3. Commit your changes
4. Push to GitHub

Your hosting provider will automatically:

- Rebuild the app (which will take some time. You can check the progress @ [Your GitHub Repo](<your_repo_url>/actions))
- Publish the new version

No extra steps needed.

---

## Step 11: Where to Go Next

You / your developer can now:

- Add new pages
- Customize forms and tables
- Translate the app into more languages
- Adjust theme and layout
- Connect the frontend to a backend API

If you want deeper customization, refer to the **Technical Guide**.

---

## ❤️ Final Note: Support the Project

This dashboard template is **free and open-source**.

If it helped you build or launch your project:

1. ⭐ [Star this repository](https://github.com/your-repo-url)
2. ⭐ [Star the GitHub organization](https://github.com/your-organization-url)
3. 💖 [Donate](https://github.com/sponsors/your-repo-url) if you are capable

Your support helps keep the tool updated, secure, and well-documented.
