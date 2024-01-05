
import React from 'react';
import DiscordLookup from './DiscordLookup';
import Error404 from './404';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DiscordLookup />
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
