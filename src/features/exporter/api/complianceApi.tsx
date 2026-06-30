import api from '@/configs/api-config';
import {
  AddComplianceFormType,
  ComplianceVaultData,
} from '../compliance/types/compliance';

export const getCompliance = async (): Promise<ComplianceVaultData> => {
  try {
    const response = await api.get(`/Compliance/vault`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const addComplianceDocument = async (payload: AddComplianceFormType) => {
  const formData = new FormData();
  formData.append('DocumentType', payload.DocumentType);
  formData.append('IssuingAuthority', String(payload.IssuingAuthority));
  formData.append('IssuedDate', String(payload.IssuedDate));
  formData.append('ExpiryDate', String(payload.ExpiryDate));
  formData.append('File', payload.File);

  const response = await api.post('Compliance/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
