import React from 'react'
import { Outlet } from 'react-router-dom'
import MainFooter from '../MainFooter'
import { Box, Stack } from '@mui/material'
import PartnerHeader from '../PartnerHeader'
import AlertMsg from '../../components/AlertMsg'

function PartnerLayout() {
  return (
    <React.Fragment>
    <Stack sx={{ minHeight: "100vh" }}>
        <PartnerHeader/>
        <AlertMsg/>
        <Outlet/>
      <Box sx={{ flexGrow: 1 }} />
        <MainFooter/>
    </Stack>
    </React.Fragment>
  )
}

export default PartnerLayout