import { Box } from '@mui/system'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo from "../../images/logo.jpg"

function BlankLayout() {
  return (
    <React.Fragment>
      <Box height={250} sx={{ display: "flex", justifyContent:"center", alignItems:"center"}}>
        <Link to="/"><img src={Logo} alt="logo" height={200} /></Link>
      </Box>
      <Outlet/>
    </React.Fragment>
  )
}

export default BlankLayout