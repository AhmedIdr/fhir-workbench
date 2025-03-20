# FHIR Leaderboard

A leaderboard for ranking FHIR-compatible language models.

## Setup

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Update the submission email:
   - Open `src/components/ModelSubmissionForm.tsx`
   - Change the `SUBMISSION_EMAIL` constant to your preferred email address
   ```typescript
   const SUBMISSION_EMAIL = 'your-email@example.com'; // Replace with your email
   ```
4. Run the development server
   ```bash
   npm run dev
   ```

## Features

- **Leaderboard Display**: View and sort models by various metrics
- **Model Filtering**: Filter models by size
- **Model Submission**: Simple submission form that works without any third-party services
  - Users enter a HuggingFace repository URL
  - When they click submit, their default email client opens with pre-filled content
  - They simply send the email to complete their submission
  - Works with any static hosting (no backend required)

## Deployment

This project is configured for static export with Next.js:

```bash
npm run build
```

The output in the `out` directory can be deployed to any static hosting service, such as GitHub Pages, Vercel, or Netlify.

## GitHub Pages Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   # If using gh-pages package
   npx gh-pages -d out
   
   # Or manually commit the 'out' directory to the gh-pages branch
   ```

3. Configure GitHub Pages in your repository settings to use the gh-pages branch

## How the Submission Process Works

1. A user visits the leaderboard and enters their HuggingFace model URL
2. When they click "Submit", the form uses the `mailto:` protocol to:
   - Open their default email client (Gmail, Outlook, Apple Mail, etc.)
   - Pre-fill the recipient with your email address
   - Pre-fill the subject with the model name
   - Pre-fill the body with the model URL and submission details
3. The user reviews the email and clicks send

