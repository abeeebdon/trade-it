import { STATUSES } from '@/lib/constants';

export const getStatusId = (id: number) => {
  const status = STATUSES.find((s) => s.id === id);
  return status?.label;
};
