import { COMMENTS_ACTION_TYPES } from "./comments.types";

const INITIAL_STATE = {
  comments: null,
  commentsId: 5,
};

export const commentsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENTS_ACTION_TYPES.SET_COMMENTS:
      return { ...state, comments: payload };
    case COMMENTS_ACTION_TYPES.SET_COMMENTS_ID:
      return { ...state, commentsId: payload };
    default:
      return state;
  }
};
