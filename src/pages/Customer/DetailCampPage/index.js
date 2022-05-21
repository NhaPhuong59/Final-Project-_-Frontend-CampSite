import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Divider,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
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
import { createBooking, getAllBooking } from "../../../features/booking/bookingSlice";
import useEqual from "../../../hooks/useEqual";
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import OutdoorGrillOutlinedIcon from '@mui/icons-material/OutdoorGrillOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CabinOutlinedIcon from '@mui/icons-material/CabinOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';


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
    const dateArray = []
    for ( let dt=new Date(startDate); dt<=new Date(endDate); dt.setDate(dt.getDate()+1)){
      dateArray.push(new Date(dt))
    }
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

  const getDateBooked = getDateArray(startDate,endDate)
  const num= getDateBooked.length
  let numNightsBooked = 0
  if(num<=2){numNightsBooked=1}else{numNightsBooked=num-1}
  console.log("numNightsBooked", numNightsBooked) 

  useEffect(() => {
    console.log("Hi");
    dispatch(getDetailCamp({campId}))
    dispatch(getAllBooking({campId}))
  }, [campId, dispatch]);

  let guestNumber = 2
  const handleChangeGuestNum= (e)=>{
    guestNumber = e.target.value
    }
  
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
      guestNumber: guestNumber ,
      totalPrice : parseInt(detailCamp.price)*numNightsBooked,
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
        <div className="banner">
        </div>
        <Grid container >
          <Grid item xs={12} md={3} sx={{display:"flex", justifyContent:"center"}}>
          <div className="search_detail">
                  <DateRange
                    className="date_range"
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    minDate={new Date()}
                    shownDate={false}
                    disabledDates={bookedDatesList}

                  />
                  <h3>
                    Number of guests
                    <input
                      min={0}
                      defaultValue={2}
                      type="number"
                      className="num_guests"
                      onChange={(e)=>handleChangeGuestNum(e)}
                    />
                    <PeopleIcon />
                  </h3>
                  <div className="total_price">
                    <h3>Total
                    <div>$ {detailCamp.price} x {(numNightsBooked===1)?("1 night"):(`${numNightsBooked} nights`)}</div>
                  <div>= $ {parseInt(detailCamp.price)*numNightsBooked}</div>
                  </h3>
                  </div>
                  <button className="search_btn" onClick={() => setOpen(true)}>
                    Book
                  </button>
                </div>
          </Grid>
          <Grid xs={12} md={9} >
        {(detailCamp!==[])&&(
          <Stack paddingRight="80px">
            <div className="section1">
              <div className="section1_image" style={{backgroundImage:`url(${detailCamp.images[0]})`}}>
              </div>
              <div className="section1_title">
                <h4>{detailCamp.title}</h4>
              </div>
            </div>
            <div className="section2">
            <div className="section2_title1">ABOUT</div>
            <div className="section2_title2">US</div>
            <div className="section2_image" style={{backgroundImage:`url(${detailCamp.images[2]})`}}></div>
            <div className="section2_description">
              <h1><CabinOutlinedIcon/>{" "}{detailCamp.title}</h1>
              <h2><PaidOutlinedIcon/>{" "}{detailCamp.price}/night</h2>
              <p className="section2_descriptionDetail"><FactCheckOutlinedIcon/>{"   "}{detailCamp.description}</p>
              <Typography component="a" href={detailCamp.address.addressUrl} target="_blank" className="section2_description_address" sx={{display:"flex", alignItems:"center"}}>
                <LocationOnIcon sx={{ color: "#fff" }} fontSize="large"/>
              <p>{detailCamp.address.addressText}</p>
              </Typography>
            </div>
            </div>
            <div className="section3">
              <div className="title">What this place offer</div>
              <div>

              </div>
              <div className="section3_image" style={{backgroundImage:`url(${detailCamp.images[1]})`}}></div>
              <div className="section3_description">
                <Stack sx={{display:"flex"}} spacing={3} >
                  <Stack className="section3_description_icon air" display="flex">
                  <AcUnitSharpIcon fontSize="large"/><div style={{color:"#222222"}}>Air Condition</div> 
                  </Stack>
                  <Stack className="section3_description_icon breakfast">
                    <LunchDiningOutlinedIcon fontSize="large"/><div style={{color:"#222222"}}>Have breakfast</div> 
                  </Stack>
                  <Stack className="section3_description_icon bbq">
                    <OutdoorGrillOutlinedIcon fontSize="large"/><div style={{color:"#222222"}}>Barbecue utensils</div> 
                  </Stack>
                  <Stack className="section3_description_icon paking">
                    <DirectionsCarOutlinedIcon fontSize="large"/><div style={{color:"#222222"}}>Free parking on premises</div> 
                  </Stack>
                </Stack>
              </div>
            </div>
            <div className="section4">
            <div className="section4_image image1" style={{backgroundImage:`url(${detailCamp.images[0]})`}}></div>
            <div className="section4_image image2" style={{backgroundImage:`url(${detailCamp.images[1]})`}}></div>
            <div className="section4_image image3" style={{backgroundImage:`url(${detailCamp.images[2]})`}}></div>
            <div className="section4_image image4" style={{backgroundImage:`url(${detailCamp.images[3]})`}}></div>
            </div>
          </Stack>
        )}
          </Grid>
        </Grid>
          {/* <div className="container">
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
            </div> */}
            {/* <Grid container>
              <Grid item xs={8} md={8}>
                <div className="description">
                  <div>{detailCamp.description}</div>
                </div>
              </Grid> */}
              {/* <Grid item xs={4} md={4}> */}
                {/* <div className="search_detail">
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
                </div> */}
              {/* </Grid> */}
            {/* </Grid> */}
          {/* </div> */}
        {/* </div> */}
        {/* <div role="presentation">
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
            {/* <Grid container>
              <Grid item xs={8} md={8}>
                <div className="description">
                  <div>{detailCamp.description}</div>
                </div>
              </Grid> */}
              {/* <Grid item xs={4} md={4}> */}
                {/* <div className="search_detail">
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
                </div> */}
              {/* </Grid> */}
            {/* </Grid> */}
          {/* </div> */}
        {/* </div> */}
        {/* // )} */} 
        
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-name"
        aria-describedby="modal-email"
      >
        <Stack className="form_booking" spacing={2}>
          <div style={{textAlign:"center",fontSize:"2rem", fontWeight:"600"}}>Your trip</div>
          <div style={{fontSize:"1.4rem", fontWeight:"600"}}>{detailCamp.title}</div>
          <div>Dates: {moment(startDate).format("MMM Do YY")} - {moment(endDate).format("MMM Do YY")}</div>
          <div>Number of guests: {guestNumber} guests</div>
          <div>Total price: ${parseInt(detailCamp.price)*numNightsBooked}</div>
          <Divider/>
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
                sx={{background:"#07a4b5"}}
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
       <Typography textAlign="center" color="#2e86de" fontSize="22px" padding="40px"
       sx={{display:"flex"}}
       > 
       <EmojiEmotionsOutlinedIcon sx={{color: "#ffb95e"}} fontSize="large"/>
       Please check your email to confirm this booking! 
       </Typography>
       <Typography textAlign="center" component="a" href="https://www.google.com/gmail" color="#2e86de" target="_blank"
       sx={{display:"flex", textDecoration:"none", justifyContent: "center", fontSize:"1.5rem", fontWeight:"600"}}
       onClick={()=>setOpenCheck(false)}
       >
         <DoubleArrowOutlinedIcon fontSize="large"/> Check email
         </Typography>
       </Stack>
      </Modal>
    </div>
  );
}

export default DetailCampPage;
