import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registration: null,
    capacity: null,
}

export const driverSlice = createSlice({
    name: "driver", 
    initialState,
    reducers: {
        setRegistration: (state, action) => {
            state.registration = action.payload;
        },
        setCapacity: (state, action) => {
            state.capacity = action.payload;
        }
    }
});

export const { setRegistration, setCapacity } = driverSlice.actions;

// Selectors
export const selectRegistration = (state) => state.driver.registration;
export const selectCapacity = (state) => state.driver.capacity;


export default driverSlice.reducer;