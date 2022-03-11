import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./pages/Home";

// import { Container } from './styles';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default RoutesApp;
