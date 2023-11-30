import Controllers from '@/components/ui/Controllers';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import Selector from '@/components/ui/Selector';
import Guides from '@/Guides';
import Canvas from '@/components/ui/Canvas';

export default function Playground() {
  return (
    <>
      <Controllers />
      <Sidebar position="left" />
      <Header />
      <Sidebar position="right" />
      <Selector />
      <Guides />
      <Canvas>
        {/*<Box left={200} top={200} />*/}
        {items.map((item) => <div key={item.x + item.y} className="absolute w-[100px] h-[100px] bg-white" style={{ left: item.x, top: item.y }} />)}
      </Canvas>
    </>
  )
}
