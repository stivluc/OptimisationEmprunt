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