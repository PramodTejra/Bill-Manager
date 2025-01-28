import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "../features/billsSlice";

const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
});

export default store;
