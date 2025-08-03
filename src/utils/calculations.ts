import { SimulationParams, ComparisonResult } from '../types';

export const calculerMensualite = (capital: number, tauxAnnuel: number, dureeAnnees: number): number => {
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const nbMensualites = dureeAnnees * 12;
  return (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nbMensualites));
};

export const calculerValeurImmobiliere = (prixAchat: number, dureeAnnees: number, inflation: number): number => {
  const tauxAppreciation = inflation + 1.5;
  return prixAchat * Math.pow(1 + tauxAppreciation / 100, dureeAnnees);
};

export const comparerStrategieApport = (prixAchat: number, dureeAnnees: number, params: SimulationParams): ComparisonResult | null => {
  const maxInvestissement = params.revenus * 0.4;
  const fraisAchat = prixAchat * (params.fraisNotaire / 100);
  
  // STRATÉGIE 1: AVEC APPORT
  const apportUtilise = Math.min(params.apportDisponible, prixAchat * 0.2);
  const capitalEmprunte1 = prixAchat - apportUtilise;
  const mensualite1 = calculerMensualite(capitalEmprunte1, params.tauxEmprunt, dureeAnnees);
  const assurance1 = (capitalEmprunte1 * params.assuranceEmprunt / 100) / 12;
  const entretien1 = (prixAchat * params.fraisEntretien / 100) / 12;
  const charges1 = mensualite1 + assurance1 + entretien1;
  
  if (charges1 > maxInvestissement) return null;
  
  const investETF1 = maxInvestissement - charges1;
  const apportRestant1 = params.apportDisponible - apportUtilise;
  
  // STRATÉGIE 2: SANS APPORT
  const capitalEmprunte2 = prixAchat;
  const mensualite2 = calculerMensualite(capitalEmprunte2, params.tauxEmprunt, dureeAnnees);
  const assurance2 = (capitalEmprunte2 * params.assuranceEmprunt / 100) / 12;
  const entretien2 = (prixAchat * params.fraisEntretien / 100) / 12;
  const charges2 = mensualite2 + assurance2 + entretien2;
  
  if (charges2 > maxInvestissement) return null;
  
  const investETF2 = maxInvestissement - charges2;
  const apportRestant2 = params.apportDisponible;
  
  // Calcul des patrimoines finaux
  const valeurImmo = calculerValeurImmobiliere(prixAchat, dureeAnnees, params.inflation);
  const capitalFinal = params.capitalInvesti * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
  
  // Investissements mensuels capitalisés
  const tauxInvestMensuel = params.rendementCapitalInvesti / 100 / 12;
  const nbMois = dureeAnnees * 12;
  
  const calculerInvestCapitalise = (montantMensuel: number): number => {
    let valeur = 0;
    for (let mois = 0; mois < nbMois; mois++) {
      valeur = (valeur + montantMensuel) * (1 + tauxInvestMensuel);
    }
    return valeur;
  };
  
  // Stratégie 1 (avec apport)
  const investMensuels1 = calculerInvestCapitalise(investETF1);
  const apportInvesti1 = apportRestant1 * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
  const patrimoine1 = valeurImmo + investMensuels1 + apportInvesti1 + capitalFinal - fraisAchat;
  
  // Stratégie 2 (sans apport)
  const investMensuels2 = calculerInvestCapitalise(investETF2);
  const apportInvesti2 = apportRestant2 * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
  const patrimoine2 = valeurImmo + investMensuels2 + apportInvesti2 + capitalFinal - fraisAchat;
  
  // Retourne la meilleure stratégie
  const meilleure = patrimoine2 > patrimoine1 ? 'sans_apport' : 'avec_apport';
  const meilleureStrategie = meilleure === 'sans_apport' ? {
    apportUtilise: 0,
    capitalEmprunte: capitalEmprunte2,
    mensualite: mensualite2,
    charges: charges2,
    investETF: investETF2,
    patrimoine: patrimoine2
  } : {
    apportUtilise,
    capitalEmprunte: capitalEmprunte1,
    mensualite: mensualite1,
    charges: charges1,
    investETF: investETF1,
    patrimoine: patrimoine1
  };
  
  return {
    prixAchat,
    dureeAnnees,
    strategieOptimale: meilleure,
    avecApport: {
      apportUtilise,
      capitalEmprunte: capitalEmprunte1,
      mensualite: mensualite1,
      charges: charges1,
      investETF: investETF1,
      patrimoine: patrimoine1
    },
    sansApport: {
      apportUtilise: 0,
      capitalEmprunte: capitalEmprunte2,
      mensualite: mensualite2,
      charges: charges2,
      investETF: investETF2,
      patrimoine: patrimoine2
    },
    ecart: Math.abs(patrimoine2 - patrimoine1),
    valeurImmo,
    capitalFinal,
    patrimoineOptimal: meilleureStrategie.patrimoine,
    mensualiteOptimale: meilleureStrategie.mensualite,
    chargesOptimales: meilleureStrategie.charges,
    investETFOptimal: meilleureStrategie.investETF,
    apportOptimal: meilleureStrategie.apportUtilise,
    tauxEndettement: (meilleureStrategie.charges / params.revenus) * 100,
    capaciteRestante: (params.revenus * 0.4) - meilleureStrategie.charges
  };
};