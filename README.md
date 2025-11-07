# Star Wars Graph

A React application that visualizes Star Wars characters and their relationships through an interactive graph interface. Browse through characters from the Star Wars universe and explore their connections to films, starships, vehicles, and species.

## What This Project Does

- Displays a grid of Star Wars characters
- Shows detailed information about each character
- Visualizes relationships between characters and their associated entities (films, starships, vehicles, species) using an interactive flow graph
- Fetches data from the Star Wars API (SWAPI)

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **TanStack Query** - Data fetching and caching
- **XYFlow** - Interactive graph visualization
- **Axios** - HTTP client

## Prerequisites

Make sure you have one of these installed:
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

## Getting Started

### 1. Install Dependencies

```bash
yarn
```

### 2. Environment Setup

The project includes a `.env` file with these settings:

```
REACT_APP_BASE_URL=https://swapi.dev
REACT_APP_ENABLE_MOCKS=false
```

You can modify `REACT_APP_ENABLE_MOCKS` to `false` if you want to use the real API instead of mocked data.

### 3. Run the Development Server

```bash
yarn dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is busy).

### 4. Build for Production

```bash
yarn build
```

This creates an optimized production build in the `dist` folder.

### 5. Preview Production Build

```bash
yarn preview
```

Runs the production build locally so you can test it before deployment.

## Available Scripts

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Starts development server with hot reload |
| `npm run build` | Creates production-ready build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Checks code for issues using ESLint |

## Project Structure

```
src/
├── app/              # App-level configuration (providers, root component)
├── business/         # Business logic and UI components
├── modules/          # Feature modules
│   └── starwars/     # Star Wars feature
│       ├── listStarwars/    # Character list view
│       ├── detailStarwars/  # Character detail view with graph
│       ├── models/          # Data models
│       └── shared/          # Shared utilities for this module
├── resources/        # Static resources (icons, constants)
├── routing/          # Route definitions
├── shared/           # Shared UI components and utilities
└── styles/           # Global styles
```

## How to Use

1. Start the dev server
2. You'll see a grid of Star Wars characters
3. Click on any character card to view detailed information
4. The detail page shows an interactive graph of relationships
5. Use the back button to return to the character list

## Notes

- The app uses TanStack Query for data caching, so subsequent visits will be faster
- Mock mode is disabled by default for development
- The graph visualization uses the Dagre layout algorithm for automatic positioning
