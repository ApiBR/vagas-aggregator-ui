import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Pages/Layout";
import Vagas from "./Pages/Vagas";
import Repositorios from "./Pages/Repositorios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Vagas />} />
          <Route path="repositorios" element={<Repositorios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
