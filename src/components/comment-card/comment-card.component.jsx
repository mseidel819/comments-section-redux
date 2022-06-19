import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/currentUser/currentUser.selector";
import {
  commentEdited,
  replyEdited,
} from "../../store/comments/comments.action";

import { ReactComponent as ReplyIcon } from "../../images/icon-reply.svg";
import { ReactComponent as EditIcon } from "../../images/icon-edit.svg";
import { ReactComponent as Delete } from "../../images/icon-delete.svg";
import juliusomo from "../../images/avatars/image-juliusomo.png";
import amyrobson from "../../images/avatars/image-amyrobson.png";
import maxblagun from "../../images/avatars/image-maxblagun.png";
import ramsesmiron from "../../images/avatars/image-ramsesmiron.png";
import UpvoterMain from "../upvoter/upvoterMain.component";
import UpvoterMobile from "../upvoter/upvoterMobile.component";
import Reply from "../reply-card/reply-card.component";

import {
  StyledCommentCard,
  UserSpan,
  TimeSpan,
  ReplyButton,
  DeleteButton,
  YouSpan,
  StyledTextBox,
  SendButton,
  StyledTagSpan,
} from "./comment-card.styles";
import { selectComments } from "../../store/comments/comments.selector";

const CommentCard = ({ user, mainOrSub, modalToggler }) => {
  const [replyActive, setReplyActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [editField, setEditField] = useState(user.content);

  const { currentUser } = useSelector(selectCurrentUser);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  const editFieldHandler = (e) => {
    const searchFieldString = e.target.value;
    setEditField(searchFieldString);
  };

  const replyToggler = () => setReplyActive(!replyActive);

  const editToggler = () => setEditActive(!editActive);

  const userObj = {
    juliusomo: juliusomo,
    amyrobson: amyrobson,
    maxblagun: maxblagun,
    ramsesmiron: ramsesmiron,
  };

  const editCommentHandler = () =>
    dispatch(commentEdited(comments, editField, user));
  const editReplyHandler = () =>
    dispatch(replyEdited(comments, editField, user, currentUser));

  return (
    <Grid container>
      <Grid item>
        <StyledCommentCard>
          <Grid container columnSpacing={1}>
            <UpvoterMain user={user} mainOrSub={mainOrSub} />

            <Grid item container sm={11}>
              <Grid item container justifyContent="space-between">
                <Grid item container alignItems="center" xs={12} sm={8.5}>
                  <img src={userObj[user.user.username]} alt="user" />
                  <UserSpan>{user.user.username}</UserSpan>
                  {user.user.username === currentUser.username && (
                    <YouSpan>you</YouSpan>
                  )}
                  <TimeSpan>{user.createdAt}</TimeSpan>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="end"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  xs={0}
                  sm={3.5}
                >
                  {user.user.username === currentUser.username ? (
                    <>
                      <Grid item sm={6}>
                        <DeleteButton
                          onClick={() => {
                            modalToggler(user.id, user.replyingTo);
                          }}
                          variant="text"
                          startIcon={<Delete />}
                        >
                          Delete
                        </DeleteButton>
                      </Grid>
                      <Grid item sm={4}>
                        <ReplyButton
                          aria-label="edit"
                          onClick={editToggler}
                          variant="text"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </ReplyButton>
                      </Grid>
                    </>
                  ) : (
                    <ReplyButton
                      aria-label="reply"
                      onClick={replyToggler}
                      variant="text"
                      startIcon={<ReplyIcon />}
                    >
                      Reply
                    </ReplyButton>
                  )}
                </Grid>
              </Grid>

              {editActive ? (
                <Grid item container justifyContent="flex-end" xs={12}>
                  <TextField
                    multiline
                    fullWidth
                    rows={3}
                    onChange={editFieldHandler}
                    defaultValue={user.content}
                  />
                  <SendButton
                    aria-label="update"
                    onClick={() => {
                      if (mainOrSub === "main") {
                        editCommentHandler();
                        editToggler();
                      }
                      if (mainOrSub === "sub") {
                        editReplyHandler();
                        editToggler();
                      }
                    }}
                  >
                    Update
                  </SendButton>
                </Grid>
              ) : (
                <StyledTextBox>
                  <p>
                    {user.replyingTo && (
                      <StyledTagSpan>@{user.replyingTo}&nbsp;</StyledTagSpan>
                    )}
                    {user.content}
                  </p>
                </StyledTextBox>
              )}
            </Grid>
            <UpvoterMobile
              user={user}
              mainOrSub={mainOrSub}
              currentUser={currentUser}
              replyToggler={replyToggler}
              editToggler={editToggler}
              modalToggler={modalToggler}
            />
          </Grid>
        </StyledCommentCard>
      </Grid>
      {replyActive && (
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
          <Reply user={user} sendReply="Reply" replyToggler={replyToggler} />
        </Grid>
      )}
    </Grid>
  );
};

export default CommentCard;
