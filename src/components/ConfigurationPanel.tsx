import React from 'react';
import { Settings, Euro, Percent, Calendar } from 'lucide-react';
import { SimulationParams } from '../types';
import { useDebounceInput } from '../hooks/useDebounceInput';

interface ConfigurationPanelProps {
  params: SimulationParams;
  setParams: (params: SimulationParams) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ params, setParams }) => {
  const revenus = useDebounceInput(params.revenus, (value) => setParams({...params, revenus: value}));
  const tauxEmprunt = useDebounceInput(params.tauxEmprunt, (value) => setParams({...params, tauxEmprunt: value}), 500, true);
  const rendementCapital = useDebounceInput(params.rendementCapitalInvesti, (value) => setParams({...params, rendementCapitalInvesti: value}), 500, true);
  const apportDisponible = useDebounceInput(params.apportDisponible, (value) => setParams({...params, apportDisponible: value}));
  const capitalInvesti = useDebounceInput(params.capitalInvesti, (value) => setParams({...params, capitalInvesti: value}));

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <Settings className="text-blue-400" size={24} /> Configuration
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Revenus nets mensuels</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={revenus.displayValue}
              onChange={(e) => revenus.handleChange(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3500"
            />
            <Euro className="absolute right-3 top-3.5 text-slate-400" size={16} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Taux emprunt</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={tauxEmprunt.displayValue}
                onChange={(e) => tauxEmprunt.handleChange(e.target.value)}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                placeholder="3.5"
              />
              <Percent className="absolute right-3 top-3.5 text-slate-400" size={16} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Rendement capital investi</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={rendementCapital.displayValue}
                onChange={(e) => rendementCapital.handleChange(e.target.value)}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                placeholder="7.0"
              />
              <Percent className="absolute right-3 top-3.5 text-slate-400" size={16} />
            </div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-blue-400" size={16} />
            <span className="text-sm font-medium text-blue-300">Durées d'emprunt analysées</span>
          </div>
          <div className="text-xs text-white/70">
            L'algorithme teste automatiquement toutes les durées de 5 à 25 ans (par tranche de 5 ans)
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Capital disponible (apport potentiel)</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={apportDisponible.displayValue}
              onChange={(e) => apportDisponible.handleChange(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
              placeholder="18000"
            />
            <Euro className="absolute right-3 top-3.5 text-slate-400" size={16} />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Capital investi</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={capitalInvesti.displayValue}
              onChange={(e) => capitalInvesti.handleChange(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
              placeholder="42000"
            />
            <Euro className="absolute right-3 top-3.5 text-slate-400" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;