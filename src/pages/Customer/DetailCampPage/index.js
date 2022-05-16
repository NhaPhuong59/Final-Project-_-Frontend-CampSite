import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {
  Breadcrumbs,
  Divider,
  Grid,
  Modal,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import "./styles.scss";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import MapIcon from "../../../images/map-icon.png";
import PeopleIcon from "@material-ui/icons/People";
import Carousel from "react-material-ui-carousel";
import * as React from "react";
import * as Yup from "yup";
import { FormProvider, FTextField } from "../../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCamp } from "../../../features/camp/campSlice";
import { createBooking } from "../../../features/booking/bookingSlice";

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

  const dispatch = useDispatch();
  console.log("detailCamp", detailCamp)

  const campId = useParams();
  const [query] = useSearchParams();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log("query", query.get("startDate"));

  const methods = useForm({
    resolver: yupResolver(BookingSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const [startDate, setStartDate] = useState(
    new Date(query.get("startDate") || new Date())
  );
  const [endDate, setEndDate] = useState(
    new Date(query.get("endDate") || new Date())
  );

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  // console.log("startDate DetailCamp",startDate)
  // console.log("endDate Detailcamp",endDate)

  useEffect(() => {
    console.log("Hi");
    dispatch(getDetailCamp({campId}))
  }, [campId, dispatch]);
  
  const onSubmit = async(data) => {
    const { guestName, email } = data;
    console.log("data", data);
    console.log("campID", campId.id);
    const bookingInfo = {
      campId: campId.id,
      guest: {
        guestName,
        email,
      },
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    };
    dispatch(createBooking({campId,bookingInfo}))
    .then(()=>{
      reset();
      setOpen(false)
    })
  };

  return (
    <div>
      <div className="detailpage-container">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Place</Typography>
          </Breadcrumbs>
        </div>
        {(detailCamp!==[])&&(
          <div className="container">
          <div className="detail-info">
            <div className="title">{detailCamp.title}</div>
            <div className="display-rating">
              <Rating
                name="read-only"
                value={parseInt(detailCamp.rating)}
                readOnly
              />
            </div>
            <div className="address-container">
              <a
                href={detailCamp.address.addressUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img src={MapIcon} alt="map" />
              </a>
              <div>{detailCamp.address.addressText}</div>
            </div>
            <div className="images-container">
              <Carousel duration="2000">
                {detailCamp.images.map((image, i) => (
                  <div key={i}>
                    <img src={image} alt="" />
                  </div>
                ))}
              </Carousel>
            </div>
            <Grid container>
              <Grid item xs={8} md={8}>
                <div className="description">
                  <div>{detailCamp.description}</div>
                </div>
              </Grid>
              <Grid item xs={4} md={4}>
                <div className="search_detail">
                  <DateRange
                    className="date_range"
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    minDate={new Date()}
                    // showPreview={false}
                    shownDate={false}
                    // showDateDisplay={true}
                  />
                  <Divider width="350px" />
                  <h3>
                    Number of guests
                    <input
                      min={0}
                      defaultValue={2}
                      type="number"
                      className="num_guests"
                    />
                    <PeopleIcon />
                  </h3>
                  <button className="search_btn" onClick={handleOpen}>
                    Book
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        )}
        
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-name"
        aria-describedby="modal-email"
      >
        <Stack className="form_booking" spacing={2}>
          <div className="title_form_booking">Enter your details</div>
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
              >
                Book
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Stack>
      </Modal>
    </div>
  );
}

export default DetailCampPage;
