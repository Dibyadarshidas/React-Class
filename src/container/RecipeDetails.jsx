import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

export const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      
      try {
        // If we have recipe data passed from the previous page, use it
        if (location.state?.recipe) {
          setRecipe(location.state.recipe);
          setLoading(false);
          return;
        }

        // Otherwise, fetch from API using the ID
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        
        if (data?.meals && data.meals.length > 0) {
          const recipeData = data.meals[0];
          
          // Extract ingredients from the API response
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = recipeData[`strIngredient${i}`];
            const measure = recipeData[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
              ingredients.push({
                name: ingredient,
                amount: measure || "To taste",
                image: "🍽️"
              });
            }
          }

          // Extract instructions
          const instructions = recipeData.strInstructions 
            ? recipeData.strInstructions.split('\r\n').filter(step => step.trim())
            : ["Instructions not available"];

          setRecipe({
            id: recipeData.idMeal,
            name: recipeData.strMeal,
            image: recipeData.strMealThumb,
            category: recipeData.strCategory || "Unknown",
            area: recipeData.strArea || "Unknown",
            tags: recipeData.strTags || "",
            cookTime: "30 minutes",
            prepTime: "15 minutes",
            servings: "4 people",
            difficulty: "Medium",
            calories: "400 per serving",
            description: recipeData.strInstructions ? recipeData.strInstructions.substring(0, 200) + "..." : "A delicious recipe from TheMealDB.",
            ingredients: ingredients,
            instructions: instructions,
            nutrition: {
              calories: 400,
              protein: "25g",
              carbs: "45g",
              fat: "15g",
              fiber: "5g",
              sugar: "8g"
            },
            tips: [
              "Make sure to read all instructions before starting.",
              "Prepare all ingredients before cooking.",
              "Taste and adjust seasoning as needed.",
              "Let the dish rest for a few minutes before serving."
            ],
            reviews: [
              { author: "Recipe Lover", rating: 5, text: "Great recipe! Easy to follow and delicious results." },
              { author: "Home Cook", rating: 4, text: "Tried this recipe and it turned out amazing. Will make again!" }
            ],
            relatedRecipes: [
              { name: "Similar Recipe 1", image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=300&h=200&fit=crop" },
              { name: "Similar Recipe 2", image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=300&h=200&fit=crop" }
            ]
          });
        } else {
          setRecipe(null);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="glass-card p-6 text-center">
            <div className="empty-icon mb-4">🍳</div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading Recipe Details...</h2>
            <p className="text-white/70">Please wait while we fetch the recipe information</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="glass-card p-6 text-center">
            <div className="empty-icon mb-4">❌</div>
            <h2 className="text-2xl font-bold text-white mb-2">Recipe Not Found</h2>
            <p className="text-white/70 mb-4">The recipe you're looking for doesn't exist.</p>
            <Link to="/recipe" className="btn btn-primary">
              Back to Recipes
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
          <Link to="/recipe" className="btn btn-secondary">
            ← Back to Recipes
          </Link>
        </div>

        {/* Hero Section */}
        <div className="details-hero fade-in">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="details-hero-bg"
          />
          <div className="details-hero-content">
            <img 
              src={recipe.image} 
              alt={recipe.name}
              className="details-poster"
            />
            <div className="details-info">
              <h1 className="details-title">{recipe.name}</h1>
              <div className="details-meta">
                <div className="details-stat">
                  <span>🍽️</span>
                  <span>{recipe.category}</span>
                </div>
                <div className="details-stat">
                  <span>🌍</span>
                  <span>{recipe.area}</span>
                </div>
                <div className="details-stat">
                  <span>⏱️</span>
                  <span>{recipe.cookTime}</span>
                </div>
                <div className="details-stat">
                  <span>👥</span>
                  <span>{recipe.servings}</span>
                </div>
                <div className="details-stat">
                  <span>📊</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
              <p className="details-overview">{recipe.description}</p>
            </div>
          </div>
        </div>

        {/* Recipe Overview */}
        <div className="grid grid-3 mb-8">
          <div className="glass-card p-6 scale-in">
            <h3 className="text-xl font-bold text-white mb-4">⏰ Timing</h3>
            <div className="space-y-3">
              <div>
                <span className="text-white/60">Prep Time:</span>
                <span className="text-white ml-2">{recipe.prepTime}</span>
              </div>
              <div>
                <span className="text-white/60">Cook Time:</span>
                <span className="text-white ml-2">{recipe.cookTime}</span>
              </div>
              <div>
                <span className="text-white/60">Difficulty:</span>
                <span className="text-white ml-2">{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 scale-in" style={{animationDelay: '0.1s'}}>
            <h3 className="text-xl font-bold text-white mb-4">🥘 Serving Info</h3>
            <div className="space-y-3">
              <div>
                <span className="text-white/60">Servings:</span>
                <span className="text-white ml-2">{recipe.servings}</span>
              </div>
              <div>
                <span className="text-white/60">Calories:</span>
                <span className="text-white ml-2">{recipe.calories}</span>
              </div>
              <div>
                <span className="text-white/60">Category:</span>
                <span className="text-white ml-2">{recipe.category}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 scale-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-bold text-white mb-4">📊 Nutrition</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60">Protein:</span>
                <span className="text-white">{recipe.nutrition.protein}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Carbs:</span>
                <span className="text-white">{recipe.nutrition.carbs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Fat:</span>
                <span className="text-white">{recipe.nutrition.fat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">🛒 Ingredients</h2>
          <div className="ingredients-grid fade-in">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <span className="text-2xl">{ingredient.image}</span>
                <div>
                  <div className="text-white font-semibold">{ingredient.name}</div>
                  <div className="text-white/60 text-sm">{ingredient.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">👨‍🍳 Instructions</h2>
          <div className="instructions-list">
            {recipe.instructions.map((step, index) => (
              <div key={index} className="instruction-step fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <p className="text-white/90 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">💡 Pro Tips</h2>
          <div className="grid grid-2 gap-4">
            {recipe.tips.map((tip, index) => (
              <div key={index} className="glass-card p-4 fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-white/80 leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">⭐ Reviews</h2>
          <div className="grid grid-1 gap-4">
            {recipe.reviews.map((review, index) => (
              <div key={index} className="glass-card p-6 fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{review.author}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Recipes */}
        <div className="details-section">
          <h2 className="text-3xl font-bold text-white mb-6 fade-in">🍝 Related Recipes</h2>
          <div className="grid grid-3 gap-6">
            {recipe.relatedRecipes.map((related, index) => (
              <div key={index} className="content-card fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <img 
                  src={related.image} 
                  alt={related.name}
                  className="content-card-image"
                />
                <div className="content-card-body">
                  <h3 className="content-card-title">{related.name}</h3>
                  <button className="btn btn-secondary">
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12 fade-in">
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn btn-primary">
              🍳 Start Cooking
            </button>
            <button className="btn btn-secondary">
              📋 Save Recipe
            </button>
            <button className="btn btn-secondary">
              📤 Share Recipe
            </button>
            <button className="btn btn-secondary">
              🛒 Shopping List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
