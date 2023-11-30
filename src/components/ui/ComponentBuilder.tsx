import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import Box from '@/app/Box';
import { useEffect, useState } from 'react';
import useComponentsStore from '@/stores/components';
import useQuery from '@/hooks/useQuery';

function equals(a, b) {
  return a === b;
}

function increment(options = {}) {
  if (!options.id) return;

  const state = useComponentsStore.getState();
  const component = state.components.find((c) => c.id === options.id);
  const updateComponent = state.updateComponent;

  return function() {
    updateComponent(options.id, { js: { ...component.js, state: { [options.name]: component.js.state[options.name] + 1 } } });
  }
}

function ComponentChild({ component, onDrop = (a) => {}, greedy = false }) {
  const components = useComponentsStore(state => state.components);
  const children = components.filter((c) => c.parent_id === component.id);
  const updateComponent = useComponentsStore(state => state.updateComponent);

  useEffect(() => {
    if (!component.state) return;

    updateComponent(component.id, state)
  }, [component?.state]);

  const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'ComponentChild',
      item: { id: component.id },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag],
  )

  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ['ComponentChild'],
      drop(item: { id: string }, monitor) {
        if (monitor.didDrop()) return;
        if (item.id === component.id) return;
        if (component.parent_id === item.id) return;

        const newData = { parent_id: component.id };

        updateComponent(item.id, newData);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver(),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild],
  )

  const extraStyles = isOverCurrent ? { 'background-color': 'green' } : {};

  increment((component.js.handlers || []).find((handler) => handler.function === 'increment'));

  if (component.js.hide) {
    const shouldHide = component.js.hide.some((rule) => {
      if (rule.condition === 'equals') {
        let val1;
        if (typeof rule.a === 'object') {
          const state = useComponentsStore.getState();
          const component = state.components.find((c) => rule.a.id === c.id);
          val1 = component.js.state[rule.a.name];
        }

        let val2;
        val2 = rule.b;

        console.log(rule);

        console.log(val1, val2);

        return equals(val1, val2);
      }
    });

    console.log(shouldHide);

    if (shouldHide) return null;
  }

  const onClick = () => {
    const clickEvents = component
      .js
      .handlers
      .filter((handler) => handler.event === 'onClick')
      .map((handler) => increment({id: handler.id, name: handler.name}));

    clickEvents.forEach(func => func());
  }

  return (
    <Box
      templateStyles={component.styles}
      componentStyles={extraStyles}
      ref={(ref) => {
        drop(ref as HTMLElement);
        drag(ref as HTMLElement);
      }}
      onClick={onClick}
    >
      {component.js.state ? `Count: ${component.js.state.count}` : 'Box'}
      {children.map((child) => (
        <ComponentChild key={child.id} component={child} />
      ))}
    </Box>
  )
}

function ComponentRoot({ component, onDrop }) {
  const components = useComponentsStore(state => state.components);
  const children = components.filter((c) => c.parent_id === component.id);
  const updateComponent = useComponentsStore(state => state.updateComponent);

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ['ComponentChild'],
      drop(item: { id: string }, monitor) {
        if (monitor.didDrop()) return;

        const newData = { parentId: component.id };
        updateComponent(item.id, newData);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop],
  )

  const extraStyles = isOverCurrent ? { 'background-color': 'green' } : {};

  return (
    <div ref={drop} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Box templateStyles="width: 500px; height: 600px; background-color: #fff;" componentStyles={{ ...component.styles, ...extraStyles }}>
        {children.map((child) => (
          <ComponentChild key={child.id} component={child} />
        ))}
      </Box>
    </div>
  );
}

export default function ComponentBuilder() {
  const { data: components } = useQuery('http://localhost:3000/api/v3/components');
  const setComponents = useComponentsStore(state => state.setComponents);

  useEffect(() => {
    if (components.length === 0) return;

    setComponents(components);
  }, [components]);
  const root = components.find(c => c.parent_id === null);
  // console.log(components.map(c => c.id));

  if (components.length === 0) return null;

  return (
    <div className="w-2/3 h-screen relative">
      <ComponentRoot component={root} onDrop={(d) => console.log(d)} />
    </div>
  )
}
