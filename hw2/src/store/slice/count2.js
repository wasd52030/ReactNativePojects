import { createSlice } from "@reduxjs/toolkit";

const count2 = createSlice({
    name: "count2",
    initialState: {
        count2: 0
    },
    reducers: {
        add(state) {
            state.count2 += 2
        },
        sub(state) {
            state.count2 -= 2
        }
    }
})

export default count2.reducer
export const count2Actions = count2.actions