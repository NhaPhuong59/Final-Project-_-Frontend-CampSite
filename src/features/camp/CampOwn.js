import React, { useState } from 'react'
import CampOwnCard from '../../components/CampOwnCard';

function CampOwn() {
  const [campOnw, setCampOnw] = useState([{
    images : ["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"],
        address : {
          addressText:"Private room in center of London"
        },
        title : "Stay at this spacious Edwardian House",
        rating : 0,
        price : 0,
        description : "1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
  }]);
  return (
    <div>
      {campOnw.map((camp)=>(
        <CampOwnCard 
        img = {camp.images[0]}
        location = {camp.address.addressText}
        title = {camp.title}
        rating = {camp.rating}
        price = {camp.price}
        description = {camp.description}
        />
      ))}
    </div>
  )
}

export default CampOwn