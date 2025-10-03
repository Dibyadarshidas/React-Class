import { Header } from "../component/Header";
import { SearchForm } from "../component/SearchForm";
import { Card } from "../component/Card";
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/slices/recipeSlice';
import { Link } from 'react-router-dom';

export const Recipe = () => {
  const dispatch = useDispatch();
  const { recipes, favorites, loading, error } = useSelector(state => state.recipes);

  const handleToggleFavorite = (recipe) => {
    const isFavorite = favorites.find(fav => fav.idMeal === recipe.idMeal);
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.idMeal));
    } else {
      dispatch(addToFavorites(recipe));
    }
  };

  const renderCard = recipes?.map((item, index) => {
    const isFavorite = favorites.find(fav => fav.idMeal === item.idMeal);
    
    return (
      <div key={index} className="content-card">
        <img 
          src={item["strMealThumb"]} 
          alt={item["strMeal"]}
          className="content-card-image"
        />
        
        <div className="content-card-body">
          <h3 className="content-card-title line-clamp-2">
            {item["strMeal"]}
          </h3>
          
          <div className="content-card-meta">
            <div className="content-card-tag">
              <span>🍽️</span>
              <span>{item["strCategory"]}</span>
            </div>
            <div className="content-card-tag">
              <span>🌍</span>
              <span>{item["strArea"]}</span>
            </div>
          </div>
          
          {item["strTags"] && (
            <p className="content-card-description line-clamp-2">
              <strong>Tags:</strong> {item["strTags"]}
            </p>
          )}
          
          <div className="flex gap-2 mt-4">
            <Link 
              to={`/recipe/${item["idMeal"] || index}`}
              state={{ recipe: {
                id: item["idMeal"],
                name: item["strMeal"],
                image: item["strMealThumb"],
                category: item["strCategory"],
                area: item["strArea"],
                tags: item["strTags"]
              }}}
              className="btn btn-primary flex-1"
            >
              View Recipe
            </Link>
            <button 
              onClick={() => handleToggleFavorite(item)}
              className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="page-content">
      <div className="container">
        <Header title="Recipe Finder" />
        <SearchForm type="recipe" />
        
        {loading && (
          <div className="text-center py-8">
            <div className="loading-spinner"></div>
            <p className="text-gray-600 mt-4">Searching for recipes...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message text-center py-8">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
        
        <Card data={recipes} renderCard={renderCard} />
      </div>
    </div>
  );
};