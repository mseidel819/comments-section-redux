import { styled, Grid, Card, IconButton } from "@mui/material";

export const UpvoteGrid = styled(Grid)({});
export const UpvoteCard = styled(Card)({
  backgroundColor: "#F5F6FA",
  borderRadius: "10px",
  overflow: "hidden",
  width: "40px",
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const StyledIconButton = styled(IconButton)({
  borderRadius: "0px",
  height: "35px",

  "&:hover": {
    backgroundColor: "#F5F6FA",
  },
});
