# UiPath Hello World Portal

A clean, professional single-page UiPath-aware dashboard that demonstrates basic UiPath Orchestrator connectivity and displays a welcoming interface for UiPath automation users.

[cloudflarebutton]

## Overview

The UiPath Hello World Portal is an enterprise-grade web application designed to serve as a foundational, professional entry point for UiPath automation users. It features a clean, corporate-style welcome interface that immediately establishes a sense of trust and professionalism. The application demonstrates basic connectivity to UiPath Orchestrator, displaying a real-time connection status to assure users of system readiness.

## Key Features

- **Professional Enterprise Interface**: Clean, corporate-style design with neutral color palette and conservative typography
- **UiPath Orchestrator Integration**: Real-time connection status and system information display
- **Responsive Design**: Optimized for desktop with graceful adaptation to tablet viewports
- **Real-time System Information**: Current timestamp and environment details presentation
- **Durable Object Storage**: Persistent data storage using Cloudflare Durable Objects
- **Theme Support**: Light and dark mode toggle with system preference detection
- **Modern UI Components**: Built with shadcn/ui component library

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 3** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon library
- **React Query** - Data fetching and state management
- **Zustand** - Lightweight state management

### Backend
- **Cloudflare Workers** - Edge computing platform
- **Hono** - Fast web framework for Workers
- **Durable Objects** - Consistent, low-latency storage
- **UiPath TypeScript SDK** - Official UiPath integration

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Wrangler** - Cloudflare Workers CLI

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Cloudflare account](https://cloudflare.com/) for deployment
- [UiPath Orchestrator](https://www.uipath.com/) access (for full functionality)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uipath-hello-world-portal
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:3000`

## Development

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint code analysis
- `bun run deploy` - Deploy to Cloudflare Workers
- `bun run cf-typegen` - Generate Cloudflare Workers types

### Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Application pages
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utility functions
├── worker/            # Cloudflare Workers backend
├── shared/            # Shared types and utilities
└── public/            # Static assets
```

### Development Guidelines

- Use existing shadcn/ui components instead of creating custom ones
- Follow the established color palette and design system
- Implement proper error handling and loading states
- Ensure responsive design across all screen sizes
- Maintain type safety with TypeScript

## UiPath Integration

The application is designed to work with UiPath Orchestrator:

1. **Connection Status**: Real-time display of UiPath Orchestrator connectivity
2. **System Information**: Current timestamp and environment details
3. **Future Extensibility**: Foundation for advanced UiPath features

### UiPath SDK Usage

The project includes the official UiPath TypeScript SDK for seamless integration:

```typescript
import { useProcesses, useStartProcess } from '@/lib/uipath/hooks';

// Example usage in components
const { data: processes, isLoading } = useProcesses(folderId);
const startProcess = useStartProcess();
```

## Deployment

### Cloudflare Workers Deployment

[cloudflarebutton]

**Manual Deployment:**

1. **Configure Wrangler**
   ```bash
   bunx wrangler login
   ```

2. **Deploy to Cloudflare**
   ```bash
   bun run deploy
   ```

3. **Set Environment Variables** (if needed)
   ```bash
   bunx wrangler secret put UIPATH_API_KEY
   bunx wrangler secret put UIPATH_TENANT_NAME
   ```

### Environment Configuration

Create a `.env` file for local development:

```env
UIPATH_API_KEY=your_api_key_here
UIPATH_TENANT_NAME=your_tenant_name
UIPATH_BASE_URL=https://cloud.uipath.com
```

## Usage

### Basic Usage

1. Navigate to the deployed application URL
2. View the welcome dashboard with system information
3. Check UiPath Orchestrator connection status
4. Use the theme toggle to switch between light and dark modes

### Customization

The application follows a modular architecture for easy customization:

- **Styling**: Modify `tailwind.config.js` for design system changes
- **Components**: Extend or create new components in `src/components/`
- **API Routes**: Add new endpoints in `worker/userRoutes.ts`
- **Data Storage**: Extend Durable Object methods in `worker/durableObject.ts`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/system-info` - System information
- `GET /api/uipath-status` - UiPath connection status
- `POST /api/client-errors` - Client error reporting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Check the [UiPath Documentation](https://docs.uipath.com/)
- Review [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- Open an issue in this repository

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) component library
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
- Integrated with [UiPath](https://www.uipath.com/) automation platform