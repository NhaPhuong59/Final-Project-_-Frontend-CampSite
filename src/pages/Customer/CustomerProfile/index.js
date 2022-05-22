import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import moment from "moment";
import { userGetOwnTrip } from '../../../features/booking/bookingSlice';
import "./styles.scss"



 function CustomerProfile() {
   const dispatch = useDispatch()
   const {bookingList} = useSelector((state)=>state.booking)
   const { user } = useAuth();

   useEffect(() => {
    console.log("Hihe");
    dispatch(userGetOwnTrip({ user }));
    
  }, [user, dispatch]);

  return (
    <div className='container_table'>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Place </TableCell>
            <TableCell align="right">Start date</TableCell>
            <TableCell align="right">End date</TableCell>
            <TableCell align="right">Number guests</TableCell>
            <TableCell align="right">Total pay</TableCell>
            <TableCell align="right">Booking date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingList.map((trip) => (
            <TableRow
              key={trip._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {trip.campId.title}
              </TableCell>
              <TableCell align="right">{trip.startDate}</TableCell>
              <TableCell align="right">{trip.endDate}</TableCell>
              <TableCell align="right">{trip.guestNumber}</TableCell>
              <TableCell align="right">{trip.totalPrice}</TableCell>
              <TableCell align="right">{moment(trip.createdAt).format("YYYY-MM-DD")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
export default CustomerProfile

