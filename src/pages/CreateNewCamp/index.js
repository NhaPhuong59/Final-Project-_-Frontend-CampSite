import React, { useState, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Paper, Stack, Input, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../components/form";
import { FTextField } from "../../components/form";
import FTextarea from "../../components/form/FTextarea";
import { campsiteList } from "../../components/CampsiteList";
import apiService from "../../utils/apiService";
import Helper from "../../utils/Helper";
import ImageUploaded from "../../components/ImageUploaded";

const defaultValues = {
  // objectId: Math.floor(Math.random()*1000),
  title: "",
  description: "",
  images: [],
  addressUrl: "",
  addressText: "",
  // rating: Math.floor(Math.random()*6)
};

// let db = campsiteList

function CreateNewCamp() {
  const [displayImages, setDisplayImages] = useState([]);
  const methods = useForm({ defaultValues });
  const { setValue, getValues, handleSubmit } = methods;

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
    const { title, description, images, addressText, addressUrl } = data;
    console.log("data", data);
    let dataCreated = {
      title,
      description,
      images: images,
      address: { addressUrl, addressText },
    };
    console.log("data1", dataCreated);
    // dataCreated = JSON.stringify(dataCreated);
    // console.log("data2", dataCreated);
    try {
      const res = await apiService.post("/camps", dataCreated);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // db.push(dataCreated)
  };
  return (
    <Container maxWidth="md">
      <Paper>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FTextField
              name="title"
              label="Name Place"
              placehoder="input name"
              defaultValue=" "
            />
            <FTextField name="addressText" label="Address" />
            <label htmlFor="contained-button-file">
              <input
                accept=".png, .jpg, .jpeg, .bmp"
                multiple
                type="file"
                onChange={handleImageChange}
              />
            </label>
            <ImageUploaded images={displayImages}/>
            <FTextField name="addressUrl" label="Location Url" />
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

export default CreateNewCamp;
