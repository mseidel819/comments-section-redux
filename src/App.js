import JobData from "./data.json";
import { ModalBox, ModalCancelButton, ModalDeleteButton } from "./App.styles";
import { Container, Grid, Modal } from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Reply from "./components/reply-card/reply-card.component";
import CommentCard from "./components/comment-card/comment-card.component";
import { setCurrentUser } from "./store/currentUser/currentUser.action";
import { selectCurrentUser } from "./store/currentUser/currentUser.selector";

function App() {
  const dispatch = useDispatch();
  // const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);
  const [replyTo, setReplyTo] = useState("");

  const modalToggler = (id, replyingTo) => {
    setModalOpen(!modalOpen);
    setDeleteId(id);
    setReplyTo(replyingTo);
  };

  useEffect(() => {
    // setCurrentUser(JobData.currentUser);
    dispatch(setCurrentUser(JobData.currentUser));
    setComments(JobData.comments);
  }, []);

  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);

  ///////
  const increaseScore = (commentId) => {
    const newComments = comments.map((comment) => {
      return comment.id === commentId
        ? { ...comment, score: comment.score + 1 }
        : comment;
    });
    setComments(newComments);
  };

  ////////
  const decreaseScore = (commentId) => {
    const newComments = comments.map((comment) => {
      return comment.id === commentId
        ? { ...comment, score: comment.score - 1 }
        : comment;
    });

    setComments(newComments);
  };

  /////////
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

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);
  };

  ////////////
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

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);
  };

  //////////
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

    setComments([...comments, newComment]);
    setCommentId(commentId + 1);
  };

  //////////////
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

  ////////////
  const removeCommentHandler = (currentId) => {
    const filteredComments = comments.filter((comment) => {
      return comment.id !== currentId;
    });

    setComments(filteredComments);
  };

  /////////////
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
  /////////////////
  const editCommentHandler = (content, user) => {
    const newComment = {
      ...user,
      content: content,
    };

    const targetComment = comments.find((comment) => comment.id === user.id);

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      newComment,
    ]);
  };
  /////////////////
  const editReplyHandler = (content, user, currentUser) => {
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

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);
  };
  ///////////////////////////////////////////////
  /////JSX
  ////////////////////////////////////////////////
  return (
    <>
      <Container role="main" maxWidth="md" sx={{ marginTop: "64px" }}>
        {comments
          .sort((a, b) => {
            return b.score - a.score;
          })
          .map((user) => (
            <div key={user.id}>
              <CommentCard
                // removeCommentHandler={removeCommentHandler}
                currentUser={currentUser}
                user={user}
                increaseScore={increaseScore}
                decreaseScore={decreaseScore}
                addCommentHandler={addCommentHandler}
                addReplyHandler={addReplyHandler}
                editCommentHandler={editCommentHandler}
                editReplyHandler={editReplyHandler}
                mainOrSub="main"
                modalToggler={modalToggler}
              />
              {user.replies.length ? (
                <Grid container>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      borderLeft: "2px solid #E9EBF0",
                      transform: "translate(50%, -10px)",
                    }}
                  ></Grid>
                  <Grid item xs={11}>
                    {user.replies
                      .sort((a, b) => {
                        return a.id - b.id;
                      })
                      .map((reply) => (
                        <CommentCard
                          // removeCommentHandler={removeReplyHandler}
                          currentUser={currentUser}
                          user={reply}
                          increaseScore={increaseScoreReply}
                          decreaseScore={decreaseScoreReply}
                          addCommentHandler={addCommentHandler}
                          addReplyHandler={addReplyHandler}
                          editReplyHandler={editReplyHandler}
                          modalToggler={modalToggler}
                          mainOrSub="sub"
                          key={`reply${reply.id}`}
                        />
                      ))}
                  </Grid>
                </Grid>
              ) : null}
            </div>
          ))}

        <Reply
          user={currentUser}
          addHandler={addCommentHandler}
          sendReply="Send"
        />
        {/* <footer>
          Challenge by &nbsp;
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by &nbsp;
          <a href="https://seidelmatt.com/" target="_blank" rel="noreferrer">
            Matt Seidel
          </a>
          .
        </footer> */}
      </Container>
      <Modal
        open={modalOpen}
        onClose={modalToggler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <h2>Delete comment</h2>
          <Grid container item xs={11}>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can’t be undone.
            </p>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item container justifyContent="center" xs={6}>
              <ModalCancelButton aria-label="cancel" onClick={modalToggler}>
                No, cancel
              </ModalCancelButton>
            </Grid>
            <Grid item container justifyContent="center" xs={6}>
              <ModalDeleteButton
                aria-label="delete"
                onClick={() => {
                  replyTo
                    ? removeReplyHandler(deleteId)
                    : removeCommentHandler(deleteId);
                  modalToggler();
                }}
              >
                yes, delete
              </ModalDeleteButton>
            </Grid>
          </Grid>
        </ModalBox>
      </Modal>
      <footer>
        Challenge by &nbsp;
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by &nbsp;
        <a href="https://seidelmatt.com/" target="_blank" rel="noreferrer">
          Matt Seidel
        </a>
        .
      </footer>
    </>
  );
}

export default App;
