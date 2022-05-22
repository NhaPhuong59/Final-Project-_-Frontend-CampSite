import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Helper from '../../utils/Helper'
import * as Yup from "yup";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateCamp } from './campSlice'
import FormCreateCamp from '../../components/FormCreateCamp';


const yupSchema = Yup.object().shape({
    title: Yup.string().required("Place is required"),
    description: Yup.string().required("Description is required"),
    addressUrl: Yup.string().required("Location is required"),
    addressText: Yup.string().required("Address is required"),
    price: Yup.number().required("Price is required"),
  });
  
  
  function ModalEditCamp({id,setOpen, images ,addressText , addressUrl ,title,price ,description}) {
    const dispatch = useDispatch()  
    const defaultValues = {
        title: title,
        description: description,
        images: images,
        addressUrl: addressUrl,
        addressText: addressText,
        price: price,
      };
    const [displayImages, setDisplayImages] = useState(images);
    const [imageIsDelete, setImageIsDelete] = useState(null);
    const methods = useForm({ resolver: yupResolver(yupSchema),defaultValues });
    const { setValue, getValues, handleSubmit,} = methods;
  
    const handleImageChange = async (event) => {
      const images = await Helper.uploadImage(event.target.files);
      setDisplayImages([...displayImages,...images])
      const oldImages = getValues('images');
      setValue('images', [...oldImages, ...images]);
    };

    const handleDeleteImage=(image)=>{
      setImageIsDelete(image)
      if(imageIsDelete){
        const newListImages = displayImages.filter((item)=>item!==image)
        setDisplayImages(newListImages)
        setValue('images',newListImages)
      }
    }

    const onSubmit =async (data)=>{
        const { title, description, images, addressText, addressUrl, price } = data;
    let dataUpdate = {
      title,
      description,
      images: images,
      address: { addressUrl, addressText },
      price
    };
    dispatch(updateCamp({dataUpdate, id})).then(()=>setOpen(false))
    }

 return (
  <FormCreateCamp 
  methods={methods}
  onSubmit={onSubmit}
  handleSubmit={handleSubmit}
  handleImageChange={handleImageChange}
  displayImages={displayImages}
  handleDeleteImage={handleDeleteImage}
  />
  )
}

export default ModalEditCamp