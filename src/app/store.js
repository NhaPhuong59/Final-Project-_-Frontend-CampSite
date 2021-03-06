import {configureStore, combineReducers} from "@reduxjs/toolkit"
import campReducer from "../features/camp/campSlice"
import bookingReducer from "../features/booking/bookingSlice"
import ratingReducer from "../features/rating/ratingSlice"

const rootReducer = combineReducers({
    camp : campReducer,
    booking: bookingReducer,
    rating: ratingReducer
})

const store = configureStore({
    reducer: rootReducer,
})

export default store 