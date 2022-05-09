import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderUser from '../MainHeader'
import MainFooter from '../MainFooter'
import { Box, Stack } from '@mui/material'

function MainLayout() {
  return (
    <React.Fragment>
    <Stack sx={{ minHeight: "100vh" }}>
        <HeaderUser/>
        <Outlet/>
      <Box sx={{ flexGrow: 1 }} />
        <MainFooter/>
    </Stack>
    </React.Fragment>
  )
}

export default MainLayout