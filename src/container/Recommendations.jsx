import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../component/Header';
import { Card } from '../component/Card';
import { addToFavorites as addMovieFavorite } from '../store/slices/movieSlice';
import { addToFavorites as addRecipeFavorite } from '../store/slices/recipeSlice';

export const Recommendations = () => {
  const dispatch = useDispatch();
  const { recommendations, preferences, loading, error } = useSelector(state => state.recommendations);

  const handleAddMovieFavorite = (movie) => {
    dispatch(addMovieFavorite(movie));
  };

  const handleAddRecipeFavorite = (recipe) => {
    dispatch(addRecipeFavorite(recipe));
  };

  const renderMovieCard = (movie, index) => (
    <div key={index} className="content-card">
      <img 
        src={movie["#IMG_POSTER"]} 
        alt={movie["#TITLE"]}
        className="content-card-image"
      />
      
      <div className="content-card-body">
        <h3 className="content-card-title line-clamp-2">
          {movie["#TITLE"]}
        </h3>
        
        <div className="content-card-meta">
          <div className="content-card-tag">
            <span>📅</span>
            <span>{movie["#YEAR"]}</span>
          </div>
          {movie["#IMDB_IV"] && (
            <div className="content-card-tag">
              <span>⭐</span>
              <span>{movie["#IMDB_IV"]}</span>
            </div>
          )}
        </div>
        
        {movie["#ACTORS"] && (
          <p className="content-card-description line-clamp-2">
            <strong>Cast:</strong> {movie["#ACTORS"]}
          </p>
        )}
        
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => handleAddMovieFavorite(movie)}
            className="btn btn-primary flex-1"
          >
            ❤️ Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );

  const renderRecipeCard = (recipe, index) => (
    <div key={index} className="content-card">
      <img 
        src={recipe["strMealThumb"]} 
        alt={recipe["strMeal"]}
        className="content-card-image"
      />
      
      <div className="content-card-body">
        <h3 className="content-card-title line-clamp-2">
          {recipe["strMeal"]}
        </h3>
        
        <div className="content-card-meta">
          <div className="content-card-tag">
            <span>🍽️</span>
            <span>{recipe["strCategory"]}</span>
          </div>
          <div className="content-card-tag">
            <span>🌍</span>
            <span>{recipe["strArea"]}</span>
          </div>
        </div>
        
        {recipe["strTags"] && (
          <p className="content-card-description line-clamp-2">
            <strong>Tags:</strong> {recipe["strTags"]}
          </p>
        )}
        
        <div className="flex gap-2 mt-4">
          <Link 
            to={`/recipe/${recipe["idMeal"]}`}
            state={{ recipe: {
              id: recipe["idMeal"],
              name: recipe["strMeal"],
              image: recipe["strMealThumb"],
              category: recipe["strCategory"],
              area: recipe["strArea"],
              tags: recipe["strTags"]
            }}}
            className="btn btn-primary flex-1"
          >
            View Recipe
          </Link>
          <button 
            onClick={() => handleAddRecipeFavorite(recipe)}
            className="btn btn-secondary"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="text-center py-12">
            <div className="loading-spinner"></div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Getting Your Recommendations...</h2>
            <p className="text-gray-600 mt-2">Finding the perfect movies and recipes for you!</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">❌</div>
            <h3 className="empty-title">Oops! Something went wrong</h3>
            <p className="empty-description">
              We couldn't fetch your recommendations. Please try again later.
            </p>
            <Link to="/" className="btn btn-primary mt-4">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <Header title="Your Personalized Recommendations" />
        
        {/* Preferences Summary */}
        <div className="preferences-summary">
          <h3 className="text-xl font-bold mb-4">Based on your preferences:</h3>
          <div className="preferences-tags">
            {preferences.mood && (
              <span className="preference-tag">
                😊 {preferences.mood.charAt(0).toUpperCase() + preferences.mood.slice(1)} mood
              </span>
            )}
            {preferences.event && (
              <span className="preference-tag">
                🎉 {preferences.event.charAt(0).toUpperCase() + preferences.event.slice(1)} event
              </span>
            )}
            {preferences.genre && preferences.genre !== 'any' && (
              <span className="preference-tag">
                🎬 {preferences.genre.charAt(0).toUpperCase() + preferences.genre.slice(1)} genre
              </span>
            )}
            {preferences.cuisine && preferences.cuisine !== 'any' && (
              <span className="preference-tag">
                🍽️ {preferences.cuisine.charAt(0).toUpperCase() + preferences.cuisine.slice(1)} cuisine
              </span>
            )}
            {preferences.timeOfDay && (
              <span className="preference-tag">
                ⏰ {preferences.timeOfDay.charAt(0).toUpperCase() + preferences.timeOfDay.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Movie Recommendations */}
        {recommendations.movies && recommendations.movies.length > 0 && (
          <div className="recommendations-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🎬 Recommended Movies ({recommendations.movies.length})
            </h2>
            <div className="grid grid-4">
              {recommendations.movies.map((movie, index) => renderMovieCard(movie, index))}
            </div>
          </div>
        )}

        {/* Recipe Recommendations */}
        {recommendations.recipes && recommendations.recipes.length > 0 && (
          <div className="recommendations-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🍳 Recommended Recipes ({recommendations.recipes.length})
            </h2>
            <div className="grid grid-4">
              {recommendations.recipes.map((recipe, index) => renderRecipeCard(recipe, index))}
            </div>
          </div>
        )}

        {/* No Recommendations */}
        {(!recommendations.movies || recommendations.movies.length === 0) && 
         (!recommendations.recipes || recommendations.recipes.length === 0) && (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3 className="empty-title">No Recommendations Found</h3>
            <p className="empty-description">
              We couldn't find any recommendations based on your preferences. 
              Try adjusting your criteria and try again.
            </p>
            <Link to="/" className="btn btn-primary mt-4">
              Try Again
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/" className="btn btn-primary">
              🏠 Back to Home
            </Link>
            <Link to="/favorites" className="btn btn-secondary">
              ❤️ View Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
