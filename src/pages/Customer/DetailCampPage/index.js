import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Rating, Typography } from "@mui/material";
import "./styles.scss";
import { Link } from "react-router-dom";
// import { campsiteList } from "../../components/CampsiteList";
import MapIcon from "../../../images/map-icon.png";
import Carousel from "react-material-ui-carousel";
import apiService from "../../../utils/apiService";

function DetailCampPage() {
  const params = useParams();
  const [campDetail, setCampDetail] = useState({
    title:"",
    images: [],
    address: {
      addressUrl:"",
      addressText: ""
    },
    description: "",
    rating: ""
  });
console.log("Hello")
  useEffect( () => {
    console.log("Hi")
    const getCamp = async ()=>{
    try {
      const res = await apiService.get(`/camps/camp/${params.id}`)
      setCampDetail(res.data.camp)
      console.log(res.data.camp)
    } catch (error) {
      console.log(error)      
    }
  }
  getCamp()
},[params]);
  // const detail = campsiteList.find(
  //   (campsite) => campsite.objectId.toString() === params.id
  // );

  // console.log("detail", detail);
  return (
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
      <div className="container">
        <div className="side-bar"></div>
        <div className="detail-info">
          <div className="title">{campDetail.title}</div>
          <div className="display-rating">
            <Rating name="read-only" value={parseInt(campDetail.rating)} readOnly />
          </div>
          <div className="address-container">
            <a
              href={campDetail.address.addressUrl}
              target="_blank"
              rel="noreferrer"
            >
              <img src={MapIcon} alt="map" />
            </a>
            <div>{campDetail.address.addressText}</div>
          </div>
          <div className="images-container">
            <Carousel duration="2000">
              {campDetail.images.map((image, i) => (
                <div key={i}>
                  <img src={image} alt="" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="description">
            <div>{campDetail.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCampPage;
