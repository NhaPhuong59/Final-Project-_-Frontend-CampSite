import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Divider, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCampOnw } from '../camp/campSlice'
import { getBookingSuccess } from './bookingSlice'
import "./styles.scss"


function UserBooking() {
const authorId = useParams()
const dispatch = useDispatch()
const {camps} = useSelector((state)=>state.camp)
const {bookingList} = useSelector((state)=>state.booking)

const [value, setValue] = React.useState("0");

useEffect(() => {
  dispatch(getCampOnw({authorId}))
}, [authorId, dispatch]);

const handleChange = (e, newValue) => {
  setValue(newValue);
};
const handleBookingList = async(campId)=>{
  dispatch(getBookingSuccess(campId))
}
  return (
    <div>
      <Box 
      sx={{ flexGrow: 1, display: 'flex', height: "60vh" }}
      >
      <TabContext value={value}>
        <Box margin="24px 10px 0">
          <TabList 
          sx={{ boxShadow:"2px 1px 8px lightgray",borderRadius:"5px",backgroundColor:"#FFF"}}
          onChange={(e)=>handleChange(e)} 
          aria-label="lab API tabs example"
          orientation="vertical"
          >
            {camps.map((camp, index)=>(
              <div key={camp._id}>
              <Tab  label={camp.title} value={index.toString()} 
              onClick={()=>handleBookingList(camp._id)}
              />
              <Divider/>
              </div>
            ))}
          </TabList>
        </Box>
        {camps.map((camp, index)=>(
          <TabPanel value={index.toString()} key={camp._id} sx={{bgcolor: "#c9eff9"}}>
            {console.log("index",)}
<div>
            <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell sx={{ fontWeight:"600"}}>Full Name</TableCell>
            <TableCell sx={{ fontWeight:"600"}} align="right">Email Address</TableCell>
            <TableCell sx={{ fontWeight:"600"}} align="right">Start Date</TableCell>
            <TableCell sx={{ fontWeight:"600"}} align="right">End Date</TableCell>
            <TableCell sx={{ fontWeight:"600"}} align="right">Number of Guests</TableCell>
            <TableCell sx={{ fontWeight:"600"}} align="right">Total Price</TableCell>
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
              <TableCell align="right">{booking.guestNumber}</TableCell>
              <TableCell align="right">{booking.totalPrice}</TableCell>
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