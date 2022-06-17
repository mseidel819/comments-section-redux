import { styled, Box, Button } from "@mui/material";

export const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "360px",
  backgroundColor: "white",
  border: "none",
  borderRadius: "8px",
  padding: "32px",

  h2: {
    fontSize: "24px",
    margin: "0",
    marginBottom: "10px",
    // lineHeight: "28.4px",
  },

  "@media (max-width:450px)": {
    width: "300px",
    padding: "24px",

    h2: {
      fontSize: "20px",
      marginBottom: "0px",
    },
  },
});
export const ModalCancelButton = styled(Button)({
  backgroundColor: "#67727E",
  padding: "12px 32px",
  borderRadius: "8px",
  color: "white",
  textTransform: "uppercase",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",
  width: "100%",

  "&:hover": {
    backgroundColor: "#C2C7CB",
  },

  "@media (max-width:450px)": {
    padding: "12px 20px",
  },
});
export const ModalDeleteButton = styled(Button)({
  backgroundColor: "#ED6368",
  padding: "12px 34px",
  borderRadius: "8px",
  color: "white",
  textTransform: "uppercase",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",
  width: "100%",

  "&:hover": {
    backgroundColor: "#FFB8BB",
  },

  "@media (max-width:450px)": {
    padding: "12px 19px",
  },
});
