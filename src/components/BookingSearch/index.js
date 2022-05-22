import React from 'react'
import { DateRange } from "react-date-range";
import PeopleIcon from "@material-ui/icons/People";
import "./styles.scss"

function BookingSearch({selectionRange,handleSelect,bookedDatesList,handleChangeGuestNum,detailCamp,numNightsBooked,setOpen}) {
  return (
    <div className="search_detail">
              <DateRange
                className="date_range"
                ranges={[selectionRange]}
                onChange={handleSelect}
                minDate={new Date()}
                disabledDates={bookedDatesList}
              />
              <h3>
                Number of guests
                <input
                  min={0}
                  defaultValue={2}
                  type="number"
                  className="num_guests"
                  onChange={(e) => handleChangeGuestNum(e)}
                />
                <PeopleIcon />
              </h3>
              <div className="total_price">
                <h3>
                  Total
                  <div>
                    $ {detailCamp.price} x{" "}
                    {numNightsBooked === 1
                      ? "1 night"
                      : `${numNightsBooked} nights`}
                  </div>
                  <div>= $ {parseInt(detailCamp.price) * numNightsBooked}</div>
                </h3>
              </div>
              <button className="search_btn" onClick={() => setOpen(true)}>
                Book
              </button>
            </div>
  )
}

export default BookingSearch