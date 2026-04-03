import React from 'react';

const StatsCard = ({ title, value, icon: Icon, colorClass }) => {
  const bgColors = {
    primary: "bg-blue-100 text-blue-600",
    danger: "bg-red-100 text-red-500",
    info: "bg-purple-100 text-purple-600"
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex justify-between items-center transition duration-300 hover:-translate-y-1 hover:shadow-md relative overflow-hidden">
      <div className="flex flex-col z-10">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-4xl font-bold text-slate-900">{value}</p>
      </div>
      <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${bgColors[colorClass]} z-10`}>
        <Icon size={28} />
      </div>
    </div>
  );
};

export default StatsCard;
