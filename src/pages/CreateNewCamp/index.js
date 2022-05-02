import React from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Paper, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../components/form";
import { FTextField } from "../../components/form";
import FTextarea from "../../components/form/FTextarea";
import { campsiteList } from "../../components/CampsiteList";

const defaultValues = {
    objectId: Math.floor(Math.random()*1000),
    title: "",
    description: "",
    images: [],
    addressUrl: "",
    addressText: "",
    rating: Math.floor(Math.random()*6)
}

let db = campsiteList
  
function CreateNewCamp() {
  const methods = useForm({defaultValues});
  const {handleSubmit} = methods

  const onSubmit = (data) => {
      const {objectId, title, description, images, addressText, addressUrl, rating} = data
      console.log("data",data)
      const dataCreated = {
          objectId,
          title,
          description,
          images,
          address: {
              addressUrl,
              addressText
          },
          rating
      }
      db.push(dataCreated)

  }
  return (
    <Container maxWidth="md">
      <Paper>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FTextField name="title" label="Name Place" placehoder="input name" defaultValue=" "/>
            <FTextField name="addressText" label="Address" />
            <FTextField name= "images" label="Images " />
            <FTextField name= "addressUrl" label="Location Url" />
            <FTextarea name= "description" label="Description" placeholder="Description"/>
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
