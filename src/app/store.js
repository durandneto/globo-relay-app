import { configureStore } from '@reduxjs/toolkit';
import tweetReducer from '../features/GloboRelay/tweetSlice';

export default configureStore({
  reducer: {
    tweet: tweetReducer
  },
});
