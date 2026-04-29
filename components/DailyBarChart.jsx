'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailyBarChart({ history = [] }) {
  // Agrupar interacciones por fecha
  const dataMap = {};

  history.forEach(item => {
    if (!dataMap[item.date]) {
      dataMap[item.date] = { date: item.date, total: 0 };
    }
    // Si viene count (ej mock), lo usa. Sino, incrementa 1
    dataMap[item.date].total += (item.count || 1);
  });

  // Ordenar fechas (ascendente)
  const sortedData = Object.values(dataMap).sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-md">
      <h3 className="text-white text-lg font-semibold mb-6">Interacciones generadas por día</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '8px', color: '#F1F5F9' }}
              itemStyle={{ color: '#F1F5F9' }}
              cursor={{ fill: '#1E293B' }}
            />
            <Bar 
              dataKey="total" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
