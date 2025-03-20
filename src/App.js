import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Vagas from "./Pages/Vagas";
import Repositorios from "./Pages/Repositorios";
import Recrutadores from "./Pages/Recrutadores";
import NovaVaga from "./Pages/NovaVaga";
import ErrorBoundary from "./Helpers/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/ui/vagas">
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={Vagas} />
            <Route path="repositorios" Component={Repositorios} />
            <Route path="recrutadores" Component={Recrutadores} />
            <Route path="nova-vaga" Component={NovaVaga} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
