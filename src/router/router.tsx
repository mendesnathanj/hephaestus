import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom';
import Root from '@/pages/Root';
import Components from '@/pages/components/Components.root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/path-two',
    element: <div>Here I am</div>,
  },
  {
    path: '/components',
    element: <Components />,
  }
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
