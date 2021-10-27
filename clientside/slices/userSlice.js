import { createSlice } from "@reduxjs/toolkit";

//initialising
const initialState = {
    sid: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    authentication_token: null,
    profile_image: null,
    tokens: 0,
};

//slicing
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
        },
        setTokens: (state, action) => {
            state.tokens = action.payload;
        },
        setProfileImage: (state, action) => {
            state.profile_image = action.payload;
        },
        clearAuthentication: (state) => {
            state.authentication_token = null;
        }
    }
});

export const { setSID, setFirst, clearAuthentication,
    setLast, setEmail, setPhone, setAuthentication, setTokens, setProfileImage} = userSlice.actions;

// Selectors
export const selectSID = (state) => state.user.sid;
export const selectFirst = (state) => state.user.first_name;
export const selectLast = (state) => state.user.last_name;
export const selectEmail = (state) => state.user.email;
export const selectPhone = (state) => state.user.phone;
export const selectAuthentication = (state) => state.user.authentication_token;
export const selectTokens = (state) => state.user.tokens;
export const selectProfileImage = (state) => state.user.profile_image;

//allows us to import to other pages
export default userSlice.reducer;
