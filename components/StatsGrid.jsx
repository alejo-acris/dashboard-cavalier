import { Activity, CreditCard, CalendarClock } from "lucide-react";

export default function StatsGrid({ consumed, limit, renewalDate }) {
  const remaining = limit - consumed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Executed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-sm font-medium">Total Ejecutado</h3>
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <p className="text-3xl font-bold text-white">{consumed.toLocaleString()}</p>
        <p className="text-xs text-slate-500 mt-1">Mensajes enviados este mes</p>
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
        <p className="text-xs text-slate-500 mt-1">Mensajes disponibles en tu plan</p>
      </div>

      {/* Renewal Date */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-sm font-medium">Fecha de Renovación</h3>
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <CalendarClock className="w-5 h-5 text-purple-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mt-1">{renewalDate}</p>
        <p className="text-xs text-slate-500 mt-1">Tu cuota se reinicia este día</p>
      </div>
    </div>
  );
}
