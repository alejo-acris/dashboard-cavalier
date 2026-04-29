// DashboardView.jsx
'use client';
import { useState } from 'react';
import GaugeChart from "@/components/GaugeChart";
import StatsGrid from "@/components/StatsGrid";
import DailyBarChart from "@/components/DailyBarChart";
import RechargeButton from "@/components/RechargeButton";
import { BotMessageSquare, Settings } from 'lucide-react';

export default function DashboardView({ locationId, initialData }) {
  const { data, history } = initialData;

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600/20 flex items-center justify-center rounded-2xl border border-blue-500/30">
            <BotMessageSquare className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{data.business_name}</h1>
            <p className="text-slate-400 text-sm">Panel de Consumo IA • ID: {locationId}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RechargeButton locationId={locationId} />
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Gauge and Status */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <GaugeChart percentage={data.percentage} consumed={data.messages_consumed} limit={data.messages_limit} />
          
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-md">
            <h3 className="text-slate-400 text-sm font-medium tracking-wide border-b border-slate-800 pb-4 mb-4">ESTADO DE CUENTA</h3>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                ${data.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                  data.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                  'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {data.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Stats, Charts, Breakdown */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <StatsGrid consumed={data.messages_consumed} limit={data.messages_limit} renewalDate={data.renewal_date} />
          
          <DailyBarChart history={history} />
        </div>

      </div>
    </div>
  );
}
