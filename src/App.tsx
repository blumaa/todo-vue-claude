import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col gap-3 bg-neutral-100 p-3">
      <RouterProvider router={router} />
    </div>
  );
}

export default App
