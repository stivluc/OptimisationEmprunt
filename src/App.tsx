import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import ConfigurationPanel from './components/ConfigurationPanel';
import ComparativeAnalysisPanel from './components/ComparativeAnalysisPanel';
import PatrimoineChart from './components/PatrimoineChart';
import { useOptimization } from './hooks/useOptimization';
import { SimulationParams } from './types';

const App: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    revenus: 5000,
    tauxEmprunt: 2.8,
    rendementCapitalInvesti: 6,
    inflation: 2,
    apportDisponible: 18000,
    capitalInvesti: 42000,
    fraisNotaire: 8,
    fraisEntretien: 1,
    assuranceEmprunt: 0.3,
    // French property costs
    taxeFonciere: 1.2, // Typical French property tax ~1.2% per year
    chargesCopropriete: 3.5, // Typical condo fees ~3.5€/m²/month
    assuranceHabitation: 45, // Typical home insurance ~45€/month
    surfaceLogement: 60, // Typical apartment surface 60m²
    // Rent vs buy comparison
    loyerMensuel: 1000, // Typical rent for equivalent property
    // Comparison controls
    dureeComparaison: 20, // Default comparison duration
    prixComparaison: 200000, // Default comparison price
    prixMin: 150000,
    prixMax: 300000
  });

  const { optimiserToutesStrategies, strategieAbsolue, graphiquePatrimoine, logiqueApport } = useOptimization(params);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Rocket className="text-blue-400" size={32} />
            Wealth Optimization Engine
          </h1>
          <p className="text-slate-300 text-lg">Algorithme d'optimisation patrimoniale multi-dimensionnelle</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConfigurationPanel params={params} setParams={setParams} />
          <ComparativeAnalysisPanel strategieAbsolue={strategieAbsolue} logiqueApport={logiqueApport} params={params} setParams={setParams} />
        </div>

        <PatrimoineChart 
          graphiquePatrimoine={graphiquePatrimoine}
          strategieAbsolue={strategieAbsolue}
          optimiserToutesStrategies={optimiserToutesStrategies}
          params={params}
        />
      </div>
    </div>
  );
};

export default App;