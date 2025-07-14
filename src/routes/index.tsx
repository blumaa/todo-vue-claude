import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { TheHeader } from '../components/TheHeader';
import { PageListPendingItems } from './PageListPendingItems';
import { PageListDoneItems } from './PageListDoneItems';
import { PageCreateItem } from './PageCreateItem';

const Layout = () => {
  return (
    <div className="w-screen h-screen grid cols-12 rows-12 gap-3 bg-neutral-100">
      <TheHeader />
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/list-pending" replace />,
      },
      {
        path: 'list-pending',
        element: <PageListPendingItems />,
      },
      {
        path: 'list-done',
        element: <PageListDoneItems />,
      },
      {
        path: 'create',
        element: <PageCreateItem />,
      },
      {
        path: 'edit/:id',
        element: <div>Edit page not implemented</div>,
      },
    ],
  },
]);