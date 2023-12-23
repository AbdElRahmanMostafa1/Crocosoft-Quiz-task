import { Grid, TextField, Typography } from "@mui/material";
import {
  Delete as Trash,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  ControlPoint as ControlPointIcon,
} from "@mui/icons-material";
import { QuestionAndAnswers } from "../../interfaces/QuestionAndAnswers";
import React from "react";

interface Props {
  questionAndAnswers: QuestionAndAnswers[];
  setQuestionAndAnswers: React.Dispatch<
    React.SetStateAction<QuestionAndAnswers[]>
  >;
  addNewAnswerInputHandler: (questionAndAnswerId: number) => void;
  handleAnswerToggle: (questionAndAnswerId: number, answerId: number) => void;
}

const QuestionsAndAnswersInputs = (props: Props) => {
  const {
    questionAndAnswers,
    setQuestionAndAnswers,
    addNewAnswerInputHandler,
    handleAnswerToggle,
  } = props;

  const removeQuestionInputsHandler = (questionId: number) => {
    setQuestionAndAnswers((prevValue) =>
      prevValue.filter((el) => el.id !== questionId)
    );
  };

  const removeAnswerInputHandler = (
    questionAndAnswerId: number,
    answerInputId: number
  ) => {
    setQuestionAndAnswers((prevValue) => {
      return prevValue.map((el) => {
        if (el.id === questionAndAnswerId) {
          const newAnswerInputs = el.answers.filter(
            (el) => el.id !== answerInputId
          );
          return { ...el, answers: newAnswerInputs };
        } else return el;
      });
    });
  };

  return (
    <>
      {questionAndAnswers.map((questionAndAnswer, questionAndAnswerIndex) => {
        return (
          <article key={questionAndAnswer.id}>
            <div className="d-flex align-items-center mb-2">
              <Typography variant="h6">
                Question {questionAndAnswerIndex + 1}
              </Typography>
              {questionAndAnswerIndex !== 0 && (
                <button
                  className="btn ms-1"
                  type="button"
                  onClick={() =>
                    removeQuestionInputsHandler(questionAndAnswer.id)
                  }
                >
                  <Trash />
                </button>
              )}
            </div>
            <Grid item xs={12}>
              <TextField
                value={questionAndAnswer.text}
                onChange={(e) =>
                  setQuestionAndAnswers((prevValue) =>
                    prevValue.map((el) =>
                      el.id === questionAndAnswer.id
                        ? { ...el, text: e.target.value }
                        : { ...el }
                    )
                  )
                }
                fullWidth
                label={`Question ${questionAndAnswerIndex + 1}`}
                variant="outlined"
              />
            </Grid>

            <div className="ms-3 my-2">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={questionAndAnswer.feedback_false}
                  onChange={(e) =>
                    setQuestionAndAnswers((prevValue) =>
                      prevValue.map((el) =>
                        el.id === questionAndAnswer.id
                          ? { ...el, feedback_false: e.target.value }
                          : { ...el }
                      )
                    )
                  }
                  label={`Feedback False`}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className="my-2">
                <TextField
                  fullWidth
                  value={questionAndAnswer.feedback_true}
                  onChange={(e) =>
                    setQuestionAndAnswers((prevValue) =>
                      prevValue.map((el) =>
                        el.id === questionAndAnswer.id
                          ? { ...el, feedback_true: e.target.value }
                          : { ...el }
                      )
                    )
                  }
                  label={`Feedback True`}
                  variant="outlined"
                />
              </Grid>
            </div>

            <div className="d-flex ms-5 flex-column">
              {questionAndAnswer.answers.map((answer, answerIndex) => {
                return (
                  <div className="d-flex" key={answer.id}>
                    {answerIndex === questionAndAnswer.answers.length - 1 && (
                      <button
                        className="btn"
                        type="button"
                        onClick={() =>
                          addNewAnswerInputHandler(questionAndAnswer.id)
                        }
                      >
                        <ControlPointIcon />
                      </button>
                    )}
                    <Grid item xs={12}>
                      <div className="d-flex align-items-center my-1">
                        <TextField
                          fullWidth
                          value={answer.text}
                          onChange={(e) => {
                            setQuestionAndAnswers((prevValue) => {
                              return prevValue.map((el) => {
                                if (el.id === questionAndAnswer.id) {
                                  const newAnswers = el.answers.map((ans) =>
                                    ans.id === answer.id
                                      ? { ...ans, text: e.target.value }
                                      : { ...ans }
                                  );

                                  return { ...el, answers: newAnswers };
                                } else {
                                  return el;
                                }
                              });
                            });
                          }}
                          label={`Answer ${answerIndex + 1}`}
                          variant="outlined"
                          className="me-1"
                        />
                        <input
                          type="radio"
                          name={`is_true_${questionAndAnswer.id}`}
                          checked={answer.is_true}
                          onChange={() =>
                            handleAnswerToggle(questionAndAnswer.id, answer.id)
                          }
                        />

                        {answerIndex !==
                          questionAndAnswer.answers.length - 1 && (
                          <button
                            className="btn"
                            type="button"
                            onClick={() =>
                              removeAnswerInputHandler(
                                questionAndAnswer.id,
                                answer.id
                              )
                            }
                          >
                            <RemoveCircleOutlineIcon />
                          </button>
                        )}
                      </div>
                    </Grid>
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
    </>
  );
};

export default QuestionsAndAnswersInputs;
