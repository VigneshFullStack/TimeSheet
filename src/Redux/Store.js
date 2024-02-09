import { combineReducers } from "redux";
import { TaskReducer } from "./Reducer";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const rootReducer = combineReducers({ task: TaskReducer });
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
export default store;
