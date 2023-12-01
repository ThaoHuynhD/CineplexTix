import { combineReducers, createStore } from "redux";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers(
    {
        cartReducer: cartReducer,
        userReducer: cartReducer,
    })
export const store = createStore(rootReducer);