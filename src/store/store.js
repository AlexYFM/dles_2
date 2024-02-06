import { configureStore } from "@reduxjs/toolkit";
import gameSliceReducer from "./gameSlice";

const store = configureStore({
    reducer: gameSliceReducer, // if i add anymore reducers, need to put them all in an object and change the way I use useSelector
})

export default store