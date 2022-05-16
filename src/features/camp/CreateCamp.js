import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Paper, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { FMultiCheckbox, FormProvider } from "../../components/form";
import { FTextField } from "../../components/form";
import FTextarea from "../../components/form/FTextarea";
import Helper from "../../utils/Helper";
import ImageUploaded from "../../components/ImageUploaded";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCamp } from "./campSlice";

const yupSchema = Yup.object().shape({
  title: Yup.string().required("Place is required"),
  description: Yup.string().required("Description is required"),
  addressUrl: Yup.string().required("Location is required"),
  addressText: Yup.string().required("Address is required"),
  price: Yup.number().required("Price is required"),
});

const defaultValues = {
  title: "",
  description: "",
  images: [],
  addressUrl: "",
  addressText: "",
  price: "",
  amenites: {
    canal_view: false,
    free_parking_on_premises:false,
    shared_hot_tub:false,
    portable_air_conditioning:false,
    breakfast: false
  }
};

// const AMENITIES_OPTION =["Canal view", "Free parking on premises", "Shared hot tub", "Portable air conditioning", "Breakfast"]

function CreateCamp() {
  const dispatch = useDispatch()

  const [displayImages, setDisplayImages] = useState([]);
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

  const onSubmit = async (data) => {
    const { title, description, images, addressText, addressUrl, price } = data;
    console.log("data", data);
    let dataCreated = {
      title,
      description,
      images: images,
      address: { addressUrl, addressText },
      price
    };
    console.log("data1", dataCreated);
    dispatch(createCamp({dataCreated})).then(()=>{
      reset() 
      setDisplayImages([])})
  };

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
            <FTextField name="addressText" label="Address" size="small"/>
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
            <ImageUploaded images={displayImages}/>
            <FTextField name="addressUrl" label="Location Url" size="small"/>
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
              Create
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Paper>
    </Container>
  );
}

export default CreateCamp;
