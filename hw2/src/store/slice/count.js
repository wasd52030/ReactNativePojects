import { createSlice } from "@reduxjs/toolkit";

const count = createSlice({
    name: "count",
    initialState: {
        count: 0
    },
    reducers: {
        add(state) {
            state.count++
        },
        sub(state) {
            state.count--
        }
    }
})

export default count.reducer
export const countActions = count.actions