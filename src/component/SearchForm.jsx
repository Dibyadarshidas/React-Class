import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setSearchTerm } from '../store/slices/movieSlice';
import { fetchRecipes, setSearchTerm as setRecipeSearchTerm } from '../store/slices/recipeSlice';

export const SearchForm = ({ type = 'movie' }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const movieState = useSelector(state => state.movies);
  const recipeState = useSelector(state => state.recipes);

  const onSubmit = (data) => {
    if (type === 'movie') {
      dispatch(setSearchTerm(data.searchTerm));
      dispatch(fetchMovies(data.searchTerm));
    } else {
      dispatch(setRecipeSearchTerm(data.searchTerm));
      dispatch(fetchRecipes(data.searchTerm));
    }
  };

  const currentState = type === 'movie' ? movieState : recipeState;

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit(onSubmit)} className="search-box">
        <div className="search-input-container">
          <input 
            {...register('searchTerm', { 
              required: 'Search term is required',
              minLength: { value: 2, message: 'Search term must be at least 2 characters' }
            })}
            type="text" 
            placeholder={`Search for ${type === 'movie' ? 'movies' : 'recipes'}...`}
            className="search-input"
          />
          {errors.searchTerm && (
            <span className="error-message">{errors.searchTerm.message}</span>
          )}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={currentState.loading}
        >
          {currentState.loading ? 'Searching...' : '🔍 Search'}
        </button>
      </form>
    </div>
  );
};
