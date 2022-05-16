import { Grade } from '@material-ui/icons'
import { Campaign } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import apiService from '../../utils/apiService'
import "./styles.scss"

function createData(name, email, startDate, endDate, num_guests, totalprice) {
  return { name, email, startDate, endDate, num_guests, totalprice };
}
let rows = []

function UserBooking() {
const authorId = useParams()
const [listOwnCamp, setListOwnCamp] = useState([]);
const [bookingList, setBookingList] = useState([]);

const [value, setValue] = React.useState(0);

useEffect(() => {
  const getCamp = async()=>{
    try {
      const res = await apiService(`/camps/author/${authorId.id}`)
      console.log(res.data)
      setListOwnCamp(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  getCamp()
}, [authorId]);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
const handleCampId = async(campId)=>{
  try {
    const res = await apiService.get(`/booking/campId/${campId}`)
    console.log(res.data.data)
    setBookingList(res.data.data)
  } catch (error) {
    
  }
}

  return (
    <div>
      <Box 
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
      <TabContext value={value}>
        <Box >
          <TabList 
          
          onChange={handleChange} 
          aria-label="lab API tabs example"
          orientation="vertical"
          >
            {listOwnCamp.map((camp, index)=>(
              <Tab label={camp.title} value={index} 
              sx={{ border: "1px solid lightgray" }}
              onClick={()=>handleCampId(camp._id)}
              />

            ))}
          </TabList>
        </Box>
        {listOwnCamp.map((camp, index)=>(
          <TabPanel value={index}>
<div>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell align="right">Email Address</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Number of Guests</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingList.map((booking) => (
            <TableRow
              key={booking._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="booking">
                {booking.guest.guestName}
              </TableCell>
              <TableCell align="right">{booking.guest.email}</TableCell>
              <TableCell align="right">{booking.startDate}</TableCell>
              <TableCell align="right">{booking.endDate}</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
          </TabPanel>

        ))}
      </TabContext>
    </Box>
    </div>
  )
}

export default UserBooking