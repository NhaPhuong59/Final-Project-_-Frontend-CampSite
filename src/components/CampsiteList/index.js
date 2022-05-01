import { Box, Grid, Pagination } from "@mui/material";
import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import "./styles.scss";

export const campsiteList = [...Array(10).keys()].map((_, i) => {
    return {
      objectId: i,
      title: "place " + i,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      images:[
      "https://images.unsplash.com/photo-1651145447169-d8555d45f8cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1650749837474-a9ab19e3d1af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1651084969294-03a2b0c02c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1650564365557-b987ac5d219e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ],
        address: {
            addressUrl: "https://www.google.com/maps/place/1364%2F21+Tr%C6%B0%E1%BB%9Dng+Sa,+Ph%C6%B0%E1%BB%9Dng+3,+T%C3%A2n+B%C3%ACnh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7923999,106.6611194,17z/data=!3m1!4b1!4m5!3m4!1s0x31752973bac4f643:0x40c397fdd61d09b8!8m2!3d10.7923999!4d106.6633081?hl=vi-VN",
            addressText: "1364/21 Trường Sa,Phường 3,Tân Bình,Thành phố Hồ Chí Minh, Việt Nam"
        },
      rating: Math.floor(Math.random()*6)
    
    };
  });
//   console.log(campsiteList[0].images)
function CampsiteList() {
  return (
    <div className="campsite-list-container">
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      <Grid container spacing={3}>
        {campsiteList.map(({ title, description, images, objectId }) => (
          <Grid item xs={12} md={6} lg={4} key={objectId}>
            <ImageListItem>
              <img
                src={`${images[0]}?w=248&fit=crop&auto=format`}
                srcSet={`${images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={title}
                loading="lazy"
              />
              {console.log(images)}
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
              <Link to={`/${objectId}`}>
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
