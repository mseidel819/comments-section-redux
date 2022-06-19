import { createSelector } from "reselect";

// export const selectComments = (state) => state.comments;

const selectCommentsReducer = (state) => state.comments;

export const selectCommentId = createSelector(
  [selectCommentsReducer],
  (comments) => comments.commentId
);

export const selectComments = createSelector(
  [selectCommentsReducer],
  (comments) => comments.comments
);
