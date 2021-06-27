import { createSlice } from '@reduxjs/toolkit';

export const quesitonsSlice = createSlice({
  name: 'questionsInfo',
  initialState: {
    status: 'init',
    currentQuestionId: null,
    questions: [],
    currentAnswers: {},
    correctAnswersCount: 0,
  },
  reducers: {
    getQuestions: (state, action) => ({
      ...state, currentQuestionId: 0, questions: action.payload, status: 'initialized',
    }),
    setStatus: (state, action) => {
      const { payload } = action;
      return { ...state, status: payload };
    },
    setCurrentQuestion: (state, action) => {
      const { payload } = action;
      return { ...state, currentQuestionId: payload.id };
    },
    addAnswers: (state, action) => {
      const { payload: { questionId, answer } } = action;
      const { currentAnswers } = state;
      currentAnswers[questionId] = Array.isArray(answer) ? answer : [answer];
    },
    addCorrectAnswer: (state) => {
      const { correctAnswersCount } = state;
      const newCount = correctAnswersCount + 1;
      return { ...state, correctAnswersCount: newCount };
    },
    reset: () => ({
      status: 'init', currentQuestionId: null, currentAnswers: {}, correctAnswersCount: 0, questions: [],
    }),
  },
});

export const {
  getQuestions, setStatus, setCurrentQuestion, addAnswers, addCorrectAnswer, reset,
} = quesitonsSlice.actions;

export default quesitonsSlice.reducer;
