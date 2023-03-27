import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Components/Home";
import DetailsPage from "./Components/DetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
         <Route exact path="/:pokemonId" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
  

export default App;

