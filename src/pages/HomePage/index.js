import { Button } from "@mui/material";
import React from "react";
import CampsiteList from "../../components/CampsiteList";
import "./styles.scss";

function HomePage() {
  return (
    <React.Fragment>
      <Button variant="contained" href="/createNewCamp">
        Create Camp
      </Button>
      <CampsiteList />
    </React.Fragment>
  );
}

export default HomePage;
