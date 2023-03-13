import { combineReducers } from "redux";

import { userReducer } from "./currentUser/currentUser.reducer";
import { commentsReducer } from "./comments/comments.reducer";

export const rootReducer = combineReducers({
  currentUser: userReducer,
  comments: commentsReducer,
});
