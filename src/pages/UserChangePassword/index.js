import React, { useState } from "react";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate, useParams } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import apiService from "../../utils/apiService";

const ResetPassSchema = Yup.object().shape({
  newPassword: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const defaultValues = {
  newPassword: "",
  passwordConfirmation: "",
};

function UserChangePassword() {
  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(ResetPassSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { newPassword } = data;
    try {
      const response = await apiService.put(`/users/reset/${params.token}`, {
        newPassword,
      });
      const { email } = response.data.data;

      if (email) {
        try {
           await auth.login(
            { email, password: newPassword },
            (user) => {
              if (user.role === "user") {
                navigate("/", { replace: true });
              } else if (user.role === "partner") {
                navigate(`/partner/${user._id}`, { replace: true });
              }
            }
          );
        } catch (error) {
          reset();
          setError("responseError", error);
        }
      }
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Box sx={{ background: "#ffb95e", height: "80vh" }}>
      <Container maxWidth="xs" sx={{ background: "#fff", padding: "5rem" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}
            <Alert severity="info">Enter your new password</Alert>

            <FTextField
              name="newPassword"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              name="passwordConfirmation"
              label="Password Confirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                      edge="end"
                    >
                      {showPasswordConfirmation ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ background: "#07A4B5" }}
            >
              Change Password
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </Box>
  );
}

export default UserChangePassword;
