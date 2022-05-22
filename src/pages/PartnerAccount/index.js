import React, { useState } from 'react'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { capitalCase } from "change-case";
import UserBooking from '../../features/booking/UserBooking';
import CampOwn from '../../features/camp/CampOwn';
import CreateCamp from '../../features/camp/CreateCamp';


function PartnerAccount() {
  const [currentTab, setCurrentTab] = useState("user_booking");



  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PARTNER_TABS = [
    {
      value: "user_booking",
      icon: <EventAvailableOutlinedIcon />,
      component: <UserBooking />,
    },
    {
      value: "my_camp",
      icon: <DeckOutlinedIcon />,
      component: <CampOwn />,
    },
    {
      value: "create_camp",
      icon: <CreateOutlinedIcon />,
      component: <CreateCamp />,
    }
  ];


  return (
    <div>
      <Container>
        <div style={{display: "flex", justifyContent: "center"}}>
      <Tabs
      
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PARTNER_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}

              />
            ))}
          </Tabs></div>
          {PARTNER_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
      </Container>
    </div>
  )
}

export default PartnerAccount