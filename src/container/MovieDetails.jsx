import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

export const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      
      try {
        // If we have movie data passed from the previous page, use it
        if (location.state?.movie) {
          setMovie(location.state.movie);
          setLoading(false);
          return;
        }

        // Otherwise, fetch from API using the ID
        const response = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${id}`);
        const data = await response.json();
        
        if (data?.description && data.description.length > 0) {
          const movieData = data.description[0];
          setMovie({
            id: movieData["#IMDB_ID"],
            title: movieData["#TITLE"],
            year: movieData["#YEAR"],
            poster: movieData["#IMG_POSTER"],
            backdrop: movieData["#IMG_POSTER"],
            rating: movieData["#IMDB_IV"] || "N/A",
            runtime: "N/A",
            genre: "N/A",
            director: "N/A",
            writer: "N/A",
            actors: movieData["#ACTORS"] || "N/A",
            plot: "Plot information not available",
            language: "N/A",
            country: "N/A",
            awards: "N/A",
            boxOffice: "N/A",
            production: "N/A",
            aka: movieData["#AKA"],
            cast: movieData["#ACTORS"] ? movieData["#ACTORS"].split(',').slice(0, 6).map(actor => ({
              name: actor.trim(),
              character: "Actor",
              image: "https://via.placeholder.com/150x150?text=Actor"
            })) : []
          });
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="glass-card p-6 text-center">
            <div className="empty-icon mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading Movie Details...</h2>
            <p className="text-white/70">Please wait while we fetch the information</p>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="glass-card p-6 text-center">
            <div className="empty-icon mb-4">❌</div>
            <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
            <p className="text-white/70 mb-4">The movie you're looking for doesn't exist.</p>
            <Link to="/movie" className="btn btn-primary">
              Back to Movies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/movie" className="btn btn-secondary">
            ← Back to Movies
          </Link>
        </div>

        {/* Hero Section */}
        <div className="details-hero fade-in">
          <img 
            src={movie.backdrop} 
            alt={movie.title}
            className="details-hero-bg"
          />
          <div className="details-hero-content">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="details-poster"
            />
            <div className="details-info">
              <h1 className="details-title">{movie.title}</h1>
              <div className="details-meta">
                <div className="details-stat">
                  <span>⭐</span>
                  <span>{movie.rating}/10</span>
                </div>
                <div className="details-stat">
                  <span>📅</span>
                  <span>{movie.year}</span>
                </div>
                <div className="details-stat">
                  <span>⏱️</span>
                  <span>{movie.runtime}</span>
                </div>
                <div className="details-stat">
                  <span>🎭</span>
                  <span>{movie.genre}</span>
                </div>
              </div>
              <p className="details-overview">{movie.plot}</p>
            </div>
          </div>
        </div>

        {/* Movie Information */}
        <div className="grid grid-3 mb-8">
          <div className="glass-card p-6 scale-in">
            <h3 className="text-xl font-bold text-white mb-4">🎬 Production</h3>
            <div className="space-y-3">
              <div>
                <span className="text-white/60">Director:</span>
                <span className="text-white ml-2">{movie.director}</span>
              </div>
              <div>
                <span className="text-white/60">Writer:</span>
                <span className="text-white ml-2">{movie.writer}</span>
              </div>
              <div>
                <span className="text-white/60">Production:</span>
                <span className="text-white ml-2">{movie.production}</span>
              </div>
              <div>
                <span className="text-white/60">Country:</span>
                <span className="text-white ml-2">{movie.country}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 scale-in" style={{animationDelay: '0.1s'}}>
            <h3 className="text-xl font-bold text-white mb-4">💰 Box Office</h3>
            <div className="space-y-3">
              <div>
                <span className="text-white/60">Worldwide:</span>
                <span className="text-white ml-2">{movie.boxOffice}</span>
              </div>
              <div>
                <span className="text-white/60">Language:</span>
                <span className="text-white ml-2">{movie.language}</span>
              </div>
              <div>
                <span className="text-white/60">Awards:</span>
                <span className="text-white ml-2">{movie.awards}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 scale-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-bold text-white mb-4">📊 Ratings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60">IMDB</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{width: `${(parseFloat(movie.rating) / 10) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-white">{movie.rating}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">🎭 Cast & Crew</h2>
          <div className="cast-grid fade-in">
            {movie.cast.map((actor, index) => (
              <div key={index} className="cast-card">
                <img 
                  src={actor.image} 
                  alt={actor.name}
                  className="cast-avatar"
                />
                <h4 className="font-semibold text-white mb-1">{actor.name}</h4>
                <p className="text-white/60 text-sm">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trivia Section */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">🎯 Movie Trivia</h2>
          <div className="grid grid-2 gap-4">
            {movie.trivia.map((fact, index) => (
              <div key={index} className="glass-card p-4 fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <p className="text-white/80 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">📝 Critics Reviews</h2>
          <div className="grid grid-1 gap-4">
            {movie.reviews.map((review, index) => (
              <div key={index} className="glass-card p-6 fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{review.author}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white font-semibold">{review.rating}</span>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12 fade-in">
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn btn-primary">
              🎬 Watch Trailer
            </button>
            <button className="btn btn-secondary">
              ❤️ Add to Favorites
            </button>
            <button className="btn btn-secondary">
              📤 Share Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
