import { COMMENTS_ACTION_TYPES } from "./comments.types";
import { createAction } from "../../utils/reducer.utils";

//////////////////////////////////////////////////////////////////////////////////
const addCommentIdSetter = (commentId) => {
  const added = commentId + 1;
  return added;
};
export const addOneToId = (commentId) => {
  const added = addCommentIdSetter(commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS_ID, added);
};
//////////////////////////////////////////////////////////////////////////////////
const increaseScore = (comments, commentId) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score + 1 }
      : comment;
  });
  return newComments;
};

export const scoreIncreased = (comments, commentId) => {
  const newScore = increaseScore(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};
//////////////////////////////////////////////////////////////////////////////////
const decreaseScore = (comments, commentId) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score - 1 }
      : comment;
  });

  return newComments;
};

export const scoreDecreased = (comments, commentId) => {
  const newScore = decreaseScore(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};

//////////////////////////////////////////////////////////////////////////////////

const increaseScoreReply = (comments, replyId) => {
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

export const scoreIncreasedReply = (comments, commentId) => {
  const newScore = increaseScoreReply(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};
//////////////////////////////////////////////////////////////////////////////////
const decreaseScoreReply = (comments, replyId) => {
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

export const scoreDecreasedReply = (comments, commentId) => {
  const newScore = decreaseScoreReply(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};
//////////////////////////////////////////////////////////////////////////////////
const addComment = (comments, commentId, content, user) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedMin = minute < 10 ? "0" + minute : minute;

  const newComment = {
    content: content,
    createdAt: `${month + 1}/${day}/${year} at ${hour}:${formattedMin}`,
    id: commentId,
    replies: [],
    score: 0,
    user: user,
  };

  return [...comments, newComment];
};
export const addToComments = (comments, commentId, content, user) => {
  const newComment = addComment(comments, commentId, content, user);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newComment);
};
//////////////////////////////////////////////////////////////////////////////////
const addReply = (comments, commentId, content, user, currentUser) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedMin = minute < 10 ? "0" + minute : minute;

  const newComment = {
    content: content,
    createdAt: `${month + 1}/${day}/${year} at ${hour}:${formattedMin}`,
    id: commentId,
    replyingTo: user.user.username,
    score: 0,
    user: currentUser,
  };

  if (user.replies) {
    const targetComment = comments.find((comment) => comment.id === user.id);
    targetComment.replies.push(newComment);
    return [
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ];
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

    return [
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ];
  }
};

export const addToReply = (comments, commentId, content, user, currentUser) => {
  const newComment = addReply(comments, commentId, content, user, currentUser);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newComment);
};
//////////////////////////////////////////////////////////////////////////////////
const removeComment = (comments, currentId) => {
  const filteredComments = comments.filter((comment) => {
    return comment.id !== currentId;
  });

  return filteredComments;
};

export const commentRemoved = (comments, currentId) => {
  const removed = removeComment(comments, currentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, removed);
};

//////////////////////////////////////////////////////////////////////////////////
const removeReply = (comments, replyId) => {
  let targetComment = comments.find((comment) =>
    comment.replies.find((reply) => reply.id === replyId)
  );

  targetComment = {
    ...targetComment,
    replies: targetComment.replies.filter((reply) => reply.id !== replyId),
  };

  return [
    ...comments.filter((comment) => comment.id !== targetComment.id),
    targetComment,
  ];
};

export const replyRemoved = (comments, replyId) => {
  const removed = removeReply(comments, replyId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, removed);
};
//////////////////////////////////////////////////////////////////////////////////
const editComment = (comments, content, user) => {
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

export const commentEdited = (comments, content, user) => {
  const edit = editComment(comments, content, user);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, edit);
};
//////////////////////////////////////////////////////////////////////////////////
const editReply = (comments, content, user) => {
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

export const replyEdited = (comments, content, user) => {
  const edit = editReply(comments, content, user);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, edit);
};
//////////////////////////////////////////////////////////////////////////////////
export const setComments = (comments) =>
  createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, comments);
//////////////////////////////////////////////////////////////////////////////////
