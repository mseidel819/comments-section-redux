import { USER_ACTION_TYPES } from "./currentUser.types";
import { createAction } from "../../utils/reducer.utils.js";
import { User } from "../../types";

export const setCurrentUser = (user: User) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
