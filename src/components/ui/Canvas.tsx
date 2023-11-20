import config from '@/config/config';
import InfiniteViewer from 'react-infinite-viewer';
import useUiStore from '@/stores/ui';

interface CanvasProps {
  children?: React.ReactNode;
}

export default function Canvas({ children }: CanvasProps) {
  const setZoom = useUiStore(state => state.setZoom);

  return (
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
      rangeX={[config.ui.InfiniteViewer.range.x.l, config.ui.InfiniteViewer.range.x.r]}
      rangeY={[config.ui.InfiniteViewer.range.y.l, config.ui.InfiniteViewer.range.y.r]}
      zoomRange={[config.ui.InfiniteViewer.range.zoom.l, config.ui.InfiniteViewer.range.zoom.r]}
      onPinch={(e) => setZoom(e.zoom)}
    >
      {children}
    </InfiniteViewer>
  );
}
