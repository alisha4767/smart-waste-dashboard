import { useMemo } from 'react';
import { Trash2, AlertTriangle, Activity, BarChart3, TrendingUp } from 'lucide-react';
import { useBins } from '../context/BinsContext';
import BinCard from '../components/BinCard';
import StatsCard from '../components/StatsCard';
import WasteTrendsChart from '../components/WasteTrendsChart';
import BinFillChart from '../components/BinFillChart';
import PredictionCard from '../components/PredictionCard';

const Dashboard = () => {
  const { binsData, loading } = useBins();

  const stats = useMemo(() => {
    const totalBins = binsData.length;
    const fullBins = binsData.filter(bin => bin.fill > 70).length;
    const avgFill = totalBins > 0 ? Math.round(
      binsData.reduce((acc, curr) => acc + curr.fill, 0) / totalBins
    ) : 0;
    
    return { totalBins, fullBins, avgFill };
  }, [binsData]);

  if (loading) {
    return <div className="p-10 flex justify-center text-slate-500 font-medium">Loading Telemetry Data...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard 
          title="Total Bins" 
          value={stats.totalBins} 
          icon={Trash2} 
          colorClass="primary" 
        />
        <StatsCard 
          title="Critical Bins" 
          value={stats.fullBins} 
          icon={AlertTriangle} 
          colorClass="danger" 
        />
        <StatsCard 
          title="Avg Fill Level" 
          value={`${stats.avgFill}%`} 
          icon={Activity} 
          colorClass="info" 
        />
      </div>

      {/* Analytics Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-500" /> Analytics & Trends
        </h3>
        <div className="flex flex-col lg:flex-row gap-6">
          <WasteTrendsChart />
          <BinFillChart />
        </div>
      </div>

      {/* AI Predictions */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-indigo-500" /> AI Predictions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          {binsData.map((bin) => (
             <PredictionCard key={`pred-${bin.id}`} bin={bin} />
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 mb-6">Active Bins Mapping</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {binsData.map((bin) => (
          <BinCard key={bin.id} bin={bin} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;