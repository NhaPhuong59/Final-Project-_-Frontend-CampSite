import React, { useState, useEffect } from "react";
import "./styles.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Button } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import _get from "lodash/get";
import moment from "moment";

// DATE PICKER COMPONENT
function Search({ setQuery, queryParams, handleSearch }) {
  const startDate = new Date(_get(queryParams, "startDate", new Date()))
  const endDate = new Date(_get(queryParams, "endDate", new Date()))
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setQuery({ 
        ...queryParams, 
        startDate: moment(ranges.selection.startDate).format('YYYY-MM-DD'), 
        endDate: moment(ranges.selection.endDate).format('YYYY-MM-DD'),
    });
  }
  console.log('Search', 'queryParams', queryParams);
  return (
    <div className="search">
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <h2>
        Number of guests <PeopleIcon />
      </h2>
      <input min={0} defaultValue={2} type="number" className="input" />
      <button className="search_btn" onClick={handleSearch}>
        Search Camp
      </button>
    </div>
  );
}

export default Search;
