import React, { useState, useEffect } from "react";
import "./styles.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { Button } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import SearchIcon from '@material-ui/icons/Search';
import moment from "moment";
import { Divider, IconButton } from "@mui/material";

// DATE PICKER COMPONENT
function Search({ setQuery, queryParams, handleSearch }) {
  const startDate = new Date(queryParams.startDate || new Date());
  const endDate = new Date(queryParams.endDate || new Date());
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  console.log("selectionRange", selectionRange);
  function handleSelect(ranges) {
    setQuery({
      ...queryParams,
      startDate: moment(ranges.selection.startDate).format("YYYY-MM-DD"),
      endDate: moment(ranges.selection.endDate).format("YYYY-MM-DD"),
    });
  }
  console.log("Search", "queryParams", queryParams);
  return (
    <div className="search">
      <div className="input_search">
                <input type="text" placeholder="Search"/>
                <IconButton style={{background:"#e55039", color:'white'}}>
                    <SearchIcon />
                </IconButton>
            </div>
      <DateRange
      className="date_range"
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
        // showPreview={false}
        shownDate={false}
      />
      <h3>
        Number of guests 
        <input min={0} defaultValue={2} type="number" className="num_guests"/>
        <PeopleIcon />
      </h3>
      {/* <input min={0} defaultValue={2} type="number" className="input" /> */}
      <button className="search_btn" onClick={handleSearch}>
        Search Camp
      </button>
    </div>
  );
}

export default Search;
