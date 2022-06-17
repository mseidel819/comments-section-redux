import { Grid } from "@mui/material";

import {
  UpvoteGrid,
  UpvoteCard,
  StyledIconButton,
  DeleteButton,
  ReplyButton,
} from "./upvoterMobile.styles";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import { ReactComponent as Reply } from "../../images/icon-reply.svg";
import { ReactComponent as Delete } from "../../images/icon-delete.svg";
import { ReactComponent as EditIcon } from "../../images/icon-edit.svg";

const UpvoterMobile = ({
  user,
  increaseScore,
  decreaseScore,
  currentUser,
  // removeCommentHandler,
  modalToggler,
  replyToggler,
  editToggler,
}) => {
  return (
    <UpvoteGrid
      item
      container
      justifyContent="space-between"
      xs={12}
      sm={0}
      sx={{ display: { xs: "flex", sm: "none" } }}
    >
      <Grid item xs={3}>
        <UpvoteCard>
          <Grid container>
            <Grid item xs={4}>
              <StyledIconButton
                aria-label="upvote"
                onClick={() => increaseScore(user.id)}
                size="large"
              >
                <Plus />
              </StyledIconButton>
            </Grid>
            <Grid item xs={4}>
              <h3>{user.score}</h3>
            </Grid>
            <Grid item xs={4}>
              <StyledIconButton
                aria-label="downvote"
                onClick={() => decreaseScore(user.id)}
                size="large"
              >
                <Minus />
              </StyledIconButton>
            </Grid>
          </Grid>
        </UpvoteCard>
      </Grid>
      <Grid item container xs={8} justifyContent="flex-end">
        {user.user.username === currentUser.username ? (
          <>
            <Grid item container xs={6} justifyContent="flex-end">
              {/* <DeleteButton
                onClick={() => removeCommentHandler(user.id)}
                variant="text"
                startIcon={<Delete />}
              >
                Delete
              </DeleteButton> */}
              <DeleteButton
                aria-label="delete"
                onClick={() => {
                  modalToggler(user.id, user.replyingTo);
                }}
                variant="text"
                startIcon={<Delete />}
              >
                Delete
              </DeleteButton>
            </Grid>
            <Grid item container xs={4} justifyContent="flex-end">
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
            startIcon={<Reply />}
          >
            Reply
          </ReplyButton>
        )}
      </Grid>
    </UpvoteGrid>
  );
};

export default UpvoterMobile;
