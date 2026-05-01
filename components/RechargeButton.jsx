'use client';
import { useState } from 'react';
import { Zap, Loader2, X, CreditCard, ShieldCheck, ArrowUpCircle } from 'lucide-react';

const BLOCK_OPTIONS = [
  { messages: 1000, priceUSD: 28, perMsg: "0.028", discount: 0, badgeText: '', badgeColor: '', paymentLink: 'https://link.integralead.co/payment-link/69f38c7fb615f70a8a33a86e' },
  { messages: 2000, priceUSD: 55, perMsg: "0.0275", discount: 3, badgeText: '3% OFF', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30', paymentLink: 'https://link.integralead.co/payment-link/69f3944dcdfae4ecc1a1981c' },
  { messages: 5000, priceUSD: 130, perMsg: "0.026", discount: 5, badgeText: '5% OFF 🟢', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', paymentLink: 'https://link.integralead.co/payment-link/69f39491cdfae4ecc1a1981d' },
  { messages: 10000, priceUSD: 245, perMsg: "0.0245", discount: 10, badgeText: '10% OFF 🔥', badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30', paymentLink: 'https://link.integralead.co/payment-link/69f394bbcdfae4ecc1a1981f' }
];

export default function RechargeButton({ locationId, userContext, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(BLOCK_OPTIONS[2]); // 5000 por defecto
  const handlePurchase = () => {
    if (selectedBlock.paymentLink && selectedBlock.paymentLink !== '#') {
      let url = `${selectedBlock.paymentLink}?location_id=${locationId}`;
      if (userContext?.name) url += `&first_name=${encodeURIComponent(userContext.name)}`;
      if (userContext?.lastname) url += `&last_name=${encodeURIComponent(userContext.lastname)}`;
      if (userContext?.email) url += `&email=${encodeURIComponent(userContext.email)}`;
      
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("El enlace de pago para este paquete se añadirá pronto.");
    }
  };

  const remainingMessages = data ? Math.max(0, data.messages_limit - data.messages_consumed) : 0;
  const percentageStr = data ? data.percentage.toFixed(1) : "0";

  return (
    <>
      {/* Botón Disparador */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
      >
        <Zap className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
        <span>Recargar Mensajes</span>
        <div className="absolute inset-0 h-full w-full rounded-xl group-hover:animate-pulse bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#020817]/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Contenido del Modal (1 Columna Centrada) */}
          <div className="relative w-full max-w-2xl bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header del Modal */}
            <div className="p-6 border-b border-[#30363d] bg-[#161b22] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Recargar Mensajes</h2>
                </div>
                {data && (
                  <>
                    <p className="text-slate-400 font-medium">{data.business_name} — Agentes IA</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-[#30363d] text-sm w-fit">
                      <span className={`w-2 h-2 rounded-full ${data.percentage >= 90 ? 'bg-red-500' : data.percentage >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                      <span className="text-slate-300 font-medium">{percentageStr}% usado</span>
                      <span className="text-slate-500 hidden sm:inline">&middot;</span>
                      <span className="text-white font-semibold">{remainingMessages.toLocaleString()} mensajes restantes</span>
                    </div>
                  </>
                )}
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6 lg:p-8 overflow-y-auto max-h-[70vh]">
              
              <div className="flex flex-col bg-[#161b22] border-l-4 border-l-blue-500 border-t border-r border-b border-[#30363d] rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                <div className="p-6 flex-grow">
                  <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-4 tracking-wide uppercase">
                    Comprar Bloque
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Agrega mensajes a tu plan actual</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Selecciona un bloque de mensajes adicionales para seguir operando sin cambiar tu suscripción.
                  </p>

                  <div className="space-y-3 mb-6">
                    {BLOCK_OPTIONS.map((block) => (
                      <button
                        key={block.messages}
                        onClick={() => setSelectedBlock(block)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                          selectedBlock.messages === block.messages 
                            ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                            : 'bg-[#0d1117] border-[#30363d] hover:border-slate-500 hover:bg-slate-800/50'
                        }`}
                      >
                        {/* IZQUIERDA: mensajes y precio por unidad */}
                        <div className="flex flex-col items-start gap-1">
                          <span className={`text-lg font-bold ${selectedBlock.messages === block.messages ? 'text-white' : 'text-slate-300'}`}>
                            {block.messages.toLocaleString()} mensajes
                          </span>
                          <span className="text-sm text-slate-400">
                            ${block.perMsg} / msg
                          </span>
                        </div>
                        
                        {/* DERECHA: precio total USD y badge */}
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-xl font-bold ${selectedBlock.messages === block.messages ? 'text-blue-400' : 'text-slate-300'}`}>
                            ${block.priceUSD} USD
                          </span>
                          {block.discount > 0 && (
                            <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-md border ${block.badgeColor}`}>
                              {block.badgeText}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-950/20 border border-blue-900/30 rounded-xl flex flex-col sm:flex-row items-center gap-3">
                    <ArrowUpCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <p className="text-sm text-blue-100 text-center sm:text-left">
                      Con este bloque tendrás: <span className="font-bold text-white">{(remainingMessages + selectedBlock.messages).toLocaleString()}</span> mensajes disponibles.
                    </p>
                  </div>
                </div>
                
                <div className="p-6 bg-[#0d1117] border-t border-[#30363d]">
                  <button
                    onClick={handlePurchase}
                    className="w-full relative flex items-center justify-center gap-2 py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors text-base sm:text-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  >
                    <Zap className="w-6 h-6 text-blue-200" />
                    <span>⚡ Comprar {selectedBlock.messages.toLocaleString()} mensajes — ${selectedBlock.priceUSD} USD</span>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    Los mensajes se acreditan de inmediato. Sin cambios en tu fecha de renovación.
                  </p>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 lg:px-8 lg:py-5 border-t border-[#30363d] bg-[#161b22] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <p className="text-slate-400">
                ¿Tienes dudas? <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Escríbenos a soporte</a>
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                  <CreditCard className="w-5 h-5 text-slate-300" />
                  <span className="text-xs font-bold text-slate-400 hidden sm:inline">Tarjetas de Crédito / Débito</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500/80">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-medium">Pago seguro 100%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
