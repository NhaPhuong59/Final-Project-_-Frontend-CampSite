import { Box, Button, Container, Grid, Pagination } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListCamp } from "../../../features/camp/campSlice";
import useEqual from "../../../hooks/useEqual";
import "./styles.scss";
import Search from "../../../components/Search";
import CampCard from "../../../features/camp/CampCard";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import { scroller } from "react-scroll";

function HomePage() {
  const { camps, totalPage } = useSelector((state) => state.camp);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const [query, setQuery] = useSearchParams({
    startDate: "",
    endDate: "",
    camp: "",
    page: 1,
    limit: 9,
    minPrice: "",
    maxPrice: "",
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
console.log('queryParams', queryParams);
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
        <div className="banner_scroll" onClick={scrollToSection}>
          <ArrowDropDownCircleOutlinedIcon
            fontSize="large"
            className="icon_drop"
          />
        </div>
      </div>
      {/* <div className="home_main_section scrollTo"> */}
      <Container maxWidth="xl" className="scrollTo">
        <Grid container sx={{ mt: "30px" }}>
          <Grid item xs={12} md={3.5}>
            <div className="search_1">
              <Search setQuery={setQuery} queryParams={queryParams} />
            </div>
            <div className="search_2">
              <div className="banner__search">
                <Button
                  onClick={() => setShowSearch(!showSearch)}
                  className="banner__searchButton"
                  variant="outlined"
                >
                  {showSearch ? "Hide" : "Search"}
                </Button>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {showSearch && (
                    <Search setQuery={setQuery} queryParams={queryParams} />
                  )}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8.5} className="camp-list-container">
            {/* <Box className="listCamp" ref={myRef}> */}
              <Grid container spacing={3}>
                {camps.map((camp) => (
                  <Grid item key={camp._id} xs={6} md={4} lg={4} className="grid_card">
                  <CampCard
                    // key={camp._id}
                    camp={camp}
                    queryParams={queryParams}
                  />
                 </Grid>
                ))}
              </Grid>
            {/* </Box> */}
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
                onChange={(e, value) => setQuery({ ...query, page: value })}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
    // </div>
  );
}

export default HomePage;
