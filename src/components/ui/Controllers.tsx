import useKeyboardController from '@/controllers/keyboard';
import useMouseController from '@/controllers/mouse';

export default function Controllers() {
  useKeyboardController();
  useMouseController();

  return null;
}
