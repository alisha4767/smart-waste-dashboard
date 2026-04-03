import { MapPin } from 'lucide-react';

const BinCard = ({ bin }) => {
  const getStatusColor = (fill) => {
    if (fill <= 40) return 'bg-emerald-500';
    if (fill <= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const statusLabel = 
    bin.fill <= 40 ? 'Good' : 
    bin.fill <= 70 ? 'Moderate' : 'Critical';

  const badgeColor = 
    bin.fill <= 40 ? 'bg-emerald-100 text-emerald-700' : 
    bin.fill <= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between border border-slate-100 transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-slate-900 text-lg">{bin.id}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
          {statusLabel}
        </span>
      </div>
      
      <div className="flex items-start text-slate-500 text-sm mb-6 gap-2">
        <MapPin size={18} className="shrink-0 mt-0.5" />
        <span className="leading-tight">{bin.location}</span>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex justify-between text-sm font-semibold">
          <span>Fill Level</span>
          <span className={bin.fill <= 40 ? 'text-emerald-500' : bin.fill <= 70 ? 'text-amber-500' : 'text-red-500'}>
            {bin.fill}%
          </span>
        </div>
        
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${getStatusColor(bin.fill)}`}
            style={{ width: `${bin.fill}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BinCard;
