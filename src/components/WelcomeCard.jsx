import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { getQuestions, setStatus } from '../slices/questionsSlice.js';
import routes from '../routes.js';

const WelcomeCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(setStatus('loading'));
    try {
      const resp = await axios.get(routes.questionsPath());
      console.log(resp.data.results);
      dispatch(getQuestions(resp.data.results));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="poll">
      <h3 className="mb-20">{t('welcomeTitle')}</h3>
      <p className="mb-20">{t('welcomeText')}</p>
      <ul className="mb-40">
        <li>
          {t('easy')}
          {' '}
          <span className="easy" />
        </li>
        <li>
          {t('medium')}
          {' '}
          <span className="medium" />
        </li>
        <li>
          {t('hard')}
          {' '}
          <span className="hard" />
        </li>
      </ul>
      <p className="mb-20">{t('welcomeText2')}</p>
      <div className="btn-container">
        <button type="button" className="start-btn" onClick={handleClick}>{t('buttons.start')}</button>
      </div>
    </div>
  );
};

export default WelcomeCard;
