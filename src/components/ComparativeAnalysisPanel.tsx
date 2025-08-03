import React from 'react';
import { Scale, DollarSign, Rocket, Calculator } from 'lucide-react';
import { ComparisonResult, LogiqueApport } from '../types';

interface ComparativeAnalysisPanelProps {
  strategieAbsolue: ComparisonResult | undefined;
  logiqueApport: LogiqueApport;
}

const ComparativeAnalysisPanel: React.FC<ComparativeAnalysisPanelProps> = ({ strategieAbsolue, logiqueApport }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <Scale className="text-blue-400" size={24} /> Analyse Comparative
      </h2>
      
      {strategieAbsolue && (
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
            <div className="font-medium text-blue-300 mb-2 flex items-center gap-2">
              <DollarSign className="text-blue-400" size={16} />
              Avec apport
            </div>
            <div className="text-sm space-y-1 text-white/80">
              <div>Apport : {strategieAbsolue.avecApport.apportUtilise.toLocaleString()} €</div>
              <div>Mensualité : {Math.round(strategieAbsolue.avecApport.mensualite)} €</div>
              <div>Investissement : {Math.round(strategieAbsolue.avecApport.investETF)} €/mois</div>
              <div className="font-medium text-blue-300">Patrimoine : {Math.round(strategieAbsolue.avecApport.patrimoine / 1000)}k €</div>
            </div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
            <div className="font-medium text-red-300 mb-2 flex items-center gap-2">
              <Rocket className="text-red-400" size={16} />
              Sans apport
            </div>
            <div className="text-sm space-y-1 text-white/80">
              <div>Apport : 0 € (tout investi)</div>
              <div>Mensualité : {Math.round(strategieAbsolue.sansApport.mensualite)} €</div>
              <div>Investissement : {Math.round(strategieAbsolue.sansApport.investETF)} €/mois</div>
              <div className="font-medium text-red-300">Patrimoine : {Math.round(strategieAbsolue.sansApport.patrimoine / 1000)}k €</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 rounded-lg border border-yellow-500/30">
            <div className="text-center">
              <div className="text-sm font-medium text-yellow-300">
                Écart : {Math.round(strategieAbsolue.ecart / 1000)}k €
              </div>
              <div className="text-xs text-white/70">
                {strategieAbsolue.strategieOptimale === 'sans_apport' ? 
                  'Sans apport: plus rentable' : 'Avec apport: plus rentable'}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
        <div className="text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
          <Calculator className="text-purple-400" size={16} />
          Logique financière
        </div>
        <div className={`text-xs ${logiqueApport.couleur} font-medium`}>
          {logiqueApport.message}
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysisPanel;