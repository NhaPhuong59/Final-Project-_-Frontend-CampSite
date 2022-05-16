import {configureStore, combineReducers} from "@reduxjs/toolkit"
import campReducer from "../features/camp/campSlice"
import bookingReducer from "../features/booking/bookingSlice"
const rootReducer = combineReducers({
    camp : campReducer,
    booking: bookingReducer
})

const store = configureStore({
    reducer: rootReducer,
})

export default store 