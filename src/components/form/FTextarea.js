import { useFormContext, Controller } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";

function FTextarea({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextareaAutosize
          {...field}
          fullWidth
          maxRows={100}
          minRows={10}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default FTextarea;
