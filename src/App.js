import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Vagas from "./Pages/Vagas";
import Repositorios from "./Pages/Repositorios";
import Recrutadores from "./Pages/Recrutadores";
import NovaVaga from "./Pages/NovaVaga";
import ErrorBoundary from "./Helpers/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/ui/vagas",
    element: <Layout />,
    errorElement: <div>Error loading page</div>, // Optional error boundary (if needed)
    children: [
      { index: true, element: <Vagas /> },
      { path: "repositorios", element: <Repositorios /> },
      { path: "recrutadores", element: <Recrutadores /> },
      { path: "nova-vaga", element: <NovaVaga /> },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
