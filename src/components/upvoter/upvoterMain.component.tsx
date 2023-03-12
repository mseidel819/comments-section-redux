import { useDispatch, useSelector } from "react-redux";
import {
  scoreIncreased,
  scoreDecreased,
  scoreIncreasedReply,
  scoreDecreasedReply,
} from "../../store/comments/comments.action";
import { selectComments } from "../../store/comments/comments.selector";
import { UpvoteGrid, UpvoteCard, StyledIconButton } from "./upvoterMain.styles";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import { Comment } from "../../types";

type UpvoterMainProps = {
  user: Comment;
  mainOrSub: "main" | "sub";
};
const UpvoterMain = ({ user, mainOrSub }: UpvoterMainProps) => {
  const dispatch = useDispatch();

  const comments = useSelector(selectComments);

  const increaseScoreHandler = () =>
    dispatch(scoreIncreased(comments, user.id));
  const decreaseScoreHandler = () =>
    dispatch(scoreDecreased(comments, user.id));
  const increaseScoreReplyHandler = () =>
    dispatch(scoreIncreasedReply(comments, user.id));
  const decreaseScoreReplyHandler = () =>
    dispatch(scoreDecreasedReply(comments, user.id));

  return (
    <UpvoteGrid
      item
      xs={0}
      sm={1}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <UpvoteCard>
        <StyledIconButton
          onClick={
            mainOrSub === "main"
              ? increaseScoreHandler
              : increaseScoreReplyHandler
          }
          size="large"
        >
          <Plus />
        </StyledIconButton>
        <h3>{user.score}</h3>
        <StyledIconButton
          onClick={
            mainOrSub === "main"
              ? decreaseScoreHandler
              : decreaseScoreReplyHandler
          }
          size="large"
        >
          <Minus />
        </StyledIconButton>
      </UpvoteCard>
    </UpvoteGrid>
  );
};

export default UpvoterMain;
