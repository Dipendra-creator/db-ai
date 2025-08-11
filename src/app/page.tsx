'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent';
import ConnectionManager from '@/components/ConnectionManager';

export default function Home() {
  const [showConnectionManager, setShowConnectionManager] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        <Sidebar />
        <MainContent />
      </div>

      {/* Connection Manager Modal */}
      <ConnectionManager 
        isOpen={showConnectionManager}
        onClose={() => setShowConnectionManager(false)}
      />
    </div>
  );
}
