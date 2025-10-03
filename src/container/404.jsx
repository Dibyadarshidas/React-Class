import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="glass-card p-12 text-center max-w-2xl mx-auto fade-in">
          <div className="empty-icon mb-8">
            🌌
          </div>
          
          <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            404
          </h1>
          
          <h2 className="text-3xl font-bold text-white mb-6">
            Lost in the Digital Universe
          </h2>
          
          <p className="text-white/70 text-lg mb-12 leading-relaxed">
            The page you're looking for has drifted into the digital void. 
            Let's navigate you back to familiar territory and continue your journey.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/" className="btn btn-primary">
              🏠 Return Home
            </Link>
            <Link to="/movie" className="btn btn-secondary">
              🎬 Explore Movies
            </Link>
            <Link to="/recipe" className="btn btn-secondary">
              🍳 Find Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};