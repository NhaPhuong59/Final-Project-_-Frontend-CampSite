import { LoadingButton } from '@mui/lab'
import { Container, Paper, Stack } from '@mui/material'
import React from 'react'
import { FormProvider, FTextField } from './form'
import FTextarea from './form/FTextarea'
import ImageUploaded from './ImageUploaded'

function FormCreateCamp({methods,onSubmit,handleSubmit,handleImageChange,displayImages,handleDeleteImage}) {
  return (
    <Container maxWidth="md" sx={{ background: "#fff", padding: "5rem" }}>
      <Paper>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField name="title" label="Name Place" size="small" />
            <FTextField name="addressText" label="Address" size="small" />
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
            <ImageUploaded
              images={displayImages}
              handleDeleteImage={handleDeleteImage}
            />
            <FTextField name="addressUrl" label="Location Url" size="small" />

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
              sx={{ background: "#ffb95e" }}
            >
              Submit
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Paper>
    </Container>
  )
}

export default FormCreateCamp