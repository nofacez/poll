import { createSlice } from '@reduxjs/toolkit';

export const quesitonsSlice = createSlice({
  name: 'questionsInfo',
  initialState: {
    status: 'init',
    currentQuestionId: null,
    questions: [],
    currentAnswers: {},
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
  },
});

export const {
  getQuestions, setStatus, setCurrentQuestion, addAnswers,
} = quesitonsSlice.actions;

export default quesitonsSlice.reducer;
