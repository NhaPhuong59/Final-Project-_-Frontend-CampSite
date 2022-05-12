import React, { useState } from "react";
import {
//   Link,
  Stack,
  Alert,
//   IconButton,
//   InputAdornment,
  Container,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FCheckbox, FormProvider, FTextField } from "../../components/form";
// import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import apiService from "../../utils/apiService";
import { Box } from "@mui/system";
// import userEvent from "@testing-library/user-event";

const ResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};

function UserResetPassword() {
    const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const auth = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

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
  console.log("hello1")

  const onSubmit = async (data) => {
    // const from = location.state?.from?.pathname || "/";
    let { email} = data;
    console.log("hello")
    try {
      console.log("hehehe")
      const res = await apiService.post("/users/reset", {email: email})
        console.log(res.data)
        console.log(res.data.success)
       setSuccess(res.data.success)
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
      <React.Fragment>
     {!success? (
        <Container maxWidth="xs">
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
          >
            Next
          </LoadingButton>
        </FormProvider>
      </Container>
     ):(
         <Container maxWidth="md">
         <Typography variant="h6" color="#1e90ff" align="center">{success}</Typography>
         </Container>
     )}
    </React.Fragment>
  );
}

export default UserResetPassword;
