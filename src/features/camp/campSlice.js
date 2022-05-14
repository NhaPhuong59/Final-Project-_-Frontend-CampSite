import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../utils/apiService";
import _pick from "lodash/pick";

const initialState = {
  isLoading: false,
  error: null,
  camps: [],
};

const slice = createSlice({
  name: "camp",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getListCampSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.camps = action.payload;
    },
    createCampSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default slice.reducer;

export const getListCamp = (payload) => async (dispatch) => {
  console.log("getListCamp", "action", payload);
  const params = _pick(payload, "startDate", "endDate", "limit", "page");
  console.log('params', params)
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/camps", { params });
    dispatch(slice.actions.getListCampSuccess(response.data.data.searchList));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createCamp =
  ({ dataCreated }) =>
  async (dispatch) => {
    console.log("dataCreated", dataCreated);
    dispatch(slice.actions.startLoading());
    try {
      await apiService.post("/camps", dataCreated);
      dispatch(slice.actions.createCampSuccess());
      toast.success("Create successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
