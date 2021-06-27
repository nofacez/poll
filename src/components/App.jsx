import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import getStore from '../app/store.js';
import WelcomeCard from './WelcomeCard.jsx';
import QuestionCard from './QustionCard.jsx';
import SumUp from './SumUpCard.jsx';

const App = () => {
  const store = getStore();

  const Loading = () => (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  const Main = () => {
    const { status } = useSelector((state) => state.questionsInfo);
    console.log(status);
    return (
      <div className="container">
        {status === 'init' && <WelcomeCard />}
        {status === 'initialized' && <QuestionCard />}
        {status === 'sumUp' && <SumUp />}
        {status === 'loading' && <Loading />}
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
