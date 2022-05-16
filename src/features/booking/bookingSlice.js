import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../utils/apiService";
import _pick from "lodash/pick";

const initialState = {
    isLoading : false,
    error: null,
    bookingList: []
}

const slice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
          },
      
          hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },
          createBookingSuccess(state, action) {
              state.isLoading = false;
              state.error = null;
          }
    }
})

export default slice.reducer;

export const createBooking = ({campId, bookingInfo}) => async (dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
        await apiService.post(`/booking/${campId.id}`, bookingInfo)
        dispatch(slice.actions.createBookingSuccess());
        toast.success("Your booking successfully")
          
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
}