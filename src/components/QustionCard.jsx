import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

const QuestionCard = () => {
  const i = 'welcome';
  const { t } = useTranslation();
  const lastQuestionId = 9;
  const { questions, currentQuestionId } = useSelector((state) => state.questionsInfo);
  const currentQuestion = questions[currentQuestionId];
  console.log(currentQuestion);
  const Question = () => {
    const { question } = currentQuestion;
    return (
      <>
        <h3 className="question-number mb-20">
          Вопрос
          {' '}
          {currentQuestionId + 1}
        </h3>
        <p className="question-body mb-40">{parse(question)}</p>
        <form className="question-answers">
          {currentQuestion.type === 'multiple'
            ? (
              <>
                <label htmlFor="answer-1">
                  <input type="checkbox" name="1" id="1" />
                  <span>Answer</span>
                </label>
                <label htmlFor="answer-2">
                  <input type="checkbox" name="2" id="2" />
                  <span>Answer</span>
                </label>
                <label htmlFor="answer-3">
                  <input type="checkbox" name="3" id="3" />
                  <span>Answer</span>
                </label>
                <label htmlFor="answer-4">
                  <input type="checkbox" name="4" id="4" />
                  <span>Answer</span>
                </label>
              </>
            )
            : (
              <>
                <label htmlFor="answer true">
                  <input type="radio" name="true" id="1" />
                  <span>True</span>
                </label>
                <label htmlFor="answer false">
                  <input type="radio" name="true" id="1" />
                  <span>False</span>
                </label>
              </>
            )}
          <button type="submit" className="btn-answer">{t('buttons.answer')}</button>
        </form>
      </>
    );
  };
  return (
    <div className="poll">
      <Question />
    </div>
  );
};

export default QuestionCard;
