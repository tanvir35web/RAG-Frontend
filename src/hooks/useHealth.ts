import { useAppContext } from '../context/AppContext';

export function useHealth() {
  const { apiOnline } = useAppContext();
  return { apiOnline };
}
