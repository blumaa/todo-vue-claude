import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PageListPendingItems } from './PageListPendingItems';
import { PageListDoneItems } from './PageListDoneItems';
import { PageCreateItem } from './PageCreateItem';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/list-pending" replace />,
  },
  {
    path: '/list-pending',
    element: <PageListPendingItems />,
  },
  {
    path: '/list-done',
    element: <PageListDoneItems />,
  },
  {
    path: '/create',
    // TODO: Create page to make new items
    element: <PageCreateItem />,
  },
  {
    path: '/edit/:id',
    // TODO: Create page to edit items
    // component: () => import('./*.vue')
    element: <div>Edit page not implemented</div>,
  },
]);