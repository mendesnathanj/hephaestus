import { useEffect } from 'react';
import useUiStore from '@/stores/ui';

export default function useMouseController() {
  const setMousePos = useUiStore(state => state.setMousePos);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    document.body.addEventListener('mousemove', handleMouseMove);

    return () => document.body.removeEventListener('mousemove', handleMouseMove);
  }, [setMousePos]);
}
