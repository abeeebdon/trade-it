export interface HelpItem {
  id: number;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
}

export interface HelpListResponse {
  data: HelpItem[];
}

export interface CreateHelpPayload {
  question: string;
  answer: string;
  displayOrder: number;
}
