// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Import relevant dependencies.
import { createStore } from "redux";
import rootReducer from "./reducers";
// Initial state.
let initialState = {};
// Creating redux store.
const store = createStore(rootReducer, initialState);
export default store;
