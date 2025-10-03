import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites as removeMovieFavorite } from '../store/slices/movieSlice';
import { removeFromFavorites as removeRecipeFavorite } from '../store/slices/recipeSlice';
import { Header } from '../component/Header';

export const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites: movieFavorites } = useSelector(state => state.movies);
  const { favorites: recipeFavorites } = useSelector(state => state.recipes);

  const handleRemoveMovie = (movieId) => {
    dispatch(removeMovieFavorite(movieId));
  };

  const handleRemoveRecipe = (recipeId) => {
    dispatch(removeRecipeFavorite(recipeId));
  };

  const totalFavorites = movieFavorites.length + recipeFavorites.length;

  return (
    <div className="page-content">
      <div className="container">
        <Header title="My Favorites" />
        
        {totalFavorites === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <h3 className="empty-title">No Favorites Yet</h3>
            <p className="empty-description">
              Start exploring movies and recipes to add them to your favorites!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Movie Favorites */}
            {movieFavorites.length > 0 && (
              <div className="favorites-section">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  🎬 Favorite Movies ({movieFavorites.length})
                </h2>
                <div className="grid grid-4">
                  {movieFavorites.map((movie, index) => (
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
                        
                        <div className="flex gap-2 mt-4">
                          <button 
                            onClick={() => handleRemoveMovie(movie["#IMDB_ID"])}
                            className="btn btn-danger flex-1"
                          >
                            ❤️ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recipe Favorites */}
            {recipeFavorites.length > 0 && (
              <div className="favorites-section">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  🍳 Favorite Recipes ({recipeFavorites.length})
                </h2>
                <div className="grid grid-4">
                  {recipeFavorites.map((recipe, index) => (
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
                        
                        <div className="flex gap-2 mt-4">
                          <button 
                            onClick={() => handleRemoveRecipe(recipe["idMeal"])}
                            className="btn btn-danger flex-1"
                          >
                            ❤️ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
