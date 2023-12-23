import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Quiz } from "../../interfaces/Quiz";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props {
  quiz: Quiz;
}

const QuizCard = (props: Props) => {
  const { quiz } = props;
  const { title, description } = quiz;

  const navigate = useNavigate();
  const navigateToEditQuizHandler = () => {
    navigate(`edit-quiz/${quiz.id}`);
  };
  const navigateToStartQuizHandler = () => {
    navigate(`quiz/${quiz.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="mx-3 my-3">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
          Created On: {moment(quiz.created).format("DD-MM-YYYY, hh:mmA")}
        </Typography>
        {quiz.modified && (
          <Typography variant="body2" color="text.secondary" className="mt-2">
            Modified On: {moment(quiz.modified).format("DD-MM-YYYY, hh:mmA")}
          </Typography>
        )}
        {quiz.score !== null && (
          <Typography variant="body2" color="text.secondary" className="mt-2">
            Score: {quiz.score} / {quiz.questions_answers.length}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateToStartQuizHandler}>
          Take Quiz
        </Button>
        <Button size="small" onClick={navigateToEditQuizHandler}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
