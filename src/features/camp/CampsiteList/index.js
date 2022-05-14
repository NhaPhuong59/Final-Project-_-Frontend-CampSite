import { Box, Grid, Pagination } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import "./styles.scss";


function CampsiteList({list}) {

  return (
    
    <div className="campsite-list-container" >
      {/* <ImageListItem key="Subheader" cols={2}> */}
        {/* <ListSubheader component="div">CAMPS LIST</ListSubheader> */}
      {/* </ImageListItem> */}
      <Grid container spacing={3}>
        {list.map(({ title, description, images, _id }) => (
          <Grid item xs={12} md={6} lg={4} key={_id}>
            <ImageListItem>
              <img
                src={`${images[0]}?w=248&fit=crop&auto=format`}
                srcSet={`${images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={title}
                loading="lazy"
              />
              {/* {console.log(images)} */}
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
              <Link to={`/detailCamp/${_id}`}>
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
    </div>
  );
}

export default CampsiteList;
