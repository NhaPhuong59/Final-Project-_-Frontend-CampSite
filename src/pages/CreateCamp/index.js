import React, { useState, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Paper, Stack, Input, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../components/form";
import { FTextField } from "../../components/form";
import FTextarea from "../../components/form/FTextarea";
import apiService from "../../utils/apiService";
import Helper from "../../utils/Helper";
import ImageUploaded from "../../components/ImageUploaded";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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
};


function CreateCamp() {
  const [displayImages, setDisplayImages] = useState([]);
  const methods = useForm({ resolver: yupResolver(yupSchema),defaultValues });
  const { setValue, getValues, handleSubmit, reset} = methods;
  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    console.log('event', event);
    console.log("handleImageChange", event.target.files[0]);
    const images = await Helper.uploadImage(event.target.files);
    setDisplayImages([...displayImages,...images])
    // console.log('setValue', 'images', images)
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
    // dataCreated = JSON.stringify(dataCreated);
    // console.log("data2", dataCreated);
    try {
      const res = await apiService.post("/camps", dataCreated).then(()=>reset());
      const userCurrentID = res.data.data.camp.author
      console.log(res);
      navigate(`/partner/${userCurrentID}/camp`,{ replace: true})
    } catch (error) {
      console.log(error);
    }
    // db.push(dataCreated)
  };
  return (
    <Container maxWidth="md">
      <Paper>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField
              name="title"
              label="Name Place"
              placehoder="input name"
              defaultValue=" "
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
