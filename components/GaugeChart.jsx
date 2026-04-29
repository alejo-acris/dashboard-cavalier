'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function GaugeChart({ percentage, consumed, limit }) {
  const data = [
    { name: 'Consumido', value: Math.min(percentage, 100) },
    { name: 'Disponible', value: Math.max(100 - percentage, 0) },
  ];

  // Colors: verde (< 70%), amarillo (70-90%), rojo (> 90%)
  const getColor = (pct) => {
    if (pct < 70) return '#10B981'; // Tailwind emerald-500
    if (pct < 90) return '#F59E0B'; // Tailwind amber-500
    return '#EF4444'; // Tailwind red-500
  };

  const COLORS = [getColor(percentage), '#1F2937']; // Consumido, Disponible (dark gray)

  return (
    <div className="flex flex-col items-center justify-center h-64 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-4">
      <h3 className="text-slate-400 text-sm font-medium tracking-wide mb-2">USO DE MENSAJES</h3>
      <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC' }}
              itemStyle={{ color: '#F8FAFC' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center mt-6">
          <span className="text-3xl font-bold text-white tracking-tight">{percentage.toFixed(1)}%</span>
          <span className="text-xs text-slate-500 mt-1">{consumed} / {limit}</span>
        </div>
      </div>
    </div>
  );
}
