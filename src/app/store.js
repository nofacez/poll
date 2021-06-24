import { configureStore } from '@reduxjs/toolkit';
import questionsSlice from '../slices/questionsSlice';

export default () => configureStore({
  reducer: {
    questionsInfo: questionsSlice,
  },
});
