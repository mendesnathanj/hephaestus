import { useKeycon } from 'react-keycon';
import useAKey from '@/controllers/keyboard/a';

export default function useKeyboardController() {
  const methods = useKeycon({
    keys: ['s'],
  });

  methods.onKeydown((args) => {
    console.log('s key works');
  }, []);

  useAKey();
}
