import React from "react";
import { NavBar } from "./Components/NavBar";
import { Issues } from "./Components/Issues";
import { Repositories } from "./Components/Repositories";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <div className="container-fluid">
      <NavBar />
      <Issues />
      <Repositories />
      <Footer />
    </div>
  );
}
export default App;
