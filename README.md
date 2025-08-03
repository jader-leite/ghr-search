# GHR Search - GitHub Repository Search App

A modern web application for searching GitHub repositories and managing your favorite repositories. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Search GitHub Repositories**: Search for repositories using GitHub's search API
- ⭐ **Save Favorites**: Add repositories to your favorites list for quick access
- 📱 **Responsive Design**: Modern, mobile-friendly interface
- ⚡ **Real-time Search**: Instant search results with pagination
- 🛡️ **Error Handling**: Comprehensive error handling with user-friendly messages
- 🎨 **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ghr-search
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Searching Repositories

1. Enter your search query in the search bar on the homepage
2. Press Enter or click the search button
3. Browse through the search results
4. Use pagination to navigate through multiple pages of results

### Managing Favorites

1. Click the star icon on any repository to add it to your favorites
2. View your favorites by clicking the "Favorites" link in the navigation
3. Remove individual favorites or clear all favorites from the favorites page

## API Endpoints

- `GET /api/search` - Search GitHub repositories
  - Query parameters:
    - `q` (required): Search query
    - `page` (optional): Page number (default: 1)
    - `per_page` (optional): Results per page (default: 10)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── favorites/         # Favorites page
│   └── page.tsx          # Home page
├── components/            # React components
├── hooks/                # Custom React hooks
├── stores/               # Zustand state management
└── utils/                # Utility functions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **SearchBar**: Handles search input and submission
- **RepoList**: Displays search results
- **FavoriteButton**: Manages favorite repository state
- **FavoritesList**: Shows saved favorites
- **Pagination**: Navigation through search results
- **ErrorBoundary**: Global error handling

## Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Deploy with zero configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
