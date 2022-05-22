import React from "react";
import "./styles.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import PeopleIcon from "@material-ui/icons/People";
import SearchIcon from '@material-ui/icons/Search';
import moment from "moment";
import { Box, IconButton, Slider } from "@mui/material";

// DATE PICKER COMPONENT
function Search({ setQuery, queryParams}) {
  const startDate = new Date(queryParams.startDate || new Date());
  const endDate = new Date(queryParams.endDate || new Date());
  const minPrice = queryParams.minPrice || 0;
  const maxPrice = queryParams.maxPrice || 100;
  const camp = queryParams.camp||""
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSearch = (e) =>{
    setQuery({
      ...queryParams,
      camp: e.target.value
    })
  }

  const handleSelect = (ranges)=>{
    setQuery({
      ...queryParams,
      startDate: moment(ranges.selection.startDate).format("YYYY-MM-DD"),
      endDate: moment(ranges.selection.endDate).format("YYYY-MM-DD"),
    });
  }

  const handleChange = (event, newValue) => {
    setQuery({
      ...queryParams,
      minPrice : 0,
      maxPrice : newValue
    })
  };
  const marks =[
    {
      value: 0,
      label: "0",
    },
    {
      value: 500,
      label: '500',
    },
  ]
  console.log("Search", "queryParams", queryParams);
  return (
    <div className="search">
      <div className="input_search">
                <input type="text" placeholder="Search" value={camp} onChange={(e)=>handleSearch(e)}/>
                <IconButton style={{background:"#07A4B5", color:'white'}}>
                    <SearchIcon />
                </IconButton>
            </div>
      <DateRange
      className="date_range"
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
      />
      <h3>
        Number of guests 
        <input min={0} defaultValue={2} type="number" className="num_guests"/>
        <PeopleIcon />
      </h3>
      <h3 style={{alignItems:"flex-start"}}>Price 
      <Box sx={{ width: 200, margin: "auto"}}>
      <Slider 
      value={maxPrice}
      aria-label="Default" 
      valueLabelDisplay="auto" 
      marks={marks}
      onChange={handleChange}
      max="500"
      sx={{color:"#07A4B5" }}
      />
    </Box></h3>
    </div>
  );
}

export default Search;
