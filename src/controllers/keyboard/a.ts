import useUiStore from '@/stores/ui';
import { useKeycon } from 'react-keycon';

export default function useAKey() {
  const mousePos = useUiStore(state => state.mousePos);
  const addItem = useUiStore(state => state.addItem);

  const { onKeydown } = useKeycon({
    keys: ['a'],
  });

  onKeydown((args) => {
    addItem({ x: mousePos.x - 75, y: mousePos.y - 75 });
  }, [mousePos]);
}
