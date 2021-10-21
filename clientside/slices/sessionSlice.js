import { createSlice } from "@reduxjs/toolkit";
import { UserStatus } from "../enums/UserStatus";

const initialState = {
    origin: null,
    destination: null,
    location: null,
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
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setDriver: (state, action) => {
            state.driver = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setOrigin, setDestination, setLocation,
    setTravelTimeInformation, setDriver, setStatus } = sessionSlice.actions;

// Selectors
export const selectOrigin = (state) => state.session.origin;
export const selectDestination = (state) => state.session.destination;
export const selectLocation = (state) => state.session.location;
export const selectTravelTimeInformation = (state) => state.session.travelTimeInformation;
export const selectDriver = (state) => state.session.driver;
export const selectStatus = (state) => state.session.driver;

export default sessionSlice.reducer;
