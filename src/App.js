import JobData from "./data.json";
import { ModalBox, ModalCancelButton, ModalDeleteButton } from "./App.styles";
import { Container, Grid, Modal } from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Reply from "./components/reply-card/reply-card.component";
import CommentCard from "./components/comment-card/comment-card.component";
import { setCurrentUser } from "./store/currentUser/currentUser.action";
import { commentRemoved, replyRemoved } from "./store/comments/comments.action";
// import { selectCurrentUser } from "./store/currentUser/currentUser.selector";
import { selectComments } from "./store/comments/comments.selector";
import { setComments } from "./store/comments/comments.action";

function App() {
  const dispatch = useDispatch();
  // const [comments, setComments] = useState([]);
  // const [commentId, setCommentId] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);
  const [replyTo, setReplyTo] = useState("");

  const modalToggler = (id, replyingTo) => {
    setModalOpen(!modalOpen);
    setDeleteId(id);
    setReplyTo(replyingTo);
  };

  useEffect(() => {
    dispatch(setCurrentUser(JobData.currentUser));
    dispatch(setComments(JobData.comments));
    // setComments(JobData.comments);
  }, []);

  const comments = useSelector(selectComments);
  console.log(comments);

  const removeReplyHandler = () => dispatch(replyRemoved(deleteId));
  const removeCommentHandler = () => dispatch(commentRemoved(deleteId));

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
                // currentUser={currentUser}
                user={user}
                // increaseScore={increaseScore}
                // decreaseScore={decreaseScore}
                // addCommentHandler={addCommentHandler}
                // addReplyHandler={addReplyHandler}
                // editCommentHandler={editCommentHandler}
                // editReplyHandler={editReplyHandler}
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
                          user={reply}
                          // increaseScore={increaseScoreReply}
                          // decreaseScore={decreaseScoreReply}
                          // addCommentHandler={addCommentHandler}
                          // addReplyHandler={addReplyHandler}
                          // editReplyHandler={editReplyHandler}
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
          // addHandler={addCommentHandler}
          sendReply="Send"
        />
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
