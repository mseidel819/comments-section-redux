import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToComments,
  addToReply,
  addOneToId,
} from "../../store/comments/comments.action";
import { selectCurrentUser } from "../../store/currentUser/currentUser.selector";
import {
  selectCommentId,
  selectComments,
} from "../../store/comments/comments.selector";

import { SendButton, StyledReplyCard } from "./reply-card.styles";
import { Comment } from "../../types";

///////////////////////////////////////////////////////////////////////////////////////
type ReplyProps = {
  user?: Comment | undefined;
  sendReply: "Send" | "Reply";
  replyToggler?: undefined | (() => void);
};
const Reply = ({
  user = undefined,
  sendReply,
  replyToggler = undefined,
}: ReplyProps) => {
  const [textField, setTextField] = useState("");

  const textFieldHandler = (e: { target: { value: any } }) => {
    const searchFieldString = e.target.value;
    setTextField(searchFieldString);
  };

  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectCurrentUser);
  const comments = useSelector(selectComments);
  const commentId = useSelector(selectCommentId);

  const addIdHandler = () => dispatch(addOneToId(commentId));
  const addCommentHandler = () =>
    dispatch(addToComments(comments, commentId, textField, currentUser));

  const addReplyHandler = () => {
    if (user)
      dispatch(addToReply(comments, commentId, textField, user, currentUser));
  };

  return (
    <StyledReplyCard>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={0} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
          <img src={currentUser?.image.png} alt={currentUser?.username} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            multiline
            fullWidth
            rows={3}
            onChange={textFieldHandler}
            placeholder="Add a comment..."
            value={textField}
          />
        </Grid>
        <Grid item xs={0} sm={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <SendButton
            aria-label="send"
            onClick={() => {
              if (sendReply === "Reply") {
                addReplyHandler();
                if (replyToggler) replyToggler();
              } else {
                addCommentHandler();
              }
              addIdHandler();
              setTextField("");
            }}
          >
            {sendReply}
          </SendButton>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          xs={12}
          sm={0}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <Grid item xs={1}>
            <img src={currentUser?.image.png} alt={currentUser?.username} />
          </Grid>
          <Grid item container justifyContent="end" xs={6}>
            <SendButton
              aria-label="send"
              onClick={() => {
                if (sendReply === "Reply") {
                  addReplyHandler();
                  addIdHandler();
                  setTextField("");
                  if (replyToggler) replyToggler();
                } else {
                  addCommentHandler();
                  addIdHandler();
                  setTextField("");
                }
              }}
            >
              {sendReply}
            </SendButton>
          </Grid>
        </Grid>
      </Grid>
    </StyledReplyCard>
  );
};

export default Reply;
