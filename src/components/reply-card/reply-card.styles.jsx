import { styled, Button, Card } from "@mui/material";

export const StyledReplyCard = styled(Card)({
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "none",
});

export const SendButton = styled(Button)({
  backgroundColor: "#5357B6",
  padding: "12px 30px",
  borderRadius: "8px",
  color: "white",
  textTransform: "uppercase",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",

  "&:hover": {
    backgroundColor: "#C5C6EF",
  },
});
