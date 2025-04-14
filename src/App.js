import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Layout";
import Vagas from "./Pages/Vagas";
import Repositorios from "./Pages/Repositorios";
import Recrutadores from "./Pages/Recrutadores";
import NovaVaga from "./Pages/NovaVaga";
import ErrorBoundary from "./Helpers/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/ui/vagas">
        <Layout>
            <Routes>
              <Route path="/" element={<Vagas />} />
              <Route path="repositorios" element={<Repositorios />} />
              <Route path="recrutadores" element={<Recrutadores />} />
              <Route path="nova-vaga" element={<NovaVaga />} />
            </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}
export default App;
