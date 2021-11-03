import usersSlice from "./usersSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
