import { useQuery } from '@tanstack/react-query';
import { getCommandCenter } from '../api/commandCenterApi';

export const useGetCommandCenter = () => {
  return useQuery({
    queryKey: ['exporter-command-center'],
    queryFn: getCommandCenter,
  });
};
