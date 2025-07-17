# Next.js Profile Application

A modern, full-stack profile application built with Next.js, featuring real-time communication, GraphQL integration, and micro-frontend architecture.

## 🚀 Features

- **Professional Profile Display**: Showcase personal details, career history, projects, and achievements
- **Real-time Chat**: Socket.io integration for live communication
- **GraphQL Integration**: Apollo Client for efficient data fetching
- **Micro-frontend Architecture**: Module Federation for scalable component sharing
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Modern UI with CSS modules

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: CSS Modules
- **Data Fetching**: Apollo Client (GraphQL)
- **Real-time**: Socket.io Client
- **Architecture**: Webpack Module Federation
- **Type Safety**: TypeScript with strict configuration

## 📋 Prerequisites

Before running this application, ensure you have the following services running:

1. **GraphQL Server**: Running on `http://localhost:5051/api/graphql`
2. **Socket.io Server**: Running on `http://localhost:5005`
3. **Node.js**: Version 18+ recommended

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/conqueror23/next-profile.git
cd next-profile
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy the environment example file and configure your settings:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Apollo GraphQL Configuration
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:5051/api/graphql
NEXT_PUBLIC_AUTH_TOKEN=your_auth_token_here

# Socket.io Configuration
NEXT_PUBLIC_SOCKET_URL=http://localhost:5005
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
├── pages/                 # Next.js pages (Pages Router)
│   ├── index.tsx         # Homepage
│   ├── profile.tsx       # Profile page
│   ├── chatbot.tsx       # Real-time chat interface
│   ├── graphql.tsx       # GraphQL demo
│   └── api/              # API routes
├── app/                  # Additional route components
│   ├── (business)/       # Business section routes
│   └── (shop)/          # Shop section routes
├── components/           # Reusable UI components
│   ├── card/            # Card wrapper components
│   ├── section/         # Section wrapper components
│   └── [components].tsx # Individual components
├── models/              # TypeScript data models
├── lib/                 # Client configurations
│   ├── apoloClient.ts   # Apollo Client setup
│   └── socket.ts        # Socket.io client manager
├── data/               # Static JSON data
├── config/             # Application configuration
└── styles/             # CSS modules and global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Pages & Features

### Main Pages

- **Homepage** (`/`) - Landing page with overview
- **Profile** (`/profile`) - Detailed profile information
- **Chat** (`/chatbot`) - Real-time messaging interface
- **GraphQL Demo** (`/graphql`) - GraphQL integration showcase

### API Routes

- **Hello API** (`/api/hello`) - Example API endpoint

## 🔌 Real-time Features

The application includes a sophisticated Socket.io client manager with:

- **Connection Management**: Automatic reconnection and status tracking
- **Event Handling**: Structured event emission and listening
- **Type Safety**: Full TypeScript support for socket events
- **Error Handling**: Graceful error handling and logging

### Socket.io Usage

```typescript
import { socketManager, sendMessage, getMessage } from '@/lib/socket';

// Send a message
sendMessage('Hello World!', 'Username');

// Listen for messages
getMessage((data) => {
  console.log('Received:', data);
});

// Check connection status
const isConnected = socketManager.getConnectionStatus();
```

## 📊 GraphQL Integration

Apollo Client is configured with:

- **Caching**: In-memory cache for optimal performance
- **Authentication**: Header-based auth token support
- **Environment Variables**: Configurable server URL

### GraphQL Usage

```typescript
import { apolloClient } from '@/lib/apoloClient';
import { gql } from '@apollo/client';

const GET_PROFILE = gql`
  query GetProfile {
    profile {
      name
      title
      bio
    }
  }
`;
```

## 🧩 Module Federation

The application is configured as a Module Federation remote app that exposes:

- **Button Component**: `./Button` from `./components/Button`

This enables sharing components across multiple applications in a micro-frontend architecture.

## 🎨 Styling

The project uses CSS Modules for component-scoped styling:

- `styles/globals.css` - Global styles
- `styles/Home.module.css` - Homepage specific styles
- Component-level CSS modules for isolated styling

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GRAPHQL_URL` | GraphQL server endpoint | `http://localhost:5051/api/graphql` |
| `NEXT_PUBLIC_AUTH_TOKEN` | Authentication token | - |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.io server endpoint | `http://localhost:5005` |

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically

### Other Platforms

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure external services (GraphQL, Socket.io) are accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Socket.io Documentation](https://socket.io/docs/v4/)
- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
