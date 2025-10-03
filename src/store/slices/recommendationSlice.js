import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching recommendations
export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (preferences, { rejectWithValue }) => {
    try {
      const { mood, event, genre, cuisine, timeOfDay } = preferences;
      
      // Build search queries based on preferences
      const movieQueries = getMovieQueries(mood, event, genre);
      const recipeQueries = getRecipeQueries(mood, event, cuisine, timeOfDay);
      
      // Fetch movies and recipes in parallel
      const [movieResults, recipeResults] = await Promise.all([
        fetchMultipleMovies(movieQueries),
        fetchMultipleRecipes(recipeQueries)
      ]);
      
      return {
        movies: movieResults,
        recipes: recipeResults,
        preferences
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper function to get movie search queries based on preferences
const getMovieQueries = (mood, event, genre) => {
  const queries = [];
  
  // Mood-based queries
  const moodQueries = {
    happy: ['comedy', 'musical', 'family'],
    sad: ['drama', 'romance', 'inspirational'],
    excited: ['action', 'adventure', 'thriller'],
    relaxed: ['drama', 'documentary', 'art'],
    romantic: ['romance', 'romantic comedy', 'love story'],
    adventurous: ['adventure', 'action', 'fantasy'],
    nostalgic: ['classic', 'vintage', 'retro']
  };
  
  // Event-based queries
  const eventQueries = {
    birthday: ['celebration', 'party', 'fun'],
    date: ['romance', 'romantic', 'love'],
    family: ['family', 'kids', 'children'],
    party: ['party', 'fun', 'comedy'],
    holiday: ['holiday', 'christmas', 'thanksgiving'],
    workout: ['motivational', 'sports', 'fitness'],
    study: ['educational', 'documentary', 'biography']
  };
  
  // Combine mood and event queries
  if (moodQueries[mood]) {
    queries.push(...moodQueries[mood]);
  }
  
  if (eventQueries[event]) {
    queries.push(...eventQueries[event]);
  }
  
  // Add genre if specified
  if (genre && genre !== 'any') {
    queries.push(genre);
  }
  
  return [...new Set(queries)]; // Remove duplicates
};

// Helper function to get recipe search queries based on preferences
const getRecipeQueries = (mood, event, cuisine, timeOfDay) => {
  const queries = [];
  
  // Mood-based recipe queries
  const moodRecipes = {
    happy: ['dessert', 'sweet', 'chocolate', 'cake'],
    sad: ['comfort food', 'soup', 'warm', 'hearty'],
    excited: ['spicy', 'energetic', 'quick', 'snack'],
    relaxed: ['healthy', 'salad', 'light', 'fresh'],
    romantic: ['elegant', 'fine dining', 'wine', 'gourmet'],
    adventurous: ['exotic', 'spicy', 'international', 'fusion'],
    nostalgic: ['traditional', 'homestyle', 'classic', 'grandma']
  };
  
  // Event-based recipe queries
  const eventRecipes = {
    birthday: ['cake', 'dessert', 'celebration', 'party food'],
    date: ['romantic dinner', 'elegant', 'fine dining', 'wine'],
    family: ['family dinner', 'comfort food', 'traditional', 'hearty'],
    party: ['appetizers', 'finger food', 'snacks', 'drinks'],
    holiday: ['holiday', 'traditional', 'festive', 'special'],
    workout: ['healthy', 'protein', 'energy', 'nutritious'],
    study: ['brain food', 'healthy', 'energy', 'quick']
  };
  
  // Time of day queries
  const timeRecipes = {
    morning: ['breakfast', 'brunch', 'coffee', 'pancakes'],
    afternoon: ['lunch', 'light', 'salad', 'sandwich'],
    evening: ['dinner', 'main course', 'hearty', 'comfort'],
    night: ['snack', 'dessert', 'late night', 'comfort']
  };
  
  // Combine all queries
  if (moodRecipes[mood]) {
    queries.push(...moodRecipes[mood]);
  }
  
  if (eventRecipes[event]) {
    queries.push(...eventRecipes[event]);
  }
  
  if (timeRecipes[timeOfDay]) {
    queries.push(...timeRecipes[timeOfDay]);
  }
  
  // Add cuisine if specified
  if (cuisine && cuisine !== 'any') {
    queries.push(cuisine);
  }
  
  return [...new Set(queries)]; // Remove duplicates
};

// Helper function to fetch multiple movies
const fetchMultipleMovies = async (queries) => {
  const allMovies = [];
  
  for (const query of queries.slice(0, 3)) { // Limit to 3 queries to avoid too many API calls
    try {
      const response = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${query}`);
      const data = await response.json();
      if (data?.description) {
        allMovies.push(...data.description.slice(0, 5)); // Limit to 5 movies per query
      }
    } catch (error) {
      console.error(`Error fetching movies for query "${query}":`, error);
    }
  }
  
  // Remove duplicates based on IMDB ID
  const uniqueMovies = allMovies.filter((movie, index, self) => 
    index === self.findIndex(m => m['#IMDB_ID'] === movie['#IMDB_ID'])
  );
  
  return uniqueMovies.slice(0, 10); // Return top 10 unique movies
};

// Helper function to fetch multiple recipes
const fetchMultipleRecipes = async (queries) => {
  const allRecipes = [];
  
  for (const query of queries.slice(0, 3)) { // Limit to 3 queries
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      if (data?.meals) {
        allRecipes.push(...data.meals.slice(0, 5)); // Limit to 5 recipes per query
      }
    } catch (error) {
      console.error(`Error fetching recipes for query "${query}":`, error);
    }
  }
  
  // Remove duplicates based on meal ID
  const uniqueRecipes = allRecipes.filter((recipe, index, self) => 
    index === self.findIndex(r => r.idMeal === recipe.idMeal)
  );
  
  return uniqueRecipes.slice(0, 10); // Return top 10 unique recipes
};

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: {
    preferences: {
      mood: '',
      event: '',
      genre: '',
      cuisine: '',
      timeOfDay: ''
    },
    recommendations: {
      movies: [],
      recipes: []
    },
    loading: false,
    error: null,
    showModal: false
  },
  reducers: {
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearPreferences: (state) => {
      state.preferences = {
        mood: '',
        event: '',
        genre: '',
        cuisine: '',
        timeOfDay: ''
      };
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    clearRecommendations: (state) => {
      state.recommendations = {
        movies: [],
        recipes: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = {
          movies: action.payload.movies,
          recipes: action.payload.recipes
        };
        state.preferences = action.payload.preferences;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setPreferences, 
  clearPreferences, 
  toggleModal, 
  clearRecommendations 
} = recommendationSlice.actions;

export default recommendationSlice.reducer;
