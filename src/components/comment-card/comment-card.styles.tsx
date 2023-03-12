import { styled, Button, Card, Box } from "@mui/material";

export const StyledCommentCard = styled(Card)({
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "none",
  marginBottom: "20px",
});

export const UserSpan = styled("span")({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#334253",
  margin: "0 16px",
});

export const TimeSpan = styled("span")({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  color: "#67727E",
});
export const YouSpan = styled("span")({
  fontWeight: "500",
  fontSize: "13px",
  lineHeight: "15px",
  color: "white",
  backgroundColor: "#5357B6",
  borderRadius: "2px",
  padding: "1px 6px",
  marginRight: "16px",
});

export const ReplyButton = styled(Button)({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",
  textTransform: "none",
  color: "#5357B6",

  "&:hover": {
    color: "#C5C6EF",
    backgroundColor: "white",
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

    fill: "#C5C6EF",
  },
});

export const SendButton = styled(Button)({
  backgroundColor: "#5357B6",
  padding: "12px 20px",
  borderRadius: "8px",
  color: "white",
  textTransform: "uppercase",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",
  marginTop: "16px",

  "&:hover": {
    backgroundColor: "#C5C6EF",
  },
});

export const StyledTextBox = styled(Box)({
  minWidth: "500px",

  "@media (max-width:600px)": {
    minWidth: "100px",
  },
});

export const StyledTagSpan = styled("span")({
  color: "#5357B6",
  fontWeight: "500",
});
