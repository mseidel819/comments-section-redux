import { COMMENTS_ACTION_TYPES } from "./comments.types";
import { createAction } from "../../utils/reducer.utils";

///setup here. need to move [commentId] hook to this store

const increaseScore = (commentId) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score + 1 }
      : comment;
  });
  return newComments;
};
//////////////////////////////////////////////////////////////////////////////////
const decreaseScore = (commentId) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score - 1 }
      : comment;
  });

  return newComments;
};
//////////////////////////////////////////////////////////////////////////////////

const increaseScoreReply = (replyId) => {
  let targetComment = comments.find((comment) =>
    comment.replies.find((reply) => reply.id === replyId)
  );

  targetComment = {
    ...targetComment,
    replies: targetComment.replies.map((comment) => {
      return comment.id === replyId
        ? { ...comment, score: comment.score + 1 }
        : comment;
    }),
  };

  return [
    ...comments.filter((comment) => comment.id !== targetComment.id),
    targetComment,
  ];
};
//////////////////////////////////////////////////////////////////////////////////
const decreaseScoreReply = (replyId) => {
  let targetComment = comments.find((comment) =>
    comment.replies.find((reply) => reply.id === replyId)
  );

  targetComment = {
    ...targetComment,
    replies: targetComment.replies.map((comment) => {
      return comment.id === replyId
        ? { ...comment, score: comment.score - 1 }
        : comment;
    }),
  };

  return [
    ...comments.filter((comment) => comment.id !== targetComment.id),
    targetComment,
  ];
};

//////////////////////////////////////////////////////////////////////////////////
const addCommentHandler = (content, user) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const newComment = {
    content: content,
    createdAt: `${month}/${day}/${year} at ${hour}:${minute}`,
    id: commentId,
    replies: [],
    score: 0,
    user: user,
  };

  return [...comments, newComment];
  setCommentId(commentId + 1);
};

//////////////////////////////////////////////////////////////////////////////////
const addReplyHandler = (content, user, currentUser) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const newComment = {
    content: content,
    createdAt: `${month}/${day}/${year} at ${hour}:${minute}`,
    id: commentId,
    replyingTo: user.user.username,
    score: 0,
    user: currentUser,
  };

  if (user.replies) {
    const targetComment = comments.find((comment) => comment.id === user.id);
    targetComment.replies.push(newComment);
    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);

    setCommentId(commentId + 1);
  }
  ///add function for if its already a reply. if !targetComment.replies
  if (user.replyingTo) {
    let targetComment = comments.find((comment) =>
      comment.replies.find((reply) => reply.id === user.id)
    );

    targetComment = {
      ...targetComment,
      replies: [...targetComment.replies, newComment],
    };

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);
  }
};

//////////////////////////////////////////////////////////////////////////////////
const removeCommentHandler = (currentId) => {
  const filteredComments = comments.filter((comment) => {
    return comment.id !== currentId;
  });

  setComments(filteredComments);
};

//////////////////////////////////////////////////////////////////////////////////
const removeReplyHandler = (replyId) => {
  let targetComment = comments.find((comment) =>
    comment.replies.find((reply) => reply.id === replyId)
  );

  targetComment = {
    ...targetComment,
    replies: targetComment.replies.filter((reply) => reply.id !== replyId),
  };

  setComments([
    ...comments.filter((comment) => comment.id !== targetComment.id),
    targetComment,
  ]);
};
//////////////////////////////////////////////////////////////////////////////////
const editCommentHandler = (content, user) => {
  const newComment = {
    ...user,
    content: content,
  };

  const targetComment = comments.find((comment) => comment.id === user.id);

  return [
    ...comments.filter((comment) => comment.id !== targetComment.id),
    newComment,
  ];
};
//////////////////////////////////////////////////////////////////////////////////
const editReplyHandler = (content, user) => {
  const newComment = {
    ...user,
    content: content,
  };

  let targetComment = comments.find((comment) =>
    comment.replies.find((reply) => reply.id === user.id)
  );

  targetComment = {
    ...targetComment,
    replies: [
      ...targetComment.replies.filter((reply) => reply.id !== user.id),
      newComment,
    ],
  };

  return [
    ...comments.filter((comment) => comment.id !== targetComment.id),
    targetComment,
  ];
};
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// const addCartItem = (cartItems, productToAdd) => {
//     const existingCartItem = cartItems.find(
//       (cartItem) => cartItem.id === productToAdd.id
//     );

//     if (existingCartItem) {
//       return cartItems.map((cartItem) =>
//         cartItem.id === productToAdd.id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       );
//     }

//     return [...cartItems, { ...productToAdd, quantity: 1 }];
//   };

//   const removeCartItem = (cartItems, cartItemToRemove) => {
//     // find the cart item to remove
//     const existingCartItem = cartItems.find(
//       (cartItem) => cartItem.id === cartItemToRemove.id
//     );

//     // check if quantity is equal to 1, if it is remove that item from the cart
//     if (existingCartItem.quantity === 1) {
//       return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//     }

//     // return back cartitems with matching cart item with reduced quantity
//     return cartItems.map((cartItem) =>
//       cartItem.id === cartItemToRemove.id
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//     );
//   };

//   const clearCartItem = (cartItems, cartItemToClear) =>
//     cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

//   export const addItemToCart = (cartItems, productToAdd) => {
//     const newCartItems = addCartItem(cartItems, productToAdd);
//     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
//   };

//   export const removeItemFromCart = (cartItems, cartItemToRemove) => {
//     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
//   };

//   export const clearItemFromCart = (cartItems, cartItemToClear) => {
//     const newCartItems = clearCartItem(cartItems, cartItemToClear);
//     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
//   };

//   export const setIsCartOpen = (boolean) =>
//     createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
