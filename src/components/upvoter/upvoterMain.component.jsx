import { UpvoteGrid, UpvoteCard, StyledIconButton } from "./upvoterMain.styles";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";

const UpvoterMain = ({ user, increaseScore, decreaseScore }) => {
  return (
    <UpvoteGrid
      item
      xs={0}
      sm={1}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <UpvoteCard>
        <StyledIconButton onClick={() => increaseScore(user.id)} size="large">
          <Plus />
        </StyledIconButton>
        <h3>{user.score}</h3>
        <StyledIconButton onClick={() => decreaseScore(user.id)} size="large">
          <Minus />
        </StyledIconButton>
      </UpvoteCard>
    </UpvoteGrid>
  );
};

export default UpvoterMain;
