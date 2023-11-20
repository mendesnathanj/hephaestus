import { memo, useId } from 'react';
import useUiStore from '@/stores/useUiStore';

const selectedClasses = 'outline outline-1 outline-sky-400';

export function Box() {
  const selections = useUiStore(state => state.selections);
  const id = useId();
  const isBoxSelected = selections.includes(id);

  // console.log(selections);

  return (
    <div id={id} className={`target w-[150px] h-[150px] bg-white text-black p-4 border-box left-0 top-0 absolute transition-colors ${isBoxSelected ? selectedClasses : ''}`}>
    </div>
  );
}

const MemoizedBox = memo(Box);

export default MemoizedBox;
