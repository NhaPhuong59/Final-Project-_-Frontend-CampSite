import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import CreateNewCamp from "./pages/CreateNewCamp";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import UploadImage from "./pages/UploadImage";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<DetailPage />} />
          <Route path="/createNewCamp" element={<CreateNewCamp/>}/>
          <Route path="/image" element={<UploadImage/>}/>
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
