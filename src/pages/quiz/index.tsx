import { useState } from "react";
import useQuizDetails from "../../hooks/useQuizDetails";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants";

const Quiz = () => {
  const { quizDetails } = useQuizDetails();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const selectAnswerHandler = (selectedAnswerId: number) => {
    const currentQuestion =
      quizDetails?.questions_answers[currentQuestionIndex];
    const trueAnswerObject = currentQuestion?.answers?.find(
      (answer) => answer.is_true
    );

    if (currentQuestion && !feedback) {
      if (trueAnswerObject?.id === selectedAnswerId) {
        setScore((prevValue) => (prevValue += 1));
        setFeedback(currentQuestion?.feedback_true);
      } else {
        setFeedback(currentQuestion?.feedback_true);
      }
    }
  };

  const updateQuizScoreHandler = async () => {
    const payload = { ...quizDetails, score };
    try {
      await axios.put(`${BASE_URL}/quizzes/${quizDetails?.id}`, payload);
    } catch (error) {}
  };

  const nextQuestionHandler = async () => {
    setFeedback("");
    if (quizDetails?.questions_answers) {
      if (currentQuestionIndex < quizDetails?.questions_answers?.length - 1) {
        setCurrentQuestionIndex((prevValue) => prevValue + 1);
      } else {
        await updateQuizScoreHandler();
        navigate("/");
      }
    }
  };

  return (
    <section>
      <Typography variant="h4">Score: {score}</Typography>

      <Typography textAlign={"center"} variant="h5">
        {quizDetails?.questions_answers[currentQuestionIndex].text}
      </Typography>

      {feedback && (
        <article className="alert alert-primary text-center" role="alert">
          {feedback}
        </article>
      )}

      {quizDetails?.questions_answers[currentQuestionIndex].answers.map(
        (ans) => {
          return (
            <Button
              key={ans.id}
              className="d-block w-100 my-3 py-3"
              variant="contained"
              onClick={() => selectAnswerHandler(ans.id)}
              disabled={!!feedback}
            >
              <Typography textAlign={"center"}> {ans.text}</Typography>
            </Button>
          );
        }
      )}

      <Button
        className="d-block w-100 mt-5 py-3"
        variant="outlined"
        onClick={nextQuestionHandler}
      >
        <Typography textAlign={"center"}> Next </Typography>
      </Button>
    </section>
  );
};

export default Quiz;
