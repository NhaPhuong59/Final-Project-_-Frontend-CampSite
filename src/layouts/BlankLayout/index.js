import { Box } from '@mui/system'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo from "../../images/logo5.png"
import "./styles.scss"

function BlankLayout() {
  return (
    <React.Fragment>
      {/* <Box height={250} sx={{ display: "flex", justifyContent:"center", alignItems:"center"}}>
        <Link to="/"><img src={Logo} alt="logo" height={180} /></Link>
      </Box> */}
      <Box
              height={250}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ffb95e"
              }}
              
            >
              <img src={Logo} alt="logo" height={80} />
              <div className="logo_name2">noknok</div>
            </Box>
      <Outlet/>
    </React.Fragment>
  )
}

export default BlankLayout