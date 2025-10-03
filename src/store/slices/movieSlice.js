import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${searchTerm}`);
      const data = await response.json();
      return data?.description || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    favorites: [],
    searchTerm: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addToFavorites: (state, action) => {
      const movie = action.payload;
      const exists = state.favorites.find(fav => fav['#IMDB_ID'] === movie['#IMDB_ID']);
      if (!exists) {
        state.favorites.push(movie);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        fav => fav['#IMDB_ID'] !== action.payload
      );
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, addToFavorites, removeFromFavorites, clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
