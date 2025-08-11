# DB-AI - Desktop Database Management Application

A modern, cross-platform desktop application for MongoDB database exploration and management. Built with Electron, Next.js, React 19, TypeScript, and Tailwind CSS, featuring a sleek glass-morphism UI design.

## 🚀 Features

### Database Management
- **Interactive Database Explorer** - Browse collections and documents with ease
- **Query Editor** - Execute MongoDB queries with syntax highlighting
- **Data Visualization** - Real-time charts and analytics
- **Schema Browser** - Explore database structure and relationships
- **Export/Import** - Data export and import capabilities

### Desktop Experience
- **Native Desktop App** - Cross-platform support (Windows, macOS, Linux)
- **Native Menus** - Platform-specific menu integration
- **Keyboard Shortcuts** - Productivity-focused shortcuts
- **Auto-Updates** - Seamless application updates
- **Offline Capable** - Works without internet connection

### Modern UI/UX
- **Glass-morphism Design** - Modern, elegant interface
- **Dark/Light Themes** - Adaptive theming support
- **Responsive Layout** - Optimized for different screen sizes
- **Smooth Animations** - Fluid user interactions
- **TypeScript Support** - Full type safety throughout the application

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons React
- **Runtime**: React 19.1.0

### Desktop
- **Desktop Framework**: Electron 37.2.6
- **Build Tool**: Electron Builder 26.0.12
- **Auto-Updates**: Electron Updater 6.6.2
- **Process Management**: Concurrently, Wait-on

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Development Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Dipendra-creator/db-ai.git
cd db-ai
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run in development mode:**

**Web Version:**
```bash
npm run dev
# Opens at http://localhost:9961
```

**Desktop Version:**
```bash
npm run electron-dev
# Launches desktop app with hot reload
```

### Production Build

**Build for Web:**
```bash
npm run build
npm run start
```

**Build Desktop Application:**
```bash
npm run electron-pack
# Creates distributables in /dist folder
```

## 🏗️ Project Structure

```
db-ai/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/          # React components
│       ├── ConnectionManager.tsx
│       ├── DataVisualization.tsx
│       ├── MainContent.tsx
│       ├── Sidebar.tsx
│       └── theme-provider.tsx
├── electron/                # Electron main process
│   ├── main.js             # Main Electron process
│   └── preload.js          # Preload script (security)
├── public/                  # Static assets
├── assets/                  # Application icons
├── out/                     # Next.js build output
├── dist/                    # Electron distributables
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 UI Components

### Core Components
- **Sidebar**: Navigation and database connection management
- **MainContent**: Query editor and results display
- **DataVisualization**: Charts and analytics dashboard
- **ConnectionManager**: Database connection configuration

### Desktop Features
- **Native Menus**: Platform-specific application menus
- **Window Management**: Minimize, maximize, close controls
- **Keyboard Shortcuts**: Productivity shortcuts
- **System Integration**: Tray icons, notifications

## 🔧 Development

### Available Scripts

**Development:**
- `npm run dev` - Start Next.js development server (port 9961)
- `npm run electron-dev` - Start desktop app in development mode
- `npm run lint` - Run ESLint

**Production:**
- `npm run build` - Build Next.js application
- `npm run export` - Export static files
- `npm run electron-pack` - Build desktop distributables
- `npm run start` - Start production server

### Desktop Development

The desktop application uses:
- **Main Process** (`electron/main.js`): Window management, menus, system integration
- **Preload Script** (`electron/preload.js`): Secure IPC communication
- **Renderer Process**: Next.js application running in Electron

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling
- Modern React patterns with hooks
- Electron security best practices

## 🚀 Deployment

### Web Deployment
- **Vercel** (Recommended): Deploy with zero configuration
- **Netlify**: Static site deployment
- **Docker**: Containerized deployment

### Desktop Distribution

**Automatic Building:**
```bash
npm run electron-pack
```

**Platform-specific builds:**
- **Windows**: Creates `.exe` installer (NSIS)
- **macOS**: Creates `.dmg` disk image
- **Linux**: Creates `.AppImage` portable app

**Distribution Channels:**
- GitHub Releases (with auto-updates)
- Microsoft Store (Windows)
- Mac App Store (macOS)
- Snap Store (Linux)

### Deploy Web Version on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dipendra-creator/db-ai)

## ⌨️ Keyboard Shortcuts

### Global Shortcuts
- `Ctrl/Cmd + N` - New Connection
- `Ctrl/Cmd + O` - Open Query
- `Ctrl/Cmd + S` - Save Query
- `Ctrl/Cmd + E` - Export Data
- `F5` - Refresh Schema
- `Ctrl/Cmd + Shift + C` - Connect to Database
- `Ctrl/Cmd + Shift + D` - Disconnect

### Development Shortcuts
- `Ctrl/Cmd + Shift + I` - Toggle Developer Tools
- `Ctrl/Cmd + R` - Reload Application
- `F11` - Toggle Fullscreen

## 🔒 Security

The desktop application implements Electron security best practices:
- **Context Isolation**: Enabled for all renderer processes
- **Node Integration**: Disabled in renderer processes
- **Preload Scripts**: Secure IPC communication
- **CSP Headers**: Content Security Policy implementation
- **URL Validation**: External link protection

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## 🏆 Acknowledgments

- [Electron](https://electronjs.org/) - Desktop application framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

---

Built with ❤️ using Electron, Next.js, and modern web technologies.
