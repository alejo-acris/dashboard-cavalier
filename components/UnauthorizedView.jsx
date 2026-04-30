"use client";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedView() {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Acceso No Autorizado</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            No pudimos verificar tu identidad. Por favor, asegúrate de acceder usando el enlace proporcionado o contacta a tu agencia para asistencia.
          </p>
          
          <button 
            className="w-full px-6 py-3 font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl transition-colors border border-slate-700"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
}
