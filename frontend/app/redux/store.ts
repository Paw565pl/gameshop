import { configureStore } from "@reduxjs/toolkit";
import gameQueryReducer from "./gameQuerySlice";

const store = configureStore({
  reducer: {
    gameQuery: gameQueryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
