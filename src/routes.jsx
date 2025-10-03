import { Routes, Route } from 'react-router-dom';
import { Home } from './container/Home';
import { Movie } from './container/Movie';
import { Recipe } from './container/Recipe';
import { MovieDetails } from './container/MovieDetails';
import { RecipeDetails } from './container/RecipeDetails';
import { Favorites } from './container/Favorites';
import { Recommendations } from './container/Recommendations';
import { NotFound } from './container/404';

export const MyRouter = () => {
  const authenticated = true;

  return (
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/movie' element={<Movie/>} />
      <Route path='/movie/:id' element={<MovieDetails/>} />
      <Route path='/recipe' element={authenticated ? <Recipe/> : <NotFound/>} />
      <Route path='/recipe/:id' element={authenticated ? <RecipeDetails/> : <NotFound/>} />
      <Route path='/favorites' element={<Favorites/>} />
      <Route path='/recommendations' element={<Recommendations/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  );
};