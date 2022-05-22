import React, { useState } from "react";
import {
  Stack,
  Alert,
  Container,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import {  FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import apiService from "../../utils/apiService";
import { Box } from "@mui/system";

const ResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};

function UserResetPassword() {
    const [success, setSuccess] = useState("");

  const methods = useForm({
    resolver: yupResolver(ResetSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { email} = data;
    try {
      const res = await apiService.post("/users/reset", {email: email})
       setSuccess(res.data.success)
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
      <React.Fragment>
     {!success? (
    <Box sx={{background:"#ffb95e", height:"80vh"}} >
        <Container maxWidth="xs" sx={{background:"#fff", padding:"5rem"}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} mb={3}>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}
            <Alert severity="info">
            Enter your email to get new password
              
            </Alert>
  
            <FTextField name="email" label="Email address" />
          </Stack>
  
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{background:"#07A4B5"}}
          >
            Next
          </LoadingButton>
        </FormProvider>
      </Container>
      </Box>
     ):(
         <Container maxWidth="md">
         <Typography variant="h6" color="#1e90ff" align="center">{success}</Typography>
         </Container>
     )}
    </React.Fragment>
  );
}

export default UserResetPassword;
