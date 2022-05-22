import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CampCard({camp, queryParams}) {
    const navigate = useNavigate()
    const {title, images, _id, price} = camp

    // const handleClick=()=>{
    //     navigate(`/camp/${_id}?startDate=${queryParams.startDate}&endDate=${queryParams.endDate}`)
    // }
  return (
    <Grid item xs={12} md={6} lg={4} key={_id}>
      <Link href={`/camp/${_id}?startDate=${queryParams.startDate}&endDate=${queryParams.endDate}`} sx={{textDecoration:"none"}}>
    <Card sx={{ maxWidth: 290, boxShadow:"2px 2px 6px #FED8A7", border:"1px solid #FED8A7" }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={images[0]}
          alt={title}
        />
        <CardContent sx={{}}>
          <Typography gutterBottom variant="body" sx={{fontSize:"1rem", fontWeight:"550"}} component="div" noWrap>
            {title}
          </Typography>
          <Typography variant='body2' >${price} night</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </Grid>
  );
}

export default CampCard

// onClick={handleClick}