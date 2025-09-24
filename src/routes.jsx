import { Routes, Route } from 'react-router-dom';
import { Home } from './container/Home';
import  {Movie}  from './container/Movie';
import { Recipe } from './container/Recipe';
import { NotFound } from './container/404';
export const MyRouter = ()=>{

  const authenticated = true;

   return  <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route path='/movie' element={<Movie/>} />
    <Route path='/recipe' element={authenticated ? <Recipe/> : <NotFound/>} />
    <Route path='*' element={<NotFound/>} />
  </Routes>
}