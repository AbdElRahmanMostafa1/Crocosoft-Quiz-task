import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";

const useAllQuizzes = () => {
  const [allQuizzes, setAllQuizzes] = useState([]);

  const fetchAllQuizzes = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/quizzes`);
      setAllQuizzes(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  return { allQuizzes };
};

export default useAllQuizzes;
