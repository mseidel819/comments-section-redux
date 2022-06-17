import { combineReducers } from "redux";

import { userReducer } from "./currentUser/currentUser.reducer";
// import { categoriesReducer } from './categories/category.reducer';
// import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  currentUser: userReducer,
  // comments: categoriesReducer,
});
