import { createSlice } from '@reduxjs/toolkit';

export const quesitonsSlice = createSlice({
  name: 'questionsInfo',
  initialState: {
    status: 'init',
    currentQuestionId: null,
    questions: [],
  },
  reducers: {
    getQuestions: (state, action) => ({ currentQuestionId: 0, questions: action.payload, status: 'initialized' }),
    setStatus: (state, action) => {
      const { payload } = action;
      return { ...state, status: payload };
    },
  },
});

export const { getQuestions, setStatus } = quesitonsSlice.actions;

export default quesitonsSlice.reducer;
