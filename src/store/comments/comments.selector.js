import { createSelector } from "reselect";

const selectCommentsReducer = (state) => state.comments;

export const selectCommentId = createSelector(
  [selectCommentsReducer],
  (comments) => comments.commentsId
);

export const selectComments = createSelector(
  [selectCommentsReducer],
  (comments) => comments.comments
);
