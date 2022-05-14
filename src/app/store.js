import {configureStore, combineReducers} from "@reduxjs/toolkit"
import campReducer from "../features/camp/campSlice"
const rootReducer = combineReducers({
    camp : campReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store 