
import { Header } from '../component/Header';
import { SearchForm } from '../component/SearchForm';
import { Card } from '../component/Card';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/slices/movieSlice';

export const Movie = () => {
  const dispatch = useDispatch();
  const { movies, favorites, loading, error } = useSelector(state => state.movies);

  const handleToggleFavorite = (movie) => {
    const isFavorite = favorites.find(fav => fav['#IMDB_ID'] === movie['#IMDB_ID']);
    if (isFavorite) {
      dispatch(removeFromFavorites(movie['#IMDB_ID']));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const renderCard = movies?.map((item, index) => {
    const isFavorite = favorites.find(fav => fav['#IMDB_ID'] === item['#IMDB_ID']);
    
    return (
      <div key={index} className="content-card">
        <img 
          src={item["#IMG_POSTER"]} 
          alt={item["#TITLE"]}
          className="content-card-image"
        />
        
        <div className="content-card-body">
          <h3 className="content-card-title line-clamp-2">
            {item["#TITLE"]}
          </h3>
          
          <div className="content-card-meta">
            <div className="content-card-tag">
              <span>📅</span>
              <span>{item["#YEAR"]}</span>
            </div>
            {item["#IMDB_IV"] && (
              <div className="content-card-tag">
                <span>⭐</span>
                <span>{item["#IMDB_IV"]}</span>
              </div>
            )}
          </div>
          
          {item["#ACTORS"] && (
            <p className="content-card-description line-clamp-2">
              <strong>Cast:</strong> {item["#ACTORS"]}
            </p>
          )}
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={() => handleToggleFavorite(item)}
              className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'} flex-1`}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="page-content">
      <div className="container">
        <Header title="Movie Explorer" />
        <SearchForm type="movie" />
        
        {loading && (
          <div className="text-center py-8">
            <div className="loading-spinner"></div>
            <p className="text-gray-600 mt-4">Searching for movies...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message text-center py-8">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
        
        <Card data={movies} renderCard={renderCard} />
      </div>
    </div>
  );
};


