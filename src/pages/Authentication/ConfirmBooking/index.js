import { Button, Stack, Box } from "@mui/material";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { confirmBooking } from "../../../features/booking/bookingSlice";
import "./styles.scss";

function ConfirmBooking() {
  const { error } = useSelector((state) => state.booking);
  const { token } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(confirmBooking({ token }));
  }, [token, dispatch]);

  return (
    <Box sx={{background:"#ffb95e", height:"80vh"}} >
    <Stack className="confirmation" spacing={3}>
      <Stack className="message">
        {(error)?(
            <div className="error">{error}</div>):(
                <div className="success">Confirm successfuly! Please check your email to get detail information booking</div>)
                }
      </Stack>
      <Stack width={200}>
        <Button href="/" variant="contained" className="button" sx={{background:"#07A4B5"}}>
          Home
        </Button>
      </Stack>
    </Stack>
    </Box>
  );
}

export default ConfirmBooking;
