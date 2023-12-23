import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "../interfaces/Quiz";
import { BASE_URL } from "../constants";

const useQuizDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null);

  const fetchQuizDetails = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/quizzes/${params.id}`);

      if (data) {
        setQuizDetails(data);
      }
    } catch (error) {
      // If Not Found
      navigate("/");
    }
  };

  useEffect(() => {
    if (params.id) fetchQuizDetails();
  }, [params]);

  return { quizDetails };
};

export default useQuizDetails;
