import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/sessionSlice";
import userReducer from "./slices/userSlice"

//Reducer for our rewards page
export const store = configureStore({
    reducer: {
        session: sessionReducer,
        user: userReducer,
    }
})
