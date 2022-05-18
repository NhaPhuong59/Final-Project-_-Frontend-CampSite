import { useEffect } from "react";
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
import { createBooking, getAllBooking } from "../../../features/booking/bookingSlice";
import useEqual from "../../../hooks/useEqual";

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
  const { bookingList } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const campId = useParams();
  const [query, setQuery] = useSearchParams();
  
  console.log("bookingList",bookingList)

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

  const getDateArray = (startDate, endDate)=>{
    console.log("getDateArray","startDate",new Date(startDate))
    console.log("getDateArray","endDate",new Date(endDate))

    const dateArray = []
    for ( let dt=new Date(startDate); dt<=new Date(endDate); dt.setDate(dt.getDate()+1)){
    console.log("getDateArray","dt",dt)
      
      dateArray.push(new Date(dt))
    console.log("dateArray",dateArray)
      
    }
    console.log(dateArray)
    return dateArray
  }

  let bookedDatesList=[]
  bookingList.forEach(({startDate,endDate})=>{
    console.log("bookedDatesList","startDate",startDate)
    console.log("bookedDatesList","endDate",endDate)
    const daylist= getDateArray(startDate, endDate)
    console.log("daylist",daylist)
    bookedDatesList = bookedDatesList.concat(daylist)
  })
  console.log("bookedDatesList",bookedDatesList)

  useEffect(() => {
    console.log("Hi");
    dispatch(getDetailCamp({campId}))
    dispatch(getAllBooking({campId}))
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
      setOpenCheck(true)
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
                    disabledDates={bookedDatesList}

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
                  <button className="search_btn" onClick={() => setOpen(true)}>
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
        onClose={() => setOpen(false)}
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
      <Modal
      open={openCheck}
      onClose={()=>setOpenCheck(false)}
      // aria-labelledby=""
      // aria-describedby="modal-email"
      >
        <Stack className="form_booking">
       <Typography textAlign="center" color="#2e86de" fontSize="22px" padding="40px"> Please check your email to confirm this booking!</Typography>
       </Stack>
      </Modal>
    </div>
  );
}

export default DetailCampPage;
