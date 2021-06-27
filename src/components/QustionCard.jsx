/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React from 'react';
import { shuffle, uniqueId } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import parse from 'html-react-parser';

import {
  setCurrentQuestion, addAnswers, setStatus, addCorrectAnswer,
} from '../slices/questionsSlice.js';

const QuestionCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lastQuestionId = 9;
  const { questions, currentQuestionId } = useSelector((state) => state.questionsInfo);
  const currentQuestion = questions[currentQuestionId];
  const shuffeledAnswers = shuffle(currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer));

  const isLastQuestion = () => currentQuestionId === lastQuestionId;

  const MultipleAnswers = () => (
    <div role="group" aria-labelledby="checkbox-group">
      {
      shuffeledAnswers.map((answer) => {
        const id = uniqueId();
        return (
          <label htmlFor={id} key={id}>
            <Field type="checkbox" name="answer" value={answer} id={id} />
            <span>{parse(answer)}</span>
          </label>
        );
      })
    }
    </div>

  );

  const BooleanAnswers = () => (
    <div role="group" aria-labelledby="radio-group">
      <label>
        <Field type="radio" name="answer" value="True" id="1" />
        <span>True</span>
      </label>
      <label>
        <Field type="radio" name="answer" value="False" id="2" />
        <span>False</span>
      </label>
    </div>
  );

  const Question = () => {
    const { question, difficulty, correct_answer } = currentQuestion;
    return (
      <div difficulty={difficulty}>
        <h3 className="question-number mb-20">
          {t('q')}
          {' '}
          {currentQuestionId + 1}
        </h3>
        <p className="question-body mb-40">{parse(question)}</p>
        <Formik
          initialValues={{
            answer: [],
          }}
          onSubmit={({ answer }) => {
            const newAnswer = {};
            newAnswer.questionId = currentQuestion.id;
            newAnswer.answer = answer;
            dispatch(addAnswers(newAnswer));
            if (correct_answer.toString() === answer.toString()) {
              dispatch(addCorrectAnswer());
            }
            if (isLastQuestion()) {
              dispatch(setStatus('sumUp'));
            } else {
              dispatch(setCurrentQuestion({ id: currentQuestionId + 1 }));
            }
          }}
        >
          {() => (
            <Form className="question-form">
              {currentQuestion.type === 'multiple'
                ? <MultipleAnswers />
                : <BooleanAnswers />}
              <button type="submit" className="btn btn-answer">
                {
                isLastQuestion()
                  ? t('buttons.end')
                  : t('buttons.answer')
                }
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
  return (
    <div className="poll">
      <Question />
    </div>
  );
};

export default QuestionCard;
