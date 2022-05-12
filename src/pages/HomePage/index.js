import { KeyboardReturnSharp } from "@material-ui/icons";
import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import CampsiteList from "../../components/CampsiteList";
import Country from "../../components/Country";
import "./styles.scss";

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    country: "Korea",
    totalPlace: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1192&q=80",
    country: "Japan",
    totalPlace: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    country: "Thailand",
    totalPlace: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1504457047772-27faf1c00561?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1247&q=80",
    country: "VietNam",
    totalPlace: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80",
    country: "America",
    totalPlace: "🇺🇸",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543832923-44667a44c804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1044&q=80",
    country: "England",
    totalPlace: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    country: "France",
    totalPlace: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    country: "Singapore",
    totalPlace: 100,
  },
];

function HomePage() {
  return (
    <div className="home">
      <Container maxWidth="xl">
        <Banner />
        <h2 className='title-section place'>Explore world</h2>

        <Grid container className="home__section__place" spacing={1}>
          {data.map((item) => (
            <Grid item xs={6} md={3}>
              <Country
                src={item.image}
                place={item.country}
                flag={item.totalPlace}
              />
            </Grid>
          ))}
        </Grid>
        <Box className="listCamp">
          <CampsiteList />
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
