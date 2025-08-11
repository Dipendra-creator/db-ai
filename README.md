# DB-AI - Database Management Interface

A modern, intuitive Next.js application for MongoDB database exploration and management. Built with React 19, TypeScript, and Tailwind CSS, featuring a sleek glass-morphism UI design.

## 🚀 Features

- **Interactive Database Explorer** - Browse collections and documents with ease
- **Query Editor** - Execute MongoDB queries with syntax highlighting
- **Data Visualization** - Real-time charts and analytics
- **Modern UI** - Glass-morphism design with smooth animations
- **Responsive Design** - Works seamlessly across all devices
- **TypeScript Support** - Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons React
- **Runtime**: React 19.1.0

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/db-ai.git
cd db-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
├── public/                  # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 UI Components

- **Sidebar**: Navigation and database connection management
- **MainContent**: Query editor and results display
- **DataVisualization**: Charts and analytics dashboard
- **ConnectionManager**: Database connection configuration

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling
- Modern React patterns with hooks

## 🚀 Deployment

The application can be deployed on various platforms:

- **Vercel** (Recommended): Deploy with zero configuration
- **Netlify**: Static site deployment
- **Docker**: Containerized deployment

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/db-ai)

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

---

Built with ❤️ using Next.js and modern web technologies.
