import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Divider, Grid, Modal, Stack, Typography } from "@mui/material";
import "./styles.scss";
import { DateRange } from "react-date-range";
import PeopleIcon from "@material-ui/icons/People";
import * as React from "react";
import * as Yup from "yup";
import { FormProvider, FTextField } from "../../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCamp } from "../../../features/camp/campSlice";
import {
  createBooking,
  getAllBooking,
} from "../../../features/booking/bookingSlice";
import useEqual from "../../../hooks/useEqual";
import AcUnitSharpIcon from "@mui/icons-material/AcUnitSharp";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CabinOutlinedIcon from "@mui/icons-material/CabinOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import DoubleArrowOutlinedIcon from "@mui/icons-material/DoubleArrowOutlined";
import BookingSearch from "../../../components/BookingSearch";

const BookingSchema = Yup.object().shape({
  guestName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  guestName: "",
  email: "",
};

function DetailCampPage() {
  const { detailCamp } = useSelector((state) => state.camp);
  const { bookingList, success } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const campId = useParams();
  const [query, setQuery] = useSearchParams();
  const [showSearch, setShowSearch] = useState(false);

  const queryParams = useEqual({
    startDate: query.get("startDate"),
    endDate: query.get("endDate"),
  });

  const [open, setOpen] = React.useState(false);
  const [openCheck, setOpenCheck] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(BookingSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const startDate = new Date(queryParams.startDate || new Date());
  const endDate = new Date(queryParams.endDate || new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setQuery({
      ...queryParams,
      startDate: moment(ranges.selection.startDate).format("YYYY-MM-DD"),
      endDate: moment(ranges.selection.endDate).format("YYYY-MM-DD"),
    });
  }

  const getDateArray = (startDate, endDate) => {
    const dateArray = [];
    for (
      let dt = new Date(startDate);
      dt <= new Date(endDate);
      dt.setDate(dt.getDate() + 1)
    ) {
      dateArray.push(new Date(dt));
    }
    return dateArray;
  };

  let bookedDatesList = [];
  bookingList.forEach(({ startDate, endDate }) => {
    const daylist = getDateArray(startDate, endDate);
    bookedDatesList = bookedDatesList.concat(daylist);
  });

  const getDateBooked = getDateArray(startDate, endDate);
  const num = getDateBooked.length;
  let numNightsBooked = 0;
  if (num <= 2) {
    numNightsBooked = 1;
  } else {
    numNightsBooked = num - 1;
  }

  useEffect(() => {
    console.log("Hi");
    dispatch(getDetailCamp({ campId }));
    dispatch(getAllBooking({ campId }));
  }, [campId, dispatch]);

  let guestNumber = 2;
  const handleChangeGuestNum = (e) => {
    guestNumber = e.target.value;
  };

  const onSubmit = async (data) => {
    const { guestName, email } = data;
    const bookingInfo = {
      campId: campId.id,
      guest: {
        guestName,
        email,
      },
      guestNumber: guestNumber,
      totalPrice: parseInt(detailCamp.price) * numNightsBooked,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    };
    dispatch(createBooking({ campId, bookingInfo })).then(() => {
      reset();
      setOpen(false);
      setOpenCheck(true);
    });
  };

  return (
    <div>
      <div className="detailpage-container">
        <div className="banner"></div>
        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <div className="search_booking1">
            <BookingSearch  
            selectionRange={selectionRange} 
            handleSelect={handleSelect}
            bookedDatesList={bookedDatesList}
            handleChangeGuestNum={handleChangeGuestNum}
            detailCamp={detailCamp}
            numNightsBooked={numNightsBooked}
            setOpen={setOpen}
            />
            </div>
            
            <div className="search_booking2">
            <div className='banner__search'>
                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search"}
                </Button>
                <div style={{display: "flex", justifyContent: "center" }}>
                {showSearch && 
                <BookingSearch  
                selectionRange={selectionRange} 
                handleSelect={handleSelect}
                bookedDatesList={bookedDatesList}
                handleChangeGuestNum={handleChangeGuestNum}
                detailCamp={detailCamp}
                numNightsBooked={numNightsBooked}
                setOpen={setOpen}
                />
                }
                </div>
            </div>
            </div>

          </Grid>
          <Grid xs={12} md={9}>
            {detailCamp !== [] && (
              <Stack className="detail_section">
                <div className="section1">
                  <div
                    className="section1_image"
                    style={{ backgroundImage: `url(${detailCamp.images[0]})` }}
                  ></div>
                  <div className="section1_title">
                    <h4>{detailCamp.title}</h4>
                  </div>
                </div>
                <div className="section2">
                  <div className="section2_title1">ABOUT</div>
                  <div className="section2_title2">US</div>
                  <div
                    className="section2_image"
                    style={{ backgroundImage: `url(${detailCamp.images[2]})` }}
                  ></div>
                  <div className="section2_description">
                    <h1>
                      <CabinOutlinedIcon /> {detailCamp.title}
                    </h1>
                    <h2>
                      <PaidOutlinedIcon /> {detailCamp.price}/night
                    </h2>
                    <p className="section2_descriptionDetail">
                      <FactCheckOutlinedIcon />
                      {"   "}
                      {detailCamp.description}
                    </p>
                    <Typography
                      component="a"
                      href={detailCamp.address.addressUrl}
                      target="_blank"
                      className="section2_description_address"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <LocationOnIcon sx={{ color: "#fff" }} fontSize="large" />
                      <p>{detailCamp.address.addressText}</p>
                    </Typography>
                  </div>
                </div>
                <div className="section3">
                  <div className="title">What this place offer</div>
                  <div></div>
                  <div
                    className="section3_image"
                    style={{ backgroundImage: `url(${detailCamp.images[1]})` }}
                  ></div>
                  <div className="section3_description">
                    <Stack sx={{ display: "flex" }} spacing={3}>
                      <Stack
                        className="section3_description_icon air"
                        display="flex"
                      >
                        <AcUnitSharpIcon fontSize="large" />
                        <div style={{ color: "#222222" }}>Air Condition</div>
                      </Stack>
                      <Stack className="section3_description_icon breakfast">
                        <LunchDiningOutlinedIcon fontSize="large" />
                        <div style={{ color: "#222222" }}>Have breakfast</div>
                      </Stack>
                      <Stack className="section3_description_icon bbq">
                        <OutdoorGrillOutlinedIcon fontSize="large" />
                        <div style={{ color: "#222222" }}>
                          Barbecue utensils
                        </div>
                      </Stack>
                      <Stack className="section3_description_icon paking">
                        <DirectionsCarOutlinedIcon fontSize="large" />
                        <div style={{ color: "#222222" }}>
                          Free parking on premises
                        </div>
                      </Stack>
                    </Stack>
                  </div>
                </div>
                <div className="section4">
                  <div
                    className="section4_image image1"
                    style={{ backgroundImage: `url(${detailCamp.images[0]})` }}
                  ></div>
                  <div
                    className="section4_image image2"
                    style={{ backgroundImage: `url(${detailCamp.images[1]})` }}
                  ></div>
                  <div
                    className="section4_image image3"
                    style={{ backgroundImage: `url(${detailCamp.images[2]})` }}
                  ></div>
                  <div
                    className="section4_image image4"
                    style={{ backgroundImage: `url(${detailCamp.images[3]})` }}
                  ></div>
                </div>
              </Stack>
            )}
          </Grid>
        </Grid>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-name"
        aria-describedby="modal-email"
      >
        <Stack className="form_booking" spacing={2}>
          <div
            style={{ textAlign: "center", fontSize: "2rem", fontWeight: "600" }}
          >
            Your trip
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: "600" }}>
            {detailCamp.title}
          </div>
          <div>
            Dates: {moment(startDate).format("MMM Do YY")} -{" "}
            {moment(endDate).format("MMM Do YY")}
          </div>
          <div>Number of guests: {guestNumber} guests</div>
          <div>
            Total price: ${parseInt(detailCamp.price) * numNightsBooked}
          </div>
          <Divider />
          <div className="title_form_booking">Enter your infomation</div>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField name="guestName" label="Full name" />
              <FTextField name="email" label="Email address" />
              <LoadingButton
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ background: "#07a4b5" }}
              >
                Book
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Stack>
      </Modal>
      <Modal
        open={openCheck}
        onClose={() => setOpenCheck(false)}
      >
        <Stack className="form_booking">
          <Typography
            textAlign="center"
            color="#2e86de"
            fontSize="22px"
            padding="40px"
            sx={{ display: "flex" }}
          >
            <EmojiEmotionsOutlinedIcon
              sx={{ color: "#ffb95e" }}
              fontSize="large"
            />
            {success}
          </Typography>
          <Typography
            textAlign="center"
            component="a"
            href="https://www.google.com/gmail"
            color="#2e86de"
            target="_blank"
            sx={{
              display: "flex",
              textDecoration: "none",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "600",
            }}
            onClick={() => setOpenCheck(false)}
          >
            <DoubleArrowOutlinedIcon fontSize="large" /> Check email
          </Typography>
        </Stack>
      </Modal>
    </div>
  );
}

export default DetailCampPage;
