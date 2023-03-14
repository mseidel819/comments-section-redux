import { createSelector } from "reselect";
import { RootState } from "../store";

const selectCommentsReducer = (state: RootState) => state.comments;

export const selectCommentId = createSelector(
  [selectCommentsReducer],
  (comments) => comments.commentsId
);

export const selectComments = createSelector(
  [selectCommentsReducer],
  (comments) => comments.comments
);
