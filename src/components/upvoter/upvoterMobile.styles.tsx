import { styled, Grid, Card, IconButton, Button } from "@mui/material";

export const UpvoteGrid = styled(Grid)({});
export const UpvoteCard = styled(Card)({
  backgroundColor: "#F5F6FA",
  borderRadius: "10px",
  overflow: "hidden",
  width: "100px",
  boxShadow: "none",
  display: "flex",

  justifyContent: "center",
});

export const StyledIconButton = styled(IconButton)({
  borderRadius: "0px",
  height: "35px",

  "&:hover": {
    backgroundColor: "#F5F6FA",
  },
});

export const ReplyButton = styled(Button)({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",
  textTransform: "none",

  "&:hover": {
    color: "#C5C6EF",
    backgroundColor: "white",
    fill: "#C5C6EF",
  },
});

export const DeleteButton = styled(Button)({
  fontWeight: "500",
  color: "#ED6368",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",
  textTransform: "none",

  "&:hover": {
    color: "#FFB8BB",
    backgroundColor: "white",
    // fill: "#C5C6EF",
  },
});
