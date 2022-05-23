import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CampOwnCard from '../../components/CampOwnCard';
import apiService from '../../utils/apiService';
import Helper from "../../utils/Helper";

function CampOwn() {
  const authorId = useParams()
  const [campOwn, setCampOwn] = useState([{
    images : [],
        address : {
          addressText:""
        },
        title : "",
        rating : 0,
        price : 0,
        description : ""
  }]);

  useEffect(() => {
    const getListCampOwn = async()=>{
      try {
        const res = await apiService.get(`/camps/author/${authorId.id}`)
        res.data.data.forEach((camp) => {
          camp.images = camp.images.map(Helper.imageUrl);
        })
        setCampOwn(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getListCampOwn()
  }, [authorId]);
  return (
    <div>
      {campOwn.map((camp)=>(
        <CampOwnCard 
        key={camp._id}
        id={camp._id}
        images = {camp.images}
        location = {camp.address}
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