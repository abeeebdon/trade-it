export type DocStatus = 'active' | 'expired' | 'expiring_soon' | 'pending';

export type ComplianceDocument = {
  id: number;
  documentType: string;
  fileName: string;
  issuingAuthority: string;
  issuedDate: string;
  expiryDate: string;
  documentPath: string;
  status: DocStatus;
  createdAt: string;
};

export interface ComplianceVaultData {
  title: string;
  complianceScore: number;
  maxScore: number;
  sectorScores: SectorScore[];
  missingDocuments: string[];
  importGuides: ImportGuide[];
  documentCount: number;
  documents: ComplianceDocument[];
}

export interface SectorScore {
  sector: string;
  score: number;
  maxScore: number;
}

export interface ImportGuide {
  sector: string;
  title: string;
  alerts: string[];
}
export interface MissingDocsCardProps {
  score: string[];
}
export interface AddComplianceFormType {
  DocumentType: string;
  IssuingAuthority: string;
  IssuedDate: string;
  ExpiryDate: string;
  File: File;
}
