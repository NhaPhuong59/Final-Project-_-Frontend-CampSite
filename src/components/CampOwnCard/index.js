import React from 'react';
import './styles.scss';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import StarIcon from "@material-ui/icons/Star";

function CampOwnCard({
    img,
    location,
    title,
    description,
    rating,
    price,
    // total,
}) {
    return (
        <div className='campOwn'>
            <img src={img} alt="" />
            <ModeEditOutlineOutlinedIcon className="campOwn__edit" />

            <div className='campOwn__info'>
                <div className="campOwn__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{description}</p>
                </div>

                <div className="campOwn__infoBottom">
                    <div className="campOwn__stars">
                        <StarIcon className="campOwn__star" />
                        <p>
                            <strong>{rating}</strong>
                        </p>
                    </div>
                    <div className='campOwn__price'>
                        <h2>{price}</h2>
                        {/* <p>{total}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampOwnCard