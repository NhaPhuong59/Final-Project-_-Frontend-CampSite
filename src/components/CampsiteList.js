import { Box, Grid, Pagination } from "@mui/material";
import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import "./styles.scss";

function CampsiteList() {
  const campsiteList = [...Array(10).keys()].map((_, i) => {
    return {
      title: "place " + i,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      image:
        "https://images.unsplash.com/photo-1651145447169-d8555d45f8cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    };
  });
  console.log("campsiteList", campsiteList);

  return (
    <React.Fragment>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      <Grid container spacing={3}>
        {campsiteList.map(({ title, description, image, index }) => (
          <Grid item xs={12} md={6} lg={4}>
            <ImageListItem key={index}>
              <img
                src={`${image}?w=248&fit=crop&auto=format`}
                srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, " +
                    "rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
                }}
                title="Favorite"
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: "white" }}
                    aria-label={`star ${title}`}
                  >
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
              <Link to="/detail">
                <ImageListItemBar
                  className="content-container"
                  sx={{
                    background:
                      "linear-gradient( rgba(225, 225, 225,0.7) 0%, " +
                      "rgba(225, 225, 225,0.5) 70%, rgba(225, 225, 225,0.3) 100%)",
                  }}
                  title={title}
                  subtitle={description}
                />
              </Link>
            </ImageListItem>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          mb: 3,
        }}
      >
        <Pagination
          count={3}
          page={1}
          // onChange={(e, value) => setPage(value)}
        />
      </Box>
    </React.Fragment>
  );
}

export default CampsiteList;
