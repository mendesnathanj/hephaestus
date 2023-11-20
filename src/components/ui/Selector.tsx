import Selecto from 'react-selecto';
import useUiStore from '@/stores/ui';

export default function Selector() {
  const addSelections = useUiStore(state => state.addSelections);
  const clearSelections = useUiStore(state => state.clearSelections);

  return (
    <Selecto
      selectableTargets={['.target']}
      selectByClick
      selectFromInside
      ratio={0}
      hitRate={1}
      toggleContinueSelect={"shift"}
      onSelect={e => {
        if (e.added.length) addSelections(e.added.map(el => el.id));
        else clearSelections();
      }}
    />
  );
}
