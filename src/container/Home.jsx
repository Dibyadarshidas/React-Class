import { Link } from 'react-router-dom';
import { RecommendationModal } from '../component/RecommendationModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../store/slices/recommendationSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector(state => state.recommendations);

  const handleGetRecommendations = () => {
    dispatch(toggleModal());
  };
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title fade-in">
              Discover Amazing Applications
            </h1>
            <p className="hero-subtitle fade-in">
              Explore our collection of beautifully crafted applications designed to enhance your digital experience. 
              From entertainment to culinary adventures, we've got you covered.
            </p>
            <div className="hero-buttons fade-in">
              <button onClick={handleGetRecommendations} className="btn btn-primary">
                🎯 Get Personalized Recommendations
              </button>
              <Link to="/movie" className="btn btn-secondary">
                🎬 Explore Movies
              </Link>
              <Link to="/recipe" className="btn btn-secondary">
                🍳 Find Recipes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="page-content">
        <div className="container">
          {/* Feature Apps */}
          <div className="grid grid-2 mb-8">
            <div className="feature-card fade-in">
              <div className="feature-icon">🎬</div>
              <h3 className="feature-title">Movie Explorer</h3>
              <p className="feature-description">
                Dive into the world of cinema with our comprehensive movie database. 
                Search, discover, and explore detailed information about your favorite films.
              </p>
              <div className="mt-4">
                <Link to="/movie" className="btn btn-primary">
                  Launch Movie App
                </Link>
              </div>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">🍳</div>
              <h3 className="feature-title">Recipe Finder</h3>
              <p className="feature-description">
                Embark on a culinary journey with our extensive recipe collection. 
                Find inspiration for every meal and discover new cuisines.
              </p>
              <div className="mt-4">
                <Link to="/recipe" className="btn btn-primary">
                  Launch Recipe App
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center mb-8">
            <Link to="/favorites" className="btn btn-primary">
              ❤️ View My Favorites
            </Link>
          </div>

          {/* Features Grid */}
          <div className="text-center mb-6">
            <h2 className="page-title">Why Choose Our Apps?</h2>
            <p className="page-subtitle">Built with modern technology and user experience in mind</p>
          </div>
          
          <div className="grid grid-3">
            <div className="feature-card fade-in">
              <div className="feature-icon">⚡</div>
              <h4 className="feature-title">Lightning Fast</h4>
              <p className="feature-description">
                Optimized performance ensures instant loading and smooth interactions across all devices
              </p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">🎨</div>
              <h4 className="feature-title">Beautiful Design</h4>
              <p className="feature-description">
                Modern, clean interface with attention to detail and user experience at its core
              </p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">📱</div>
              <h4 className="feature-title">Fully Responsive</h4>
              <p className="feature-description">
                Perfect experience on desktop, tablet, and mobile devices with adaptive layouts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Modal */}
      <RecommendationModal />
    </>
  );
};