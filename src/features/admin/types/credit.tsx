export interface CreditApplicationData {
  offerAmount: number;
  apr: number;
  termMonths: number;
  decisionNote: string;
}
export interface CreditAPiType {
  data: CreditApplicationData;
  id: string | number;
}
