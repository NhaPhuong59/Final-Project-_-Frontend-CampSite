import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@mui/material";
import Helper from "../../utils/Helper";

function FImageUpload({ name, ...other }) {
  const { control } = useFormContext();
  // const handleImageChange = (event) => {
  //   console.log("handleImageChange", event.target.files[0]);
  //   Helper.uploadImage(event.target.files[0]);
  // };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
       
        
          <Input
            accept=".png, .jpg, .jpeg, .bmp"
            multiple
            type="file"
            // onChange={handleImageChange}
            {...field}
            {...other}
          />
          // {error && <div>{error}</div>}
      
        
      )}
    />
  );
}

export default FImageUpload;
