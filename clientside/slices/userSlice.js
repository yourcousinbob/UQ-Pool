import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sid: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    authentication_token: null,
}

export const userSlice = createSlice({
    name: "profile", 
    initialState,
    reducers: {
        setSID: (state, action) => {
            state.sid = action.payload;
        },
        setFirst: (state, action) => {
            state.first_name = action.payload;
        },
        setLast: (state, action) => {
            state.last_name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setAuthentication: (state, action) => {
            state.authentication_token = action.payload;
        }
    }
});

export const { setSID, setFirst, 
    setLast, setEmail, setPhone, setAuthentication} = userSlice.actions;

// Selectors
export const selectSID = (state) => state.user.sid;
export const selectFirst = (state) => state.user.first_name;
export const selectLast = (state) => state.user.last_name;
export const selectEmail = (state) => state.user.email;
export const selectPhone = (state) => state.user.phone;
export const selectAuthentication = (state) => state.user.authentication_token;

export default userSlice.reducer;
