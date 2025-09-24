import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="main-title">My App Collection</h1>
        <p className="subtitle">Discover amazing apps for movies and recipes</p>
      </div>
      
      <div className="app-grid">
        <div className="app-card movie-card">
          <div className="app-icon">🎬</div>
          <h3>Movie Explorer</h3>
          <p>Discover and explore your favorite movies with detailed information and ratings.</p>
          <button className="app-button"> <Link to='/movie'> Launch Movie App</Link></button>
        </div>
        
        <div className="app-card recipe-card">
          <div className="app-icon">🍳</div>
          <h3>Recipe Finder</h3>
          <p>Find delicious recipes and cooking inspiration for every meal of the day.</p>
          <button className="app-button"> <Link to='/recipe'>Launch Recipe App</Link></button>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Why Choose Our Apps?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h4>Fast & Responsive</h4>
            <p>Lightning-fast performance with smooth user experience</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎨</div>
            <h4>Beautiful Design</h4>
            <p>Modern and intuitive interface that's easy to use</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h4>Mobile Friendly</h4>
            <p>Fully responsive design that works on all devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};