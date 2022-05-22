import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../utils/apiService";
import _pick from "lodash/pick";

const initialState = {
  isLoading: false,
  error: null,
  camps: [],
  totalPage:"",
  detailCamp: {
    title: "",
    images: [],
    address: {
      addressUrl: "",
      addressText: "",
    },
    description: "",
    rating: "",
  }
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
      state.camps = action.payload.searchList;
      state.totalPage = action.payload.totalPage;
    },
    createCampSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getDetailCampSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.detailCamp = action.payload
    },
    updateCampSuccess(state,action) {
      state.isLoading = false;
      state.error = null;
    },
    getCampOnwSuccess(state,action){
      state.isLoading = false;
      state.error = null;
      state.camps = action.payload
    }
  },
});

export default slice.reducer;

export const getListCamp = (payload) => async (dispatch) => {
  console.log("getListCamp", "action", payload);
  const params = _pick(payload, "startDate", "endDate", "limit", "page", "camp", "maxPrice", "minPrice");
  console.log('params', params)
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/camps", { params });
    dispatch(slice.actions.getListCampSuccess(response.data.data));
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

export const getDetailCamp = ({campId}) => async (dispatch)=>{
  console.log(campId.id)
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/camps/camp/${campId.id}`)
    console.log("response",response.data)
    dispatch(slice.actions.getDetailCampSuccess(response.data.camp))
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}

export const updateCamp = ({dataUpdate, id})=>async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.put("/camps", {dataUpdate, id});
    dispatch(slice.actions.updateCampSuccess());
    toast.success("Update successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}

export const getCampOnw= ({authorId})=> async(dispatch)=>{
  dispatch(slice.actions.startLoading());
  try {
    const res = await apiService(`/camps/author/${authorId.id}`)
    console.log("getCampOnw",res.data.data )
    dispatch(slice.actions.getCampOnwSuccess(res.data.data))
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}