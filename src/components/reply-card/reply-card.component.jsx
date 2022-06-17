import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import julio from "../../images/avatars/image-juliusomo.png";
import { SendButton, StyledReplyCard } from "./reply-card.styles";

const Reply = ({ user, addHandler, sendReply, currentUser, replyToggler }) => {
  const [textField, setTextField] = useState("");

  const textFieldHandler = (e) => {
    const searchFieldString = e.target.value;
    setTextField(searchFieldString);
  };

  return (
    <StyledReplyCard>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={0} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
          <img src={julio} alt="current user" />
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
              addHandler(textField, user, currentUser);
              setTextField("");
              if (sendReply === "Reply") {
                replyToggler();
              }
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
            <img src={julio} alt="current user" />
          </Grid>
          <Grid item container justifyContent="end" xs={6}>
            <SendButton
              aria-label="send"
              onClick={() => {
                addHandler(textField, user, currentUser);
                setTextField("");
                if (sendReply === "Reply") {
                  replyToggler();
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
