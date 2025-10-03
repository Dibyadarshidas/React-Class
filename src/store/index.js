import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import recipeReducer from './slices/recipeSlice';
import recommendationReducer from './slices/recommendationSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    recipes: recipeReducer,
    recommendations: recommendationReducer,
  },
});

export default store;
