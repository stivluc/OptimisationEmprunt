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

export const calculerChargesFrancaises = (prixAchat: number, params: SimulationParams): number => {
  // Taxe foncière (annually -> monthly)
  const taxeFonciereMensuelle = (prixAchat * params.taxeFonciere / 100) / 12;
  
  // Charges de copropriété (monthly)
  const chargesCoproMensuelles = params.chargesCopropriete * params.surfaceLogement;
  
  // Assurance habitation (monthly)
  const assuranceHabitation = params.assuranceHabitation;
  
  // Frais d'entretien généraux (monthly)
  const entretienMensuel = (prixAchat * params.fraisEntretien / 100) / 12;
  
  return taxeFonciereMensuelle + chargesCoproMensuelles + assuranceHabitation + entretienMensuel;
};

export const comparerStrategieApport = (prixAchat: number, dureeAnnees: number, params: SimulationParams): ComparisonResult | null => {
  const capaciteInvestissementMax = params.revenus * 0.4; // 40% of income for real estate
  const fraisAchat = prixAchat * (params.fraisNotaire / 100);
  
  // Calculate French property costs
  const chargesFrancaises = calculerChargesFrancaises(prixAchat, params);
  
  // STRATÉGIE 1: AVEC APPORT
  const apportUtilise = Math.min(params.apportDisponible, prixAchat * 0.2);
  const capitalEmprunte1 = prixAchat - apportUtilise;
  const mensualite1 = calculerMensualite(capitalEmprunte1, params.tauxEmprunt, dureeAnnees);
  const assuranceEmprunt1 = (capitalEmprunte1 * params.assuranceEmprunt / 100) / 12;
  
  // Total monthly property costs
  const chargesImmobilieres1 = mensualite1 + assuranceEmprunt1 + chargesFrancaises;
  
  // Check if property costs exceed capacity
  if (chargesImmobilieres1 > capaciteInvestissementMax) return null;
  
  // Remaining capacity for additional investments
  const capaciteRestante1 = capaciteInvestissementMax - chargesImmobilieres1;
  
  // Investment strategy: use 80% of remaining capacity for monthly investments
  const investissementMensuel1 = capaciteRestante1 * 0.8;
  const apportRestant1 = params.apportDisponible - apportUtilise;
  
  // STRATÉGIE 2: SANS APPORT
  const capitalEmprunte2 = prixAchat;
  const mensualite2 = calculerMensualite(capitalEmprunte2, params.tauxEmprunt, dureeAnnees);
  const assuranceEmprunt2 = (capitalEmprunte2 * params.assuranceEmprunt / 100) / 12;
  
  // Total monthly property costs
  const chargesImmobilieres2 = mensualite2 + assuranceEmprunt2 + chargesFrancaises;
  
  // Check if property costs exceed capacity
  if (chargesImmobilieres2 > capaciteInvestissementMax) return null;
  
  // Remaining capacity for additional investments
  const capaciteRestante2 = capaciteInvestissementMax - chargesImmobilieres2;
  
  // Investment strategy: use 80% of remaining capacity for monthly investments
  const investissementMensuel2 = capaciteRestante2 * 0.8;
  const apportRestant2 = params.apportDisponible; // All available for investing
  
  // Calculate final patrimony
  const valeurImmo = calculerValeurImmobiliere(prixAchat, dureeAnnees, params.inflation);
  const capitalFinal = params.capitalInvesti * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
  
  // Monthly investments capitalized
  const tauxInvestMensuel = params.rendementCapitalInvesti / 100 / 12;
  const nbMois = dureeAnnees * 12;
  
  const calculerInvestCapitalise = (montantMensuel: number): number => {
    let valeur = 0;
    for (let mois = 0; mois < nbMois; mois++) {
      valeur = (valeur + montantMensuel) * (1 + tauxInvestMensuel);
    }
    return valeur;
  };
  
  // Strategy 1 (with down payment)
  const investMensuels1 = calculerInvestCapitalise(investissementMensuel1);
  const apportInvesti1 = apportRestant1 * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
  const patrimoine1 = valeurImmo + investMensuels1 + apportInvesti1 + capitalFinal - fraisAchat;
  
  // Strategy 2 (without down payment)
  const investMensuels2 = calculerInvestCapitalise(investissementMensuel2);
  const apportInvesti2 = apportRestant2 * Math.pow(1 + params.rendementCapitalInvesti / 100, dureeAnnees);
  const patrimoine2 = valeurImmo + investMensuels2 + apportInvesti2 + capitalFinal - fraisAchat;
  
  // Return the best strategy
  const meilleure = patrimoine2 > patrimoine1 ? 'sans_apport' : 'avec_apport';
  const meilleureStrategie = meilleure === 'sans_apport' ? {
    apportUtilise: 0,
    capitalEmprunte: capitalEmprunte2,
    mensualite: mensualite2,
    charges: chargesImmobilieres2,
    investETF: investissementMensuel2,
    patrimoine: patrimoine2
  } : {
    apportUtilise,
    capitalEmprunte: capitalEmprunte1,
    mensualite: mensualite1,
    charges: chargesImmobilieres1,
    investETF: investissementMensuel1,
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
      charges: chargesImmobilieres1,
      investETF: investissementMensuel1,
      patrimoine: patrimoine1
    },
    sansApport: {
      apportUtilise: 0,
      capitalEmprunte: capitalEmprunte2,
      mensualite: mensualite2,
      charges: chargesImmobilieres2,
      investETF: investissementMensuel2,
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
    capaciteRestante: meilleure === 'sans_apport' ? capaciteRestante2 : capaciteRestante1
  };
};