import { memo, useId } from 'react';
import useUiStore from '@/stores/ui';

const selectedClasses = 'outline outline-1 outline-sky-400';

export function Box({ left, top }) {
  const selections = useUiStore(state => state.selections);
  const id = useId();
  const isBoxSelected = selections.includes(id);

  return (
    <div
      id={id}
      // style={{ left, top }}
      className={`target w-[150px] h-[150px] top-[200px] left-[200px] bg-white text-black p-4 border-box absolute transition-colors ${isBoxSelected ? selectedClasses : ''}`}
    >
    </div>
  );
}

const MemoizedBox = memo(Box);

export default MemoizedBox;
