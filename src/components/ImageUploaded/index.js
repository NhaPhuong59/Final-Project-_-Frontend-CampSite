import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "./styles.scss"

 function ImageUploaded ({images, handleDeleteImage}) {
     console.log("shahahaha",images)
  return (
    <ImageList sx={{ width: 500, height: 450, padding:"0.6rem" }} cols={4} rowHeight={164}>
      {images.map((item, index) => (
        <ImageListItem key={index} className="image_uploaded">
          <RemoveCircleIcon className='btn_delete' onClick={()=>handleDeleteImage(item)}/>
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

