import { Bot } from "lucide-react";

export default function AgentBreakdown({ history = [] }) {
  // Agrupar totales por agente
  const agentMap = {};
  
  history.forEach(item => {
    const agentName = item.agent || 'Bot Genérico';
    if (!agentMap[agentName]) {
      agentMap[agentName] = 0;
    }
    agentMap[agentName] += (item.count || 1);
  });

  const agents = Object.keys(agentMap).map(key => ({
    name: key,
    executions: agentMap[key]
  })).sort((a, b) => b.executions - a.executions);

  const total = agents.reduce((acc, curr) => acc + curr.executions, 0);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-md">
      <h3 className="text-white text-lg font-semibold mb-6">Desglose por Agente</h3>
      
      <div className="space-y-4">
        {agents.length === 0 && (
          <p className="text-slate-500 text-sm">No hay datos de ejecución registrados.</p>
        )}
        
        {agents.map((agent, index) => {
          const percentage = total > 0 ? (agent.executions / total) * 100 : 0;
          return (
            <div key={index} className="flex flex-col gap-2 p-3 hover:bg-slate-800/50 rounded-xl transition-colors shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <Bot className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="text-slate-200 font-medium">{agent.name}</span>
                </div>
                <div className="text-right">
                  <span className="block text-white font-semibold">{agent.executions.toLocaleString()}</span>
                  <span className="block text-xs text-slate-500">{percentage.toFixed(1)}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
