import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Container, Modal, Paper, Stack } from '@mui/material'
import React, { useState } from 'react'
import Helper from '../../utils/Helper'
import { FormProvider, FTextField } from '../form'
import FTextarea from '../form/FTextarea'
import ImageUploaded from '../ImageUploaded'
import * as Yup from "yup";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateCamp } from '../../features/camp/campSlice'

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
        // amenites: {
        //   canal_view: false,
        //   free_parking_on_premises:false,
        //   shared_hot_tub:false,
        //   portable_air_conditioning:false,
        //   breakfast: false
        // }
      };
    const [displayImages, setDisplayImages] = useState(images);
    const methods = useForm({ resolver: yupResolver(yupSchema),defaultValues });
    const { setValue, getValues, handleSubmit, reset} = methods;
  
    const handleImageChange = async (event) => {
      console.log('event', event);
      console.log("handleImageChange", event.target.files[0]);
      const images = await Helper.uploadImage(event.target.files);
      setDisplayImages([...displayImages,...images])
      const oldImages = getValues('images');
      setValue('images', [...oldImages, ...images]);
    };
    const onSubmit =async (data)=>{
        const { title, description, images, addressText, addressUrl, price } = data;
    console.log("data", data);
    let dataUpdate = {
      title,
      description,
      images: images,
      address: { addressUrl, addressText },
      price
    };
    console.log("data1", dataUpdate);
    dispatch(updateCamp({dataUpdate, id})).then(()=>setOpen(false))
    }

 return (
    <Container maxWidth="md">
    <Paper>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="title"
            label="Name Place"
            size="small"
          />
          <FTextField name="addressText" label="Address" size="small"  />
          <FTextField
            name="price"
            label="Price"
            placehoder="input name"
            size="small"
          />
          <label htmlFor="contained-button-file">
            <input
              accept=".png, .jpg, .jpeg, .bmp"
              multiple
              type="file"
              onChange={handleImageChange}
            />
          </label>
          <ImageUploaded images={displayImages} />
          <FTextField name="addressUrl" label="Location Url" size="small" />
          {/* <FMultiCheckbox name="Amenities" options={AMENITIES_OPTION}/> */}
          
          <FTextarea
            name="description"
            label="Description"
            placeholder="Description"
          />
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            fullWidth
          >
            Update
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Paper>
  </Container>
  )
}

export default ModalEditCamp