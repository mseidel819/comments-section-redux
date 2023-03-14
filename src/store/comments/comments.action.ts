import { COMMENTS_ACTION_TYPES } from "./comments.types";
import { createAction } from "../../utils/reducer.utils.js";
import { Comment, User } from "../../types";

//////////////////////////////////////////////////////////////////////////////////
const addCommentIdSetter = (commentId: number) => {
  const added = commentId + 1;
  return added;
};
export const addOneToId = (commentId: number) => {
  const added = addCommentIdSetter(commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS_ID, added);
};
//////////////////////////////////////////////////////////////////////////////////
const increaseScore = (comments: Comment[], commentId: number) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score + 1 }
      : comment;
  });
  return newComments;
};

export const scoreIncreased = (comments: Comment[], commentId: number) => {
  const newScore = increaseScore(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};
//////////////////////////////////////////////////////////////////////////////////
const decreaseScore = (comments: Comment[], commentId: number) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score - 1 }
      : comment;
  });

  return newComments;
};

export const scoreDecreased = (comments: Comment[], commentId: number) => {
  const newScore = decreaseScore(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};

//////////////////////////////////////////////////////////////////////////////////

const increaseScoreReply = (comments: Comment[], replyId: number) => {
  let targetComment = comments.find((comment) =>
    comment.replies?.find((reply) => reply.id === replyId)
  );

  if (targetComment) {
    targetComment = {
      ...targetComment,
      replies: targetComment.replies?.map((comment) => {
        return comment.id === replyId
          ? { ...comment, score: comment.score + 1 }
          : comment;
      }),
    };
  }

  return [
    ...comments.filter((comment) => comment.id !== targetComment?.id),
    targetComment,
  ];
};

export const scoreIncreasedReply = (comments: Comment[], commentId: number) => {
  const newScore = increaseScoreReply(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};
//////////////////////////////////////////////////////////////////////////////////
const decreaseScoreReply = (comments: Comment[], replyId: number) => {
  let targetComment = comments.find((comment) =>
    comment.replies?.find((reply) => reply.id === replyId)
  );

  if (targetComment) {
    targetComment = {
      ...targetComment,
      replies: targetComment.replies?.map((comment) => {
        return comment.id === replyId
          ? { ...comment, score: comment.score - 1 }
          : comment;
      }),
    };
  }

  return [
    ...comments.filter((comment) => comment.id !== targetComment?.id),
    targetComment,
  ];
};

export const scoreDecreasedReply = (comments: Comment[], commentId: number) => {
  const newScore = decreaseScoreReply(comments, commentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newScore);
};
//////////////////////////////////////////////////////////////////////////////////
const addComment = (
  comments: Comment[],
  commentId: number,
  content: string,
  user: User
) => {
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
export const addToComments = (
  comments: Comment[],
  commentId: number,
  content: string,
  user: User
) => {
  const newComment = addComment(comments, commentId, content, user);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newComment);
};
//////////////////////////////////////////////////////////////////////////////////
const addReply = (
  comments: Comment[],
  commentId: number,
  content: string,
  user: Comment,
  currentUser: User
) => {
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

  const targetComment = comments.find((comment) => comment.id === user.id);
  if (user.replies && targetComment) {
    targetComment.replies?.push(newComment);

    return [
      ...comments.filter((comment) => comment.id !== targetComment?.id),
      targetComment,
    ];
  }
  ///add function for if its already a reply. if !targetComment.replies
  if (user.replyingTo) {
    let targetComment = comments.find((comment) =>
      comment.replies?.find((reply) => reply.id === user.id)
    );

    if (targetComment && targetComment.replies) {
      targetComment = {
        ...targetComment,
        replies: [...targetComment.replies, newComment],
      };
    }

    return [
      ...comments.filter((comment) => comment.id !== targetComment?.id),
      targetComment,
    ];
  }
};

export const addToReply = (
  comments: Comment[],
  commentId: number,
  content: string,
  user: Comment,
  currentUser: User
) => {
  const newComment = addReply(comments, commentId, content, user, currentUser);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, newComment);
};
//////////////////////////////////////////////////////////////////////////////////
const removeComment = (comments: Comment[], currentId: number) => {
  const filteredComments = comments.filter((comment) => {
    return comment.id !== currentId;
  });

  return filteredComments;
};

export const commentRemoved = (comments: Comment[], currentId: number) => {
  const removed = removeComment(comments, currentId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, removed);
};

//////////////////////////////////////////////////////////////////////////////////
const removeReply = (comments: Comment[], replyId: number) => {
  let targetComment = comments.find((comment) =>
    comment.replies?.find((reply) => reply.id === replyId)
  );
  if (targetComment && targetComment.replies) {
    targetComment = {
      ...targetComment,
      replies: targetComment.replies.filter((reply) => reply.id !== replyId),
    };
  }
  // console.log(targetComment.id);
  return [
    ...comments.filter((comment) => comment.id !== targetComment?.id),
    targetComment,
  ];
};

export const replyRemoved = (comments: Comment[], replyId: number) => {
  const removed = removeReply(comments, replyId);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, removed);
};
//////////////////////////////////////////////////////////////////////////////////
const editComment = (comments: Comment[], content: string, user: Comment) => {
  const newComment = {
    ...user,
    content: content,
  };

  const targetComment = comments.find((comment) => comment.id === user.id);

  return [
    ...comments.filter((comment) => comment.id !== targetComment?.id),
    newComment,
  ];
};

export const commentEdited = (
  comments: Comment[],
  content: string,
  user: Comment
) => {
  const edit = editComment(comments, content, user);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, edit);
};
//////////////////////////////////////////////////////////////////////////////////
const editReply = (comments: Comment[], content: string, user: Comment) => {
  const newComment = {
    ...user,
    content: content,
  };

  let targetComment = comments.find((comment) =>
    comment.replies?.find((reply) => reply.id === user.id)
  );

  if (targetComment && targetComment.replies) {
    targetComment = {
      ...targetComment,
      replies: [
        ...targetComment.replies?.filter((reply) => reply.id !== user.id),
        newComment,
      ],
    };
  }

  return [
    ...comments.filter((comment) => comment.id !== targetComment?.id),
    targetComment,
  ];
};

export const replyEdited = (
  comments: Comment[],
  content: string,
  user: Comment
) => {
  const edit = editReply(comments, content, user);
  return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, edit);
};
//////////////////////////////////////////////////////////////////////////////////
export const setComments = (comments: Comment[]) =>
  createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, comments);
//////////////////////////////////////////////////////////////////////////////////
