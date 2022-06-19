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

// export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
//   cartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity * cartItem.price,
//     0
//   )
// );

// export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
//   cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
// );
