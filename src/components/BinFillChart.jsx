import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useBins } from '../context/BinsContext';

const BinFillChart = () => {
  const { binsData, loading } = useBins();

  const getBarColor = (fill) => {
    if (fill <= 40) return '#10b981'; // emerald-500
    if (fill <= 70) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex-1 min-w-0 md:min-w-[300px]">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Current Bin Fill Levels</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={binsData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="id" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Bar dataKey="fill" name="Fill Level %" radius={[4, 4, 0, 0]} maxBarSize={50}>
              {binsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.fill)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BinFillChart;
