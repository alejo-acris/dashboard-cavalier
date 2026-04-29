'use client';
import { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';

export default function RechargeButton({ locationId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRecharge = async (packageSize) => {
    try {
      setIsLoading(true);
      setError('');
      
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locationId, packageSize }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar la solicitud');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={() => handleRecharge(5000)} // Valor por defecto, se podría parametrizar en un modal
        disabled={isLoading}
        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Zap className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
        )}
        <span>Recargar Mensajes</span>
        <div className="absolute inset-0 h-full w-full rounded-xl group-hover:animate-pulse bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </button>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
