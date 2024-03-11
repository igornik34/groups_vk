import { configureStore } from "@reduxjs/toolkit";
import groupsSlice from "./groups.slice";

export const store = configureStore({
    reducer: {
        groups: groupsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch