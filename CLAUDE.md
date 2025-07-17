# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` or `yarn dev` - Start development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

### External Services
This project connects to external services that need to be running:
- GraphQL server: http://localhost:5051/api/graphql (Apollo Client)
- Socket.io server: http://localhost:5005 (Real-time communication)

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with TypeScript
- **Styling**: CSS Modules (Home.module.css, globals.css)
- **Data Fetching**: Apollo Client for GraphQL
- **Real-time**: Socket.io client
- **Module Federation**: Webpack Module Federation with @module-federation/nextjs-mf

### Project Structure
- `pages/` - Next.js pages (uses Pages Router, not App Router)
  - `index.tsx` - Main homepage
  - `profile.tsx` - Profile page
  - `chatbot.tsx` - Chat interface using Socket.io
  - `graphql.tsx` - GraphQL demo page
  - `api/` - API routes
- `app/` - Contains additional route components for business and shop sections
- `components/` - Reusable UI components organized by domain
  - `card/` - Card wrapper components
  - `section/` - Section wrapper components
  - Individual components: PersonalDetails, Summary, Achievements, CareerCard, ProjectCard
- `models/` - TypeScript class definitions (Career, Project)
- `data/` - Static JSON data files
- `lib/` - Client configurations (Apollo Client, Socket.io)
- `config/` - Application configuration

### Module Federation
The app is configured as a Module Federation remote app named 'remoteApp' that exposes:
- `./Button` component from `./components/Button`

### Data Models
- **Career**: title, company, responsibilities, startTime, endTime, duration
- **Project**: name, description, time, techStacks[]

### Client Libraries
- **Apollo Client**: Configured for http://localhost:5051/api/graphql with test authorization
- **Socket.io**: Connected to localhost:5005 with message handling functions (connectServer, getMessage, sendMessage)

## Development Notes

### Page Architecture
This project uses Next.js Pages Router (not App Router). New pages should be created in the `pages/` directory.

### Component Organization
Components are organized by functionality with barrel exports in `components/index.tsx`. New components should follow the existing pattern of being exported through the index file.

### External Dependencies
The application requires external GraphQL and Socket.io servers to be running for full functionality. The chatbot page specifically depends on the Socket.io connection.

### Environment Configuration
Copy `.env.local.example` to `.env.local` and configure:
- `NEXT_PUBLIC_GRAPHQL_URL` - GraphQL server endpoint
- `NEXT_PUBLIC_AUTH_TOKEN` - Authentication token
- `NEXT_PUBLIC_SOCKET_URL` - Socket.io server endpoint

### Recent Optimizations
- **Socket.io**: Refactored to use a singleton SocketManager class with proper connection handling
- **Apollo Client**: Added environment variable support and fixed typo (APPOLO → APOLLO)
- **Dependencies**: Updated to latest versions and removed deprecated @apollo/react-hooks
- **TypeScript**: Enhanced configuration with path aliases and modern module resolution
- **Type Safety**: Improved socket event typing and connection status tracking