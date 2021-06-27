/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';

import { setStatus } from '../slices/questionsSlice.js';

// TODO:
// Count final score
// Play again button
// Visual improvements
// Allow to choose categories (mb)
// Token

const SumUp = () => {
  const { t } = useTranslation();
  const { currentAnswers, questions, correctAnswersCount } = useSelector((state) => state.questionsInfo);
  const dispatch = useDispatch();
  const shortenedQuestions = questions.map(({
    difficulty, correct_answer, id, question,
  }) => ({
    difficulty, correct_answer, id, question,
  }));

  const easyQs = shortenedQuestions.filter(({ difficulty }) => difficulty === 'easy');
  const mediumQs = shortenedQuestions.filter(({ difficulty }) => difficulty === 'medium');
  const hardQs = shortenedQuestions.filter(({ difficulty }) => difficulty === 'hard');

  const handleReplayBtnClick = () => {
    dispatch(setStatus('init'));
  };

  const chooseClassname = (q) => {
    if (currentAnswers[q.id][0] === q.correct_answer) {
      return 'correct-answer';
    }
    return 'incorrect-answer';
  };

  const renderResults = (arr) => (
    arr.map((q) => (
      <li key={q.id}>
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
      <ul className="questions-results easy-q mt-10">
        <h4>{t('easyQuestions')}</h4>
        {
          easyQs.length ? renderResults(easyQs) : t('noSuchQs', { type: 'Легких' })
        }
      </ul>
      <ul className="questions-results medium-q">
        <h4>{t('mediumQuestions')}</h4>
        {
          mediumQs.length ? renderResults(mediumQs) : t('noSuchQs', { type: 'Средних' })
        }
      </ul>
      <ul className="questions-results hard-q">
        <h4>{t('hardQuestions')}</h4>
        {
          hardQs.length ? renderResults(hardQs) : t('noSuchQs', { type: 'Сложных' })
        }
      </ul>
      <div className="results-card-footer mt-10">
        <div className="results-card-footer-title">
          <h3>
            { t('sumup') }
          </h3>
          {correctAnswersCount}
          {' '}
          {t('outOf10')}
        </div>
        <button type="button" className="btn" onClick={handleReplayBtnClick}>{t('buttons.replay')}</button>
      </div>
    </div>
  );

  return (
    <div className="poll">
      <Results />
    </div>
  );
};

export default SumUp;
