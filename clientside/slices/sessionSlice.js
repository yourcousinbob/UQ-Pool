import { createSlice } from "@reduxjs/toolkit";
import { UserStatus } from "../enums/UserStatus";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    driver: null,
    status: UserStatus.Waiting
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
            state.setTravelTimeInformation = action.payload;
        },
        setDriver: (state, action) => {
            state.setDriver = action.payload;
        },
        setStatus: (state, action) => {
            state.setStatus = action.payload;
        }
    }
});

export const { setOrigin, setDestination, 
    setTravelTimeInformation, setDriver, setStatus } = sessionSlice.actions;

// Selectors
export const selectOrigin = (state) => state.session.origin;
export const selectDestination = (state) => state.session.destination;
export const selectTravelTimeInformation = (state) => state.session.travelTimeInformation;
export const selectDriver = (state) => state.session.driver;
export const selectStatus = (state) => state.session.driver;

export default sessionSlice.reducer;
