import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navigation = () => {
  const location = useLocation();
  const { favorites: movieFavorites } = useSelector(state => state.movies);
  const { favorites: recipeFavorites } = useSelector(state => state.recipes);
  const totalFavorites = movieFavorites.length + recipeFavorites.length;
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <div className="nav-logo">
              <span>🎬</span>
            </div>
            <span>AppHub</span>
          </Link>
          
          <ul className="nav-links">
            <li>
              <Link 
                to='/' 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to='/movie' 
                className={`nav-link ${isActive('/movie') || location.pathname.startsWith('/movie/') ? 'active' : ''}`}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link 
                to='/recipe' 
                className={`nav-link ${isActive('/recipe') || location.pathname.startsWith('/recipe/') ? 'active' : ''}`}
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link 
                to='/favorites' 
                className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
              >
                Favorites {totalFavorites > 0 && <span className="favorites-count">({totalFavorites})</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};