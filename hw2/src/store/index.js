import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slice/count";
import count2Reducer from "./slice/count2";

const store = configureStore({
    reducer: {
        count: countReducer,
        count2: count2Reducer
    }
})

export default store