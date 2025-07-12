import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './shared/not_found.jsx';
import UsersHomeContent from './home/users_home_content.jsx';
import GamesHomeContent from './games/games_home_content.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bulma/css/bulma.min.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <UsersHomeContent />,
    errorElement: <NotFound />
  },
  {
    path: '/users',
    element: <UsersHomeContent />,
    errorElement: <NotFound />
  },
  {
    path: '/games',
    element: <GamesHomeContent />,
    errorElement: <NotFound />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// Render the app
createRoot(document.getElementById('root')).render(<App />);

export default App;