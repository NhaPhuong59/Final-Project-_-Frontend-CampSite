import {
  Box,
  Container,
  Grid,
  Pagination,
} from "@mui/material";
import React, { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListCamp } from "../../../features/camp/campSlice";
import useEqual from "../../../hooks/useEqual";
import "./styles.scss";
import Search from "../../../components/Search";
import CampCard from "../../../features/camp/CampCard";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { scroller } from "react-scroll";

function HomePage() {
  const { camps, totalPage } = useSelector((state) => state.camp);
  const dispatch = useDispatch();

  const [query, setQuery] = useSearchParams({
    startDate: "",
    endDate: "",
    camp: "",
    page: 1,
    limit: 9,
    minPrice:"",
    maxPrice:""
  });
  const queryParams = useEqual({
    startDate: query.get("startDate"),
    endDate: query.get("endDate"),
    camp: query.get("camp"),
    page: query.get("page"),
    limit: query.get("limit"),
    minPrice: query.get("minPrice"),
    maxPrice: query.get("maxPrice"),

  });

  const myRef = useRef(null);

  const scrollToSection = () => {
    scroller.scrollTo("scrollTo", {
      duration: 1200,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  useEffect(() => {
    dispatch(getListCamp({ ...queryParams }));
  }, [dispatch, queryParams]);

  console.log("HomePage", "queryParams", queryParams);
  return (
    <div className="home">
      <div className="banner">
        <div className="banner_title">
          <h4 className="title_travel">Traveling</h4>
          <div className="title_share">Sharing</div>
          <div className="title_wellcome">Wellcome to Nok Nok!</div>
        </div>
        <div className="banner_image"></div>
        <div className="banner_scroll"  onClick={scrollToSection}><ArrowDropDownCircleOutlinedIcon fontSize="large" className="icon_drop"/></div>
      </div>
      <div className="home_main_section scrollTo">
      <Container maxWidth="xl" >
        <Grid container sx={{ mt: "30px" }}>
          <Grid item xs={3.5}>
            <Search setQuery={setQuery} queryParams={queryParams} />
          </Grid>
          <Grid item xs={8.5}>
            <Box className="listCamp" ref={myRef}>
              <Grid container spacing={3}>
              {camps.map((camp) => (
                <CampCard camp={camp} queryParams={queryParams} />
              ))}
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                mb: 3,
              }}
            >
              <Pagination
                count={totalPage}
                page={query.page}
                onChange={(e, value) =>setQuery({...query, page:value})}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      </div>
    </div>
  );
}

export default HomePage;
