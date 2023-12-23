import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorText } from "../../components/shared";
import { Button, Grid, TextField, Divider, Typography } from "@mui/material";
import { BASE_URL, validYoutubeUrlRegex } from "../../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { QuestionAndAnswers } from "../../interfaces/QuestionAndAnswers";
import useQuizDetails from "../../hooks/useQuizDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QuestionsAndAnswersInputs } from "../../components";

type Inputs = {
  title: string;
  description: string;
  url: string;
};

const AddQuiz = () => {
  const navigate = useNavigate();

  const { quizDetails } = useQuizDetails();
  const [isEditingMode, setIsEditingMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    values: {
      title: quizDetails ? quizDetails?.title : "",
      description: quizDetails ? quizDetails?.description : "",
      url: quizDetails ? quizDetails?.url : "",
    },
  });

  const handleAnswerToggle = (
    questionAndAnswerId: number,
    answerId: number
  ) => {
    setQuestionAndAnswers((prevValue) => {
      return prevValue.map((el) => {
        if (el.id === questionAndAnswerId) {
          const newAnswers = el.answers.map((ans) =>
            ans.id === answerId ? { ...ans, is_true: !ans.is_true } : ans
          );
          return { ...el, answers: newAnswers };
        } else {
          return el;
        }
      });
    });
  };

  const [questionAndAnswers, setQuestionAndAnswers] = useState<
    QuestionAndAnswers[]
  >([
    {
      id: 1,
      text: "",
      feedback_true: "",
      feedback_false: "",
      answers: [{ id: 1, is_true: true, text: "" }],
    },
  ]);

  useEffect(() => {
    if (quizDetails) {
      setIsEditingMode(true);
      setQuestionAndAnswers(quizDetails.questions_answers);
    }
  }, [quizDetails]);

  const createNewQuizHandler = async (data: any) => {
    try {
      const newQuizPayload = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        url: data.url,
        created: new Date().toLocaleString(),
        modified: "",
        score: null,
        questions_answers: questionAndAnswers.map((el) => ({
          id: el.id,
          text: el.text,
          feedback_false: el.feedback_false,
          feedback_true: el.feedback_true,
          answers: el.answers.map((el) => ({
            id: el.id,
            is_true: el.is_true,
            text: el.text,
          })),
        })),
      };
      const res = await axios.post(`${BASE_URL}/quizzes`, newQuizPayload);
      if (res.data) {
        navigate("/");
      }
    } catch (error: any) {
      return toast(error?.message);
    }
  };

  const editQuizHandler = async (data: any) => {
    try {
      const editQuizPayload = {
        id: quizDetails?.id,
        title: data.title,
        description: data.description,
        url: data.url,
        modified: new Date().toLocaleString(),
        created: quizDetails?.created,
        score: null,
        questions_answers: questionAndAnswers.map((el) => ({
          id: el.id,
          text: el.text,
          feedback_false: el.feedback_false,
          feedback_true: el.feedback_true,
          answers: el.answers.map((el) => ({
            id: el.id,
            is_true: el.is_true,
            text: el.text,
          })),
        })),
      };
      const res = await axios.put(
        `${BASE_URL}/quizzes/${quizDetails?.id}`,
        editQuizPayload
      );
      if (res.data) navigate("/");
    } catch (error: any) {
      return toast(error?.message);
    }
  };

  const validateInputHandler = () => {
    let isValid = true;
    const getInvalidQuestions = questionAndAnswers.filter(
      (el) =>
        el.text === "" || el.feedback_false === "" || el.feedback_true === ""
    );
    const [getInvalidAnswers] = questionAndAnswers.map((el) =>
      el.answers.filter((ans) => ans.text === "")
    );
    if (getInvalidQuestions.length !== 0 && getInvalidAnswers.length !== 0) {
      isValid = false;
      toast("Please Fill All Questions and Answers Data", {
        type: "error",
        theme: "colored",
      });
      return isValid;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (validateInputHandler() === false) {
      return;
    }

    try {
      if (!isEditingMode) {
        await createNewQuizHandler(data);
      } else {
        await editQuizHandler(data);
      }
    } catch (error: any) {
      return toast(error?.message);
    }
  };

  const addNewQuestionInputsHandler = () => {
    setQuestionAndAnswers((prevValue) => [
      ...prevValue,
      {
        id: Date.now(),
        text: "",
        feedback_true: "",
        feedback_false: "",
        answers: [{ id: 1, is_true: true, text: "" }],
      },
    ]);
  };

  const addNewAnswerInputHandler = (questionAndAnswerId: number) => {
    setQuestionAndAnswers((prevValue) =>
      prevValue.map((el) =>
        el.id === questionAndAnswerId
          ? {
              ...el,
              answers: [
                ...el.answers,
                {
                  id: Date.now(),
                  is_true: false,
                  text: "",
                },
              ],
            }
          : { ...el }
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            error={!!errors.title}
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
            variant="outlined"
          />
          {errors.title && <ErrorText text={errors.title.message} />}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="YouTube URL"
            error={!!errors.url}
            {...register("url", {
              required: {
                value: true,
                message: "YouTube URL is required",
              },
              pattern: {
                value: validYoutubeUrlRegex,
                message: "Please Enter a valid youtube video url",
              },
            })}
            variant="outlined"
          />
          {errors.url && <ErrorText text={errors.url.message} />}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            error={!!errors.description}
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
            })}
            multiline
            rows={2}
            defaultValue=""
          />
          {errors.description && (
            <ErrorText text={errors.description.message} />
          )}
        </Grid>
      </Grid>

      <Divider className="my-3">
        <Typography variant="h5">Questions And Answers</Typography>
      </Divider>

      <QuestionsAndAnswersInputs
        handleAnswerToggle={handleAnswerToggle}
        questionAndAnswers={questionAndAnswers}
        addNewAnswerInputHandler={addNewAnswerInputHandler}
        setQuestionAndAnswers={setQuestionAndAnswers}
      />

      <div className="d-flex flex-column">
        <Button
          className="mt-3 px-5 py-3"
          variant="outlined"
          type="button"
          onClick={addNewQuestionInputsHandler}
        >
          +Add New Question
        </Button>

        <Button className="mt-3 px-5 py-3" variant="contained" type="submit">
          {isEditingMode ? "Edit" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddQuiz;
