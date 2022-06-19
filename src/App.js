import JobData from "./data.json";
import { ModalBox, ModalCancelButton, ModalDeleteButton } from "./App.styles";
import { Container, Grid, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Reply from "./components/reply-card/reply-card.component";
import CommentCard from "./components/comment-card/comment-card.component";
import { setCurrentUser } from "./store/currentUser/currentUser.action";
import { commentRemoved, replyRemoved } from "./store/comments/comments.action";

import { selectComments } from "./store/comments/comments.selector";
import { setComments } from "./store/comments/comments.action";

//////////////////////////////
//fix persist. it rehydrates correctly, but on reload, the useEfect calls and takes info from data.json.
/////////////////////////////
function App() {
  const dispatch = useDispatch();

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
  }, [dispatch]);

  const comments = useSelector(selectComments);

  const removeReplyHandler = () => dispatch(replyRemoved(comments, deleteId));
  const removeCommentHandler = () =>
    dispatch(commentRemoved(comments, deleteId));

  ///////////////////////////////////////////////
  /////JSX
  ////////////////////////////////////////////////
  return (
    <>
      <Container role="main" maxWidth="md" sx={{ marginTop: "64px" }}>
        {comments &&
          comments
            .sort((a, b) => {
              return b.score - a.score;
            })
            .map((user) => (
              <div key={user.id}>
                <CommentCard
                  user={user}
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

        <Reply sendReply="Send" />
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
                  replyTo ? removeReplyHandler() : removeCommentHandler();
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
