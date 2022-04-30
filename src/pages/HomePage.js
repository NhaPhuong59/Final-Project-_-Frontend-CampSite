import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <React.Fragment>
      <div>HomePage</div>
      <Link to="/detail">Go to detail page</Link>
    </React.Fragment>
  );
}

export default HomePage;
