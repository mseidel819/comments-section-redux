import { COMMENTS_ACTION_TYPES } from "./comments.types";

const INITIAL_STATE = {
  comments: null,
};

export const commentsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENTS_ACTION_TYPES.SET_COMMENTS:
      return { ...state, comments: payload };
    default:
      return state;
  }
};
