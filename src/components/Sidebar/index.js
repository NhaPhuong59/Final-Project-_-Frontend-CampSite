// import { Box } from '@mui/system'
// import React from 'react'

import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

// function Sidebar() {
//   return (
//     // <div sx={{ height: "200px"}}>
//         <Box backgroundColor= "#e55039" sx={{ height: "100vh", width:"100%"}}/>
//     // </div>
//   )
// }

// export default Sidebar
// import { DateRangePicker } from '@mui/x-date-pickers/DateRangePicker';
import * as React from 'react';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Sidebar() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    //   <Stack spacing={3}>
    //     <DesktopDatePicker
    //       label="Date desktop"
    //       inputFormat="MM/dd/yyyy"
    //       value={value}
    //       onChange={handleChange}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //     <MobileDatePicker
    //       label="Date mobile"
    //       inputFormat="MM/dd/yyyy"
    //       value={value}
    //       onChange={handleChange}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //     <TimePicker
    //       label="Time"
    //       value={value}
    //       onChange={handleChange}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //     <DateTimePicker
    //       label="Date&Time picker"
    //       value={value}
    //       onChange={handleChange}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //   </Stack>
    // </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Basic example"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
  );
}

