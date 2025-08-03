export interface SimulationParams {
  revenus: number;
  tauxEmprunt: number;
  rendementCapitalInvesti: number;
  inflation: number;
  apportDisponible: number;
  capitalInvesti: number;
  fraisNotaire: number;
  fraisEntretien: number;
  assuranceEmprunt: number;
  // French property costs
  taxeFonciere: number; // Property tax (% of property value per year)
  chargesCopropriete: number; // Condo fees (€ per month per m²)
  assuranceHabitation: number; // Home insurance (€ per month)
  surfaceLogement: number; // Property surface in m²
  // Rent vs buy comparison
  loyerMensuel: number; // Monthly rent for equivalent property
  // Comparison controls
  dureeComparaison: number; // Duration for rent vs buy comparison
  prixComparaison: number; // Price for rent vs buy comparison
  prixMin: number;
  prixMax: number;
}

export interface StrategieResult {
  apportUtilise: number;
  capitalEmprunte: number;
  mensualite: number;
  charges: number;
  investETF: number;
  patrimoine: number;
}

export interface ComparisonResult {
  prixAchat: number;
  dureeAnnees: number;
  strategieOptimale: 'avec_apport' | 'sans_apport';
  avecApport: StrategieResult;
  sansApport: StrategieResult;
  ecart: number;
  valeurImmo: number;
  capitalFinal: number;
  patrimoineOptimal: number;
  mensualiteOptimale: number;
  chargesOptimales: number;
  investETFOptimal: number;
  apportOptimal: number;
  tauxEndettement: number;
  capaciteRestante: number;
}

export interface LogiqueApport {
  message: string;
  couleur: string;
  recommandation: 'avec_apport' | 'sans_apport' | 'neutre';
}

export interface GraphiqueData {
  prix: number;
  patrimoine: number;
  duree: number;
  strategie: string;
  immobilier: number;
  etf: number;
}