/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

// TODO:
// Count final score
// Play again button
// Visual improvements
// Allow to choose categories (mb)
// Token

const SumUp = () => {
  const { t } = useTranslation();
  const { currentAnswers, questions } = useSelector((state) => state.questionsInfo);
  const shortenedQuestions = questions.map(({
    difficulty, correct_answer, id, question,
  }) => ({
    difficulty, correct_answer, id, question,
  }));
  console.log(currentAnswers, shortenedQuestions);
  const easyQs = shortenedQuestions.filter(({ difficulty }) => difficulty === 'easy');
  const mediumQs = shortenedQuestions.filter(({ difficulty }) => difficulty === 'medium');
  const hardQs = shortenedQuestions.filter(({ difficulty }) => difficulty === 'hard');
  console.log('ez', easyQs);
  console.log('mdl', mediumQs);
  console.log('hrd', hardQs);

  const chooseClassname = (q) => (currentAnswers[q.id][0] === q.correct_answer ? 'correct-answer' : 'incorrect-answer');

  const renderResults = (arr) => (
    arr.map((q) => (
      <li>
        <p className="question-body mb-20 mt-10">{parse(q.question)}</p>
        <span>
          {t('yourAnswer')}
          {': '}
          <span className={chooseClassname(q)}>{parse(currentAnswers[q.id].join(''))}</span>
          <br />
          {t('correctAnswer')}
          {': '}
          {parse(q.correct_answer)}
        </span>
      </li>
    ))
  );

  const Results = () => (
    <div className="results-card">
      <h3>{t('summary')}</h3>
      <ul className="questions-results easy-q">
        <h4>{t('easyQuestions')}</h4>
        {
          renderResults(easyQs)
        }
      </ul>
      <ul className="questions-results medium-q">
        <h4>{t('mediumQuestions')}</h4>
        {
          renderResults(mediumQs)
        }
      </ul>
      <ul className="questions-results hard-q">
        <h4>{t('hardQuestions')}</h4>
        {
          renderResults(hardQs)
        }
      </ul>
    </div>
  );

  return (
    <div className="poll">
      <Results />
    </div>
  );
};

export default SumUp;
