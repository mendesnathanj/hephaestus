import config from '@/config/config';
import InfiniteViewer from 'react-infinite-viewer';
import useUiStore from '@/stores/ui';
import { useRef } from 'react';

interface CanvasProps {
  children?: React.ReactNode;
}

export default function Canvas({ children }: CanvasProps) {
  const inf = useRef();
  const setZoom = useUiStore(state => state.setZoom);
  const items = useUiStore(state => state.items);

  return (
    <InfiniteViewer
      ref={ref => {
        console.log(ref);
      }}
      numChildren={items.length}
      className="w-full min-h-screen"
      useWheelScroll
      useWheelPinch
      usePinch
      useAutoZoom
      displayHorizontalScroll={false}
      displayVerticalScroll={false}
      margin={0}
      threshold={0}
      rangeX={[config.ui.InfiniteViewer.range.x.l, config.ui.InfiniteViewer.range.x.r]}
      rangeY={[config.ui.InfiniteViewer.range.y.l, config.ui.InfiniteViewer.range.y.r]}
      zoomRange={[config.ui.InfiniteViewer.range.zoom.l, config.ui.InfiniteViewer.range.zoom.r]}
      onPinch={(e) => setZoom(e.zoom)}
    >
      {/* for some reason the InfinitiveViewer rendering doesn't work unless there's a child node */}
      {children}
      <div className="absolute top-0 left-0" />
    </InfiniteViewer>
  );
}
