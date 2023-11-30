import Provider from '@/components/ui/dnd/Provider';
import DndSidebar from '@/components/ui/DndSidebar';
import ComponentBuilder from '@/components/ui/ComponentBuilder';
import useQuery from '@/hooks/useQuery';

export default function Components() {
  const query = useQuery('http://localhost:3000/api/v3/components');

  console.log({ query });
  return (
    <Provider>
      <div className="flex">
        <DndSidebar />
        <ComponentBuilder />
      </div>
    </Provider>
  )
}
