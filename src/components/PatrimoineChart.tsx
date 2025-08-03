import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Beaker } from 'lucide-react';
import { ComparisonResult } from '../types';

interface PatrimoineChartProps {
  graphiquePatrimoine: any[];
  strategieAbsolue: ComparisonResult | undefined;
  optimiserToutesStrategies: ComparisonResult[];
  params: { prixMin: number; prixMax: number };
}

const PatrimoineChart: React.FC<PatrimoineChartProps> = ({ 
  graphiquePatrimoine, 
  strategieAbsolue, 
  optimiserToutesStrategies, 
  params 
}) => {
  const durations = [5, 10, 15, 20, 25];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="text-blue-400" size={24} /> Courbe d'Optimisation Patrimoniale
      </h3>
      <div className="bg-black/20 p-4 rounded-xl">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={graphiquePatrimoine}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="prix" 
              stroke="#9ca3af"
              label={{ value: 'Prix d\'achat (k€)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
              interval="preserveStartEnd"
              tickCount={8}
            />
            <YAxis 
              stroke="#9ca3af"
              label={{ value: 'Patrimoine (k€)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff'
              }}
              formatter={(value: any, name) => [
                `${Math.round(value as number)}k €`, 
                String(name).replace('patrimoine_', '').replace('ans', ' ans')
              ]}
              labelFormatter={(label) => `Prix: ${label}k €`}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {durations.map((duration, index) => (
              <Line 
                key={duration}
                type="monotone" 
                dataKey={`patrimoine_${duration}ans`} 
                stroke={colors[index]} 
                strokeWidth={2}
                dot={false}
                name={`${duration} ans`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      
      <div className="mt-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
        <h3 className="font-semibold text-white/90 mb-4 flex items-center gap-2">
          <Beaker className="text-orange-400" size={20} />
          Méthodologie & Formules Mathématiques
        </h3>
        <div className="text-sm text-white/70 space-y-4">
          <div>
            <p className="font-semibold text-white/90 mb-2">🔍 Optimisation multi-dimensionnelle :</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Teste tous les prix de {params.prixMin.toLocaleString()}€ à {params.prixMax.toLocaleString()}€ (par tranche de 10k€)</li>
              <li>Teste toutes les durées de 5 à 25 ans (par tranche de 5 ans)</li>
              <li>Compare systématiquement "avec apport" vs "sans apport"</li>
              <li>Sélectionne automatiquement la meilleure combinaison</li>
              <li>Contrainte : charges ≤ 40% des revenus</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white/90 mb-2">📊 Formules de calcul :</p>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-700/30 p-3 rounded">
                <p className="font-medium text-blue-300">1. Mensualité d'emprunt :</p>
                <p className="font-mono text-xs">M = C × (r/12) / (1 - (1 + r/12)^(-n×12))</p>
                <p className="text-white/60">où C = capital, r = taux annuel, n = durée en années</p>
              </div>
              
              <div className="bg-slate-700/30 p-3 rounded">
                <p className="font-medium text-green-300">2. Valorisation immobilière :</p>
                <p className="font-mono text-xs">V = P × (1 + (inflation + 1.5%))^n</p>
                <p className="text-white/60">où P = prix d'achat, n = durée, +1.5% = appréciation immobilière</p>
              </div>
              
              <div className="bg-slate-700/30 p-3 rounded">
                <p className="font-medium text-purple-300">3. Capitalisation des investissements mensuels :</p>
                <p className="font-mono text-xs">V = Σ(I × (1 + r_m)^(n_m - i)) pour i de 0 à n_m</p>
                <p className="text-white/60">où I = investissement mensuel, r_m = rendement mensuel, n_m = nb mois</p>
              </div>
              
              <div className="bg-slate-700/30 p-3 rounded">
                <p className="font-medium text-yellow-300">4. Capitalisation du capital existant :</p>
                <p className="font-mono text-xs">V_finale = Capital_initial × (1 + rendement_annuel)^durée</p>
                <p className="text-white/60">Croissance exponentielle du capital déjà investi</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white/90 mb-2">💡 Stratégie d'optimisation :</p>
            <p className="text-xs">
              <strong>Chaque ligne représente une durée d'emprunt différente</strong>, permettant de visualiser l'impact 
              de la durée sur le patrimoine optimal. L'algorithme trouve le meilleur équilibre 
              entre <strong>emprunter</strong> (effet de levier) et <strong>investir</strong> (rendement capital) 
              pour chaque prix d'achat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatrimoineChart;