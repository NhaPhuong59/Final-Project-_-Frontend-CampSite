import {
  Box,
  Container,
  duration,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import CampsiteList from "../../../features/camp/CampsiteList";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListCamp } from "../../../features/camp/campSlice";
import useEqual from "../../../hooks/useEqual";
import "./styles.scss";
import Search from "../../../components/Search";
import CampCard from "../../../features/camp/CampCard";

function HomePage() {
  const { camps, totalPage } = useSelector((state) => state.camp);
  const dispatch = useDispatch();

  const [query, setQuery] = useSearchParams({
    startDate: "",
    endDate: "",
    camp: "",
    page: 1,
    limit: 9,
  });
  const queryParams = useEqual({
    startDate: query.get("startDate"),
    endDate: query.get("endDate"),
    camp: query.get("camp"),
    page: query.get("page"),
    limit: query.get("limit"),
  });

  const myRef = useRef(null);

  useEffect(() => {
    dispatch(getListCamp({ ...queryParams }));
  }, [dispatch, queryParams]);

  // const handleSearch = () => {};
  console.log("HomePage", "queryParams", queryParams);
  return (
    <div className="home">
      <Container maxWidth="xl">
        <div className="banner"></div>
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
                {/* <CampsiteList list={camps} queryParams={queryParams} /> */}
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
  );
}

export default HomePage;
