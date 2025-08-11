'use client';

import { useState } from 'react';
import { 
  ChevronDownIcon, 
  ChevronRightIcon, 
  CircleStackIcon,
  ServerIcon,
  TableCellsIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from './theme-provider';

interface Database {
  name: string;
  collections: string[];
  status: 'connected' | 'disconnected' | 'error';
  size: string;
  documents: number;
}

interface Connection {
  id: string;
  name: string;
  type: 'mongodb' | 'postgresql' | 'mysql' | 'redis';
  status: 'connected' | 'disconnected' | 'error';
  databases: Database[];
}

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Production MongoDB',
    type: 'mongodb',
    status: 'connected',
    databases: [
      {
        name: 'ecommerce',
        collections: ['users', 'products', 'orders', 'reviews'],
        status: 'connected',
        size: '2.4 GB',
        documents: 125000
      },
      {
        name: 'analytics',
        collections: ['events', 'sessions', 'conversions'],
        status: 'connected',
        size: '890 MB',
        documents: 45000
      }
    ]
  },
  {
    id: '2',
    name: 'Development PostgreSQL',
    type: 'postgresql',
    status: 'connected',
    databases: [
      {
        name: 'app_dev',
        collections: ['users', 'posts', 'comments'],
        status: 'connected',
        size: '156 MB',
        documents: 8500
      }
    ]
  },
  {
    id: '3',
    name: 'Cache Redis',
    type: 'redis',
    status: 'error',
    databases: []
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircleIcon className="w-4 h-4 text-emerald-400" />;
    case 'error':
      return <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />;
    default:
      return <WifiIcon className="w-4 h-4 text-gray-400" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'mongodb':
      return <CircleStackIcon className="w-5 h-5 text-green-400" />;
    case 'postgresql':
      return <ServerIcon className="w-5 h-5 text-blue-400" />;
    case 'mysql':
      return <ServerIcon className="w-5 h-5 text-orange-400" />;
    case 'redis':
      return <ServerIcon className="w-5 h-5 text-red-400" />;
    default:
      return <ServerIcon className="w-5 h-5 text-gray-400" />;
  }
};

export default function Sidebar() {
  const [expandedConnections, setExpandedConnections] = useState<Set<string>>(new Set(['1']));
  const [expandedDatabases, setExpandedDatabases] = useState<Set<string>>(new Set(['ecommerce']));
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();

  const toggleConnection = (connectionId: string) => {
    const newExpanded = new Set(expandedConnections);
    if (newExpanded.has(connectionId)) {
      newExpanded.delete(connectionId);
    } else {
      newExpanded.add(connectionId);
    }
    setExpandedConnections(newExpanded);
  };

  const toggleDatabase = (databaseName: string) => {
    const newExpanded = new Set(expandedDatabases);
    if (newExpanded.has(databaseName)) {
      newExpanded.delete(databaseName);
    } else {
      newExpanded.add(databaseName);
    }
    setExpandedDatabases(newExpanded);
  };

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-5 h-5" />;
      case 'dark':
        return <MoonIcon className="w-5 h-5" />;
      default:
        return <ComputerDesktopIcon className="w-5 h-5" />;
    }
  };

  const filteredConnections = mockConnections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.databases.some(db => 
      db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.collections.some(col => col.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="sidebar-modern w-80 h-screen flex flex-col animate-slide-down">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-glow">
              <CircleStackIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">DB AI</h1>
              <p className="text-xs text-muted-foreground">Database Intelligence</p>
            </div>
          </div>
          <button
            onClick={cycleTheme}
            className="btn-glass p-2 rounded-lg transition-bounce hover:scale-110"
            title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
          >
            {getThemeIcon()}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search databases, collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-modern w-full pl-10 pr-4 py-2 rounded-lg text-sm focus-ring"
          />
        </div>
      </div>

      {/* Connections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Connections
          </h2>
          <button className="btn-glass p-1.5 rounded-md hover:scale-110 transition-bounce">
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        {filteredConnections.map((connection) => (
          <div key={connection.id} className="animate-fade-in">
            {/* Connection Header */}
            <div
              className="card-modern p-3 cursor-pointer group"
              onClick={() => toggleConnection(connection.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {expandedConnections.has(connection.id) ? (
                    <ChevronDownIcon className="w-4 h-4 text-muted-foreground transition-transform group-hover:text-primary" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-muted-foreground transition-transform group-hover:text-primary" />
                  )}
                  {getTypeIcon(connection.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium truncate">{connection.name}</span>
                    {getStatusIcon(connection.status)}
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{connection.type}</p>
                </div>
              </div>
            </div>

            {/* Databases */}
            {expandedConnections.has(connection.id) && (
              <div className="ml-4 mt-2 space-y-1 animate-slide-up">
                {connection.databases.map((database) => (
                  <div key={database.name}>
                    {/* Database Header */}
                    <div
                      className="data-card p-2.5 cursor-pointer group"
                      onClick={() => toggleDatabase(database.name)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {expandedDatabases.has(database.name) ? (
                            <ChevronDownIcon className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                          ) : (
                            <ChevronRightIcon className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                          <CircleStackIcon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">{database.name}</span>
                            {getStatusIcon(database.status)}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{database.size}</span>
                            <span>•</span>
                            <span>{database.documents.toLocaleString()} docs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Collections */}
                    {expandedDatabases.has(database.name) && (
                      <div className="ml-6 mt-1 space-y-0.5 animate-slide-up">
                        {database.collections.map((collection) => (
                          <div
                            key={collection}
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/5 cursor-pointer group transition-modern"
                          >
                            <TableCellsIcon className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {collection}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">
              {filteredConnections.filter(c => c.status === 'connected').length} connected
            </span>
          </div>
          <button className="btn-glass p-2 rounded-lg hover:scale-110 transition-bounce">
            <Cog6ToothIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}