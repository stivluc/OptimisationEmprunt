import React from 'react';
import { Target, Home, TrendingUp, BarChart3 } from 'lucide-react';
import { ComparisonResult } from '../types';

interface OptimalSolutionPanelProps {
  strategieAbsolue: ComparisonResult | undefined;
}

const OptimalSolutionPanel: React.FC<OptimalSolutionPanelProps> = ({ strategieAbsolue }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <Target className="text-emerald-400" size={24} /> Solution Optimale
      </h2>
      
      {strategieAbsolue && (
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-emerald-500/20">
            <div className="text-2xl font-bold text-emerald-400 mb-1">
              {strategieAbsolue.prixAchat.toLocaleString()} €
            </div>
            <div className="text-emerald-300 font-medium">
              {strategieAbsolue.dureeAnnees} ans • {strategieAbsolue.strategieOptimale === 'sans_apport' ? 'Sans apport' : 'Avec apport'}
            </div>
            <div className="text-white/80 text-sm mt-2">
              Patrimoine final : {strategieAbsolue.patrimoineOptimal.toLocaleString()} €
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-xs text-white/60 uppercase tracking-wide">Mensualité</div>
              <div className="text-lg font-bold text-white">{Math.round(strategieAbsolue.mensualiteOptimale)} €</div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-xs text-white/60 uppercase tracking-wide">Investissement mensuel</div>
              <div className="text-lg font-bold text-white">{Math.round(strategieAbsolue.investETFOptimal)} €</div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-xs text-white/60 uppercase tracking-wide">Apport utilisé</div>
              <div className="text-lg font-bold text-white">{strategieAbsolue.apportOptimal.toLocaleString()} €</div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <div className="text-xs text-white/60 uppercase tracking-wide">Capacité restante</div>
              <div className="text-lg font-bold text-white">{Math.round(strategieAbsolue.capaciteRestante)} €</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-blue-500/30">
            <div className="text-sm font-medium text-blue-300 mb-2">Composition finale</div>
            <div className="text-xs space-y-1 text-white/80">
              <div className="flex items-center gap-2">
                <Home className="text-orange-400" size={14} />
                Immobilier : {Math.round(strategieAbsolue.valeurImmo / 1000)}k €
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-green-400" size={14} />
                Capital investi : {Math.round(strategieAbsolue.capitalFinal / 1000)}k €
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="text-blue-400" size={14} />
                Nouveaux investissements : {Math.round((strategieAbsolue.patrimoineOptimal - strategieAbsolue.valeurImmo - strategieAbsolue.capitalFinal) / 1000)}k €
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimalSolutionPanel;