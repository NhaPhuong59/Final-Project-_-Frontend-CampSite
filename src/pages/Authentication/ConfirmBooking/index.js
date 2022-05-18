import { Button, Stack } from "@mui/material";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { confirmBooking } from "../../../features/booking/bookingSlice";
import "./styles.scss";

function ConfirmBooking() {
  const { error } = useSelector((state) => state.booking);
  console.log("error", error);
  const { token } = useParams();
  console.log("token", token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(confirmBooking({ token }));
  }, [token, dispatch]);

  return (
    <Stack className="confirmation" spacing={3}>
      <Stack className="message">
        {(error)?(
            <div className="error">{error}</div>):(
                <div className="success">Confirm successfuly! Please check your email to get detail information booking</div>)
                }
      </Stack>
      <Stack width={200}>
        <Button href="/" variant="contained" className="button">
          Home
        </Button>
      </Stack>
    </Stack>
  );
}

export default ConfirmBooking;
