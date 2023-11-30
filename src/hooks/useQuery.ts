import { useQuery as useReactQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useQuery(path = '') {
  return useReactQuery({
    queryKey: [path],
    queryFn: () => (
      axios
        .get(path)
        .then((res) => res.data as [])
        .catch((err) => console.error(err))
    ),
    staleTime: Infinity,
    placeholderData: [],
  })
}
