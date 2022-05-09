import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
