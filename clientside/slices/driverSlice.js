import { createSlice } from "@reduxjs/toolkit";

//initialising
const initialState = {
    registration: null,
    capacity: null,
}

//slice
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


//allows us to import to other pages
export default driverSlice.reducer;