import InfiniteViewer from 'react-infinite-viewer';
import Selecto from 'react-selecto';
import { Box } from '@/Box';
import Guides from '@/Guides';
import useUiStore from '@/stores/useUiStore';
import Sidebar from '@/components/ui/Sidebar';

function App() {
  const setZoom = useUiStore(state => state.setZoom);
  const addSelections = useUiStore(state => state.addSelections);
  const clearSelections = useUiStore(state => state.clearSelections);

  const cubes = [];

  for (let i = 0; i < 60; ++i) {
    cubes.push(i);
  }

  return (
    <>
      <Sidebar position="left" />
      <div id="topbar" className="fixed top-0 left-0 w-full h-[60px] bg-neutral-800 z-50 border-b border-neutral-600">
        <div className="absolute top-[15px] left-[50vw] -translate-x-1/2 text-white">Test Title</div>
      </div>
      <Sidebar position="right" />
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
      <Guides />
      <InfiniteViewer
        className="w-full min-h-screen bg-gray-200"
        useWheelScroll
        useWheelPinch
        usePinch
        useAutoZoom
        displayHorizontalScroll={false}
        displayVerticalScroll={false}
        margin={0}
        threshold={0}
        rangeX={[-5000, 5000]}
        rangeY={[-5000, 5000]}
        zoomRange={[-100, 100]}
        onPinch={(e) => setZoom(e.zoom)}
      >
        <Box />
      </InfiniteViewer>
    </>
  )
}

export default App
