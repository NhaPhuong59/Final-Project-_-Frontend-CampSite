import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from '../MainHeader'
import MainFooter from '../MainFooter'
import { Box, Stack } from '@mui/material'
import AlertMsg from '../../components/AlertMsg'

function MainLayout() {
  return (
    <React.Fragment>
    <Stack sx={{ minHeight: "100vh" }}>
        <MainHeader/>
        <AlertMsg/>
        <Outlet/>
      <Box sx={{ flexGrow: 1 }} />
        <MainFooter/>
    </Stack>
    </React.Fragment>
  )
}

export default MainLayout