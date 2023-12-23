import { Typography } from "@mui/material";
import { QuizCard } from "../../components";
import useAllQuizzes from "../../hooks/useAllQuizzes";
import { Quiz } from "../../interfaces/Quiz";
import { Link } from "react-router-dom";

const AllQuizzes = () => {
  const { allQuizzes } = useAllQuizzes();

  return (
    <section className="d-flex justify-content-between align-items-center flex-wrap">
      {allQuizzes.length > 0 ? (
        allQuizzes.map((quiz: Quiz) => <QuizCard quiz={quiz} key={quiz.id} />)
      ) : (
        <div className="d-flex w-100 justify-content-center flex-column align-items-center flex-wrap">
          <Typography>No Quizzes Yet!</Typography>
          <Link to="add-quiz">Create Quiz</Link>
        </div>
      )}
    </section>
  );
};

export default AllQuizzes;
