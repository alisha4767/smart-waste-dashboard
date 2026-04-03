import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { calculatePrediction, historicalData } from '../data/analyticsData';

const PredictionCard = ({ bin }) => {
  const pastData = historicalData[historicalData.length - 1][bin.id] || (bin.fill - 10);
  const prediction = calculatePrediction(bin.fill, pastData);
  const increase = prediction - bin.fill;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-xl shadow-sm border border-indigo-100 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-indigo-100 rounded-full opacity-50 blur-2xl group-hover:bg-indigo-200 transition-all"></div>
      
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div>
          <h4 className="font-semibold text-slate-800 text-sm">Prediction: {bin.id}</h4>
          <p className="text-xs text-slate-500">AI Expected Next Fill</p>
        </div>
        <div className={`p-2 rounded-lg ${increase > 15 ? 'bg-red-100 text-red-500' : 'bg-indigo-100 text-indigo-500'}`}>
           {increase > 15 ? <AlertCircle size={16} /> : <TrendingUp size={16} />}
        </div>
      </div>
      
      <div className="flex items-end gap-3 relative z-10">
        <span className="text-3xl font-bold text-slate-900">{prediction}%</span>
        {increase > 0 && (
          <span className={`flex items-center text-xs font-semibold mb-1.5 ${increase > 15 ? 'text-red-500' : 'text-amber-500'}`}>
            +{increase}% <TrendingUp size={12} className="ml-0.5" />
          </span>
        )}
        {increase < 0 && (
          <span className="flex items-center text-xs font-semibold text-emerald-500 mb-1.5">
            {increase}% <TrendingDown size={12} className="ml-0.5" />
          </span>
        )}
      </div>
    </div>
  );
};

export default PredictionCard;
