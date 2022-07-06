// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// import relevant dependencies
import { createStore } from "redux";
import rootReducer from "./reducers";

// initial state
let initialState = {};

// creating redux store
const store = createStore(rootReducer, initialState);
export default store;
