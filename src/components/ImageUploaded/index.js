import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

 function ImageUploaded ({images}) {
     console.log("shahahaha",images)
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={164}>
      {images.map((item, index) => (
        <ImageListItem key={index}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="item uploaded"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
export default ImageUploaded

