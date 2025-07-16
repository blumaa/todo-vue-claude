import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <div className="w-screen h-screen grid cols-12 rows-12 gap-3 bg-neutral-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App
