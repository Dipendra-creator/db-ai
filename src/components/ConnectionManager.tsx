'use client';

import { useState, useEffect } from 'react';
import {
  XMarkIcon,
  CircleStackIcon,
  ServerIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface Connection {
  id: string;
  name: string;
  type: 'mongodb' | 'postgresql' | 'mysql' | 'redis' | 'sqlite';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
  status: 'connected' | 'disconnected' | 'testing' | 'error';
  lastConnected?: string;
}

interface ConnectionManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const connectionTypes = [
  { id: 'mongodb', name: 'MongoDB', icon: CircleStackIcon, color: 'text-green-400', defaultPort: 27017 },
  { id: 'postgresql', name: 'PostgreSQL', icon: ServerIcon, color: 'text-blue-400', defaultPort: 5432 },
  { id: 'mysql', name: 'MySQL', icon: ServerIcon, color: 'text-orange-400', defaultPort: 3306 },
  { id: 'redis', name: 'Redis', icon: ServerIcon, color: 'text-red-400', defaultPort: 6379 },
  { id: 'sqlite', name: 'SQLite', icon: ServerIcon, color: 'text-purple-400', defaultPort: 0 }
];

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Production MongoDB',
    type: 'mongodb',
    host: 'prod-cluster.mongodb.net',
    port: 27017,
    database: 'ecommerce',
    username: 'admin',
    password: '••••••••',
    ssl: true,
    status: 'connected',
    lastConnected: '2024-01-20T14:22:00Z'
  },
  {
    id: '2',
    name: 'Dev PostgreSQL',
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    database: 'app_dev',
    username: 'postgres',
    password: '••••••••',
    ssl: false,
    status: 'disconnected',
    lastConnected: '2024-01-19T10:15:00Z'
  }
];

export default function ConnectionManager({ isOpen, onClose }: ConnectionManagerProps) {
  const [activeTab, setActiveTab] = useState<'connections' | 'new'>('connections');
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [selectedType, setSelectedType] = useState<string>('mongodb');
  const [showPassword, setShowPassword] = useState(false);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    port: 27017,
    database: '',
    username: '',
    password: '',
    ssl: true
  });

  const selectedTypeInfo = connectionTypes.find(t => t.id === selectedType);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const typeInfo = connectionTypes.find(t => t.id === type);
    setFormData(prev => ({
      ...prev,
      port: typeInfo?.defaultPort || 27017
    }));
  };

  const testConnection = async (connectionId: string) => {
    setTestingConnection(connectionId);
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId 
        ? { ...conn, status: Math.random() > 0.3 ? 'connected' : 'error' }
        : conn
    ));
    setTestingConnection(null);
  };

  const deleteConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConnection: Connection = {
      id: Date.now().toString(),
      name: formData.name,
      type: selectedType as any,
      host: formData.host,
      port: formData.port,
      database: formData.database,
      username: formData.username,
      password: formData.password,
      ssl: formData.ssl,
      status: 'disconnected'
    };
    
    setConnections(prev => [...prev, newConnection]);
    setFormData({
      name: '',
      host: '',
      port: selectedTypeInfo?.defaultPort || 27017,
      database: '',
      username: '',
      password: '',
      ssl: true
    });
    setActiveTab('connections');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon className="w-4 h-4 text-emerald-400" />;
      case 'testing':
        return <ArrowPathIcon className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    const typeInfo = connectionTypes.find(t => t.id === type);
    if (!typeInfo) return null;
    
    return (
      <div className={`p-2 rounded-lg glass ${typeInfo.color}`}>
        <typeInfo.icon className="w-5 h-5" />
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="glass-intense w-full max-w-4xl rounded-2xl p-6 animate-scale-in relative z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-glow">
              <CircleStackIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gradient">
                Connection Manager
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your database connections
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-glass p-2 rounded-lg hover:scale-110 transition-bounce"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 glass rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('connections')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-modern ${
              activeTab === 'connections'
                ? 'gradient-primary text-white shadow-glow'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <ServerIcon className="w-4 h-4" />
            <span>Connections ({connections.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-modern ${
              activeTab === 'new'
                ? 'gradient-primary text-white shadow-glow'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <PlusIcon className="w-4 h-4" />
            <span>New Connection</span>
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
          {activeTab === 'connections' ? (
            <div className="space-y-4 animate-fade-in">
              {connections.length === 0 ? (
                <div className="text-center py-12">
                  <CircleStackIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No connections configured</p>
                  <button
                    onClick={() => setActiveTab('new')}
                    className="btn-primary mt-4 px-6 py-2 rounded-lg"
                  >
                    Add Your First Connection
                  </button>
                </div>
              ) : (
                connections.map((connection, index) => (
                  <div
                    key={connection.id}
                    className="card-modern animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getTypeIcon(connection.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{connection.name}</h3>
                            {getStatusIcon(testingConnection === connection.id ? 'testing' : connection.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {connection.type} • {connection.host}:{connection.port}
                          </p>
                          {connection.lastConnected && (
                            <p className="text-xs text-muted-foreground">
                              Last connected: {new Date(connection.lastConnected).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => testConnection(connection.id)}
                          disabled={testingConnection === connection.id}
                          className="btn-glass px-3 py-1.5 rounded-lg text-sm disabled:opacity-50"
                        >
                          {testingConnection === connection.id ? 'Testing...' : 'Test'}
                        </button>
                        <button className="btn-glass p-2 rounded-lg">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteConnection(connection.id)}
                          className="btn-glass p-2 rounded-lg text-red-400 hover:bg-red-500/10"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              {/* Connection Type */}
              <div>
                <label className="block text-sm font-medium mb-3">Database Type</label>
                <div className="grid grid-cols-5 gap-3">
                  {connectionTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTypeChange(type.id)}
                      className={`p-4 rounded-xl border transition-modern ${
                        selectedType === type.id
                          ? 'border-primary bg-primary/10 shadow-glow'
                          : 'border-white/10 glass hover:border-white/20'
                      }`}
                    >
                      <type.icon className={`w-8 h-8 mx-auto mb-2 ${type.color}`} />
                      <p className="text-sm font-medium">{type.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Connection Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Connection Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-modern w-full px-4 py-2 rounded-lg focus-ring"
                    placeholder="My Database Connection"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Database Name</label>
                  <input
                    type="text"
                    value={formData.database}
                    onChange={(e) => setFormData(prev => ({ ...prev, database: e.target.value }))}
                    className="input-modern w-full px-4 py-2 rounded-lg focus-ring"
                    placeholder="database_name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Host</label>
                  <input
                    type="text"
                    value={formData.host}
                    onChange={(e) => setFormData(prev => ({ ...prev, host: e.target.value }))}
                    className="input-modern w-full px-4 py-2 rounded-lg focus-ring"
                    placeholder="localhost"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Port</label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => setFormData(prev => ({ ...prev, port: parseInt(e.target.value) }))}
                    className="input-modern w-full px-4 py-2 rounded-lg focus-ring"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="input-modern w-full px-4 py-2 rounded-lg focus-ring"
                    placeholder="username"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="input-modern w-full px-4 py-2 pr-10 rounded-lg focus-ring"
                      placeholder="password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* SSL Option */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="ssl"
                  checked={formData.ssl}
                  onChange={(e) => setFormData(prev => ({ ...prev, ssl: e.target.checked }))}
                  className="w-4 h-4 text-primary bg-transparent border-white/20 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="ssl" className="text-sm font-medium">
                  Use SSL/TLS encryption
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('connections')}
                  className="btn-glass px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2 rounded-lg"
                >
                  Create Connection
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}