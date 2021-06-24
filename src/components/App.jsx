import React from 'react';
import { Provider, useSelector } from 'react-redux';

import getStore from '../app/store.js';
import WelcomeCard from './WelcomeCard.jsx';
import QuestionCard from './QustionCard.jsx';
import SumUp from './SumUpCard.jsx';

const App = () => {
  const store = getStore();
  const Main = () => {
    const { status } = useSelector((state) => state.questionsInfo);
    console.log(status);
    return (
      <div className="container">
        {status === 'init' && <WelcomeCard />}
        {status === 'initialized' && <QuestionCard />}
        {status === 'sumUp' && <SumUp />}
      </div>
    );
  };

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
