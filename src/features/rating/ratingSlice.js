import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../utils/apiService";

const initialState = {
  isLoading: false,
  error: null,
  ratingList: []
};

const slice = createSlice({
    name: "rating",
    initialState,
    reducers: {
      startLoading(state) {
        state.isLoading = true;
      },
  
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
      createRatingSuccess(state,action){
        state.isLoading = false;
        state.error = null;
      },
      getRatingListSuccess(state, action){
        state.isLoading = false;
        state.error = null;
        state.ratingList = action.payload
      }
      
    }

})

export default slice.reducer;

export const createRating = ({newRating}) => async(dispatch) =>{
  dispatch(slice.actions.startLoading());
  try {
      await apiService.post("/rating", newRating )
    dispatch(slice.actions.createRatingSuccess())
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}

export const getRatingList = ({user}) => async(dispatch)=>{
  dispatch(slice.actions.startLoading());
  const userId = user._id
  try {
    const res = await apiService.get(`/rating/${userId}`)
    dispatch(slice.actions.getRatingListSuccess(res.data.data))
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}