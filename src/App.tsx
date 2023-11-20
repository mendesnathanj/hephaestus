import { Box } from '@/Box';
import Guides from '@/Guides';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import Selector from '@/components/ui/Selector';
import Canvas from '@/components/ui/Canvas';

function App() {
  return (
    <>
      <Sidebar position="left" />
      <Header />
      <Sidebar position="right" />
      <Selector />
      <Guides />
      <Canvas>
        <Box />
      </Canvas>
      <Box />
    </>
  )
}

export default App
