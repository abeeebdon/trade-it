import { useQuery } from '@tanstack/react-query';
import { fetchUserTypes } from '../api/auth';

const useGetUserTypes = () => {
  return useQuery({
    queryKey: ['user-types'],
    queryFn: fetchUserTypes,
  });
};

export default useGetUserTypes;
