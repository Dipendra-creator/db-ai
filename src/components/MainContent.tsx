'use client';

import { useState } from 'react';
import {
  PlayIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  BookmarkIcon,
  ShareIcon,
  EllipsisVerticalIcon,
  CodeBracketIcon,
  TableCellsIcon,
  ChartPieIcon,
  ClockIcon,
  UserGroupIcon,
  ServerIcon,
  CpuChipIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { DataVisualization } from './DataVisualization';

interface QueryResult {
  _id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
  orders: number;
  revenue: number;
}

const mockQueryResults: QueryResult[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:22:00Z',
    orders: 12,
    revenue: 2450.50
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    createdAt: '2024-01-10T09:15:00Z',
    lastLogin: '2024-01-19T16:45:00Z',
    orders: 8,
    revenue: 1890.25
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'inactive',
    createdAt: '2023-12-20T11:20:00Z',
    lastLogin: '2024-01-05T13:10:00Z',
    orders: 3,
    revenue: 450.75
  }
];

const tabs = [
  { id: 'documents', name: 'Documents', icon: DocumentTextIcon },
  { id: 'aggregations', name: 'Aggregations', icon: ChartBarIcon },
  { id: 'schema', name: 'Schema', icon: CodeBracketIcon },
  { id: 'indexes', name: 'Indexes', icon: TableCellsIcon },
  { id: 'validation', name: 'Validation', icon: Cog6ToothIcon },
  { id: 'analytics', name: 'Analytics', icon: ChartPieIcon }
];

const quickStats = [
  { label: 'Total Documents', value: '125,847', change: '+12.5%', icon: DocumentTextIcon, color: 'text-blue-400' },
  { label: 'Active Users', value: '8,429', change: '+5.2%', icon: UserGroupIcon, color: 'text-green-400' },
  { label: 'Avg Response Time', value: '45ms', change: '-8.1%', icon: BoltIcon, color: 'text-yellow-400' },
  { label: 'Storage Used', value: '2.4GB', change: '+15.3%', icon: ServerIcon, color: 'text-purple-400' }
];

export function MainContent() {
  const [activeTab, setActiveTab] = useState('documents');
  const [query, setQuery] = useState('db.users.find({ status: "active" }).limit(10)');
  const [isExecuting, setIsExecuting] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const executeQuery = async () => {
    setIsExecuting(true);
    // Simulate query execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExecuting(false);
    setShowResults(true);
  };

  const formatValue = (value: any) => {
    if (typeof value === 'string' && value.includes('@')) {
      return <span className="text-blue-400">{value}</span>;
    }
    if (typeof value === 'number') {
      return <span className="text-emerald-400">{value.toLocaleString()}</span>;
    }
    if (typeof value === 'string' && value.includes('T')) {
      return <span className="text-amber-400">{new Date(value).toLocaleDateString()}</span>;
    }
    return <span className="text-foreground">{value}</span>;
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header */}
      <div className="glass-intense border-b border-white/10 p-6 animate-slide-down">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gradient">Database Explorer</h1>
            <p className="text-muted-foreground">ecommerce.users collection</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-glass px-4 py-2 rounded-lg flex items-center space-x-2">
              <BookmarkIcon className="w-4 h-4" />
              <span>Save Query</span>
            </button>
            <button className="btn-glass px-4 py-2 rounded-lg flex items-center space-x-2">
              <ShareIcon className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="btn-glass p-2 rounded-lg">
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <div key={stat.label} className="card-modern animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-xl glass ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 glass rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-modern ${
                activeTab === tab.id
                  ? 'gradient-primary text-white shadow-glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Query Panel */}
        <div className="w-1/2 flex flex-col border-r border-white/10">
          {/* Query Editor */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Query Editor</h3>
              <div className="flex items-center space-x-2">
                <button className="btn-glass p-2 rounded-lg">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
                <button className="btn-glass p-2 rounded-lg">
                  <FunnelIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-modern w-full h-32 p-4 rounded-xl font-mono text-sm resize-none"
                placeholder="Enter your MongoDB query..."
              />
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={executeQuery}
                  disabled={isExecuting}
                  className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                >
                  {isExecuting ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <PlayIcon className="w-4 h-4" />
                  )}
                  <span>{isExecuting ? 'Executing...' : 'Execute'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Query Results */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Results</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ClockIcon className="w-4 h-4" />
                <span>Executed in 45ms</span>
              </div>
            </div>

            {showResults && (
              <div className="space-y-3 animate-fade-in">
                {mockQueryResults.map((result, index) => (
                  <div key={result._id} className="data-card animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">_id: {result._id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          result.status === 'active' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">name: </span>
                          {formatValue(result.name)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">email: </span>
                          {formatValue(result.email)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">orders: </span>
                          {formatValue(result.orders)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">revenue: </span>
                          {formatValue(`$${result.revenue}`)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">created: </span>
                          {formatValue(result.createdAt)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">lastLogin: </span>
                          {formatValue(result.lastLogin)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Visualization Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold mb-4">Data Insights</h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <DataVisualization />
          </div>
        </div>
      </div>
    </div>
  );
}