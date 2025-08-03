import React from 'react';
import { Scale, Home, TrendingUp, Calculator, Clock, Building2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ComparisonResult, LogiqueApport, SimulationParams } from '../types';
import { comparerStrategieApport } from '../utils/calculations';

interface ComparativeAnalysisPanelProps {
  strategieAbsolue: ComparisonResult | undefined;
  logiqueApport: LogiqueApport;
  params: SimulationParams;
  setParams: (params: SimulationParams) => void;
}

const ComparativeAnalysisPanel: React.FC<ComparativeAnalysisPanelProps> = ({ strategieAbsolue, logiqueApport, params, setParams }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <Scale className="text-blue-400" size={24} /> Louer vs Acheter
      </h2>
      
      <div className="space-y-4">
        {/* Comparison Controls */}
        <div className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
          <div className="text-sm font-medium text-slate-300 mb-3">Contrôles de Comparaison</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 flex items-center gap-1">
                <Clock size={12} /> Durée de comparaison
              </label>
              <div className="flex gap-1">
                {[10, 15, 20, 25].map(duree => (
                  <button
                    key={duree}
                    onClick={() => setParams({...params, dureeComparaison: duree})}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      params.dureeComparaison === duree
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                    }`}
                  >
                    {duree}a
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 flex items-center gap-1">
                <Building2 size={12} /> Prix d'achat
              </label>
              <select
                value={params.prixComparaison}
                onChange={(e) => setParams({...params, prixComparaison: Number(e.target.value)})}
                className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-xs text-white"
              >
                {Array.from({length: Math.floor((params.prixMax - params.prixMin) / 25000) + 1}, (_, i) => {
                  const prix = params.prixMin + (i * 25000);
                  return (
                    <option key={prix} value={prix}>
                      {(prix / 1000)}k €
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        
        {(() => {
          // Calculate rent strategy
          const capaciteMax = params.revenus * 0.4;
          const loyerTotal = params.loyerMensuel;
          const capaciteRestanteLocation = capaciteMax - loyerTotal;
          const investissementLocation = capaciteRestanteLocation > 0 ? capaciteRestanteLocation : 0;
          
          // Use selected comparison duration
          const dureeAnnees = params.dureeComparaison;
          const tauxInvestMensuel = params.rendementCapitalInvesti / 100 / 12;
          const nbMois = dureeAnnees * 12;
          
          // Monthly investment capitalization
          let patrimoineLocation = params.capitalInvesti * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
          let investMensuelsLocation = 0;
          for (let mois = 0; mois < nbMois; mois++) {
            investMensuelsLocation = (investMensuelsLocation + investissementLocation) * (1 + tauxInvestMensuel);
          }
          
          // Add down payment invested
          const apportInvestiLocation = params.apportDisponible * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
          patrimoineLocation += investMensuelsLocation + apportInvestiLocation;
          
          return (
            <>
              <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
                <div className="font-medium text-purple-300 mb-3 flex items-center gap-2">
                  <Home className="text-purple-400" size={16} />
                  Stratégie Location + ETF
                </div>
                <div className="text-sm space-y-2 text-white/80">
                  <div className="flex justify-between">
                    <span>Loyer mensuel:</span>
                    <span className="font-medium">{Math.round(loyerTotal)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacité restante:</span>
                    <span className="font-medium">{Math.round(capaciteRestanteLocation)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investissement mensuel:</span>
                    <span className="font-medium text-purple-300">{Math.round(investissementLocation)} €/mois</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-600 pt-2">
                    <span className="font-medium">Patrimoine final ({dureeAnnees} ans):</span>
                    <span className="font-bold text-purple-300">{Math.round(patrimoineLocation / 1000)}k €</span>
                  </div>
                  <div className="text-xs text-white/60 mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>• Capital existant:</span>
                      <span>{Math.round(params.capitalInvesti * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees) / 1000)}k €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Apport investi:</span>
                      <span>{Math.round(apportInvestiLocation / 1000)}k €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Investissements mensuels:</span>
                      <span>{Math.round(investMensuelsLocation / 1000)}k €</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {(() => {
                // Get specific comparison for selected price and duration
                const strategieComparaison = comparerStrategieApport(params.prixComparaison, params.dureeComparaison, params);
                
                return strategieComparaison ? (
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                    <div className="font-medium text-blue-300 mb-3 flex items-center gap-2">
                      <TrendingUp className="text-blue-400" size={16} />
                      Stratégie Achat Immobilier
                    </div>
                    <div className="text-sm space-y-2 text-white/80">
                      <div className="flex justify-between">
                        <span>Prix d'achat:</span>
                        <span className="font-medium">{strategieComparaison.prixAchat.toLocaleString()} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Charges totales:</span>
                        <span className="font-medium">{Math.round(strategieComparaison.chargesOptimales)} €/mois</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investissement mensuel:</span>
                        <span className="font-medium text-blue-300">{Math.round(strategieComparaison.investETFOptimal)} €/mois</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-600 pt-2">
                        <span className="font-medium">Patrimoine final ({strategieComparaison.dureeAnnees} ans):</span>
                        <span className="font-bold text-blue-300">{Math.round(strategieComparaison.patrimoineOptimal / 1000)}k €</span>
                      </div>
                      <div className="text-xs text-white/60 mt-2 space-y-1">
                        <div className="flex justify-between">
                          <span>• Immobilier:</span>
                          <span>{Math.round(strategieComparaison.valeurImmo / 1000)}k €</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• Capital existant:</span>
                          <span>{Math.round(strategieComparaison.capitalFinal / 1000)}k €</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• Nouveaux investissements:</span>
                          <span>{Math.round((strategieComparaison.patrimoineOptimal - strategieComparaison.valeurImmo - strategieComparaison.capitalFinal) / 1000)}k €</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <div className="font-medium text-red-300 mb-2 flex items-center gap-2">
                      <TrendingUp className="text-red-400" size={16} />
                      Stratégie Achat Immobilier
                    </div>
                    <div className="text-red-300 text-sm">Stratégie impossible avec ces paramètres</div>
                    <div className="text-xs text-red-200/70 mt-1">
                      Les charges dépassent la capacité d'endettement (40% des revenus)
                    </div>
                  </div>
                );
              })()}
              
              {(() => {
                const strategieComparaison = comparerStrategieApport(params.prixComparaison, params.dureeComparaison, params);
                
                return strategieComparaison ? (
                  <div className={`p-4 rounded-lg border ${
                    patrimoineLocation > strategieComparaison.patrimoineOptimal
                      ? 'bg-purple-500/10 border-purple-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}>
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">
                        {patrimoineLocation > strategieComparaison.patrimoineOptimal ? (
                          <span className="text-purple-300">Location + ETF plus rentable</span>
                        ) : (
                          <span className="text-blue-300">Achat immobilier plus rentable</span>
                        )}
                      </div>
                      <div className="text-lg font-bold text-white">
                        Écart: {Math.round(Math.abs(patrimoineLocation - strategieComparaison.patrimoineOptimal) / 1000)}k €
                      </div>
                      <div className="text-xs text-white/70 mt-1">
                        {Math.round(Math.abs(patrimoineLocation - strategieComparaison.patrimoineOptimal) / Math.max(patrimoineLocation, strategieComparaison.patrimoineOptimal) * 100)}% de différence
                      </div>
                      <div className="text-xs text-white/50 mt-1">
                        Comparaison sur {params.dureeComparaison} ans • {(params.prixComparaison/1000)}k €
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </>
          );
        })()}
      </div>
      
      {/* Graphiques de comparaison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Graphique par durée */}
        <div className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
          <div className="text-sm font-medium text-slate-300 mb-3">Évolution par durée ({(params.prixComparaison/1000)}k €)</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={(() => {
                const durees = [10, 15, 20, 25];
                return durees.map(duree => {
                  // Calcul location
                  const capaciteMax = params.revenus * 0.4;
                  const loyerTotal = params.loyerMensuel;
                  const capaciteRestanteLocation = capaciteMax - loyerTotal;
                  const investissementLocation = capaciteRestanteLocation > 0 ? capaciteRestanteLocation : 0;
                  const tauxInvestMensuel = params.rendementCapitalInvesti / 100 / 12;
                  const nbMois = duree * 12;
                  let patrimoineLocation = params.capitalInvesti * Math.pow(1 + params.rendementCapitalInvesti / 100, duree);
                  let investMensuelsLocation = 0;
                  for (let mois = 0; mois < nbMois; mois++) {
                    investMensuelsLocation = (investMensuelsLocation + investissementLocation) * (1 + tauxInvestMensuel);
                  }
                  const apportInvestiLocation = params.apportDisponible * Math.pow(1 + params.rendementCapitalInvesti / 100, duree);
                  patrimoineLocation += investMensuelsLocation + apportInvestiLocation;
                  
                  // Calcul achat
                  const strategieAchat = comparerStrategieApport(params.prixComparaison, duree, params);
                  const patrimoineAchat = strategieAchat ? strategieAchat.patrimoineOptimal : null;
                  
                  return {
                    duree: duree + 'a',
                    location: Math.round(patrimoineLocation / 1000),
                    achat: patrimoineAchat ? Math.round(patrimoineAchat / 1000) : null
                  };
                });
              })()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="duree" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`${value}k €`, '']}
                />
                <Line type="monotone" dataKey="location" stroke="#a855f7" strokeWidth={2} dot={false} name="Location" />
                <Line type="monotone" dataKey="achat" stroke="#3b82f6" strokeWidth={2} dot={false} name="Achat" connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Graphique par prix */}
        <div className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
          <div className="text-sm font-medium text-slate-300 mb-3">Évolution par prix ({params.dureeComparaison} ans)</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={(() => {
                const prix = [];
                for (let p = params.prixMin; p <= params.prixMax; p += 25000) {
                  prix.push(p);
                }
                return prix.map(prixAchat => {
                  // Calcul location (identique pour tous les prix)
                  const capaciteMax = params.revenus * 0.4;
                  const loyerTotal = params.loyerMensuel;
                  const capaciteRestanteLocation = capaciteMax - loyerTotal;
                  const investissementLocation = capaciteRestanteLocation > 0 ? capaciteRestanteLocation : 0;
                  const duree = params.dureeComparaison;
                  const tauxInvestMensuel = params.rendementCapitalInvesti / 100 / 12;
                  const nbMois = duree * 12;
                  let patrimoineLocation = params.capitalInvesti * Math.pow(1 + params.rendementCapitalInvesti / 100, duree);
                  let investMensuelsLocation = 0;
                  for (let mois = 0; mois < nbMois; mois++) {
                    investMensuelsLocation = (investMensuelsLocation + investissementLocation) * (1 + tauxInvestMensuel);
                  }
                  const apportInvestiLocation = params.apportDisponible * Math.pow(1 + params.rendementCapitalInvesti / 100, duree);
                  patrimoineLocation += investMensuelsLocation + apportInvestiLocation;
                  
                  // Calcul achat
                  const strategieAchat = comparerStrategieApport(prixAchat, duree, params);
                  const patrimoineAchat = strategieAchat ? strategieAchat.patrimoineOptimal : null;
                  
                  return {
                    prix: prixAchat / 1000 + 'k',
                    location: Math.round(patrimoineLocation / 1000),
                    achat: patrimoineAchat ? Math.round(patrimoineAchat / 1000) : null
                  };
                });
              })()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="prix" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`${value}k €`, '']}
                />
                <Line type="monotone" dataKey="location" stroke="#a855f7" strokeWidth={2} dot={false} name="Location" />
                <Line type="monotone" dataKey="achat" stroke="#3b82f6" strokeWidth={2} dot={false} name="Achat" connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
        <div className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
          <Calculator className="text-slate-400" size={16} />
          Analyse Financière
        </div>
        <div className="text-xs text-white/70">
          La comparaison prend en compte tous les coûts réels: charges de copropriété, 
          taxe foncière, assurance, entretien vs simple loyer mensuel.
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysisPanel;