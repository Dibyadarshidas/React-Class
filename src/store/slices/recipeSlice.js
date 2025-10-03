import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching recipes
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      return data?.meals || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching recipe details
export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      return data?.meals?.[0] || null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    favorites: [],
    currentRecipe: null,
    searchTerm: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addToFavorites: (state, action) => {
      const recipe = action.payload;
      const exists = state.favorites.find(fav => fav.idMeal === recipe.idMeal);
      if (!exists) {
        state.favorites.push(recipe);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        fav => fav.idMeal !== action.payload
      );
    },
    clearRecipes: (state) => {
      state.recipes = [];
    },
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setSearchTerm, 
  addToFavorites, 
  removeFromFavorites, 
  clearRecipes, 
  clearCurrentRecipe 
} = recipeSlice.actions;
export default recipeSlice.reducer;
