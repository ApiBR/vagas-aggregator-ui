import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Pages/Layout";
import Vagas from "./Pages/Vagas";
import Repositorios from "./Pages/Repositorios";
import Recrutadores from "./Pages/Recrutadores";
import NovaVaga from "./Pages/NovaVaga";
import ErrorBoundary from "./Helpers/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter
        basename={"/ui/vagas"}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Vagas />} />
            <Route path="repositorios" element={<Repositorios />} />
            <Route path="recrutadores" element={<Recrutadores />} />
            <Route path="nova-vaga" element={<NovaVaga />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
export default App;
