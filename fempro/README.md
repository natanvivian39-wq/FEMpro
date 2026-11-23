# FEMpro Web

Frontend foundation for FEMpro: booking and digital profile management for beauty professionals.

## Stack
- React 19 + TypeScript
- Vite
- React Router
- Lucide icons
- CSS design tokens (no component framework)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Build and type-check:

```bash
npm run typecheck
npm run build
```

## Current implementation
- Public marketing landing page
- Sign in / sign up UI shells (not wired to auth)
- App dashboard, appointments, profile, settings
- Responsive mobile-first styling
- API boundary with demo data; components do not call `fetch` directly

## Architecture
- `src/app`: routing and app entry
- `src/components`: reusable UI and navigation
- `src/features`: page/feature modules
- `src/services`: API boundary and mock mode
- `src/types`: shared domain contracts
- `src/styles`: global tokens and styles
- `docs/backend-contract.md`: suggested backend contract and integration notes

## Backend integration
Set `VITE_API_BASE_URL` to the backend origin. UI features call the service layer in `src/services/api.ts`. Replace mock branches there with real HTTP calls and preserve the exported return types. The UI currently uses demo data if the environment variable is blank.

## Brand asset
`public/assets/fempro-logo.png` is the supplied logo extracted from the uploaded source image with the checkerboard background removed. The logo itself is not recreated or typeset. If the designer has a true transparent SVG/PNG source, replace this asset with that source file while keeping the same path or update `Logo.tsx`.

## Repository setup / push

Create an empty private GitHub repository named `fempro` (do not initialize it with a README), then from this project directory:

```bash
git init
git add .
git commit -m "chore: initialize FEMpro frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fempro.git
git push -u origin main
```
