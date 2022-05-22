import React from 'react';
import './styles.scss';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import StarIcon from "@material-ui/icons/Star";
import { Box, Divider, Modal} from '@mui/material';
import ModalEditCamp from '../../features/camp/ModalEditCamp';


function CampOwnCard({
    id,
    images,
    location,
    title,
    description,
    price,
}) {
    const [open, setOpen] = React.useState(false);
    const handleEdit = () => setOpen(true)
    const handleClose = () => setOpen(false);
    return (
        <div>
        <div className='campOwn'>
            <img src={images[0]} alt="" />
            <ModeEditOutlineOutlinedIcon className="campOwn__edit" onClick={handleEdit}/>

            <div className='campOwn__info'>
                <div className="campOwn__infoTop">
                    <p>{location.addressText}</p>
                    <h3>{title}</h3>
                    <Divider width="200"/>
                    <p>{description}</p>
                </div>

                <div className="campOwn__infoBottom">
                    <div className='campOwn__price'>
                        <h2>${price}</h2>
                    </div>
                </div>
            </div>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-name"
        aria-describedby="modal-email"
      >
          <Box className='form_edit_camp'>
          <ModalEditCamp 
          id={id}
          images = {images}
          addressText = {location.addressText}
          addressUrl = {location.addressUrl}
          title = {title}
          price = {price}
          description = {description}
          setOpen = {setOpen}
          />
          </Box>
      </Modal>
      </div>
    )
}

export default CampOwnCard