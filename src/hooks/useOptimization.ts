import { useMemo } from 'react';
import { SimulationParams, ComparisonResult, LogiqueApport } from '../types';
import { comparerStrategieApport } from '../utils/calculations';

export const useOptimization = (params: SimulationParams) => {
  // Optimisation complète
  const optimiserToutesStrategies = useMemo(() => {
    const results: ComparisonResult[] = [];
    const durees = [5, 10, 15, 20, 25]; // Fixed loan durations
    
    for (let prix = params.prixMin; prix <= params.prixMax; prix += 10000) {
      for (const duree of durees) {
        const strategie = comparerStrategieApport(prix, duree, params);
        if (strategie) {
          results.push(strategie);
        }
      }
    }
    
    return results.sort((a, b) => b.patrimoineOptimal - a.patrimoineOptimal);
  }, [params]);

  const strategieAbsolue = optimiserToutesStrategies[0];
  
  // Données pour graphiques multi-lignes
  const graphiquePatrimoine = useMemo(() => {
    const dataByPrice: Record<number, any> = {};

    // Organize data by price, then by duration
    optimiserToutesStrategies.forEach(s => {
      const priceKey = s.prixAchat;
      if (!dataByPrice[priceKey]) {
        dataByPrice[priceKey] = {
          prix: s.prixAchat / 1000,
        };
      }
      // Add patrimoine for this specific duration
      dataByPrice[priceKey][`patrimoine_${s.dureeAnnees}ans`] = s.patrimoineOptimal / 1000;
    });

    return Object.values(dataByPrice).sort((a: any, b: any) => a.prix - b.prix);
  }, [optimiserToutesStrategies]);

  // Logique comparative rendue dynamique
  const logiqueApport = useMemo((): LogiqueApport => {
    const ecartTaux = params.rendementCapitalInvesti - params.tauxEmprunt;
    if (ecartTaux > 0.5) {
      return {
        message: `Rendement capital investi (${params.rendementCapitalInvesti}%) > Taux emprunt (${params.tauxEmprunt}%) → Il vaut mieux emprunter plus et investir !`,
        couleur: 'text-gray-300',
        recommandation: 'sans_apport'
      };
    } else if (ecartTaux < -0.5) {
      return {
        message: `Taux emprunt (${params.tauxEmprunt}%) > Rendement capital investi (${params.rendementCapitalInvesti}%) → Il vaut mieux mettre un apport !`,
        couleur: 'text-blue-700',
        recommandation: 'avec_apport'
      };
    } else {
      return {
        message: `Taux très proches (${params.tauxEmprunt}% vs ${params.rendementCapitalInvesti}%) → L'arbitrage sera marginal`,
        couleur: 'text-orange-700',
        recommandation: 'neutre'
      };
    }
  }, [params.rendementCapitalInvesti, params.tauxEmprunt]);

  return {
    optimiserToutesStrategies,
    strategieAbsolue,
    graphiquePatrimoine,
    logiqueApport
  };
};