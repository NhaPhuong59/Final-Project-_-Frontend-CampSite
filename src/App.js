import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
