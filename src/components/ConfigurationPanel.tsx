import React, { useState } from 'react';
import { Settings, Euro, Percent, Calendar, Home, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { SimulationParams } from '../types';
import { useDebounceInput } from '../hooks/useDebounceInput';

interface ConfigurationPanelProps {
  params: SimulationParams;
  setParams: (params: SimulationParams) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ params, setParams }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const revenus = useDebounceInput(params.revenus, (value) => setParams({...params, revenus: value}));
  const tauxEmprunt = useDebounceInput(params.tauxEmprunt, (value) => setParams({...params, tauxEmprunt: value}), 500, true);
  const rendementCapital = useDebounceInput(params.rendementCapitalInvesti, (value) => setParams({...params, rendementCapitalInvesti: value}), 500, true);
  const apportDisponible = useDebounceInput(params.apportDisponible, (value) => setParams({...params, apportDisponible: value}));
  const capitalInvesti = useDebounceInput(params.capitalInvesti, (value) => setParams({...params, capitalInvesti: value}));
  const surfaceLogement = useDebounceInput(params.surfaceLogement, (value) => setParams({...params, surfaceLogement: value}));
  const loyerMensuel = useDebounceInput(params.loyerMensuel, (value) => setParams({...params, loyerMensuel: value}));
  
  // Advanced parameters
  const taxeFonciere = useDebounceInput(params.taxeFonciere, (value) => setParams({...params, taxeFonciere: value}), 500, true);
  const chargesCopropriete = useDebounceInput(params.chargesCopropriete, (value) => setParams({...params, chargesCopropriete: value}), 500, true);
  const assuranceHabitation = useDebounceInput(params.assuranceHabitation, (value) => setParams({...params, assuranceHabitation: value}));
  const inflation = useDebounceInput(params.inflation, (value) => setParams({...params, inflation: value}), 500, true);
  const fraisNotaire = useDebounceInput(params.fraisNotaire, (value) => setParams({...params, fraisNotaire: value}), 500, true);
  const fraisEntretien = useDebounceInput(params.fraisEntretien, (value) => setParams({...params, fraisEntretien: value}), 500, true);
  const assuranceEmprunt = useDebounceInput(params.assuranceEmprunt, (value) => setParams({...params, assuranceEmprunt: value}), 500, true);

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
              placeholder="5000"
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
                placeholder="6.0"
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
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Surface logement espérée</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={surfaceLogement.displayValue}
              onChange={(e) => surfaceLogement.handleChange(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
              placeholder="60"
            />
            <span className="absolute right-3 top-3.5 text-slate-400 text-sm">m²</span>
          </div>
        </div>
        
        <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Home className="text-purple-400" size={16} />
            <span className="text-sm font-medium text-purple-300">Comparaison Louer vs Acheter</span>
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">Loyer mensuel équivalent</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={loyerMensuel.displayValue}
                onChange={(e) => loyerMensuel.handleChange(e.target.value)}
                className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                placeholder="800"
              />
              <Euro className="absolute right-2 top-2.5 text-slate-400" size={12} />
            </div>
          </div>
        </div>
        
        <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Sliders className="text-slate-400" size={16} />
              <span className="text-sm font-medium text-slate-300">Paramètres Avancés</span>
            </div>
            {showAdvanced ? (
              <ChevronUp className="text-slate-400" size={16} />
            ) : (
              <ChevronDown className="text-slate-400" size={16} />
            )}
          </button>
          
          {showAdvanced && (
            <div className="px-4 pb-4 space-y-4 border-t border-slate-600/30 pt-4">
              <div className="text-xs text-orange-300 mb-3 font-medium">Charges de Propriété</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Taxe foncière</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={taxeFonciere.displayValue}
                      onChange={(e) => taxeFonciere.handleChange(e.target.value)}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                      placeholder="1.2"
                    />
                    <Percent className="absolute right-2 top-2.5 text-slate-400" size={12} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Charges copropriété</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={chargesCopropriete.displayValue}
                      onChange={(e) => chargesCopropriete.handleChange(e.target.value)}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                      placeholder="3.5"
                    />
                    <span className="absolute right-2 top-2.5 text-slate-400 text-xs">€/m²</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Assurance habitation</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={assuranceHabitation.displayValue}
                      onChange={(e) => assuranceHabitation.handleChange(e.target.value)}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                      placeholder="45"
                    />
                    <Euro className="absolute right-2 top-2.5 text-slate-400" size={12} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Inflation</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={inflation.displayValue}
                      onChange={(e) => inflation.handleChange(e.target.value)}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                      placeholder="2.0"
                    />
                    <Percent className="absolute right-2 top-2.5 text-slate-400" size={12} />
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-green-300 mb-3 font-medium border-t border-slate-600/30 pt-3">Frais d'Acquisition et Entretien</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Frais notaire</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={fraisNotaire.displayValue}
                      onChange={(e) => fraisNotaire.handleChange(e.target.value)}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                      placeholder="8.0"
                    />
                    <Percent className="absolute right-2 top-2.5 text-slate-400" size={12} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Frais entretien</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={fraisEntretien.displayValue}
                      onChange={(e) => fraisEntretien.handleChange(e.target.value)}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                      placeholder="1.0"
                    />
                    <Percent className="absolute right-2 top-2.5 text-slate-400" size={12} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Assurance emprunt</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={assuranceEmprunt.displayValue}
                      onChange={(e) => assuranceEmprunt.handleChange(e.target.value)}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm"
                      placeholder="0.3"
                    />
                    <Percent className="absolute right-2 top-2.5 text-slate-400" size={12} />
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-white/60 bg-slate-800/30 p-3 rounded border border-slate-600/30">
                <div className="font-medium text-white/80 mb-2">Notes:</div>
                <ul className="space-y-1">
                  <li>• <strong>Taxe foncière:</strong> % annuel du prix d'achat</li>
                  <li>• <strong>Charges copro:</strong> € par m² par mois</li>
                  <li>• <strong>Inflation:</strong> Appréciation immobilière annuelle</li>
                  <li>• <strong>Frais notaire:</strong> % du prix d'achat (acquisition)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;