import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import Reports from './pages/Reports';
import { LayoutDashboard, Map as MapIcon, Flag } from 'lucide-react';
import { BinsProvider } from './context/BinsContext';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <BinsProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-4 px-6 md:px-10 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Smart Waste Dashboard</h1>
        <nav className="flex gap-2 text-sm md:text-base">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-1.5 md:gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${currentView === 'dashboard' ? 'bg-white/20 text-white shadow-sm' : 'hover:bg-white/10 text-white/90'}`}
          >
            <LayoutDashboard size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </button>
          <button 
            onClick={() => setCurrentView('map')}
            className={`flex items-center gap-1.5 md:gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${currentView === 'map' ? 'bg-white/20 text-white shadow-sm' : 'hover:bg-white/10 text-white/90'}`}
          >
            <MapIcon size={18} />
            <span className="hidden md:inline">Map View</span>
          </button>
          <button 
            onClick={() => setCurrentView('reports')}
            className={`flex items-center gap-1.5 md:gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${currentView === 'reports' ? 'bg-white/20 text-white shadow-sm' : 'hover:bg-white/10 text-white/90'}`}
          >
            <Flag size={18} />
            <span className="hidden md:inline">Reports</span>
          </button>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'map' && <MapView />}
        {currentView === 'reports' && <Reports />}
      </main>
    </div>
    </BinsProvider>
  );
}

export default App;
