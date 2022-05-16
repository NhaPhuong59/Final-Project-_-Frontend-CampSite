import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CampOwnCard from '../../components/CampOwnCard';
import apiService from '../../utils/apiService';

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
        setCampOwn(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getListCampOwn()
  }, [authorId]);
console.log("campOwn",campOwn)
  return (
    <div>
      {campOwn.map((camp)=>(
        <CampOwnCard 
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