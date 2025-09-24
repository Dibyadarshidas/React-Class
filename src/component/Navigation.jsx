import { Link } from 'react-router-dom';

export const Navigation = () => {
  return <>
  <nav>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/movie'>Movie</Link>
      </li>
      <li>
        <Link to='/recipe'>Recipe</Link>
      </li>
    </ul>
  </nav>
  </>
};