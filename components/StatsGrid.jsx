import { Activity, CreditCard, CalendarClock, ShieldCheck } from "lucide-react";

export default function StatsGrid({ consumed, limit, renewalDate, status }) {
  const remaining = limit - consumed;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Executed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-sm font-medium">Total Ejecutado</h3>
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <p className="text-3xl font-bold text-white">{consumed.toLocaleString()}</p>
        <p className="text-xs text-slate-500 mt-1">Mensajes enviados</p>
      </div>

      {/* Remaining Balance */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-sm font-medium">Saldo Restante</h3>
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
        <p className="text-3xl font-bold text-white">{remaining > 0 ? remaining.toLocaleString() : 0}</p>
        <p className="text-xs text-slate-500 mt-1">Mensajes disponibles</p>
      </div>

      {/* Renewal Date */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-sm font-medium">Renovación</h3>
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <CalendarClock className="w-5 h-5 text-purple-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mt-1">{renewalDate}</p>
        <p className="text-xs text-slate-500 mt-1">Fecha de reinicio</p>
      </div>

      {/* Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-sm font-medium">Estado</h3>
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
        </div>
        <div className="mt-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border 
            ${status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
              status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
              'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {status.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-ellipsis overflow-hidden">Estado de la cuenta</p>
      </div>
    </div>
  );
}
