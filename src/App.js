import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Vagas from "./Pages/Vagas";
import Repositorios from "./Pages/Repositorios";
import NovaVaga from "./Pages/NovaVaga";

function App() {
  return (
    <BrowserRouter basename={'/ui/vagas'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Vagas />} />
          <Route path="repositorios" element={<Repositorios />} />
          <Route path="nova-vaga" element={<NovaVaga />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
