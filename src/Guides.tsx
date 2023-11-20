import { useEffect, useRef } from 'react';
import ScenaGuides from '@scena/react-guides';
import useUiStore from '@/stores/useUiStore';

export default function Guides() {
  const guides = useRef();
  const guidesV = useRef();
  const zoom = useUiStore(state => state.zoom);

  useEffect(() => {
    if (!guides.current) return;
    if (!guidesV.current) return;

    guides.current.resize();
    guidesV.current.resize();

    let scrollX = 0;
    let scrollY = 0;

    window.addEventListener("wheel", e => {
      if ((scrollX + e.deltaX) > 8000 || (scrollX + e.deltaX) < -8000) {
        return;
      }

      if ((scrollY + e.deltaY) > 8000 || (scrollY + e.deltaY) < -8000) {
        return;
      }

      scrollX += e.deltaX;
      scrollY += e.deltaY;

      guides.current.scrollGuides(scrollX);
      guides.current.scroll(scrollX);
      guidesV.current.scrollGuides(scrollY);
      guidesV.current.scroll(scrollY);
    });

    window.addEventListener("resize", () => {
      guides.current.resize();
      guidesV.current.resize();
    });
  }, [guides, guidesV]);

  return (
    <>
      <div className="h-[30px] top-[60px] left-0 w-full absolute z-10">
        <ScenaGuides
          zoom={zoom}
          onDrag={() => guides.current.resize()}
          displayDragPos
          displayGuidePos
          backgroundColor="rgb(38 38 38)"
          ref={e => {
            guides.current = e;
          }}
          range={[-10000, 10000]}
          type="horizontal"
          useResizeObserver
        />
      </div>
      <div className="top-[60px] left-[240px] h-[calc(100%-30px)] w-[30px] absolute z-10">
        <ScenaGuides
          backgroundColor="rgb(38 38 38)"
          zoom={zoom}
          range={[-10000, 10000]}
          ref={e => {
            guidesV.current = e;
          }}
          type="vertical"
          useResizeObserver
        />
      </div>
      <div className="w-[30px] h-[30px] top-[60px] left-[240px] z-10 bg-neutral-800 absolute" />
    </>
  )
}
