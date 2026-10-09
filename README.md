# Sky Soul Scribbles

Sky Soul Scribbles is a web application for browsing and viewing written posts. The codebase includes a React front end, authentication context, post detail routes, and a Supabase integration for post data.

## Features and Structure

- **Home page:** entry point for browsing posts
- **Post detail route:** displays a post using its ID
- **Authentication page and context:** separates authentication-related UI and state
- **Supabase integration:** connects the app to a `posts` data source
- **Client-side routing:** uses React Router for page navigation
- **UI feedback:** toast notifications, tooltips, and connection-error messaging

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui and Radix UI components
- Supabase
- React Router
- TanStack Query

## Run Locally

### Prerequisites

- Node.js and npm
- Supabase project credentials configured for the application

### Setup

```bash
git clone https://github.com/aditikhare137/sky-soul-scribbles.git
cd sky-soul-scribbles
npm install
npm run dev
```

Use the local URL printed by Vite to open the app.

## Supabase Configuration

The app expects the Supabase URL and anonymous key to be configured through the project's environment/integration settings. In a local environment, configure the corresponding Vite variables securely (for example, `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) before running the application. Do not commit secrets to GitHub.

The app checks the Supabase connection and displays a configuration error if the client cannot be initialized.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Repository Layout

- `src/pages/` — home, authentication, post detail, and not-found pages
- `src/contexts/` — authentication context
- `src/integrations/` and `src/lib/` — service integration and shared utilities
- `src/components/` — reusable UI components
- `supabase/` — Supabase configuration
- `public/` — static assets

## Author

Aditi Khare