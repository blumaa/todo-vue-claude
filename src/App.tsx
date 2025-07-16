import { RouterProvider } from 'react-router-dom';
import { TheHeader } from './components/TheHeader';
import { router } from './routes';

function App() {
  return (
    <div className="w-screen h-screen grid cols-12 rows-12 gap-3 bg-neutral-100">
      <TheHeader />
      <RouterProvider router={router} />
    </div>
  );
}

export default App