import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../utils/apiService";

const initialState = {
  isLoading: false,
  error: null,
  bookingList: [],
  success:""
};
console.log("error", initialState.error)
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
    createBookingSuccess(state,action) {
      state.isLoading = false;
      state.error = null;
      state.success= action.payload
    },
    confirmBookingSuccess(state) {
      state.isLoading = false;
      state.error = null},

      getAllBookingSuccess(state, action) {
        state.isLoading = false;
      state.error = null;
      state.bookingList= action.payload
      },
      getBookingComfirmSuccess(state, action){
        state.isLoading = false;
        state.error = null;
        state.bookingList= action.payload
      }
  },
});

export default slice.reducer;

export const createBooking =
  ({ campId, bookingInfo }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.post(`/booking/${campId.id}`, bookingInfo);
      dispatch(slice.actions.createBookingSuccess(res.data.success));
      toast.success("Your booking successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const confirmBooking =
  ({ token }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('confirmBooking', 'token', token)
      await apiService.put(`/booking/confirm/${token}`);
      dispatch(slice.actions.confirmBookingSuccess());
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.response.data.errors.message));
      console.log(error.response.data.errors.message)
      
      console.log("error", initialState.error)

      toast.error(error.message);
    }
  };

  export const getAllBooking = ({campId}) => async (dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
      console.log("campId frontend", campId)
      const res = await apiService.get(`/booking/allBooking/${campId.id}`)
      dispatch(slice.actions.getAllBookingSuccess(res.data.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  }

  export const getBookingSuccess = (campId) => async (dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.get(`/booking/bookingSuccess/${campId}`)
      dispatch(slice.actions.getBookingComfirmSuccess(res.data.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  }
  