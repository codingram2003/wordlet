import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Wordle from "./pages/wordle";
import Scores from "./pages/scores";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
    </Router>

  )
};

export default App;