import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInfomration: null
}

export const sessionSlice = createSlice({
    name: "session", 
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.setTravelTimeInformation = action.payload
        }
    }
});

export const { setOrigin, setDestination, 
    setTravelTimeInformation } = sessionSlice.actions;

// Selectors
export const selectOrigin = (state) => state.session.origin;
export const selectDestination = (state) => state.session.destination;
export const selectTravelTimeInfomration = (state) => state.session.travelTimeInfomration;

export default sessionSlice.reducer;
